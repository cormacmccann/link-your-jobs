import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, AlertTriangle, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const SPAM_WORDS = [
  "free", "winner", "congratulations", "urgent", "act now", "limited time",
  "click here", "buy now", "order now", "don't delete", "this isn't spam",
  "100%", "guarantee", "no obligation", "risk free", "satisfaction guaranteed",
  "cash", "money", "income", "earn", "credit", "discount", "offer", "deal",
  "lowest price", "best price", "incredible", "amazing", "miracle", "revolutionary"
];

const EmailSubjectTester = () => {
  const [subject, setSubject] = useState("");

  const analysis = useMemo(() => {
    if (!subject) return null;

    const length = subject.length;
    const wordCount = subject.trim().split(/\s+/).length;
    const hasEmoji = /\p{Emoji}/u.test(subject);
    const emojiCount = (subject.match(/\p{Emoji}/gu) || []).length;
    const capsRatio = (subject.match(/[A-Z]/g) || []).length / subject.length;
    const hasNumbers = /\d/.test(subject);
    const hasQuestion = subject.includes("?");
    const hasPunctuation = /[!?.]$/.test(subject);
    
    const foundSpamWords = SPAM_WORDS.filter(word => 
      subject.toLowerCase().includes(word.toLowerCase())
    );

    const checks = [
      { 
        label: "Length (30-50 chars ideal)", 
        passed: length >= 30 && length <= 50,
        warning: length > 50 && length <= 60,
        value: `${length} characters`
      },
      { 
        label: "Word count (6-10 words ideal)", 
        passed: wordCount >= 6 && wordCount <= 10,
        warning: wordCount > 10 && wordCount <= 15,
        value: `${wordCount} words`
      },
      { 
        label: "No excessive caps (< 30%)", 
        passed: capsRatio < 0.3,
        warning: capsRatio >= 0.3 && capsRatio < 0.5,
        value: `${Math.round(capsRatio * 100)}% caps`
      },
      { 
        label: "Contains emoji (1-2 max)", 
        passed: emojiCount >= 1 && emojiCount <= 2,
        warning: emojiCount > 2,
        value: emojiCount > 0 ? `${emojiCount} emoji` : "No emoji"
      },
      { 
        label: "No spam trigger words", 
        passed: foundSpamWords.length === 0,
        warning: false,
        value: foundSpamWords.length > 0 ? `Found: ${foundSpamWords.slice(0, 3).join(", ")}` : "Clean"
      },
      { 
        label: "Personalization or question", 
        passed: hasQuestion || subject.includes("you"),
        warning: false,
        value: hasQuestion ? "Has question" : subject.includes("you") ? "Uses 'you'" : "No personalization"
      },
    ];

    const passedCount = checks.filter(c => c.passed).length;
    const warningCount = checks.filter(c => c.warning).length;
    const score = Math.round(((passedCount * 2 + (checks.length - passedCount - warningCount)) / (checks.length * 2)) * 100);

    let rating = "Poor";
    if (score >= 80) rating = "Excellent";
    else if (score >= 60) rating = "Good";
    else if (score >= 40) rating = "Fair";

    return { checks, score, rating, foundSpamWords, hasEmoji, emojiCount };
  }, [subject]);

  const previewSubjects = [
    { platform: "Gmail", maxLength: 70 },
    { platform: "iPhone", maxLength: 35 },
    { platform: "Android", maxLength: 40 },
    { platform: "Outlook", maxLength: 60 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/tools" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Email Subject Line Tester</h1>
          <p className="text-muted-foreground">Optimize your email subject lines for better open rates</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter your email subject line..."
              className="text-lg"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {subject.length} characters
            </p>
          </CardContent>
        </Card>

        {analysis && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Score</h3>
                    <Badge variant={analysis.score >= 80 ? "default" : analysis.score >= 60 ? "secondary" : "destructive"}>
                      {analysis.rating}
                    </Badge>
                  </div>
                  <Progress value={analysis.score} className="h-3 mb-2" />
                  <p className="text-sm text-muted-foreground text-right">{analysis.score}/100</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Analysis</h3>
                  <div className="space-y-3">
                    {analysis.checks.map((check, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          check.passed ? "bg-green-500/20 text-green-500" : 
                          check.warning ? "bg-yellow-500/20 text-yellow-500" : 
                          "bg-red-500/20 text-red-500"
                        }`}>
                          {check.passed ? <Check className="h-3 w-3" /> : 
                           check.warning ? <AlertTriangle className="h-3 w-3" /> : 
                           <X className="h-3 w-3" />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${check.passed ? "text-foreground" : "text-muted-foreground"}`}>
                            {check.label}
                          </p>
                          <p className="text-xs text-muted-foreground">{check.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {analysis.foundSpamWords.length > 0 && (
                <Card className="border-red-500/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium text-red-500">Spam Trigger Words Detected</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysis.foundSpamWords.map((word, index) => (
                        <Badge key={index} variant="destructive">{word}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      These words may trigger spam filters. Consider using alternatives.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Preview on Different Platforms</h3>
                <div className="space-y-4">
                  {previewSubjects.map((platform) => (
                    <div key={platform.platform} className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">{platform.platform}</p>
                      <p className="text-sm font-medium truncate" style={{ maxWidth: `${platform.maxLength}ch` }}>
                        {subject.length > platform.maxLength 
                          ? subject.slice(0, platform.maxLength - 3) + "..."
                          : subject}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Tips for Better Open Rates</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Create urgency without being spammy</li>
                    <li>• Use numbers when possible (e.g., "5 tips")</li>
                    <li>• Personalize with the recipient's name</li>
                    <li>• Ask questions to pique curiosity</li>
                    <li>• A/B test your subject lines</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailSubjectTester;
