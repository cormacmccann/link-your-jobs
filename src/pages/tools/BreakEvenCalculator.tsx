import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const BreakEvenCalculator = () => {
  const [fixedCosts, setFixedCosts] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const results = useMemo(() => {
    const fixed = parseFloat(fixedCosts) || 0;
    const variable = parseFloat(variableCost) || 0;
    const price = parseFloat(sellingPrice) || 0;

    if (price <= variable || !fixed) {
      return null;
    }

    const contributionMargin = price - variable;
    const contributionMarginRatio = (contributionMargin / price) * 100;
    const breakEvenUnits = Math.ceil(fixed / contributionMargin);
    const breakEvenRevenue = breakEvenUnits * price;

    // Calculate profit at different volumes
    const volumes = [
      { units: breakEvenUnits, label: "Break-even" },
      { units: Math.ceil(breakEvenUnits * 1.25), label: "+25% units" },
      { units: Math.ceil(breakEvenUnits * 1.5), label: "+50% units" },
      { units: Math.ceil(breakEvenUnits * 2), label: "+100% units" },
    ].map(v => ({
      ...v,
      revenue: v.units * price,
      totalCosts: fixed + (v.units * variable),
      profit: (v.units * price) - fixed - (v.units * variable)
    }));

    return {
      breakEvenUnits,
      breakEvenRevenue,
      contributionMargin,
      contributionMarginRatio,
      volumes
    };
  }, [fixedCosts, variableCost, sellingPrice]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR'
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
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Break-Even Calculator</h1>
          <p className="text-muted-foreground">Calculate how many units you need to sell to cover costs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="fixed" className="mb-2 block">Fixed Costs (€)</Label>
                <Input
                  id="fixed"
                  type="number"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(e.target.value)}
                  placeholder="e.g., 5000"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Rent, salaries, insurance, etc.
                </p>
              </div>

              <div>
                <Label htmlFor="variable" className="mb-2 block">Variable Cost per Unit (€)</Label>
                <Input
                  id="variable"
                  type="number"
                  value={variableCost}
                  onChange={(e) => setVariableCost(e.target.value)}
                  placeholder="e.g., 15"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Materials, shipping, production cost per unit
                </p>
              </div>

              <div>
                <Label htmlFor="price" className="mb-2 block">Selling Price per Unit (€)</Label>
                <Input
                  id="price"
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  placeholder="e.g., 50"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  What you charge customers per unit
                </p>
              </div>

              {parseFloat(sellingPrice) > 0 && parseFloat(sellingPrice) <= parseFloat(variableCost) && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-500">
                    Selling price must be greater than variable cost per unit
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {results && (
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Break-Even Point</p>
                  <p className="text-4xl font-bold text-primary mb-1">
                    {results.breakEvenUnits.toLocaleString()} units
                  </p>
                  <p className="text-lg text-muted-foreground">
                    {formatCurrency(results.breakEvenRevenue)} in revenue
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Contribution Margin</p>
                      <p className="text-xl font-semibold">{formatCurrency(results.contributionMargin)}</p>
                      <p className="text-xs text-muted-foreground">per unit</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">CM Ratio</p>
                      <p className="text-xl font-semibold">{results.contributionMarginRatio.toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground">of revenue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Profit at Different Volumes</h3>
                  <div className="space-y-3">
                    {results.volumes.map((v, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{v.units.toLocaleString()} units</p>
                          <p className="text-xs text-muted-foreground">{v.label}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${v.profit > 0 ? "text-green-500" : v.profit < 0 ? "text-red-500" : ""}`}>
                            {formatCurrency(v.profit)}
                          </p>
                          <p className="text-xs text-muted-foreground">profit</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="font-medium mb-3">Understanding Break-Even</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Break-even point</strong> is where total revenue equals total costs — no profit, no loss.
              </p>
              <p>
                <strong>Contribution margin</strong> is the selling price minus variable costs. This amount "contributes" to covering fixed costs and generating profit.
              </p>
              <p>
                <strong>Formula:</strong> Break-Even Units = Fixed Costs ÷ (Selling Price - Variable Cost per Unit)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BreakEvenCalculator;
