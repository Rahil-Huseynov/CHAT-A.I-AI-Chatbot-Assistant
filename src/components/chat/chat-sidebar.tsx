import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  MessageCircle,
  Settings,
  X,
  Edit2,
  Trash2,
  Moon,
  Sun,
  Check,
} from "lucide-react";
import type { Conversation } from "@/App";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onClearAll: () => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onClearAll,
  onDeleteConversation,
  onRenameConversation,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const recentConversations = filteredConversations.filter(
    (c) => c.createdAt >= sevenDaysAgo
  );
  const olderConversations = filteredConversations.filter(
    (c) => c.createdAt < sevenDaysAgo
  );

  const handleStartEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const handleSaveEdit = (id: string) => {
    if (editTitle.trim()) {
      onRenameConversation(id, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed lg:relative z-50 flex flex-col h-dvh lg:h-[calc(100%-16px)] w-[260px] sm:w-[220px] transition-transform duration-300 ease-in-out rounded-r-2xl lg:rounded-2xl lg:m-2",
          "bg-white dark:bg-[#0D111B]",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-3 pb-2.5">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-sm font-bold tracking-wide text-sidebar-foreground">
              CHAT A.I+
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden size-8"
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="flex gap-1.5">
            <Button
              onClick={onNewChat}
              className="flex-1 bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] text-primary-foreground rounded-full h-8 text-xs font-medium gap-1.5 transition-all duration-200"
            >
              <Plus className="size-3" />
              New chat
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="group rounded-full size-8 bg-black hover:bg-card/80 hover:scale-105 active:scale-95 border-0 shadow-sm transition-all duration-200"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="size-3 stroke-white group-hover:stroke-black transition-all duration-200" />
            </Button>
          </div>

          {searchOpen && (
            <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-card rounded-full border-0 shadow-sm outline-none focus:ring-2 focus:ring-primary/20"
                autoFocus
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-3 mb-1.5 py-2 border-y border-[#E5E7EB]">
          <span className="text-[10px] text-muted-foreground font-medium">
            Your conversations
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClearAll();
            }}
            className="text-[10px] text-primary hover:underline font-medium z-10"
          >
            Clear All
          </button>
        </div>

        <ScrollArea className="flex-1 pl-2 -mr-6">
          <div className="space-y-0.5">
            {recentConversations.length === 0 &&
              olderConversations.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground text-xs">
                No conversations yet
              </div>
            ) : (
              <>
                {recentConversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={activeConversationId === conversation.id}
                    isEditing={editingId === conversation.id}
                    editTitle={editTitle}
                    onEditTitleChange={setEditTitle}
                    onClick={() => onSelectConversation(conversation.id)}
                    onDelete={() => onDeleteConversation(conversation.id)}
                    onStartEdit={() =>
                      handleStartEdit(conversation.id, conversation.title)
                    }
                    onSaveEdit={() => handleSaveEdit(conversation.id)}
                    onCancelEdit={() => setEditingId(null)}
                    isOpen={isOpen}
                    onClose={onClose}
                  />
                ))}

                {olderConversations.length > 0 && (
                  <>
                    <div className="pt-3 pb-1.5 px-1.5">
                      <span className="text-[10px] text-muted-foreground/70 font-medium">
                        Last 7 Days
                      </span>
                    </div>

                    {olderConversations.map((conversation) => (
                      <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        isActive={activeConversationId === conversation.id}
                        isEditing={editingId === conversation.id}
                        editTitle={editTitle}
                        onEditTitleChange={setEditTitle}
                        onClick={() => onSelectConversation(conversation.id)}
                        onDelete={() => onDeleteConversation(conversation.id)}
                        onStartEdit={() =>
                          handleStartEdit(conversation.id, conversation.title)
                        }
                        onSaveEdit={() => handleSaveEdit(conversation.id)}
                        onCancelEdit={() => setEditingId(null)}
                        isOlder
                        isOpen={isOpen}
                        onClose={onClose}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </ScrollArea>

        <div className="p-2 space-y-1.5">
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 w-full p-2 rounded-lg bg-card hover:bg-card/80 transition-colors shadow-sm">
                <Settings className="size-3 text-muted-foreground" />
                <span className="text-xs text-sidebar-foreground font-medium">
                  Settings
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px]">
              <DialogHeader>
                <DialogTitle className="text-sm">Settings</DialogTitle>
                <DialogDescription className="text-xs">
                  Customize your chat experience and preferences.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    {isDark ? (
                      <Moon className="size-4 text-primary" />
                    ) : (
                      <Sun className="size-4 text-primary" />
                    )}
                    <div>
                      <p className="text-xs font-medium">
                        {isDark ? "Dark Mode" : "Light Mode"}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Toggle between light and dark theme
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className={cn(
                      "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                      isDark ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block size-3 transform rounded-full bg-white transition-transform shadow-sm",
                        isDark ? "translate-x-5" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs font-medium mb-0.5">Language</p>
                  <p className="text-[10px] text-muted-foreground">
                    English (US)
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs font-medium mb-0.5">Notifications</p>
                  <p className="text-[10px] text-muted-foreground">Enabled</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <button className="flex items-center gap-2 w-full p-2 rounded-lg bg-card hover:bg-card/80 transition-colors shadow-sm">
            <Avatar className="size-6">
              <AvatarImage src="/avatar.jpg" alt="Andrew Neilson" />
              <AvatarFallback className="bg-orange-100 text-orange-600 text-[10px] font-medium">
                AN
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-sidebar-foreground font-medium">
              Andrew Neilson
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

function ConversationItem({
  conversation,
  isActive,
  isEditing,
  editTitle,
  onEditTitleChange,
  onClick,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  isOlder,
  isOpen,
  onClose,
}: {
  conversation: Conversation;
  isActive: boolean;
  isEditing: boolean;
  editTitle: string;
  onEditTitleChange: (value: string) => void;
  onClick: () => void;
  onDelete: () => void;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  isOlder?: boolean;
  isOpen: boolean;
  onClose: () => void;
}) {

  if (isEditing) {
    return (
      <div className="flex items-center gap-1.5 w-full px-3 py-2 rounded-full bg-[#F3F6FB] shadow-sm">
        <MessageCircle className="size-3 shrink-0 text-primary" />
        <input
          type="text"
          value={editTitle}
          onChange={(e) => onEditTitleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSaveEdit();
            if (e.key === "Escape") onCancelEdit();
          }}
          className="flex-1 text-xs bg-transparent outline-none border-b border-primary w-[80%]"
          autoFocus
        />
        <button
          onClick={onSaveEdit}
          className="p-0.5 hover:bg-primary/10 rounded"
        >
          <Check className="size-3 text-primary" />
        </button>
        <button
          onClick={onCancelEdit}
          className="p-0.5 hover:bg-destructive/10 rounded"
        >
          <X className="size-3 text-muted-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        className={cn(
          "flex items-center gap-2 w-full h-10 pl-3 pr-1 py-2 text-left transition-all duration-200 cursor-pointer",
          isActive
            ? "bg-[#F3F6FB] dark:bg-[#161B24] text-primary font-medium rounded-full"
            : "rounded-lg",
          isOlder && !isActive && "opacity-50"
        )}
      >
        <MessageCircle
          className={cn(
            "size-3 shrink-0",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        />

        <span
          className={cn(
            "text-xs flex-1 truncate",
            isActive ? "text-primary" : "text-sidebar-foreground/80"
          )}
        >
          {conversation.title.length > 18
            ? conversation.title.slice(0, 18) + "..."
            : conversation.title}
        </span>
      </div>
      {isActive && (
        <div
          className={cn(
            "flex items-center h-10 p-3 -ml-8 gap-0.5 bg-[#EEF0FD] dark:bg-[#161B24] transition-opacity rounded-full",
            "lg:opacity-100",
            isOpen ? "opacity-100" : "opacity-0 lg:opacity-100"
          )}
        >          <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-0.5 hover:bg-destructive/10 rounded"
        >
            <Trash2 className="size-3 text-muted-foreground hover:text-destructive transition-colors" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartEdit();
            }}
            className="p-0.5 hover:bg-primary/10 rounded"
          >
            <Edit2 className="size-3 text-muted-foreground hover:text-foreground transition-colors" />
          </button>

          <button
            onClick={onClose}
            className="w-[30px]"
          >
            <img src="/eye.png" alt="eye" className="w-[30px]" />
          </button>
        </div>
      )}
    </div>
  );
}
