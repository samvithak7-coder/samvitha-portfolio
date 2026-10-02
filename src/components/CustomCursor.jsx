import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.interactive') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA';
      
      setIsHovered(!!isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    const followMouse = () => {
      setRingPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(followMouse);
    };

    animationFrameId = requestAnimationFrame(followMouse);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Trailing Ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-transform duration-100 ease-out ${
          isHovered
            ? 'w-14 h-14 -translate-x-1/2 -translate-y-1/2 border-2 border-white bg-white/10 backdrop-blur-[2px]'
            : 'w-10 h-10 -translate-x-1/2 -translate-y-1/2 border border-white/60 bg-white/5'
        }`}
        style={{
          transform: `translate3d(${ringPosition.x - (isHovered ? 28 : 20)}px, ${
            ringPosition.y - (isHovered ? 28 : 20)
          }px, 0)`,
          boxShadow: isHovered
            ? '0 0 25px rgba(255, 255, 255, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.4)'
            : '0 0 15px rgba(255, 77, 85, 0.4)',
        }}
      />
      {/* Center Glowing Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2.5 h-2.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_#ffffff]"
        style={{
          transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0)`,
        }}
      />
    </>
  );
}
