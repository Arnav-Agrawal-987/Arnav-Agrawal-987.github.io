import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CHECKPOINTS = [0,250,500,750,1000];
const PERSPECTIVE = 1000;

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const zPos = useMotionValue(0);
  const smoothZ = useSpring(zPos, { stiffness: 40, damping: 10 });
  const zeroCamera = useTransform(smoothZ, (value) => value + 800);
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
        <div className="absolute inset-1/4 bg-room-bg flex items-center justify-center"
          style={{ transform: "translateZ(-1000px)" }}
        />
        <div className="absolute left-0 w-[2250px] h-screen bg-gradient-to-r from-room-wall to-room-bg"
          style={{ transformOrigin: "left", transform: "rotateY(90deg)" }}
        />
        <div className="absolute right-0 w-[2250px] h-screen bg-gradient-to-l from-room-wall to-room-bg"
          style={{ transformOrigin: "right", transform: "rotateY(-90deg)" }}
        />
        <div className="absolute bottom-0 w-screen h-[2250px] bg-gradient-to-t from-room-floor to-room-bg"
          style={{ transformOrigin: "bottom", transform: "rotateX(90deg)" }}
        />
        <div className="absolute top-0 w-screen h-[2250px] bg-gradient-to-b from-room-roof to-room-bg"
          style={{ transformOrigin: "top", transform: "rotateX(-90deg)" }}
        />
        {CHECKPOINTS.map((pos, i) => (
          <div 
            key={i}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ transform: `translateZ(${-pos}px)` }}
          >
            <div className={`w-32 h-32 border border-hologram-cyan/40 rounded-full flex items-center justify-center transition-opacity duration-1000 ${currentIndex === i ? 'opacity-100' : 'opacity-10'}`}>
              <span className="text-[10px] text-hologram-cyan">POINT_{i}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </main>
  );
}