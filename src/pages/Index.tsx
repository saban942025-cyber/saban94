import { useState, useRef, useEffect } from "react";
import FloatingOrbs from "@/components/FloatingOrbs";
import ChatHeader from "@/components/ChatHeader";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import ThinkingIndicator from "@/components/ThinkingIndicator";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: any[];
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Welcome to Saban OS 👋\n\nI'm your construction supply assistant. Ask me about products, prices, specs, or availability — I'm here to help!",
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isThinking]);

  const handleSend = async (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const { data, error } = await supabase.functions.invoke("saban-chat", {
        body: { message: text },
      });

      if (error) throw error;

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        products: data.products,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Sorry, I had trouble processing that. Please try again." },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
  };

  return (
    <div className="relative flex flex-col h-screen max-h-screen overflow-hidden bg-background">
      <FloatingOrbs />
      <ChatHeader onReset={handleReset} />

      {/* Messages */}
      <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto px-4 space-y-3 pb-2">
        {messages.map((msg) => (
          <div key={msg.id}>
            <ChatBubble role={msg.role} content={msg.content} />
            {msg.products && msg.products.length > 0 && (
              <div className="flex justify-start mt-2">
                <div className="max-w-[85%] space-y-3">
                  {msg.products.map((p: any) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {isThinking && <ThinkingIndicator />}
      </div>

      <ChatInput onSend={handleSend} disabled={isThinking} />
    </div>
  );
};

export default Index;
