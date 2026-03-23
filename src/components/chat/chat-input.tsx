import { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div className="px-3 pb-4 pt-1.5 bg-[#F3F6FB] dark:bg-card">
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <div className="relative flex items-center bg-card rounded-full shadow-sm border border-border/30 overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 gap-2">
          <div className="absolute left-1 top-1 flex items-center pointer-events-none">
            <img src="/brain.png" alt="brain" width={30} />
          </div>

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="What's in your mind?..."
            className={cn(
              "flex-1 py-2.5 pl-9 pr-11 bg-transparent text-xs text-foreground",
              "placeholder:text-muted-foreground/60 resize-none outline-none",
              "min-h-[36px] max-h-[96px]"
            )}
            rows={1}
            disabled={disabled}
          />

          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || disabled}
            className={cn(
              "absolute right-1.5 size-8 rounded-full transition-all duration-200",
              "bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95 text-primary-foreground",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
          >
            <Send className="size-3" />
          </Button>
        </div>
      </form>
    </div>
  );
}
