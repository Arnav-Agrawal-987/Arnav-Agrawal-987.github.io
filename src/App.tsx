import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const N = 5;
const CHECKPOINTS = Array.from({ length: N }, (_, index) => (1000 / (N - 1)) * index);
const PERSPECTIVE = 1000/(N-1);
const OFFSET = PERSPECTIVE / 2.5;

const LEFT_WALL_SCROLL_PATHS = [
  {d: "M 0,100 L 600,100 L 700,200 L 2300,200 L 2350,150 L 3000,150 L 3100,250 L 4000,250", strokeWidth: 2},
  {d: "M 0,300 L 250,300 L 900,300 L 950,350 L 1800,350 L 1900,500 L 3450,500 L 3500,450 L 4000,450", strokeWidth: 50},
  {d: "M 0,800 L 200,800 L 350,600 L 700,600 L 900,900 L 1300,900 L 1350,850 L 2500,850 L 2550,925 L 4000,925", strokeWidth: 4},
  {d: "M 0,950 L 600,950 L 650,925 L 1150,925 L 1200,950 L 4000,950", strokeWidth: 1},
];

const LEFT_WALL_FIXED_PATHS = [
  {d: "M 350,720 L 680,720", strokeWidth: 1},
  {d: "M 250,400 L 700,400", strokeWidth: 1},
  {d: "M 2000,400 L 2500,400 L 2600,350", strokeWidth: 3},
  {d: "M 1350,700 L 1450,700 L 1550,450 L 1700,450", strokeWidth: 3},
  {d: "M 150,150 L 350,150 L 400,200 L 500,200", strokeWidth: 8},
  {d: "M 750,100 L 2250,100", strokeWidth: 1},
  {d: "M 0,600 L 200,600", strokeWidth: 10},
  {d: "M 750,500 L 850,600 L 1250,600", strokeWidth: 1},
];

const RIGHT_WALL_SCROLL_PATHS = [
  {d: "M 4000,50 L 3700,50 L 3600,150 L 3400,150 L 3350,100 L 2000,100 L 1200,100 L 1150,50 L 0,50", strokeWidth: 2},
  {d: "M 4000,800 L 1850,800 L 1750,600 L 900,600 L 800,650 L 0,650", strokeWidth: 70},
  {d: "M 4000,350 L 3200,350 L 3100,500 L 2600,500 L 2500,400 L 1400,400 L 1300,300 L 750,300 L 650,450 L 0,450", strokeWidth: 8},
  {d: "M 4000,900 L 3700,900 L 3600,950 L 2150,950 L 2050,925 L 0,925", strokeWidth: 4},
];

const RIGHT_WALL_FIXED_PATHS = [
  {d: "M 3850,175 L 3800,250 L 3350,250 L 3300,175", strokeWidth: 3},
  {d: "M 2950,200 L 2650,200", strokeWidth: 12},
  {d: "M 2500,500 L 2100,500 L 2000,600", strokeWidth: 2},
  {d: "M 1600,750 L 1100,750", strokeWidth: 1},
  {d: "M 1600,300 L 1500,200 L 1200,200", strokeWidth: 1},
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const zPos = useMotionValue(0);
  const smoothZ = useSpring(zPos, { stiffness: 40, damping: 10 });
  const zeroCamera = useTransform(smoothZ, (value) => value + OFFSET);

  const pipeProgress = useTransform(
    smoothZ, 
    [0, 1000], 
    [0, 1], 
    { ease: (t) => Math.max(Math.pow(t, 5), 0.4*t) }
  );

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 70) { // Scroll Down -> Move Deeper
        if (currentIndex < CHECKPOINTS.length - 1) {
          setCurrentIndex(prev => prev + 1);
        }
      } else if (e.deltaY < -70) { // Scroll Up -> Move Back
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentIndex]);

  useEffect(() => {
    zPos.set(CHECKPOINTS[currentIndex]);
  }, [currentIndex, zPos]);

  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  return (
    <main className="w-screen h-screen flex items-center justify-center overflow-hidden bg-room-bg" style={{ perspective: `${PERSPECTIVE}px` }}>
      <motion.div className="relative w-full h-full"
      style={{ translateZ: zeroCamera, transformStyle: "preserve-3d" }}>
        {/* Back Wall */}
        <div className="absolute inset-0 bg-room-bg flex items-center justify-center"
          style={{ transform: "translateZ(-4000px)" }}
        />
        {/* Left Wall */}
        <div className="absolute left-0 w-[4000px] h-screen bg-gradient-to-r from-room-wall via-room-bg via-40% to-room-bg" style={{ transformOrigin: "left", transform: "rotateY(90deg)" }}>
          <svg className="w-full h-full" viewBox="0 0 4000 1000" preserveAspectRatio="none">
            {LEFT_WALL_SCROLL_PATHS.map((pathConfig, index) => (
              <g key={`left-pipe-${index}`}>
                <path 
                  d={pathConfig.d} 
                  fill="none" 
                  stroke="var(--color-room-bg)" 
                  className="text-hologram-moderate/10" 
                  strokeWidth={pathConfig.strokeWidth}
                />
                <motion.path 
                  d={pathConfig.d} 
                  fill="none" 
                  stroke="var(--color-hologram-moderate)" 
                  strokeWidth={pathConfig.strokeWidth}
                  strokeLinecap="square"
                  className="animate-pulse-flow"
                  style={{ pathLength: pipeProgress }}
                />
              </g>
            ))}
            {LEFT_WALL_FIXED_PATHS.map((pathConfig, index) => (
              <g key={`left-pipe-${index}`}>
                <path 
                  d={pathConfig.d} 
                  fill="none" 
                  stroke="var(--color-hologram-moderate)" 
                  className="animate-pulse-flow" 
                  strokeWidth={pathConfig.strokeWidth}
                />
              </g>
            ))}
          </svg>
        </div>
        {/* Right Wall */}
        <div className="absolute right-0 w-[4000px] h-screen bg-gradient-to-l from-room-wall via-room-bg via-40% to-room-bg" style={{ transformOrigin: "right", transform: "rotateY(-90deg)" }}>
          <svg className="w-full h-full" viewBox="0 0 4000 1000" preserveAspectRatio="none">
            {RIGHT_WALL_SCROLL_PATHS.map((pathConfig, index) => (
              <g key={`right-pipe-${index}`}>
                <path 
                  d={pathConfig.d} 
                  fill="none" 
                  stroke="var(--color-room-bg)" 
                  className="text-hologram-moderate/10" 
                  strokeWidth={pathConfig.strokeWidth}
                />
                <motion.path 
                  d={pathConfig.d} 
                  fill="none" 
                  stroke="var(--color-hologram-moderate)" 
                  strokeWidth={pathConfig.strokeWidth}
                  strokeLinecap="square"
                  className="animate-pulse-flow"
                  style={{ pathLength: pipeProgress }}
                />
              </g>
            ))}
            {RIGHT_WALL_FIXED_PATHS.map((pathConfig, index) => (
              <g key={`right-pipe-${index}`}>
                <path 
                  d={pathConfig.d} 
                  fill="none" 
                  stroke="var(--color-hologram-moderate)" 
                  className="animate-pulse-flow" 
                  strokeWidth={pathConfig.strokeWidth}
                />
              </g>
            ))}
          </svg>
        </div>
        {/* Floor */}
        <div className="absolute bottom-0 w-screen h-[2250px] bg-gradient-to-t from-room-floor via-room-bg via-70% to-room-bg"
          style={{ transformOrigin: "bottom", transform: "rotateX(90deg)" }}
        />
        {/* Roof */}
        <div className="absolute top-0 w-screen h-[2250px] bg-gradient-to-b from-room-roof via-room-bg via-70% to-room-bg"
          style={{ transformOrigin: "top", transform: "rotateX(-90deg)" }}
        />
        {CHECKPOINTS.map((pos, i) => (
          <div 
            key={i}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ transform: `translateZ(${-pos}px)` }}
          >
            <div className={`w-1/2 h-1/2 border border-hologram-moderate/40 rounded-full flex items-center justify-center transition-opacity duration-1000 ${currentIndex === i ? 'opacity-100' : 'opacity-10'}`}>
              <span className="text-[10px] text-hologram-moderate">POINT_{i}</span>
            </div>
          </div>
        ))}
      </motion.div>
      <div className="absolute top-4 right-4 z-10 md:hover:scale-105 transition">
        <button
          onClick={() => setIsDark(prev => !prev)}
          className="bg-button-bg text-button-text border border-button-border px-3 md:px-5 py-2 md:py-1 hover:bg-button-hover transition" style={{clipPath:"polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0% calc(100% - 15px))"}}
        >
          {isDark ? (<><Sun className="w-5 h-5 md:hidden" /><span className="hidden md:inline">Light Mode</span></>) : (<><Moon className="w-5 h-5 md:hidden" /><span className="hidden md:inline">Dark Mode</span></>)}
        </button>
        <div className="absolute left-0 bottom-0 bg-button-text w-full h-full" style={{ clipPath: "polygon(0 calc(100% - 15px), 15px 100%, 14px 100%, 0 calc(100% - 14px))" }}></div>
        <div className="absolute right-0 top-0 bg-button-text w-full h-full" style={{ clipPath: "polygon(calc(100% - 13px) 0, 100% 0, 100% 13px)" }}></div>
        <div className="absolute right-0 top-0 bg-button-text w-full h-full" style={{ clipPath: "polygon(calc(100% - 20px) 0, calc(100% - 17px) 0, 100% 17px, 100% 20px)" }}></div>
      </div>
    </main>
  );
}