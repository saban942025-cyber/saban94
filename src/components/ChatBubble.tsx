import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  children?: React.ReactNode;
}

const ChatBubble = ({ role, content, children }: ChatBubbleProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "animate-slide-up flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-3xl px-5 py-3.5 text-[15px] leading-relaxed",
          isUser
            ? "bg-bubble-user text-primary-foreground rounded-br-lg"
            : "glass-panel-strong text-foreground rounded-bl-lg shadow-sm"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {children}
      </div>
    </div>
  );
};

export default ChatBubble;
