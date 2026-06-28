import { Sun, Moon, FileDown } from 'lucide-react';
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
      {/*Arrow SVG*/}
      <svg className="hidden">
        <defs>
          <g id="hud-arrow" strokeWidth={1.75}>
            <path d="M 0,10 l 30,0 l 15,15 l -15,15 l -30,0 l 10,0 l 15,-15 l -15,-15 l 10,0 l 15,15 l -15,15" fill="none" />
          </g>
        </defs>
      </svg>

      {/*Profile*/}
      

      {/*Theme Button*/}
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

      {/*Checkpoint Indicators*/}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 select-none">
        <div className="flex flex-col gap-5 my-2">
          {Array.from({ length: totalNodes }).map((_, idx) => {
            const isActive = idx === currentIndex;
            const hexagonClip = { clipPath: "polygon(0 7px, 50% 0, 100% 7px, 100% calc(100% - 7px), 50% 100%, 0 calc(100% - 7px))" };

            return (
              <TiltCard
                key={`node-tick-${idx}`}
                maxTilt={0}
                className={`w-3.5 transition-all duration-500 border border-button-border border-[1.5px] ${isActive ? 'h-16 bg-button-bg' : 'h-3.5 bg-button-bg hover:bg-button-hover cursor-pointer'}`}
                style={hexagonClip}
                onClick={() => setCurrentIndex(idx)}
              >
                <div className="w-full h-full" />
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/*Checkpoint Controls*/}
      <TiltCard maxTilt={15} glowColor="var(--color-button-hover)" glowClipPath="polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px calc(100% - 20px), 10px 20px)" className="absolute right-6 top-1/2 -translate-y-1/2 z-50 hover:scale-105 transition duration-5">
        <div className="flex flex-col gap-8 items-center border border-button-border bg-button-bg py-3 pr-1 pl-3" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px calc(100% - 20px), 10px 20px)" }}>
          <svg className={`w-[50px] h-[50px] -rotate-90 stroke-button-text ${currentIndex === 0 ? "opacity-50" : "opacity-100"} cursor-pointer transition hover:scale-105`} onClick={previousCheckpoint}>
            <use href="#hud-arrow" />
          </svg>
          <svg className={`w-[50px] h-[50px] rotate-90 stroke-button-text ${currentIndex === totalNodes - 1 ? "opacity-50" : "opacity-100"} cursor-pointer transition hover:scale-105`} onClick={nextCheckpoint}>
            <use href="#hud-arrow" />
          </svg>
        </div>
        <div className="absolute left-0 bottom-0 bg-button-border w-full h-full" style={{ clipPath: "polygon(0 100%, 10px calc(100% - 20px), 10px 20px, 0 0, 1px 0, 11px 20px, 11px calc(100% - 20px), 1px 100%)" }}></div>
        {/* <div className="absolute right-0 top-0 bg-button-border w-full h-full" style={{ clipPath: "polygon(calc(100% - 13px) 0, 100% 0, 100% 13px)" }}></div> */}
        {/* <div className="absolute right-0 top-0 bg-button-border w-full h-full" style={{ clipPath: "polygon(calc(100% - 20px) 0, calc(100% - 17px) 0, 100% 17px, 100% 20px)" }}></div> */}
      </TiltCard>

      {/*Resume Button*/}
      <TiltCard
        className="absolute bottom-4 right-4 z-10 md:hover:scale-105 transition duration-5"
        glowClipPath="polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
      >
        <a
          href="/Resume_Arnav_Agrawal.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-button-bg text-button-text border border-button-border px-3 md:px-5 py-2 md:py-1 hover:bg-button-hover transition group"
          style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
        >
          <FileDown className="w-5 h-5 md:hidden text-hologram-moderate group-hover:-translate-y-0.5 transition-transform duration-200" strokeWidth={2} />
          <span className="hidden md:inline">Extract Data</span>
        </a>

        <div className="absolute left-0 bottom-0 bg-button-border w-full h-full pointer-events-none" style={{ clipPath: "polygon(0 calc(100% - 12px), 12px 100%, 11px 100%, 0 calc(100% - 11px))" }}></div>
        <div className="absolute right-0 top-0 bg-button-border w-full h-full pointer-events-none" style={{ clipPath: "polygon(calc(100% - 15px) 0, 100% 0, 100% 15px, calc(100% - 2px) 15px, calc(100% - 2px) 2px, calc(100% - 15px) 2px)" }}></div>
      </TiltCard>
    </>
  );
}