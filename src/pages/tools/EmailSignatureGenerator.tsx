import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Copy, Mail, Phone, Globe, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function EmailSignatureGenerator() {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    twitter: "",
  });
  const [template, setTemplate] = useState("modern");

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateHTML = () => {
    const styles = {
      modern: {
        container: "font-family: Arial, sans-serif; color: #333;",
        name: "font-size: 16px; font-weight: bold; color: #1a1a1a; margin: 0;",
        title: "font-size: 13px; color: #666; margin: 4px 0;",
        company: "font-size: 13px; color: #FF3D9A; font-weight: 600; margin: 4px 0;",
        divider: "border-top: 2px solid #FF3D9A; margin: 12px 0; width: 60px;",
        link: "color: #666; text-decoration: none; font-size: 12px;",
      },
      classic: {
        container: "font-family: Georgia, serif; color: #333;",
        name: "font-size: 16px; font-weight: bold; color: #1a1a1a; margin: 0;",
        title: "font-size: 13px; color: #555; margin: 4px 0; font-style: italic;",
        company: "font-size: 13px; color: #333; font-weight: 600; margin: 4px 0;",
        divider: "border-top: 1px solid #ccc; margin: 12px 0;",
        link: "color: #555; text-decoration: none; font-size: 12px;",
      },
      minimal: {
        container: "font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #333;",
        name: "font-size: 14px; font-weight: 600; color: #1a1a1a; margin: 0;",
        title: "font-size: 12px; color: #888; margin: 2px 0;",
        company: "font-size: 12px; color: #888; margin: 2px 0;",
        divider: "display: none;",
        link: "color: #888; text-decoration: none; font-size: 11px;",
      },
    };

    const s = styles[template as keyof typeof styles];

    return `
<table cellpadding="0" cellspacing="0" style="${s.container}">
  <tr>
    <td style="padding-right: 15px; vertical-align: top;">
      <p style="${s.name}">${formData.fullName || "Your Name"}</p>
      <p style="${s.title}">${formData.jobTitle || "Job Title"}</p>
      <p style="${s.company}">${formData.company || "Company Name"}</p>
      <div style="${s.divider}"></div>
      <table cellpadding="0" cellspacing="0">
        ${formData.email ? `<tr><td style="padding: 2px 0;"><a href="mailto:${formData.email}" style="${s.link}">${formData.email}</a></td></tr>` : ""}
        ${formData.phone ? `<tr><td style="padding: 2px 0;"><a href="tel:${formData.phone}" style="${s.link}">${formData.phone}</a></td></tr>` : ""}
        ${formData.website ? `<tr><td style="padding: 2px 0;"><a href="${formData.website}" style="${s.link}">${formData.website.replace(/^https?:\/\//, "")}</a></td></tr>` : ""}
      </table>
      ${formData.linkedin || formData.twitter ? `
      <table cellpadding="0" cellspacing="0" style="margin-top: 8px;">
        <tr>
          ${formData.linkedin ? `<td style="padding-right: 8px;"><a href="${formData.linkedin}" style="${s.link}">LinkedIn</a></td>` : ""}
          ${formData.twitter ? `<td><a href="${formData.twitter}" style="${s.link}">Twitter</a></td>` : ""}
        </tr>
      </table>` : ""}
    </td>
  </tr>
</table>`.trim();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateHTML());
    toast.success("Signature HTML copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/tools" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Link>

        <div className="w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Email Signature Generator</h1>
            <p className="text-muted-foreground">Create a professional email signature in seconds</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Details</CardTitle>
                <CardDescription>Fill in your information below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={(e) => handleChange("jobTitle", e.target.value)}
                      placeholder="Marketing Manager"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Acme Inc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="john@acme.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+353 1 234 5678"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="website"
                      className="pl-10"
                      value={formData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      placeholder="https://acme.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="linkedin"
                        className="pl-10"
                        value={formData.linkedin}
                        onChange={(e) => handleChange("linkedin", e.target.value)}
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="twitter"
                        className="pl-10"
                        value={formData.twitter}
                        onChange={(e) => handleChange("twitter", e.target.value)}
                        placeholder="https://twitter.com/johndoe"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Template Style</Label>
                  <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>How your signature will look</CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    className="bg-white p-4 rounded-sm border"
                    dangerouslySetInnerHTML={{ __html: generateHTML() }}
                  />
                </CardContent>
              </Card>

              <Button onClick={copyToClipboard} className="w-full" size="lg">
                <Copy className="w-4 h-4 mr-2" />
                Copy HTML to Clipboard
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Paste the HTML into your email client's signature settings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
