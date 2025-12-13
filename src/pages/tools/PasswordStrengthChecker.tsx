import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Eye, EyeOff, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PasswordCheck {
  label: string;
  passed: boolean;
}

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo(() => {
    const checks: PasswordCheck[] = [
      { label: "At least 8 characters", passed: password.length >= 8 },
      { label: "At least 12 characters (recommended)", passed: password.length >= 12 },
      { label: "Contains uppercase letter", passed: /[A-Z]/.test(password) },
      { label: "Contains lowercase letter", passed: /[a-z]/.test(password) },
      { label: "Contains number", passed: /[0-9]/.test(password) },
      { label: "Contains special character (!@#$%^&*)", passed: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
      { label: "No common patterns (123, abc, qwerty)", passed: !/123|abc|qwerty|password|admin/i.test(password) },
      { label: "No repeated characters (aaa, 111)", passed: !/(.)\1{2,}/.test(password) },
    ];

    const passedCount = checks.filter(c => c.passed).length;
    const score = Math.round((passedCount / checks.length) * 100);

    let strength: "weak" | "fair" | "good" | "strong" = "weak";
    let strengthColor = "bg-red-500";
    let strengthLabel = "Weak";

    if (score >= 90) {
      strength = "strong";
      strengthColor = "bg-green-500";
      strengthLabel = "Strong";
    } else if (score >= 70) {
      strength = "good";
      strengthColor = "bg-blue-500";
      strengthLabel = "Good";
    } else if (score >= 50) {
      strength = "fair";
      strengthColor = "bg-yellow-500";
      strengthLabel = "Fair";
    }

    // Estimate crack time
    let crackTime = "Instantly";
    if (password.length >= 16 && passedCount >= 7) {
      crackTime = "Centuries";
    } else if (password.length >= 12 && passedCount >= 6) {
      crackTime = "Years";
    } else if (password.length >= 10 && passedCount >= 5) {
      crackTime = "Months";
    } else if (password.length >= 8 && passedCount >= 4) {
      crackTime = "Days";
    } else if (password.length >= 6) {
      crackTime = "Hours";
    }

    return { checks, score, strength, strengthColor, strengthLabel, crackTime };
  }, [password]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/tools" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Password Strength Checker</h1>
          <p className="text-muted-foreground">Test how secure your password is</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password to test..."
                className="text-lg pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {password && (
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Strength: {analysis.strengthLabel}</span>
                    <span className="text-sm text-muted-foreground">{analysis.score}%</span>
                  </div>
                  <Progress value={analysis.score} className="h-3" />
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Estimated time to crack:</p>
                  <p className="text-2xl font-bold">{analysis.crackTime}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {password && (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Security Checklist</h3>
              <div className="space-y-3">
                {analysis.checks.map((check, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      check.passed ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}>
                      {check.passed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    </div>
                    <span className={`text-sm ${check.passed ? "text-foreground" : "text-muted-foreground"}`}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Your password is checked locally and never sent to any server.
        </p>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
