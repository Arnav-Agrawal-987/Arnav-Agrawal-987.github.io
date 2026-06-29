import { Sun, Moon, FileDown } from 'lucide-react';
import TiltCard from './Tiltcard';
import { useState, useEffect } from 'react';

interface HUDProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  totalNodes: number;
}

const SegmentDigit = ({ value }: { value: number }) => {
  const map = ["1111110", "0110000", "1101101", "1111001", "0110011", "1011011", "1011111", "1110000", "1111111", "1111011"][value];

  const color = (isOn: boolean) => isOn ? "stroke-button-text" : "stroke-button-text opacity-10";

  return (
    <svg viewBox="0 0 10 10" className="w-full h-full">
      <path d="M 2.75 1 L 7.25 1" className={color(map[0] === '1')} strokeWidth="1" strokeLinecap="round" />
      <path d="M 8 1.75 L 8 4.25" className={color(map[1] === '1')} strokeWidth="1" strokeLinecap="round" />
      <path d="M 8 5.75 L 8 8.25" className={color(map[2] === '1')} strokeWidth="1" strokeLinecap="round" />
      <path d="M 2.75 9 L 7.25 9" className={color(map[3] === '1')} strokeWidth="1" strokeLinecap="round" />
      <path d="M 2 5.75 L 2 8.25" className={color(map[4] === '1')} strokeWidth="1" strokeLinecap="round" />
      <path d="M 2 1.75 L 2 4.25" className={color(map[5] === '1')} strokeWidth="1" strokeLinecap="round" />
      <path d="M 2.75 5 L 7.25 5" className={color(map[6] === '1')} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
};

const AnalogueFace = ({ time }: { time: Date }) => {
  const s = time.getSeconds() * 6;
  const m = time.getMinutes() * 6 + s / 60;
  const h = (time.getHours() % 12) * 30 + m / 12;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="45" className="fill-button-bg" />

      {[...Array(12)].map((_, i) => (
        <line key={i} x1="50" y1="10" x2="50" y2="18" transform={`rotate(${i * 30} 50 50)`} className="stroke-button-text opacity-60" strokeWidth="3.5" strokeLinecap="round" />
      ))}

      <line x1="50" y1="50" x2="50" y2="30" transform={`rotate(${h} 50 50)`} className="stroke-button-text" strokeWidth="3.5" strokeLinecap="round" />

      <line x1="50" y1="50" x2="50" y2="10" transform={`rotate(${m} 50 50)`} className="stroke-button-text opacity-80" strokeWidth="3.5" strokeLinecap="round" />

      <line x1="50" y1="50" x2="50" y2="10" transform={`rotate(${s} 50 50)`} className="stroke-button-text opacity-50" strokeWidth="1.5" strokeLinecap="round" />

      <circle cx="50" cy="50" r="3" className="fill-button-text" />
    </svg>
  );
};

export default function HUD({ isDark, setIsDark, currentIndex, setCurrentIndex, totalNodes }: HUDProps) {
  const previousCheckpoint = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };
  const nextCheckpoint = () => {
    if (currentIndex < totalNodes - 1) setCurrentIndex(prev => prev + 1);
  };

  const [time, setTime] = useState(new Date());
  const [clockType, setClockType] = useState<'analog' | 'digital'>('analog');
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setClockType(Math.random() > 0.5 ? 'analog' : 'digital');
    setMounted(true);

    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateNum = time.getDate().toString().padStart(2, '0');
  const monthStr = time.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const yearNum = time.getFullYear().toString();

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

      <div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5 select-none">
        {/*Profile*/}
        <div className="flex gap-1.5 h-12">
          <div
            className="w-12 h-12 bg-button-bg flex items-center justify-center overflow-hidden"
          // style={{ clipPath: "polygon(6px 0, 100% 0, 100% 100%, 0 100%, 0 6px)" }}
          >
            <img src="/Corner_Picture.jpg" className="" />
          </div>

          <TiltCard
            maxTilt={0}
            className="h-full bg-button-bg border border-button-border border-t-8"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 8px, calc(100% - 42px) 100%, 0 100%)" }}
          >
            <div className="text-button-text text-2xl flex items-center justify-center h-full pl-2 pr-14">
              Arnav Agrawal
            </div>
          </TiltCard>
        </div>

        {/*Clock*/}
        <div className="flex gap-1.5 mt-0.5 h-16">
          <TiltCard maxTilt={0} className="w-20 h-20 bg-button-bg border border-button-border flex items-center justify-center overflow-visible">
            {mounted && (
              clockType === 'analog' ? (
                <AnalogueFace time={time} />
              ) : (
                <div className="flex flex-col gap-0 items-center z-10 p-2">
                  <div className="flex gap-0 items-center">
                    <SegmentDigit value={Math.floor(time.getHours() / 10)} />
                    <SegmentDigit value={time.getHours() % 10} />
                  </div>
                  <div className="flex gap-0 items-center">
                    <SegmentDigit value={Math.floor(time.getMinutes() / 10)} />
                    <SegmentDigit value={time.getMinutes() % 10} />
                  </div>
                </div>
              )
            )}
          </TiltCard>

          {/*Date*/}
          <TiltCard
            maxTilt={0}
            className="h-20 w-36 bg-button-bg border border-button-border border-l-4"
            style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 45px) 100%, 0 100%)" }}
          >
            {mounted && clockType === 'analog' ? (
              <div className="h-full w-full flex items-center pl-1 gap-1.5">
                <div className="text-button-text text-5xl tracking-tighter mt-1">
                  {dateNum}
                </div>
                <div className="flex flex-col">
                  <div className="text-button-text font-mono text-3xl mt-0.5">
                    {monthStr}
                  </div>
                  <div className="text-button-text text-xs tracking-widest -translate-y-1 ml-0.5 opacity-80">
                    {yearNum}
                  </div>
                </div>
              </div>
            ) : mounted && (
              <div className="h-full w-full flex">
                <div className="flex flex-col pt-1">
                  <div className="flex w-20">
                    <SegmentDigit value={parseInt(dateNum[0])}/>
                    <SegmentDigit value={parseInt(dateNum[1])} />
                  </div>
                  <div className="flex w-full justify-center text-button-text tracking-widest text-3xl">
                    {monthStr}
                  </div>
                </div>
                <div className="flex flex-col w-5 py-1 gap-1">
                  <SegmentDigit value={parseInt(yearNum[0])} />
                  <SegmentDigit value={parseInt(yearNum[1])} />
                  <SegmentDigit value={parseInt(yearNum[2])} />
                  <SegmentDigit value={parseInt(yearNum[3])} />
                </div>
              </div>
            )}
          </TiltCard>
        </div>
      </div>

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
          <FileDown className="w-5 h-5 md:hidden text-button-text group-hover:-translate-y-0.5 transition-transform duration-200" strokeWidth={2} />
          <span className="hidden md:inline">Extract Data</span>
        </a>

        <div className="absolute left-0 bottom-0 bg-button-border w-full h-full pointer-events-none" style={{ clipPath: "polygon(0 calc(100% - 12px), 12px 100%, 11px 100%, 0 calc(100% - 11px))" }}></div>
        <div className="absolute right-0 top-0 bg-button-border w-full h-full pointer-events-none" style={{ clipPath: "polygon(calc(100% - 15px) 0, 100% 0, 100% 15px, calc(100% - 2px) 15px, calc(100% - 2px) 2px, calc(100% - 15px) 2px)" }}></div>
      </TiltCard>
    </>
  );
}