import { Sun, Moon } from 'lucide-react';

interface HUDProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  totalNodes: number;
}

export default function HUD({ isDark, setIsDark, currentIndex, totalNodes }: HUDProps) {
  return (
    <>
      {/* Top Right Theme Control */}
      <div className="absolute top-4 right-4 z-10 md:hover:scale-105 transition">
        <button
          onClick={() => setIsDark(prev => !prev)}
          className="bg-button-bg text-button-text border border-button-border px-3 md:px-5 py-2 md:py-1 hover:bg-button-hover transition" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0% calc(100% - 15px))" }}
        >
          {isDark ? (<><Sun className="w-5 h-5 md:hidden" /><span className="hidden md:inline">Light Mode</span></>) : (<><Moon className="w-5 h-5 md:hidden" /><span className="hidden md:inline">Dark Mode</span></>)}
        </button>
        <div className="absolute left-0 bottom-0 bg-button-text w-full h-full" style={{ clipPath: "polygon(0 calc(100% - 15px), 15px 100%, 14px 100%, 0 calc(100% - 14px))" }}></div>
        <div className="absolute right-0 top-0 bg-button-text w-full h-full" style={{ clipPath: "polygon(calc(100% - 13px) 0, 100% 0, 100% 13px)" }}></div>
        <div className="absolute right-0 top-0 bg-button-text w-full h-full" style={{ clipPath: "polygon(calc(100% - 20px) 0, calc(100% - 17px) 0, 100% 17px, 100% 20px)" }}></div>
      </div>

      {/* <div className="absolute bottom-4 left-4 z-50 font-mono text-[10px] text-hologram-moderate/60 tracking-widest bg-room-bg/40 backdrop-blur px-3 py-1 border border-hologram-moderate/20 rounded">
        SYS_LOC // <span className="text-hologram-moderate font-bold">0{currentIndex} / 0{totalNodes - 1}</span>
      </div> */}
    </>
  );
}