import { Star } from "lucide-react";

export function UpgradeBadge() {
  return (
    <>
      {/* Desktop - vertical badge on right side */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <button className="flex flex-col items-center gap-1.5 bg-primary text-primary-foreground px-1.5 py-3 rounded-l-lg shadow-lg hover:bg-primary/90 transition-colors group">
          <span
            className="text-[10px] font-semibold whitespace-nowrap tracking-wide"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Upgrade to Pro
          </span>
          <Star className="size-3 fill-yellow-400 text-yellow-400 group-hover:animate-pulse" />
        </button>
      </div>
      
      {/* Mobile - horizontal badge at bottom */}
      <div className="fixed bottom-20 right-3 z-30 lg:hidden">
        <button className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors group">
          <Star className="size-3.5 fill-yellow-400 text-yellow-400 group-hover:animate-pulse" />
          <span className="text-xs font-semibold whitespace-nowrap tracking-wide">
            Upgrade
          </span>
        </button>
      </div>
    </>
  );
}
