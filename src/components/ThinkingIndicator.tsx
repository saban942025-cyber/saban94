const ThinkingIndicator = () => {
  return (
    <div className="animate-slide-up flex justify-start w-full">
      <div className="glass-panel-strong rounded-3xl rounded-bl-lg px-6 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-accent animate-dot-bounce"
                style={{ animationDelay: `${i * 0.16}s` }}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground animate-thinking-pulse ml-1">
            Saban AI is thinking…
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;
