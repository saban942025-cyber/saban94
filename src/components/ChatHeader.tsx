import { RotateCcw, Sparkles } from "lucide-react";

interface ChatHeaderProps {
  onReset: () => void;
}

const ChatHeader = ({ onReset }: ChatHeaderProps) => {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-md">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">Saban OS</h1>
          <p className="text-xs text-muted-foreground">Construction Supply AI</p>
        </div>
      </div>
      <button
        onClick={onReset}
        className="glass-panel p-2.5 rounded-2xl hover:scale-105 active:scale-95 transition-transform"
        aria-label="Reset chat"
      >
        <RotateCcw className="w-4.5 h-4.5 text-muted-foreground" />
      </button>
    </header>
  );
};

export default ChatHeader;
