import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Euro } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const HourlyRateCalculator = () => {
  const [desiredSalary, setDesiredSalary] = useState("50000");
  const [hoursPerWeek, setHoursPerWeek] = useState([40]);
  const [weeksOff, setWeeksOff] = useState([4]);
  const [businessExpenses, setBusinessExpenses] = useState("5000");
  const [profitMargin, setProfitMargin] = useState([20]);
  const [billablePercentage, setBillablePercentage] = useState([60]);

  const results = useMemo(() => {
    const salary = parseFloat(desiredSalary) || 0;
    const expenses = parseFloat(businessExpenses) || 0;
    const workWeeks = 52 - weeksOff[0];
    const totalHours = hoursPerWeek[0] * workWeeks;
    const billableHours = totalHours * (billablePercentage[0] / 100);

    // Total needed = salary + expenses + profit margin
    const baseCost = salary + expenses;
    const withProfit = baseCost * (1 + profitMargin[0] / 100);

    const hourlyRate = billableHours > 0 ? withProfit / billableHours : 0;
    const dailyRate = hourlyRate * 8;
    const weeklyRate = hourlyRate * (hoursPerWeek[0] * (billablePercentage[0] / 100));

    return {
      hourlyRate: Math.ceil(hourlyRate),
      dailyRate: Math.ceil(dailyRate),
      weeklyRate: Math.ceil(weeklyRate),
      totalHours,
      billableHours: Math.round(billableHours),
      annualRevenue: Math.ceil(withProfit)
    };
  }, [desiredSalary, hoursPerWeek, weeksOff, businessExpenses, profitMargin, billablePercentage]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/tools" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Hourly Rate Calculator</h1>
          <p className="text-muted-foreground">Calculate your ideal freelance or consulting rate</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label htmlFor="salary" className="mb-2 block">Desired Annual Income (€)</Label>
                <Input
                  id="salary"
                  type="number"
                  value={desiredSalary}
                  onChange={(e) => setDesiredSalary(e.target.value)}
                  placeholder="50000"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  What you want to take home after expenses
                </p>
              </div>

              <div>
                <Label htmlFor="expenses" className="mb-2 block">Annual Business Expenses (€)</Label>
                <Input
                  id="expenses"
                  type="number"
                  value={businessExpenses}
                  onChange={(e) => setBusinessExpenses(e.target.value)}
                  placeholder="5000"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Software, equipment, insurance, accounting, etc.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Hours per Week</Label>
                  <span className="text-sm font-medium">{hoursPerWeek[0]} hrs</span>
                </div>
                <Slider
                  value={hoursPerWeek}
                  onValueChange={setHoursPerWeek}
                  min={20}
                  max={60}
                  step={5}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Weeks Off per Year</Label>
                  <span className="text-sm font-medium">{weeksOff[0]} weeks</span>
                </div>
                <Slider
                  value={weeksOff}
                  onValueChange={setWeeksOff}
                  min={2}
                  max={12}
                  step={1}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Holidays, sick days, personal time
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Billable Hours %</Label>
                  <span className="text-sm font-medium">{billablePercentage[0]}%</span>
                </div>
                <Slider
                  value={billablePercentage}
                  onValueChange={setBillablePercentage}
                  min={40}
                  max={90}
                  step={5}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Time actually spent on client work (rest is admin, marketing, etc.)
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Profit Margin</Label>
                  <span className="text-sm font-medium">{profitMargin[0]}%</span>
                </div>
                <Slider
                  value={profitMargin}
                  onValueChange={setProfitMargin}
                  min={0}
                  max={50}
                  step={5}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Buffer for growth, savings, unexpected costs
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Your Hourly Rate</p>
                <div className="flex items-center justify-center gap-2">
                  <Euro className="h-8 w-8 text-primary" />
                  <span className="text-5xl font-bold text-primary">{results.hourlyRate}</span>
                </div>
                <p className="text-muted-foreground mt-2">per hour</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Daily Rate (8hrs)</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.dailyRate)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Weekly Rate</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.weeklyRate)}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Annual Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Working weeks</span>
                    <span className="font-medium">{52 - weeksOff[0]} weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total hours</span>
                    <span className="font-medium">{results.totalHours.toLocaleString()} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billable hours</span>
                    <span className="font-medium">{results.billableHours.toLocaleString()} hrs</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-muted-foreground">Target revenue</span>
                    <span className="font-bold text-primary">{formatCurrency(results.annualRevenue)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-3">Pricing Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Round up to a clean number (€75, €100, €150)</li>
                  <li>• Consider value-based pricing for high-impact projects</li>
                  <li>• Offer package deals for recurring work</li>
                  <li>• Review and raise your rates annually</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyRateCalculator;
