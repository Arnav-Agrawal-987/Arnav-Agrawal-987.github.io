import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import Room from './components/Room';
import HUD from './components/HUD';
import IntroNode from './components/checkpoints/Introduction';

const CHECKPOINT_COMPONENTS = [
  IntroNode, // Node 0
  IntroNode, // Node 1 (Placeholder for Education)
  IntroNode, // Node 2 (Placeholder for Projects)
  IntroNode, // Node 3 (Placeholder for Experience)
  IntroNode, // Node 4 (Placeholder for Skills Matrix)
];

const N = CHECKPOINT_COMPONENTS.length;
const TOTAL_DEPTH = 1000;
const CHECKPOINTS = Array.from({ length: N }, (_, index) => (TOTAL_DEPTH / (N - 1)) * index);
const PERSPECTIVE = TOTAL_DEPTH / (N - 1);
const OFFSET = PERSPECTIVE / 2.5;

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const zPos = useMotionValue(0);
  const smoothZ = useSpring(zPos, { stiffness: 40, damping: 10 });
  
  const zeroCamera = useTransform(smoothZ, (value) => value + OFFSET);
  const pipeProgress = useTransform(
    smoothZ, 
    [0, TOTAL_DEPTH], 
    [0, 1], 
    { ease: (t) => Math.max(Math.pow(t, 5), 0.4 * t) }
  );

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 70) {
        if (currentIndex < CHECKPOINTS.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (e.deltaY < -70) {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
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
      
      <HUD isDark={isDark} setIsDark={setIsDark} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} totalNodes={N} />

      <motion.div className="relative w-full h-full" style={{ translateZ: zeroCamera, transformStyle: "preserve-3d" }}>
        
        <Room pipeProgress={pipeProgress} />

        {CHECKPOINT_COMPONENTS.map((Component, i) => {
          const posZ = CHECKPOINTS[i];
          return (
            <div 
              key={`checkpoint-node-${i}`}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transform: `translateZ(${-posZ}px)`, transformStyle: "preserve-3d" }}
            >
              <Component isActive={currentIndex === i} />
            </div>
          );
        })}

      </motion.div>
    </main>
  );
}