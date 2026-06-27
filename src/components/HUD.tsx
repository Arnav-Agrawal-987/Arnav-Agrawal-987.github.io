import { Sun, Moon } from 'lucide-react';
import TiltCard from './Tiltcard';

interface HUDProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  totalNodes: number;
}

export default function HUD({ isDark, setIsDark, currentIndex, setCurrentIndex, totalNodes }: HUDProps) {
  const previousCheckpoint = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };
  const nextCheckpoint = () => {
    if (currentIndex < totalNodes - 1) setCurrentIndex(prev => prev + 1);
  };
  return (
    <>
      <svg className="hidden">
        <defs>
          <g id="hud-arrow" strokeWidth={1.75}>
            <path d="M 0,10 l 30,0 l 15,15 l -15,15 l -30,0 l 10,0 l 15,-15 l -15,-15 l 10,0 l 15,15 l -15,15" fill="none"/>
          </g>
        </defs>
      </svg>
      <TiltCard glowColor="var(--color-button-hover)" glowClipPath="polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0% calc(100% - 15px))" className="absolute top-4 right-4 z-10 md:hover:scale-105 transition duration-5">
        <button
          onClick={() => setIsDark(prev => !prev)}
          className="bg-button-bg text-button-text border border-button-border px-3 md:px-5 py-2 md:py-1 transition" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0% calc(100% - 15px))" }}
        >
          {isDark ? (<><Sun className="w-5 h-5 md:hidden" /><span className="hidden md:inline">Light Mode</span></>) : (<><Moon className="w-5 h-5 md:hidden" /><span className="hidden md:inline">Dark Mode</span></>)}
        </button>
        <div className="absolute left-0 bottom-0 bg-button-border w-full h-full" style={{ clipPath: "polygon(0 calc(100% - 15px), 15px 100%, 14px 100%, 0 calc(100% - 14px))" }}></div>
        <div className="absolute right-0 top-0 bg-button-border w-full h-full" style={{ clipPath: "polygon(calc(100% - 13px) 0, 100% 0, 100% 13px)" }}></div>
        <div className="absolute right-0 top-0 bg-button-border w-full h-full" style={{ clipPath: "polygon(calc(100% - 20px) 0, calc(100% - 17px) 0, 100% 17px, 100% 20px)" }}></div>
      </TiltCard>
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 select-none">
        <div className="flex flex-col gap-1.5 my-2">
          {Array.from({ length: totalNodes }).map((_, idx) => (
            <div
              key={`node-tick-${idx}`}
              className={`w-[3px] transition-all duration-500 border border-hologram-moderate ${idx === currentIndex ? 'h-4 bg-hologram-moderate' : 'h-1.5 bg-hologram-moderate/30'}`}
            />
          ))}
        </div>
      </div>
      <TiltCard maxTilt={15} glowColor="var(--color-button-hover)" glowClipPath="polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px calc(100% - 20px), 10px 20px)" className="absolute right-6 top-1/2 -translate-y-1/2 z-50 hover:scale-105 transition duration-5">
        <div className="flex flex-col gap-8 items-center border border-button-border bg-button-bg py-3 pr-1 pl-3" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px calc(100% - 20px), 10px 20px)" }}>
          <svg className={`w-[50px] h-[50px] -rotate-90 stroke-button-text ${currentIndex === 0?"opacity-50":"opacity-100"} cursor-pointer transition hover:scale-105`} onClick={previousCheckpoint}>
            <use href="#hud-arrow"/>
          </svg>
          <svg className={`w-[50px] h-[50px] rotate-90 stroke-button-text ${currentIndex === totalNodes - 1?"opacity-50":"opacity-100"} cursor-pointer transition hover:scale-105`} onClick={nextCheckpoint}>
            <use href="#hud-arrow"/>
          </svg>
          {/* <button
            onClick={previousCheckpoint}
            disabled={currentIndex === 0}
            className="w-10 h-10 border border-button-border bg-button-bg text-button-text flex items-center justify-center transition hover:bg-button-hover disabled:opacity-20 disabled:pointer-events-none group"
            style={{ clipPath: arrowClip }}
          >
            <ChevronUp className="w-4 h-4 text-hologram-moderate group-hover:scale-110 transition-transform" strokeWidth={2.5} />
          </button>

          <button
            onClick={nextCheckpoint}
            disabled={currentIndex === totalNodes - 1}
            className="w-10 h-10 border border-button-border bg-button-bg text-button-text flex items-center justify-center transition hover:bg-button-hover disabled:opacity-20 disabled:pointer-events-none group"
            style={{ clipPath: arrowClip }}
          >
            <ChevronDown className="w-4 h-4 text-hologram-moderate group-hover:scale-110 transition-transform" strokeWidth={2.5} />
          </button> */}
        </div>
        <div className="absolute left-0 bottom-0 bg-button-border w-full h-full" style={{ clipPath: "polygon(0 100%, 10px calc(100% - 20px), 10px 20px, 0 0, 1px 0, 11px 20px, 11px calc(100% - 20px), 1px 100%)" }}></div>
        {/* <div className="absolute right-0 top-0 bg-button-border w-full h-full" style={{ clipPath: "polygon(calc(100% - 13px) 0, 100% 0, 100% 13px)" }}></div> */}
        {/* <div className="absolute right-0 top-0 bg-button-border w-full h-full" style={{ clipPath: "polygon(calc(100% - 20px) 0, calc(100% - 17px) 0, 100% 17px, 100% 20px)" }}></div> */}
      </TiltCard>
      {/* <div className="absolute bottom-4 left-4 z-50 font-mono text-[10px] text-hologram-moderate/60 tracking-widest bg-room-bg/40 backdrop-blur px-3 py-1 border border-hologram-moderate/20 rounded">
        SYS_LOC // <span className="text-hologram-moderate font-bold">0{currentIndex} / 0{totalNodes - 1}</span>
      </div> */}
    </>
  );
}