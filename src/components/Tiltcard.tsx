import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; 
  glowColor?: string; 
  glowClipPath?: string;
}

export default function TiltCard({ 
  children, 
  className = "", 
  style, 
  maxTilt = 10, 
  glowColor = "var(--color-button-hover)",
  glowClipPath,
  ...rest 
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hoverOpacity = useMotionValue(0);

  const smoothOpacity = useSpring(hoverOpacity, { stiffness: 300, damping: 20 });

  // Attract Tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [-maxTilt, maxTilt]), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [maxTilt, -maxTilt]), { stiffness: 250, damping: 20 });

  const backgroundTemplate = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    x.set(localX / rect.width - 0.5);
    y.set(localY / rect.height - 0.5);
    mouseX.set(localX);
    mouseY.set(localY);
  };

  const handleMouseEnter = () => hoverOpacity.set(1);

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    hoverOpacity.set(0);
  };

  return (
    <div 
      className={className} 
      style={{ perspective: "800px", ...style }} 
      {...rest}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        <motion.div 
          className="pointer-events-none absolute inset-0 z-0"
          style={{ 
            background: backgroundTemplate,
            opacity: smoothOpacity,
            clipPath: glowClipPath
          }} 
        />

        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}