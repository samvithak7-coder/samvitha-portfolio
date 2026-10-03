import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 160;
const RESPONSIVENESS = 0.45;
const ANGLE_OFFSET = Math.PI / 2;
const REVERSE_DIRECTION = false;
const DEADZONE_RADIUS_RATIO = 0.12;

export default function CanvasCharacterViewer() {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const centerImageRef = useRef(null);

  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentAngleRef = useRef(0);
  const animationFrameRef = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    // 1. Preload center fallback
    const centerImg = new Image();
    centerImg.src = '/frames/center.webp';
    centerImageRef.current = centerImg;

    // 2. Preload 160 frames into ref array without blocking render
    const images = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/frame_${numStr}.webp`;
      images[i] = img;
    }
    framesRef.current = images;

    // 3. Track mouse & scroll
    const handleScroll = () => { scrollRef.current = window.scrollY; };
    const handleMouseMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // 4. Canvas setup & animation loop
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#D31820';
      ctx.fillRect(0, 0, width, height);

      const faceX = width / 2;
      const faceY = height / 2;

      const dx = mouseRef.current.x - faceX;
      const dy = mouseRef.current.y - faceY;

      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDimension = Math.min(width, height);
      const deadzoneRadius = minDimension * DEADZONE_RADIUS_RATIO;

      const isDeadzone = dist < deadzoneRadius;
      const isScrolledDown = scrollRef.current > 150;

      const targetAngle = Math.atan2(dy, dx) + ANGLE_OFFSET;

      let diff = targetAngle - currentAngleRef.current;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;

      currentAngleRef.current += diff * RESPONSIVENESS;

      let normalizedAngle = ((currentAngleRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      if (REVERSE_DIRECTION) {
        normalizedAngle = (2 * Math.PI - normalizedAngle) % (2 * Math.PI);
      }

      const frameIndex = Math.floor((normalizedAngle / (2 * Math.PI)) * TOTAL_FRAMES) % TOTAL_FRAMES;

      let imgToDraw = (isDeadzone || isScrolledDown)
        ? centerImageRef.current
        : (framesRef.current[frameIndex] || centerImageRef.current);

      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        imgToDraw = centerImageRef.current;
      }

      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        const scale = Math.max(width / imgToDraw.naturalWidth, height / imgToDraw.naturalHeight);
        const drawWidth = imgToDraw.naturalWidth * scale;
        const drawHeight = imgToDraw.naturalHeight * scale;
        const drawX = (width - drawWidth) / 2;
        const drawY = (height - drawHeight) / 2;

        ctx.drawImage(imgToDraw, drawX, drawY, drawWidth, drawHeight);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}