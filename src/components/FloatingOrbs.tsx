const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blue orb - top left */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-orb-blue/20 blur-[120px] animate-float-orb" />
      {/* Orange orb - bottom right */}
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-orb-orange/15 blur-[100px] animate-float-orb-reverse" />
      {/* Subtle blue orb - center */}
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-orb-blue/10 blur-[80px] animate-float-orb-slow" />
    </div>
  );
};

export default FloatingOrbs;
