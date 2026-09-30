import { useState } from "react";
import { Link } from "react-router-dom";
import { Percent, ArrowLeft, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlowCard } from "@/components/ui/GlowCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VATCalculator = () => {
  const [amount, setAmount] = useState<string>("100");
  const [vatRate, setVatRate] = useState<string>("23");
  const [mode, setMode] = useState<"addVat" | "removeVat">("addVat");

  const vatRates = [
    { value: "23", label: "Ireland Standard (23%)" },
    { value: "13.5", label: "Ireland Reduced (13.5%)" },
    { value: "9", label: "Ireland Second Reduced (9%)" },
    { value: "4.8", label: "Ireland Livestock (4.8%)" },
    { value: "0", label: "Zero Rate (0%)" },
    { value: "20", label: "UK Standard (20%)" },
    { value: "5", label: "UK Reduced (5%)" },
  ];

  const numAmount = parseFloat(amount) || 0;
  const numVatRate = parseFloat(vatRate) || 0;

  const calculateVat = () => {
    if (mode === "addVat") {
      const vatAmount = numAmount * (numVatRate / 100);
      const grossAmount = numAmount + vatAmount;
      return {
        netAmount: numAmount,
        vatAmount,
        grossAmount,
      };
    } else {
      const netAmount = numAmount / (1 + numVatRate / 100);
      const vatAmount = numAmount - netAmount;
      return {
        netAmount,
        vatAmount,
        grossAmount: numAmount,
      };
    }
  };

  const result = calculateVat();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      <div className="pt-10 pb-8 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Back Link */}
          <Link to="/tools" className="inline-flex items-center gap-2 text-text-2 hover:text-accent-violet transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tools</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
              <Percent className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight mb-2">
              VAT Calculator
            </h1>
            <p className="text-text-2">Calculate VAT for Ireland & UK rates instantly</p>
          </div>

          {/* Tool Interface */}
          <GlowCard glowColor="purple" customSize className="p-6 md:p-8">
            <Tabs value={mode} onValueChange={(v) => setMode(v as "addVat" | "removeVat")} className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-6">
                <TabsTrigger value="addVat" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-pink data-[state=active]:to-accent-violet data-[state=active]:text-white">
                  Add VAT
                </TabsTrigger>
                <TabsTrigger value="removeVat" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent-pink data-[state=active]:to-accent-violet data-[state=active]:text-white">
                  Remove VAT
                </TabsTrigger>
              </TabsList>

              <TabsContent value="addVat" className="space-y-6">
                <div>
                  <Label className="text-text-1 font-medium mb-2 block">
                    Net Amount (Excluding VAT)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-2">€</span>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="100.00"
                      className="pl-8 bg-bg-1 border-border-1 text-lg"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="removeVat" className="space-y-6">
                <div>
                  <Label className="text-text-1 font-medium mb-2 block">
                    Gross Amount (Including VAT)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-2">€</span>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="123.00"
                      className="pl-8 bg-bg-1 border-border-1 text-lg"
                    />
                  </div>
                </div>
              </TabsContent>

              <div className="mt-6">
                <Label className="text-text-1 font-medium mb-2 block">VAT Rate</Label>
                <Select value={vatRate} onValueChange={setVatRate}>
                  <SelectTrigger className="bg-bg-1 border-border-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {vatRates.map((rate) => (
                      <SelectItem key={rate.value} value={rate.value}>
                        {rate.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Tabs>

            {/* Results */}
            <div className="mt-8 pt-8 border-t border-border-1">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-bg-1 rounded-lg text-center">
                  <p className="text-sm text-text-2 mb-1">Net Amount</p>
                  <p className="text-2xl font-gobold text-text-1">
                    {formatCurrency(result.netAmount)}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-accent-pink/20 to-accent-violet/20 rounded-lg text-center">
                  <p className="text-sm text-text-2 mb-1">VAT ({vatRate}%)</p>
                  <p className="text-2xl font-gobold text-accent-pink">
                    {formatCurrency(result.vatAmount)}
                  </p>
                </div>
                <div className="p-4 bg-accent-violet/10 rounded-lg text-center">
                  <p className="text-sm text-text-2 mb-1">Gross Amount</p>
                  <p className="text-2xl font-gobold text-accent-violet">
                    {formatCurrency(result.grossAmount)}
                  </p>
                </div>
              </div>

              {/* Quick Switch */}
              <Button
                variant="outline"
                onClick={() => setMode(mode === "addVat" ? "removeVat" : "addVat")}
                className="w-full mt-4 border-border-1"
              >
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Switch to {mode === "addVat" ? "Remove" : "Add"} VAT
              </Button>
            </div>
          </GlowCard>

          {/* VAT Info */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="p-6 bg-bg-1/50 rounded-xl border border-border-1">
              <h3 className="font-gobold uppercase text-text-1 mb-3">🇮🇪 Ireland VAT Rates</h3>
              <ul className="space-y-2 text-sm text-text-2">
                <li><strong className="text-text-1">23%</strong> - Standard rate (most goods & services)</li>
                <li><strong className="text-text-1">13.5%</strong> - Reduced rate (fuel, construction)</li>
                <li><strong className="text-text-1">9%</strong> - Second reduced (hospitality, newspapers)</li>
                <li><strong className="text-text-1">4.8%</strong> - Livestock rate</li>
                <li><strong className="text-text-1">0%</strong> - Zero rate (food, children's clothing)</li>
              </ul>
            </div>
            <div className="p-6 bg-bg-1/50 rounded-xl border border-border-1">
              <h3 className="font-gobold uppercase text-text-1 mb-3">🇬🇧 UK VAT Rates</h3>
              <ul className="space-y-2 text-sm text-text-2">
                <li><strong className="text-text-1">20%</strong> - Standard rate (most goods & services)</li>
                <li><strong className="text-text-1">5%</strong> - Reduced rate (energy, child car seats)</li>
                <li><strong className="text-text-1">0%</strong> - Zero rate (food, books, children's clothes)</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-text-2 mb-4">Need an invoicing solution for your business?</p>
            <Button asChild className="bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white font-gobold uppercase">
              <Link to="/contact">Get a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VATCalculator;
