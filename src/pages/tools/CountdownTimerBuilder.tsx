import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Timer, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const CountdownTimerBuilder = () => {
  const [title, setTitle] = useState("Launch Day!");
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("00:00");
  const [style, setStyle] = useState<"minimal" | "cards" | "circles">("cards");
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Set default date to 30 days from now
  useEffect(() => {
    if (!targetDate) {
      const future = new Date();
      future.setDate(future.getDate() + 30);
      setTargetDate(future.toISOString().split('T')[0]);
    }
  }, []);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(`${targetDate}T${targetTime}`);
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate, targetTime]);

  const embedCode = useMemo(() => {
    const targetDateTime = `${targetDate}T${targetTime}`;
    return `<!-- Countdown Timer -->
<div id="kamrok-countdown" data-target="${targetDateTime}" data-title="${title}" data-style="${style}"></div>
<script>
(function() {
  const el = document.getElementById('kamrok-countdown');
  const target = new Date(el.dataset.target);
  const title = el.dataset.title;
  const style = el.dataset.style;
  
  function pad(n) { return n < 10 ? '0' + n : n; }
  
  function update() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) { el.innerHTML = '<p style="font-size:24px;font-weight:bold;">🎉 Time\\'s up!</p>'; return; }
    
    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff/(1000*60*60)) % 24);
    const m = Math.floor((diff/(1000*60)) % 60);
    const s = Math.floor((diff/1000) % 60);
    
    el.innerHTML = \`
      <div style="text-align:center;font-family:system-ui;">
        <h3 style="margin-bottom:16px;font-size:20px;">\${title}</h3>
        <div style="display:flex;gap:12px;justify-content:center;">
          <div style="background:#f3f4f6;padding:16px 24px;border-radius:8px;">
            <div style="font-size:32px;font-weight:bold;">\${pad(d)}</div>
            <div style="font-size:12px;color:#6b7280;">Days</div>
          </div>
          <div style="background:#f3f4f6;padding:16px 24px;border-radius:8px;">
            <div style="font-size:32px;font-weight:bold;">\${pad(h)}</div>
            <div style="font-size:12px;color:#6b7280;">Hours</div>
          </div>
          <div style="background:#f3f4f6;padding:16px 24px;border-radius:8px;">
            <div style="font-size:32px;font-weight:bold;">\${pad(m)}</div>
            <div style="font-size:12px;color:#6b7280;">Mins</div>
          </div>
          <div style="background:#f3f4f6;padding:16px 24px;border-radius:8px;">
            <div style="font-size:32px;font-weight:bold;">\${pad(s)}</div>
            <div style="font-size:12px;color:#6b7280;">Secs</div>
          </div>
        </div>
      </div>
    \`;
  }
  
  update();
  setInterval(update, 1000);
})();
</script>`;
  }, [targetDate, targetTime, title, style]);

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success("Embed code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/tools" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
            <Timer className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Countdown Timer Builder</h1>
          <p className="text-muted-foreground">Create embeddable countdown timers for your website</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="title" className="mb-2 block">Timer Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Launch Day!"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="mb-2 block">Target Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="mb-2 block">Target Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={targetTime}
                    onChange={(e) => setTargetTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Style</Label>
                <RadioGroup value={style} onValueChange={(v) => setStyle(v as typeof style)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cards" id="cards" />
                    <Label htmlFor="cards">Cards (Default)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minimal" id="minimal" />
                    <Label htmlFor="minimal">Minimal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="circles" id="circles" />
                    <Label htmlFor="circles">Circles</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button onClick={copyCode} className="w-full">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy Embed Code
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4 text-center">Live Preview</h3>
                <div className="text-center">
                  <h4 className="text-lg font-medium mb-4">{title}</h4>
                  <div className="flex gap-3 justify-center">
                    {[
                      { value: timeLeft.days, label: "Days" },
                      { value: timeLeft.hours, label: "Hours" },
                      { value: timeLeft.minutes, label: "Mins" },
                      { value: timeLeft.seconds, label: "Secs" },
                    ].map((unit, index) => (
                      <div 
                        key={index}
                        className={`px-4 py-3 rounded-lg ${
                          style === "circles" 
                            ? "rounded-full w-16 h-16 flex flex-col items-center justify-center bg-primary/10" 
                            : "bg-muted"
                        }`}
                      >
                        <div className="text-2xl font-bold">{pad(unit.value)}</div>
                        <div className="text-xs text-muted-foreground">{unit.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-3">Embed Code</h3>
                <div className="bg-muted p-3 rounded-lg overflow-x-auto">
                  <pre className="text-xs font-mono whitespace-pre-wrap break-all">
                    {embedCode.slice(0, 200)}...
                  </pre>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Paste this code into your website's HTML where you want the countdown to appear.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-3">Use Cases</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Product launches</li>
                  <li>• Sale endings</li>
                  <li>• Event countdowns</li>
                  <li>• Limited-time offers</li>
                  <li>• Coming soon pages</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimerBuilder;
