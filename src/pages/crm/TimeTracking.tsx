import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, Play, Square, Clock, DollarSign, 
  Calendar, Receipt, MoreHorizontal
} from "lucide-react";
import { format, differenceInMinutes, parseISO, startOfWeek, endOfWeek } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TimeTracking() {
  const queryClient = useQueryClient();
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerStart, setTimerStart] = useState<Date | null>(null);
  const [timerDescription, setTimerDescription] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);
  
  const currentOrgId = localStorage.getItem("currentOrgId");

  const [manualForm, setManualForm] = useState({
    description: "",
    date: format(new Date(), "yyyy-MM-dd"),
    duration_hours: "",
    duration_minutes: "",
    is_billable: true,
    hourly_rate: "",
    related_contact_id: "",
    related_company_id: "",
  });

  // Fetch time entries
  const { data: timeEntries } = useQuery({
    queryKey: ["time-entries", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];
      const { data, error } = await supabase
        .from("time_entries")
        .select(`
          *,
          contacts:related_contact_id(id, first_name, last_name),
          companies:related_company_id(id, name)
        `)
        .eq("organization_id", currentOrgId)
        .order("started_at", { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    },
    enabled: !!currentOrgId,
  });

  // Check for running timer
  const { data: runningTimer } = useQuery({
    queryKey: ["running-timer", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return null;
      const { data, error } = await supabase
        .from("time_entries")
        .select("*")
        .eq("organization_id", currentOrgId)
        .is("ended_at", null)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!currentOrgId,
  });

  // Load running timer
  useEffect(() => {
    if (runningTimer) {
      setIsTimerRunning(true);
      setTimerStart(parseISO(runningTimer.started_at));
      setTimerDescription(runningTimer.description);
    }
  }, [runningTimer]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerStart) {
      interval = setInterval(() => {
        setElapsedTime(differenceInMinutes(new Date(), timerStart));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerStart]);

  // Fetch contacts
  const { data: contacts } = useQuery({
    queryKey: ["contacts", currentOrgId],
    queryFn: async () => {
      const { data } = await supabase
        .from("contacts")
        .select("id, first_name, last_name")
        .eq("organization_id", currentOrgId!);
      return data || [];
    },
    enabled: !!currentOrgId,
  });

  // Fetch companies
  const { data: companies } = useQuery({
    queryKey: ["companies", currentOrgId],
    queryFn: async () => {
      const { data } = await supabase
        .from("companies")
        .select("id, name")
        .eq("organization_id", currentOrgId!);
      return data || [];
    },
    enabled: !!currentOrgId,
  });

  // Start timer mutation
  const startTimerMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !currentOrgId) throw new Error("Not authenticated");

      const { data, error } = await supabase.from("time_entries").insert({
        organization_id: currentOrgId,
        user_id: user.id,
        description: timerDescription || "Working...",
        started_at: new Date().toISOString(),
        is_billable: true,
      }).select().single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      setIsTimerRunning(true);
      setTimerStart(new Date());
      queryClient.invalidateQueries({ queryKey: ["running-timer"] });
      toast.success("Timer started!");
    },
  });

  // Stop timer mutation
  const stopTimerMutation = useMutation({
    mutationFn: async () => {
      if (!runningTimer) throw new Error("No running timer");
      
      const endTime = new Date();
      const duration = differenceInMinutes(endTime, parseISO(runningTimer.started_at));

      const { error } = await supabase
        .from("time_entries")
        .update({
          ended_at: endTime.toISOString(),
          duration_minutes: duration,
          description: timerDescription || runningTimer.description,
        })
        .eq("id", runningTimer.id);

      if (error) throw error;
    },
    onSuccess: () => {
      setIsTimerRunning(false);
      setTimerStart(null);
      setTimerDescription("");
      setElapsedTime(0);
      queryClient.invalidateQueries({ queryKey: ["time-entries"] });
      queryClient.invalidateQueries({ queryKey: ["running-timer"] });
      toast.success("Timer stopped!");
    },
  });

  // Manual entry mutation
  const manualEntryMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !currentOrgId) throw new Error("Not authenticated");

      const hours = parseInt(manualForm.duration_hours) || 0;
      const minutes = parseInt(manualForm.duration_minutes) || 0;
      const totalMinutes = hours * 60 + minutes;
      const hourlyRate = parseFloat(manualForm.hourly_rate) || 0;
      const totalAmount = manualForm.is_billable ? (totalMinutes / 60) * hourlyRate : 0;

      const startDate = new Date(manualForm.date);
      startDate.setHours(9, 0, 0, 0);
      const endDate = new Date(startDate.getTime() + totalMinutes * 60000);

      const { error } = await supabase.from("time_entries").insert({
        organization_id: currentOrgId,
        user_id: user.id,
        description: manualForm.description,
        started_at: startDate.toISOString(),
        ended_at: endDate.toISOString(),
        duration_minutes: totalMinutes,
        is_billable: manualForm.is_billable,
        hourly_rate: hourlyRate || null,
        total_amount: totalAmount || null,
        related_contact_id: manualForm.related_contact_id || null,
        related_company_id: manualForm.related_company_id || null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["time-entries"] });
      toast.success("Time entry added!");
      setIsManualEntryOpen(false);
      setManualForm({
        description: "",
        date: format(new Date(), "yyyy-MM-dd"),
        duration_hours: "",
        duration_minutes: "",
        is_billable: true,
        hourly_rate: "",
        related_contact_id: "",
        related_company_id: "",
      });
    },
  });

  // Calculate stats
  const thisWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const thisWeekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
  const thisWeekEntries = timeEntries?.filter(e => {
    const date = parseISO(e.started_at);
    return date >= thisWeekStart && date <= thisWeekEnd;
  }) || [];

  const stats = {
    thisWeek: thisWeekEntries.reduce((sum, e) => sum + (e.duration_minutes || 0), 0),
    billable: thisWeekEntries.filter(e => e.is_billable).reduce((sum, e) => sum + (e.duration_minutes || 0), 0),
    totalValue: thisWeekEntries.reduce((sum, e) => sum + (Number(e.total_amount) || 0), 0),
  };

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  if (!currentOrgId) {
    return (
      <div className="p-8">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Please select an organization</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 pb-24 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Time Tracking</h1>
          <p className="text-sm text-muted-foreground">Track billable hours</p>
        </div>
        <Button onClick={() => setIsManualEntryOpen(true)} variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Manual Entry
        </Button>
      </div>

      {/* Timer Card */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <Input
              value={timerDescription}
              onChange={(e) => setTimerDescription(e.target.value)}
              placeholder="What are you working on?"
              className="text-lg"
              disabled={isTimerRunning && !!runningTimer}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-mono font-bold min-w-[120px] text-center">
              {formatDuration(elapsedTime)}
            </div>
            {isTimerRunning ? (
              <Button 
                onClick={() => stopTimerMutation.mutate()} 
                variant="destructive" 
                size="lg"
                className="gap-2"
                disabled={stopTimerMutation.isPending}
              >
                <Square className="h-5 w-5" />
                Stop
              </Button>
            ) : (
              <Button 
                onClick={() => startTimerMutation.mutate()} 
                size="lg"
                className="gap-2"
                disabled={startTimerMutation.isPending}
              >
                <Play className="h-5 w-5" />
                Start
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs">This Week</span>
          </div>
          <p className="text-xl font-bold">{formatDuration(stats.thisWeek)}</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs">Billable</span>
          </div>
          <p className="text-xl font-bold">{formatDuration(stats.billable)}</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Receipt className="h-4 w-4" />
            <span className="text-xs">Value</span>
          </div>
          <p className="text-xl font-bold">€{stats.totalValue.toLocaleString()}</p>
        </Card>
      </div>

      {/* Time Entries List */}
      <Card className="divide-y">
        {timeEntries?.map((entry) => (
          <div key={entry.id} className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium">{entry.description}</p>
                <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(parseISO(entry.started_at), "MMM d")}
                  </span>
                  {(entry.contacts || entry.companies) && (
                    <span>
                      {entry.contacts && `${entry.contacts.first_name} ${entry.contacts.last_name}`}
                      {entry.contacts && entry.companies && " · "}
                      {entry.companies && entry.companies.name}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-mono font-medium">
                    {entry.duration_minutes ? formatDuration(entry.duration_minutes) : "Running..."}
                  </p>
                  {entry.is_billable && entry.total_amount && (
                    <p className="text-xs text-green-500">€{Number(entry.total_amount).toFixed(2)}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {entry.is_billable ? (
                    <Badge variant="outline" className="text-green-500 border-green-500/30">
                      Billable
                    </Badge>
                  ) : (
                    <Badge variant="outline">Non-billable</Badge>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        ))}

        {timeEntries?.length === 0 && (
          <div className="p-8 text-center">
            <Clock className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground">No time entries yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start the timer or add a manual entry</p>
          </div>
        )}
      </Card>

      {/* Manual Entry Dialog */}
      <Dialog open={isManualEntryOpen} onOpenChange={setIsManualEntryOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Time Entry</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); manualEntryMutation.mutate(); }} className="space-y-4">
            <div>
              <Label>Description</Label>
              <Textarea
                value={manualForm.description}
                onChange={(e) => setManualForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="What did you work on?"
                required
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={manualForm.date}
                onChange={(e) => setManualForm(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Hours</Label>
                <Input
                  type="number"
                  min="0"
                  value={manualForm.duration_hours}
                  onChange={(e) => setManualForm(prev => ({ ...prev, duration_hours: e.target.value }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label>Minutes</Label>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={manualForm.duration_minutes}
                  onChange={(e) => setManualForm(prev => ({ ...prev, duration_minutes: e.target.value }))}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label>Billable</Label>
              <Switch
                checked={manualForm.is_billable}
                onCheckedChange={(v) => setManualForm(prev => ({ ...prev, is_billable: v }))}
              />
            </div>
            {manualForm.is_billable && (
              <div>
                <Label>Hourly Rate (€)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={manualForm.hourly_rate}
                  onChange={(e) => setManualForm(prev => ({ ...prev, hourly_rate: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Contact</Label>
                <Select
                  value={manualForm.related_contact_id}
                  onValueChange={(v) => setManualForm(prev => ({ ...prev, related_contact_id: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {contacts?.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.first_name} {c.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Company</Label>
                <Select
                  value={manualForm.related_company_id}
                  onValueChange={(v) => setManualForm(prev => ({ ...prev, related_company_id: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {companies?.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={manualEntryMutation.isPending}>
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
