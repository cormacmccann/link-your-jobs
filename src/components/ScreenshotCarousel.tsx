import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ScreenshotCarouselProps {
  screenshots: string[];
  className?: string;
  interval?: number;
}

export function ScreenshotCarousel({ 
  screenshots, 
  className,
  interval = 3000 
}: ScreenshotCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (screenshots.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, interval);

    return () => clearInterval(timer);
  }, [screenshots.length, interval]);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {screenshots.map((screenshot, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={screenshot}
            alt={`Screenshot ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {screenshots.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex 
                  ? "bg-white w-6" 
                  : "bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to screenshot ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
