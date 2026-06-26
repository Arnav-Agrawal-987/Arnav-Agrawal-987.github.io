export default function IntroNode({ isActive }: { isActive: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className={`w-1/2 h-1/2 border border-hologram-moderate/40 rounded-full flex items-center justify-center transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-10'}`}>
        <span className="text-[10px] text-hologram-moderate">POINT</span>
      </div>
    </div>
  );
}