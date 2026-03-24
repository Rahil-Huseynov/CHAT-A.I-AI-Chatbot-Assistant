import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Check,
  Edit2,
  MoreVertical,
  Trash2,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
  onRegenerate?: () => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, content: string) => void;
  isEditing?: boolean;
  onStartEdit?: () => void;
  onCancelEdit?: () => void;
}

export function ChatMessage({
  message,
  isLast,
  onRegenerate,
  onDelete,
  onEdit,
  isEditing,
  onStartEdit,
  onCancelEdit,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<"up" | "down" | null>(null);
  const [editContent, setEditContent] = useState(message.content);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    if (editContent.trim() && onEdit) {
      onEdit(message.id, editContent.trim());
    }
  };

  const handleCancelEdit = () => {
    setEditContent(message.content);
    onCancelEdit?.();
  };

  const isUser = message.role === "user";

  if (isUser) {
    if (isEditing) {
      return (
        <div className="flex items-start gap-2 py-3 justify-end animate-in fade-in duration-200">
          <div className="flex items-start gap-2 max-w-[90%] sm:max-w-[85%] w-full">
            <div className="flex-1 flex flex-col items-end">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2.5 sm:p-2 text-sm sm:text-xs bg-muted rounded-lg border border-primary/30 outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                rows={3}
                autoFocus
              />
              <div className="flex gap-2 sm:gap-1.5 mt-2 sm:mt-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="h-8 sm:h-6 px-3 sm:px-2 text-sm sm:text-xs"
                >
                  <X className="size-4 sm:size-3 mr-1 sm:mr-0.5" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  className="h-8 sm:h-6 px-3 sm:px-2 text-sm sm:text-xs"
                >
                  <Check className="size-4 sm:size-3 mr-1 sm:mr-0.5" />
                  Save
                </Button>
              </div>
            </div>
            <Avatar className="size-6 sm:size-5 shrink-0 mt-0.5">
              <AvatarImage src="/avatar.jpg" alt="User" />
              <AvatarFallback className="bg-orange-100 text-orange-600 text-[10px] font-medium">
                AN
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-start gap-2 py-3 justify-end animate-in fade-in slide-in-from-right-2 duration-300 group">
        <div className="flex items-start gap-2 max-w-[90%] sm:max-w-[85%]">
          <div className="flex flex-col items-end">
            <div className="text-sm sm:text-xs text-foreground leading-relaxed break-words">
              {message.content}
            </div>
          </div>
          <Avatar className="size-6 sm:size-5 shrink-0 mt-0.5">
            <AvatarImage src="/avatar.jpg" alt="User" />
            <AvatarFallback className="bg-orange-100 text-orange-600 text-[10px] font-medium">
              AN
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center gap-1 sm:gap-0.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 sm:size-5 text-muted-foreground hover:text-foreground"
            onClick={onStartEdit}
          >
            <Edit2 className="size-4 sm:size-3" />
          </Button>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="size-7 sm:size-5 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(message.id)}
            >
              <Trash2 className="size-4 sm:size-3" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 py-3 animate-in fade-in slide-in-from-left-2 duration-300 group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-sm sm:text-xs font-semibold text-foreground">
            CHAT A.I +
          </span>
          <div className="size-4 sm:size-3 rounded-full bg-primary/20 flex items-center justify-center">
            <Check className="size-2.5 sm:size-2 text-primary" />
          </div>
        </div>

        <div className="text-sm sm:text-xs leading-relaxed text-foreground break-words">
          <MessageContent content={message.content} />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2 pt-3 mt-2">
          <div className="flex items-center gap-0">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "size-8 sm:size-6 rounded-md",
                liked === "up"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              onClick={() => setLiked(liked === "up" ? null : "up")}
            >
              <ThumbsUp className="size-4 sm:size-3" />
            </Button>
            <div className="w-px h-3 bg-border mx-0.5" />
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "size-8 sm:size-6 rounded-md",
                liked === "down"
                  ? "text-destructive bg-destructive/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              onClick={() => setLiked(liked === "down" ? null : "down")}
            >
              <ThumbsDown className="size-4 sm:size-3" />
            </Button>
            <div className="w-px h-3 bg-border mx-0.5" />
            <Button
              variant="ghost"
              size="icon"
              className="size-8 sm:size-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="size-4 sm:size-3" />
              ) : (
                <Copy className="size-4 sm:size-3" />
              )}
            </Button>
            <div className="w-px h-3 bg-border mx-0.5" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 sm:size-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <MoreVertical className="size-4 sm:size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={handleCopy} className="text-sm sm:text-xs">
                  <Copy className="size-4 sm:size-3 mr-1.5" />
                  Copy
                </DropdownMenuItem>
                {onDelete && (
                  <DropdownMenuItem
                    onClick={() => onDelete(message.id)}
                    className="text-destructive text-sm sm:text-xs"
                  >
                    <Trash2 className="size-4 sm:size-3 mr-1.5" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isLast && onRegenerate && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 sm:h-6 text-sm sm:text-xs text-muted-foreground hover:text-foreground hover:bg-muted gap-1.5 px-3 sm:px-2"
              onClick={onRegenerate}
            >
              <RefreshCw className="size-4 sm:size-3" />
              Regenerate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-2.5">
      {lines.map((line, index) => {
        const listMatch = line.match(/^(\d+)\.\s*\*\*([^*]+)\*\*:?\s*(.*)/);
        if (listMatch) {
          const [, num, title, description] = listMatch;
          return (
            <div key={index} className="flex gap-1.5">
              <span className="font-medium shrink-0">{num}.</span>
              <div>
                <span className="font-semibold">{title}:</span>{" "}
                <span className="text-foreground/80">{description}</span>
              </div>
            </div>
          );
        }

        if (line.trim()) {
          return (
            <p key={index} className="text-foreground">
              {line}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}
