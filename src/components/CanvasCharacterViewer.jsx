import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 160;
const RESPONSIVENESS = 0.45;
const ANGLE_OFFSET = Math.PI / 2;

export default function CanvasCharacterViewer() {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const centerImageRef = useRef(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentAngleRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // 1. Preload center frame
    const centerImg = new Image();
    centerImg.src = '/frames/center.webp';
    centerImageRef.current = centerImg;

    // 2. Preload 160 frame webp images
    const images = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/frame_${numStr}.webp`;
      images[i] = img;
    }
    framesRef.current = images;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      // Scale canvas resolution to matching screen size with devicePixelRatio for high-DPI
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Draw background base color
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
      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        imgToDraw = centerImageRef.current;
      }

      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        // Full cover scale calculation
        const scale = Math.max(width / imgToDraw.naturalWidth, height / imgToDraw.naturalHeight);
        const drawWidth = imgToDraw.naturalWidth * scale;
        const drawHeight = imgToDraw.naturalHeight * scale;
        const drawX = (width - drawWidth) / 2;
        const drawY = (height - drawHeight) / 2;

        ctx.drawImage(imgToDraw, drawX, drawY, drawWidth, drawHeight);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}