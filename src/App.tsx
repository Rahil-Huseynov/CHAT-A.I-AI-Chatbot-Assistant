import { useState, useCallback } from "react";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatArea } from "@/components/chat/chat-area";
import { ChatInput } from "@/components/chat/chat-input";
import { UpgradeBadge } from "@/components/chat/upgrade-badge";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import type { Message } from "@/components/chat/chat-message";

const aiResponses = [
  "I'd be happy to help you with that! Based on your question, here are a few key points to consider:\n\n1. **Understanding the basics:** Start by familiarizing yourself with the fundamental concepts. This will give you a solid foundation to build upon.\n\n2. **Practical application:** Theory is important, but hands-on practice is where real learning happens. Try to apply what you learn in real-world scenarios.\n\n3. **Continuous learning:** The field is constantly evolving, so stay updated with the latest developments and best practices.\n\nWould you like me to elaborate on any of these points?",
  "That's a great question! Here's what you need to know:\n\n1. **First steps:** Begin with a clear understanding of your goals. What exactly are you trying to achieve?\n\n2. **Tools and resources:** There are many excellent tools available that can help streamline your workflow and improve efficiency.\n\n3. **Best practices:** Always follow industry standards and best practices to ensure quality results.\n\n4. **Testing and iteration:** Don't be afraid to experiment and iterate. Learning from mistakes is part of the process.\n\nIs there anything specific you'd like to dive deeper into?",
  "I understand what you're looking for. Let me break this down:\n\n1. **Core concepts:** Master the fundamental principles first. This forms the backbone of everything else.\n\n2. **Implementation:** Once you understand the theory, start implementing. Even simple projects can teach you a lot.\n\n3. **Community:** Join communities of like-minded individuals. Sharing knowledge and experiences accelerates learning.\n\nFeel free to ask if you have more questions!",
];

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  hasActions?: boolean;
  createdAt: Date;
}

const initialConversations: Conversation[] = [
  {
    id: "1",
    title: "Create Html Game Environment...",
    messages: [
      {
        id: "1-1",
        role: "user",
        content: "How to create HTML game environment?",
        timestamp: new Date(Date.now() - 86400000 * 2),
      },
      {
        id: "1-2",
        role: "assistant",
        content:
          "To create an HTML game environment, you'll need to set up a canvas element and use JavaScript for game logic. Here are the basic steps:\n\n1. **Create HTML structure:** Set up your HTML file with a canvas element.\n\n2. **Set up the canvas:** Use JavaScript to get the canvas context for drawing.\n\n3. **Game loop:** Create a game loop using requestAnimationFrame for smooth animations.\n\n4. **Handle input:** Add event listeners for keyboard and mouse input.",
        timestamp: new Date(Date.now() - 86400000 * 2),
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 2),
  },
  {
    id: "2",
    title: "Apply To Leave For Emergency",
    messages: [
      {
        id: "2-1",
        role: "user",
        content: "How to apply for emergency leave?",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: "2-2",
        role: "assistant",
        content:
          "To apply for emergency leave, follow these steps:\n\n1. **Notify your supervisor:** Contact them as soon as possible.\n\n2. **Submit formal request:** Fill out the leave application form.\n\n3. **Provide documentation:** Include any supporting documents if required.\n\n4. **Follow up:** Ensure your request is processed.",
        timestamp: new Date(Date.now() - 86400000),
      },
    ],
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: "3",
    title: "What Is UI UX Design?",
    messages: [
      {
        id: "3-1",
        role: "user",
        content: "What is UI UX Design?",
        timestamp: new Date(Date.now() - 3600000 * 5),
      },
      {
        id: "3-2",
        role: "assistant",
        content:
          "UI/UX design focuses on creating user-friendly digital experiences:\n\n1. **UI (User Interface):** The visual elements users interact with - buttons, icons, colors, typography.\n\n2. **UX (User Experience):** The overall feel and usability of the product.\n\n3. **Research:** Understanding user needs through testing and feedback.\n\n4. **Prototyping:** Creating mockups before development.",
        timestamp: new Date(Date.now() - 3600000 * 5),
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 5),
  },
  {
    id: "4",
    title: "Create POS System",
    messages: [
      {
        id: "4-1",
        role: "user",
        content: "How to create a POS system?",
        timestamp: new Date(Date.now() - 3600000 * 4),
      },
      {
        id: "4-2",
        role: "assistant",
        content:
          "Building a POS system requires several components:\n\n1. **Database:** Store products, transactions, and customer data.\n\n2. **Interface:** Create an intuitive UI for transactions.\n\n3. **Payment integration:** Connect with payment processors.\n\n4. **Inventory management:** Track stock levels automatically.",
        timestamp: new Date(Date.now() - 3600000 * 4),
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 4),
  },
  {
    id: "5",
    title: "What Is UX Audit?",
    messages: [
      {
        id: "5-1",
        role: "user",
        content: "What Is UX Audit?",
        timestamp: new Date(Date.now() - 3600000 * 3),
      },
      {
        id: "5-2",
        role: "assistant",
        content:
          "A UX audit evaluates your product's user experience:\n\n1. **Heuristic evaluation:** Check against usability principles.\n\n2. **User testing:** Observe real users interacting with your product.\n\n3. **Analytics review:** Analyze user behavior data.\n\n4. **Recommendations:** Provide actionable improvements.",
        timestamp: new Date(Date.now() - 3600000 * 3),
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 3),
  },
  {
    id: "6",
    title: "Create Chatbot GPT...",
    messages: [
      {
        id: "6-1",
        role: "user",
        content:
          "Create a chatbot gpt using python language what will be step for that",
        timestamp: new Date(Date.now() - 3600000 * 2),
      },
      {
        id: "6-2",
        role: "assistant",
        content:
          "Sure, I can help you get started with creating a chatbot using GPT in Python. Here are the basic steps you'll need to follow:\n\n1. **Install the required libraries:** You'll need to install the transformers library from Hugging Face to use GPT. You can install it using pip.\n\n2. **Load the pre-trained model:** GPT comes in several sizes and versions, so you'll need to choose the one that fits your needs. You can load a pre-trained GPT model. This loads the 1.3B parameter version of GPT-Neo, which is a powerful and relatively recent model.\n\n3. **Create a chatbot loop:** You'll need to create a loop that takes user input, generates a response using the GPT model, and outputs it to the user. Here's an example loop that uses the input() function to get user input and the gpt() function to generate a response. This loop will keep running until the user exits the program or the loop is interrupted.\n\n4. **Add some personality to the chatbot:** While GPT can generate text, it doesn't have any inherent personality or style. You can make your chatbot more interesting by adding custom prompts or responses that reflect your desired personality. You can then modify the chatbot loop to use these prompts and responses when appropriate. This will make the chatbot seem more human-like and engaging.\n\nThese are just the basic steps to get started with a GPT chatbot in Python. Depending on your requirements, you may need to add more features or complexity to the chatbot. Good luck!",
        timestamp: new Date(Date.now() - 3600000 * 2),
      },
      {
        id: "6-3",
        role: "user",
        content: "What is use of that chatbot ?",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "6-4",
        role: "assistant",
        content:
          "Chatbots can be used for a wide range of purposes, including:\n\nCustomer service chatbots can handle frequently asked questions, provide basic support, and help customers navigate your website or services. They can operate 24/7 and reduce the workload on human support agents.",
        timestamp: new Date(Date.now() - 3600000),
      },
    ],
    hasActions: true,
    createdAt: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: "7",
    title: "How Chat GPT Work?",
    messages: [
      {
        id: "7-1",
        role: "user",
        content: "How does ChatGPT work?",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "7-2",
        role: "assistant",
        content:
          "ChatGPT works using a transformer-based neural network:\n\n1. **Training:** It's trained on vast amounts of text data.\n\n2. **Tokenization:** Input text is broken into tokens.\n\n3. **Attention mechanism:** The model weighs the importance of different words.\n\n4. **Generation:** It predicts the most likely next tokens.",
        timestamp: new Date(Date.now() - 3600000),
      },
    ],
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: "8",
    title: "Crypto Lending App Name",
    messages: [
      {
        id: "8-1",
        role: "user",
        content: "Suggest names for a crypto lending app",
        timestamp: new Date(Date.now() - 86400000 * 5),
      },
      {
        id: "8-2",
        role: "assistant",
        content:
          "Here are some creative names for your crypto lending app:\n\n1. **CryptoLend** - Simple and direct.\n\n2. **BlockBorrow** - Emphasizes blockchain technology.\n\n3. **DeFiFlow** - Highlights decentralized finance.\n\n4. **CoinVault Lending** - Suggests security and trust.",
        timestamp: new Date(Date.now() - 86400000 * 5),
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 5),
  },
  {
    id: "9",
    title: "Operator Grammar Types",
    messages: [
      {
        id: "9-1",
        role: "user",
        content: "What are operator grammar types?",
        timestamp: new Date(Date.now() - 86400000 * 6),
      },
      {
        id: "9-2",
        role: "assistant",
        content:
          "Operator grammars are context-free grammars with special properties:\n\n1. **No epsilon productions:** No rules produce empty strings.\n\n2. **No adjacent non-terminals:** Non-terminals are always separated by terminals.\n\n3. **Operator precedence:** Used for parsing expressions.\n\n4. **Efficient parsing:** Enables faster parsing algorithms.",
        timestamp: new Date(Date.now() - 86400000 * 6),
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 6),
  },
  {
    id: "10",
    title: "Min States For Binary DFA",
    messages: [
      {
        id: "10-1",
        role: "user",
        content: "How to find minimum states for binary DFA?",
        timestamp: new Date(Date.now() - 86400000 * 7),
      },
      {
        id: "10-2",
        role: "assistant",
        content:
          "To minimize a DFA, follow these steps:\n\n1. **Remove unreachable states:** Eliminate states not reachable from the start.\n\n2. **Partition states:** Group equivalent states together.\n\n3. **Merge equivalent states:** Combine states with identical behavior.\n\n4. **Table-filling algorithm:** Use this method to find distinguishable states.",
        timestamp: new Date(Date.now() - 86400000 * 7),
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 7),
  },
];

export default function App() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState("6");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);

  const currentConversation = conversations.find(
    (c) => c.id === activeConversationId
  );
  const messages = currentConversation?.messages || [];

  const handleSendMessage = useCallback(
    (content: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, userMessage] }
            : conv
        )
      );
      setIsTyping(true);

      setTimeout(() => {
        const randomResponse =
          aiResponses[Math.floor(Math.random() * aiResponses.length)];
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: randomResponse,
          timestamp: new Date(),
        };

        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversationId
              ? { ...conv, messages: [...conv.messages, aiMessage] }
              : conv
          )
        );
        setIsTyping(false);
      }, 1500);
    },
    [activeConversationId]
  );

  const handleNewChat = useCallback(() => {
    const newId = Date.now().toString();
    const newConversation: Conversation = {
      id: newId,
      title: "New Chat",
      messages: [],
      hasActions: true,
      createdAt: new Date(),
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newId);
    setSidebarOpen(false);
  }, []);

  const handleClearAll = useCallback(() => {
    setConversations([]);
    setActiveConversationId("");
  }, []);

  const handleDeleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationId === id) {
        const remaining = conversations.filter((c) => c.id !== id);
        setActiveConversationId(remaining[0]?.id || "");
      }
    },
    [activeConversationId, conversations]
  );

  const handleRenameConversation = useCallback(
    (id: string, newTitle: string) => {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === id ? { ...conv, title: newTitle } : conv
        )
      );
    },
    []
  );

  const handleRegenerate = useCallback(() => {
    if (messages.length < 2) return;

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, messages: conv.messages.slice(0, -1) }
          : conv
      )
    );
    setIsTyping(true);

    setTimeout(() => {
      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, aiMessage] }
            : conv
        )
      );
      setIsTyping(false);
    }, 1500);
  }, [activeConversationId, messages.length]);

  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setSidebarOpen(false);
  }, []);

  const handleDeleteMessage = useCallback(
    (messageId: string) => {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: conv.messages.filter((m) => m.id !== messageId),
              }
            : conv
        )
      );
    },
    [activeConversationId]
  );

  const handleEditMessage = useCallback(
    (messageId: string, newContent: string) => {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: conv.messages.map((m) =>
                  m.id === messageId ? { ...m, content: newContent } : m
                ),
              }
            : conv
        )
      );
      setEditingMessageId(null);
    },
    [activeConversationId]
  );

return (
    <div className="flex h-dvh w-full bg-[#F3F6FB] dark:bg-[#0D111B] overflow-hidden">
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onClearAll={handleClearAll}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0 w-full relative bg-[#F3F6FB] dark:bg-[#0D111B] lg:m-2 lg:ml-0 lg:rounded-2xl overflow-hidden">
        <header className="flex items-center gap-2 p-3 lg:hidden border-b border-border/50 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="size-8"
          >
            <Menu className="size-5" />
          </Button>
          <h1 className="text-sm font-bold tracking-wide">CHAT A.I+</h1>
        </header>

        <ChatArea
          messages={messages}
          isTyping={isTyping}
          onRegenerate={handleRegenerate}
          onDeleteMessage={handleDeleteMessage}
          onEditMessage={handleEditMessage}
          editingMessageId={editingMessageId}
          setEditingMessageId={setEditingMessageId}
        />

        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </main>
      <UpgradeBadge />
    </div>
  );
}
