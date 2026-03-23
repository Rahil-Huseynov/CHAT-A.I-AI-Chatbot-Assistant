import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 py-3 animate-in fade-in duration-300">
      <div className="flex-1">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs font-semibold text-foreground ">
            CHAT A.I +
          </span>
          <div className="size-3 rounded-full bg-primary/20 flex items-center justify-center">
            <Check className="size-2 text-primary" />
          </div>
        </div>

        <div className="flex items-center gap-1 py-1.5">
          <div
            className={cn(
              "size-1.5 rounded-full bg-primary/60",
              "animate-bounce [animation-delay:0ms]"
            )}
          />
          <div
            className={cn(
              "size-1.5 rounded-full bg-primary/60",
              "animate-bounce [animation-delay:150ms]"
            )}
          />
          <div
            className={cn(
              "size-1.5 rounded-full bg-primary/60",
              "animate-bounce [animation-delay:300ms]"
            )}
          />
        </div>
      </div>
    </div>
  );
}
