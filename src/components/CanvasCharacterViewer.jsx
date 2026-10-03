import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 160;
const RESPONSIVENESS = 0.35;
const ANGLE_OFFSET = Math.PI / 2;

export default function CanvasCharacterViewer() {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const centerImageRef = useRef(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentAngleRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const baseUrl = import.meta.env.BASE_URL || '/';

    // 1. Preload center image
    const centerImg = new Image();
    centerImg.src = `${baseUrl}frames/center.webp`;
    centerImageRef.current = centerImg;

    // 2. Preload 160 WebP frames with Safari explicit load event handling
    const images = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `${baseUrl}frames/frame_${numStr}.webp`;
      images[i] = img;
    }
    framesRef.current = images;

    // 3. Mouse & Touch handlers
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 4. Resize Calibration for Safari
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 5. Main Render Loop
    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.fillStyle = '#D31820';
      ctx.fillRect(0, 0, width, height);

      const dx = mouseRef.current.x - width / 2;
      const dy = mouseRef.current.y - height / 2;

      const targetAngle = Math.atan2(dy, dx) + ANGLE_OFFSET;
      let diff = targetAngle - currentAngleRef.current;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      currentAngleRef.current += diff * RESPONSIVENESS;

      let normalizedAngle = ((currentAngleRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const frameIndex = Math.floor((normalizedAngle / (2 * Math.PI)) * TOTAL_FRAMES) % TOTAL_FRAMES;

      let imgToDraw = framesRef.current[frameIndex];

      // Robust check for Safari image readiness
      const isLoaded = (img) => img && (img.complete || img.naturalWidth > 0);

      if (!isLoaded(imgToDraw)) {
        imgToDraw = centerImageRef.current;
      }

      if (isLoaded(imgToDraw) && imgToDraw.naturalWidth > 0) {
        const scale = Math.max(width / imgToDraw.naturalWidth, height / imgToDraw.naturalHeight);
        const drawWidth = imgToDraw.naturalWidth * scale;
        const drawHeight = imgToDraw.naturalHeight * scale;

        const drawX = (width - drawWidth) / 2 + (width > 768 ? 120 : 0);
        const drawY = (height - drawHeight) / 2;

        ctx.drawImage(imgToDraw, drawX, drawY, drawWidth, drawHeight);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}