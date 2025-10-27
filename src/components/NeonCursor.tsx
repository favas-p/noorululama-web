'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'motion/react';
import './NeonCursor.css';

// Color mapping for different gradient classes
const colorMap: { [key: string]: { primary: string; secondary: string } } = {
  'from-purple-500 to-pink-500': { primary: '168, 85, 247', secondary: '236, 72, 153' },
  'from-blue-500 to-indigo-500': { primary: '59, 130, 246', secondary: '99, 102, 241' },
  'from-blue-500 to-indigo-600': { primary: '59, 130, 246', secondary: '79, 70, 229' },
  'from-emerald-500 to-green-500': { primary: '16, 185, 129', secondary: '34, 197, 94' },
  'from-emerald-500 to-teal-500': { primary: '16, 185, 129', secondary: '20, 184, 166' },
  'from-emerald-500 to-teal-600': { primary: '16, 185, 129', secondary: '13, 148, 136' },
  'from-emerald-500 to-cyan-500': { primary: '16, 185, 129', secondary: '6, 182, 212' },
  'from-red-500 to-rose-500': { primary: '239, 68, 68', secondary: '244, 63, 94' },
  'from-orange-500 to-red-600': { primary: '249, 115, 22', secondary: '220, 38, 38' },
  'from-orange-500 to-amber-500': { primary: '249, 115, 22', secondary: '245, 158, 11' },
  'from-teal-500 to-cyan-500': { primary: '20, 184, 166', secondary: '6, 182, 212' },
  'from-violet-500 to-purple-500': { primary: '139, 92, 246', secondary: '168, 85, 247' },
  'from-amber-500 to-yellow-500': { primary: '245, 158, 11', secondary: '234, 179, 8' },
  'from-pink-500 to-rose-500': { primary: '236, 72, 153', secondary: '244, 63, 94' },
  'from-green-500 to-emerald-500': { primary: '34, 197, 94', secondary: '16, 185, 129' },
  'from-green-500 to-emerald-600': { primary: '34, 197, 94', secondary: '5, 150, 105' },
  'from-indigo-500 to-blue-500': { primary: '99, 102, 241', secondary: '59, 130, 246' },
  'from-slate-500 to-gray-500': { primary: '100, 116, 139', secondary: '107, 114, 128' },
  'from-amber-500 to-orange-500': { primary: '245, 158, 11', secondary: '249, 115, 22' },
  'from-green-500 to-lime-500': { primary: '34, 197, 94', secondary: '132, 204, 22' },
  'from-cyan-500 to-blue-600': { primary: '6, 182, 212', secondary: '37, 99, 235' },
  'from-purple-500 to-pink-600': { primary: '168, 85, 247', secondary: '219, 39, 119' },
};

const defaultColor = { primary: '16, 185, 129', secondary: '20, 184, 166' }; // emerald-to-teal

const NeonCursor = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentColor, setCurrentColor] = useState(defaultColor);
  const trailControls = useAnimation();
  const glowControls = useAnimation();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition((prev) => ({
      ...prev,
      x: e.clientX,
      y: e.clientY,
    }));
  }, []);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, input, [data-hover="true"]')) {
        setIsHovering(true);
        void trailControls.start({
          scale: 1.5,
          borderColor: 'rgb(255, 150, 50)',
          borderWidth: '3px',
        });
        void glowControls.start({
          scale: 2,
          opacity: 0.8,
        });
      }
    },
    [trailControls, glowControls]
  );

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
    void trailControls.start({
      scale: 1,
      borderColor: 'rgb(236, 101, 23)',
      borderWidth: '2px',
    });
    void glowControls.start({
      scale: 1,
      opacity: 0.4,
    });
  }, [trailControls, glowControls]);

  useEffect(() => {
    const handleCursorColorChange = (e: CustomEvent) => {
      const colorClass = e.detail.color;
      const colors = colorMap[colorClass] || defaultColor;
      setCurrentColor(colors);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('cursorColorChange', handleCursorColorChange as EventListener);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('cursorColorChange', handleCursorColorChange as EventListener);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut]);

  return (
    <div className='neon-cursor-container'>
      {/* Main cursor dot */}
      <motion.div
        className='cursor-main'
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 400,
          mass: 0.5,
        }}
        style={{
          background: `radial-gradient(circle, rgb(${currentColor.primary}), rgb(${currentColor.secondary}))`,
          boxShadow: `
            0 0 10px rgba(${currentColor.primary}, 0.8),
            0 0 20px rgba(${currentColor.primary}, 0.6),
            0 0 30px rgba(${currentColor.primary}, 0.4)
          `,
        }}
      />

      {/* Trailing circle */}
      <motion.div
        className='cursor-trail'
        animate={{
          x: position.x - 20,
          y: position.y - 20,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          mass: 0.8,
        }}
        initial={false}
        style={{
          borderColor: `rgb(${currentColor.primary})`,
          boxShadow: `
            0 0 15px rgba(${currentColor.primary}, 0.5),
            inset 0 0 10px rgba(${currentColor.primary}, 0.3)
          `,
        }}
      />

      {/* Outer glow */}
      <motion.div
        className='cursor-glow'
        animate={{
          x: position.x - 30,
          y: position.y - 30,
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 150,
          mass: 1,
        }}
        initial={false}
        style={{
          background: `radial-gradient(
            circle,
            rgba(${currentColor.primary}, 0.4) 0%,
            rgba(${currentColor.secondary}, 0.2) 30%,
            transparent 70%
          )`,
        }}
      />
    </div>
  );
};

export default NeonCursor;
