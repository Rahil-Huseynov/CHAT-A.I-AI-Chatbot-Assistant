import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, type Message } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";

interface ChatAreaProps {
  messages: Message[];
  isTyping?: boolean;
  onRegenerate?: () => void;
  onDeleteMessage?: (id: string) => void;
  onEditMessage?: (id: string, content: string) => void;
  editingMessageId?: string | null;
  setEditingMessageId?: (id: string | null) => void;
}

export function ChatArea({
  messages,
  isTyping,
  onRegenerate,
  onDeleteMessage,
  onEditMessage,
  editingMessageId,
  setEditingMessageId,
}: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

return (
    <ScrollArea className="flex-1 min-h-0 bg-[#F3F6FB] dark:bg-card">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] sm:h-[60vh] text-center px-4 animate-in fade-in duration-500">
            <div className="size-14 sm:size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 sm:mb-3 animate-in zoom-in duration-300">
              <span className="text-xl sm:text-lg font-bold text-primary">AI</span>
            </div>
            <h2 className="text-lg sm:text-base font-semibold text-foreground mb-2 sm:mb-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100">
              How can I help you today?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-xs max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-300 delay-200">
              Ask me anything - I can help with coding, writing, analysis, math,
              and much more.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLast={
                  index === messages.length - 1 && message.role === "assistant"
                }
                onRegenerate={onRegenerate}
                onDelete={onDeleteMessage}
                onEdit={onEditMessage}
                isEditing={editingMessageId === message.id}
                onStartEdit={() => setEditingMessageId?.(message.id)}
                onCancelEdit={() => setEditingMessageId?.(null)}
              />
            ))}
          </>
        )}

        {isTyping && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
