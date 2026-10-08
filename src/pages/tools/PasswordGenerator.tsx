import { useState, useCallback } from "react";
import { Link } from "@/lib/router-compat";
import { Key, Copy, Check, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GlowCard } from "@/components/ui/GlowCard";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      toast.error("Please select at least one character type");
      return;
    }

    let newPassword = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i]! % charset.length];
    }

    setPassword(newPassword);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = async () => {
    if (!password) {
      toast.error("Generate a password first");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast.success("Password copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy password");
    }
  };

  const getStrength = () => {
    if (!password) return { label: "Generate a password", color: "text-text-2", width: "0%" };
    
    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (password.length >= 20) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 3) return { label: "Weak", color: "text-red-500", width: "25%", bg: "bg-red-500" };
    if (score <= 5) return { label: "Medium", color: "text-yellow-500", width: "50%", bg: "bg-yellow-500" };
    if (score <= 6) return { label: "Strong", color: "text-green-500", width: "75%", bg: "bg-green-500" };
    return { label: "Very Strong", color: "text-accent-violet", width: "100%", bg: "bg-accent-violet" };
  };

  const strength = getStrength();

  // Generate on mount
  useState(() => {
    generatePassword();
  });

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
              <Key className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight mb-2">
              Password Generator
            </h1>
            <p className="text-text-2">Generate secure, random passwords instantly</p>
          </div>

          {/* Tool Interface */}
          <GlowCard glowColor="purple" customSize className="p-6 md:p-8">
            {/* Password Display */}
            <div className="mb-8">
              <div className="relative">
                <div className="bg-bg-1 border border-border-1 rounded-lg p-4 font-mono text-lg md:text-xl break-all min-h-[60px] flex items-center">
                  {password || "Click generate to create a password"}
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={copyToClipboard}
                    className="h-8 w-8"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={generatePassword}
                    className="h-8 w-8"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Strength Meter */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-2">Password Strength</span>
                  <span className={`text-sm font-medium ${strength.color}`}>{strength.label}</span>
                </div>
                <div className="h-2 bg-bg-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${strength.bg}`}
                    style={{ width: strength.width }}
                  />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <div>
                <Label className="text-text-1 font-medium mb-2 block">
                  Password Length: {length} characters
                </Label>
                <Slider
                  value={[length]}
                  onValueChange={(v) => {
                    setLength(v[0] ?? length);
                    setTimeout(generatePassword, 0);
                  }}
                  min={8}
                  max={64}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-bg-1 rounded-lg">
                  <Label htmlFor="uppercase" className="text-text-1 cursor-pointer">
                    Uppercase (A-Z)
                  </Label>
                  <Switch
                    id="uppercase"
                    checked={includeUppercase}
                    onCheckedChange={(v) => {
                      setIncludeUppercase(v);
                      setTimeout(generatePassword, 0);
                    }}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-bg-1 rounded-lg">
                  <Label htmlFor="lowercase" className="text-text-1 cursor-pointer">
                    Lowercase (a-z)
                  </Label>
                  <Switch
                    id="lowercase"
                    checked={includeLowercase}
                    onCheckedChange={(v) => {
                      setIncludeLowercase(v);
                      setTimeout(generatePassword, 0);
                    }}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-bg-1 rounded-lg">
                  <Label htmlFor="numbers" className="text-text-1 cursor-pointer">
                    Numbers (0-9)
                  </Label>
                  <Switch
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={(v) => {
                      setIncludeNumbers(v);
                      setTimeout(generatePassword, 0);
                    }}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-bg-1 rounded-lg">
                  <Label htmlFor="symbols" className="text-text-1 cursor-pointer">
                    Symbols (!@#$%)
                  </Label>
                  <Switch
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={(v) => {
                      setIncludeSymbols(v);
                      setTimeout(generatePassword, 0);
                    }}
                  />
                </div>
              </div>

              <Button
                onClick={generatePassword}
                className="w-full bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white font-gobold uppercase"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate New Password
              </Button>
            </div>
          </GlowCard>

          {/* Tips */}
          <div className="mt-8 p-6 bg-bg-1/50 rounded-xl border border-border-1">
            <h3 className="font-gobold uppercase text-text-1 mb-3">Password Tips</h3>
            <ul className="space-y-2 text-sm text-text-2">
              <li>• Use at least 16 characters for better security</li>
              <li>• Include a mix of letters, numbers, and symbols</li>
              <li>• Never reuse passwords across different accounts</li>
              <li>• Consider using a password manager to store your passwords</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-text-2 mb-4">Need help securing your website?</p>
            <Button asChild className="bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white font-gobold uppercase">
              <Link to="/contact">Get a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
