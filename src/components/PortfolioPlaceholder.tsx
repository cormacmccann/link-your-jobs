import { Building2 } from "lucide-react";

interface PortfolioPlaceholderProps {
  clientName: string;
  className?: string;
}

export const PortfolioPlaceholder = ({ clientName, className = "" }: PortfolioPlaceholderProps) => {
  // Generate a consistent color based on the client name
  const getGradientColors = (name: string) => {
    const colors = [
      ['from-accent-pink', 'to-accent-violet'],
      ['from-accent-violet', 'to-accent-blue'],
      ['from-accent-cyan', 'to-accent-pink'],
      ['from-accent-blue', 'to-accent-violet'],
      ['from-accent-violet', 'to-accent-cyan'],
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const [fromColor, toColor] = getGradientColors(clientName);
  const initials = getInitials(clientName);

  return (
    <div className={`relative flex items-center justify-center bg-gradient-to-br ${fromColor} ${toColor} ${className}`}>
      <div className="absolute inset-0 bg-grid-white/5" />
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 p-8">
        <Building2 className="w-16 h-16 text-white/80" />
        <div className="text-6xl font-gobold text-white/90 tracking-tight">
          {initials}
        </div>
      </div>
    </div>
  );
};
