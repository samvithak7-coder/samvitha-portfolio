import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 160;
const RESPONSIVENESS = 0.45;
const ANGLE_OFFSET = Math.PI / 2;
const REVERSE_DIRECTION = false;
const DEADZONE_RADIUS_RATIO = 0.12;

export default function CanvasCharacterViewer() {
  const canvasRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const framesRef = useRef([]);
  const centerImageRef = useRef(null);

  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentAngleRef = useRef(0);
  const animationFrameRef = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    let mounted = true;
    let count = 0;
    const images = [];

    const updateProgress = () => {
      count++;
      if (mounted) {
        setLoadedCount(count);
        // Force loaded state once at least 10% of frames load or all finish
        if (count >= 15) {
          setIsLoaded(true);
        }
      }
    };

    // Construct origin-relative paths
    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    const centerImg = new Image();
    centerImg.src = `${origin}/frames/center.webp`;
    centerImg.onload = updateProgress;
    centerImg.onerror = updateProgress;
    centerImageRef.current = centerImg;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `${origin}/frames/frame_${numStr}.webp`;
      img.onload = updateProgress;
      img.onerror = updateProgress;
      images[i] = img;
    }
    framesRef.current = images;

    // Safety fallback: force display after 2.5 seconds regardless of network status
    const timeout = setTimeout(() => {
      if (mounted) setIsLoaded(true);
    }, 2500);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
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
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
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

      let imgToDraw = null;
      if (isDeadzone || isScrolledDown) {
        imgToDraw = centerImageRef.current;
      } else {
        imgToDraw = framesRef.current[frameIndex] || centerImageRef.current;
      }

      // Fallback to center image if frame index isn't ready
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
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLoaded]);

  const progressPercent = Math.min(100, Math.round((loadedCount / (TOTAL_FRAMES + 1)) * 100));

  return (
    <div className="fixed inset-0 w-full h-screen -z-10 overflow-hidden pointer-events-none">
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#D31820] flex flex-col items-center justify-center z-50 pointer-events-auto">
          <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
            <span className="font-bold text-white text-lg font-mono">{progressPercent}%</span>
          </div>
          <p className="text-white/90 text-sm font-semibold tracking-widest uppercase mb-3">
            Loading Interactive 3D Experience...
          </p>
          <div className="w-64 h-1.5 bg-black/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-150 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}