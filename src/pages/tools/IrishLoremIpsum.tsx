import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, Beer, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const IRISH_WORDS = [
  "craic", "sláinte", "céad míle fáilte", "grand", "feck", "eejit", "gobshite", 
  "banjaxed", "gombeen", "dosser", "gurrier", "yer man", "yer one", "arrah",
  "yoke", "deadly", "savage", "mighty", "fierce", "gas", "brilliant", "lovely",
  "ah sure", "c'mere", "howya", "what's the story", "g'wan", "stop the lights"
];

const PUB_NAMES = [
  "The Brazen Head", "O'Donoghue's", "The Temple Bar", "Mulligan's", 
  "The Long Hall", "Kehoe's", "Grogan's", "Toner's", "The Stag's Head",
  "The Cobblestone", "McDaid's", "Neary's", "The Palace Bar", "Doheny & Nesbitt's",
  "The Gravediggers", "Mary's Bar", "The Bleeding Horse", "The Hairy Lemon"
];

const COUNTIES = [
  "Dublin", "Cork", "Galway", "Kerry", "Clare", "Mayo", "Donegal", "Wicklow",
  "Kilkenny", "Waterford", "Limerick", "Sligo", "Tipperary", "Wexford", "Meath",
  "Kildare", "Louth", "Roscommon", "Offaly", "Westmeath", "Laois", "Longford",
  "Cavan", "Monaghan", "Leitrim", "Carlow", "Fermanagh", "Tyrone", "Antrim", "Down", "Armagh", "Derry"
];

const PHRASES = [
  "Sure look it, that's the way it is.",
  "Ah, he's only havin' the craic.",
  "The weather's been fierce mild altogether.",
  "I'll meet you down the pub for a few scoops.",
  "He's absolutely langers, so he is.",
  "That's a grand soft day, thank God.",
  "She's away with the fairies, that one.",
  "Don't be acting the maggot now.",
  "I haven't a notion what you're on about.",
  "The session was mighty last night.",
  "He'd talk the hind legs off a donkey.",
  "We were locked out of our minds.",
  "That fella's a few sandwiches short of a picnic.",
  "I'm absolutely gasping for a cup of tea.",
  "Would you ever stop your messing.",
  "Jaysus, Mary and Joseph!",
  "That's the real deal altogether.",
  "We'll say nothing and keep schtum.",
  "You'd be hard pressed to find better.",
  "Fair play to ya, lad."
];

const IrishLoremIpsum = () => {
  const [paragraphs, setParagraphs] = useState([3]);
  const [style, setStyle] = useState<"mixed" | "pubs" | "counties" | "phrases">("mixed");
  const [generatedText, setGeneratedText] = useState("");
  const [copied, setCopied] = useState(false);

  const generateSentence = (styleType: string): string => {
    const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    
    switch (styleType) {
      case "pubs":
        return `Down at ${rand(PUB_NAMES)} in ${rand(COUNTIES)}, the ${rand(IRISH_WORDS)} was ${rand(["mighty", "deadly", "savage", "fierce good"])}. ${rand(PHRASES)}`;
      case "counties":
        return `The folks from ${rand(COUNTIES)} are known for their ${rand(IRISH_WORDS)}. When you visit ${rand(COUNTIES)}, don't forget to check out ${rand(PUB_NAMES)}. ${rand(PHRASES)}`;
      case "phrases":
        return `${rand(PHRASES)} ${rand(PHRASES)} ${rand(PHRASES)}`;
      default:
        const templates = [
          `${rand(PHRASES)} Down at ${rand(PUB_NAMES)}, ${rand(["yer man", "yer one", "himself"])} was saying the ${rand(IRISH_WORDS)} in ${rand(COUNTIES)} is ${rand(["mighty", "deadly", "savage"])}.`,
          `Ah sure, ${rand(IRISH_WORDS)}! I was at ${rand(PUB_NAMES)} last week and ${rand(PHRASES).toLowerCase()}`,
          `The ${rand(IRISH_WORDS)} in ${rand(COUNTIES)} is ${rand(["grand", "lovely", "brilliant"])}. ${rand(PHRASES)}`,
          `${rand(PHRASES)} I met ${rand(["yer man", "yer one", "a lad"])} from ${rand(COUNTIES)} at ${rand(PUB_NAMES)} and we had a right ${rand(["session", "time", "laugh"])}.`
        ];
        return rand(templates);
    }
  };

  const generateParagraph = (styleType: string): string => {
    const sentenceCount = 3 + Math.floor(Math.random() * 3);
    return Array(sentenceCount).fill(null).map(() => generateSentence(styleType)).join(" ");
  };

  const generate = () => {
    const text = Array(paragraphs[0])
      .fill(null)
      .map(() => generateParagraph(style))
      .join("\n\n");
    setGeneratedText(text);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/tools" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 mb-4">
            <Beer className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Irish Lorem Ipsum 🍀</h1>
          <p className="text-muted-foreground">Placeholder text with a bit of craic</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label className="mb-4 block">Paragraphs: {paragraphs[0]}</Label>
                <Slider
                  value={paragraphs}
                  onValueChange={setParagraphs}
                  min={1}
                  max={10}
                  step={1}
                />
              </div>

              <div>
                <Label className="mb-4 block">Style</Label>
                <RadioGroup value={style} onValueChange={(v) => setStyle(v as typeof style)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mixed" id="mixed" />
                    <Label htmlFor="mixed">Mixed (Pubs, Counties & Phrases)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pubs" id="pubs" />
                    <Label htmlFor="pubs">Pub Focus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="counties" id="counties" />
                    <Label htmlFor="counties">County Focus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phrases" id="phrases" />
                    <Label htmlFor="phrases">Phrases Only</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button onClick={generate} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Lorem Ipsum
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Generated Text</h3>
                {generatedText && (
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
              <div className="min-h-[300px] p-4 bg-muted/50 rounded-lg text-sm leading-relaxed whitespace-pre-wrap">
                {generatedText || (
                  <span className="text-muted-foreground italic">
                    Click "Generate Lorem Ipsum" to create some Irish placeholder text, sure look it.
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IrishLoremIpsum;
