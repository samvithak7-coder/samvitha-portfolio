import React, { useEffect, useRef, useState } from 'react';

// Configurable constants for fine-tuning 3D character tracking & rotation
const TOTAL_FRAMES = 160;
const RESPONSIVENESS = 0.45; // 0.45 lerp factor for zero-lag high-speed tracking
const ANGLE_OFFSET = Math.PI / 2; // Offset angle to align frame 0 cleanly with mouse orientation
const REVERSE_DIRECTION = false; // Set to true if frame sequence rotates counter-clockwise
const DEADZONE_RADIUS_RATIO = 0.12; // ~12% radius deadzone around face center

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

  // Preload all 160 frames + center.webp
  useEffect(() => {
    let mounted = true;
    let count = 0;
    const images = [];

    const updateProgress = () => {
      count++;
      if (mounted) {
        setLoadedCount(count);
        if (count >= TOTAL_FRAMES + 1) {
          setIsLoaded(true);
        }
      }
    };

    // Load center.webp
    const centerImg = new Image();
    centerImg.src = '/frames/center.webp';
    centerImg.onload = updateProgress;
    centerImg.onerror = updateProgress;
    centerImageRef.current = centerImg;

    // Load frame_000.webp through frame_159.webp
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/frame_${numStr}.webp`;
      img.onload = updateProgress;
      img.onerror = updateProgress;
      images[i] = img;
    }
    framesRef.current = images;

    return () => {
      mounted = false;
    };
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse coordinates
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

  // Main 60 FPS Render Loop
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

      // 1. Clear canvas completely & fill background with exact #D31820 red for crisp single-frame rendering
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#D31820';
      ctx.fillRect(0, 0, width, height);

      // Face center coordinates (center of screen)
      const faceX = width / 2;
      const faceY = height / 2;

      const dx = mouseRef.current.x - faceX;
      const dy = mouseRef.current.y - faceY;

      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDimension = Math.min(width, height);
      const deadzoneRadius = minDimension * DEADZONE_RADIUS_RATIO; // ~12% radius deadzone

      const isDeadzone = dist < deadzoneRadius;
      const isScrolledDown = scrollRef.current > 150; // Static center face when scrolled down

      // Calculate target mouse angle relative to face center with ANGLE_OFFSET
      const targetAngle = Math.atan2(dy, dx) + ANGLE_OFFSET;

      // Apply shortest-path circular lerp with RESPONSIVENESS factor (0.45)
      let diff = targetAngle - currentAngleRef.current;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;

      currentAngleRef.current += diff * RESPONSIVENESS;

      // Normalize angle to [0, 2π)
      let normalizedAngle = ((currentAngleRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Optional direction reversal for counter-clockwise frame sequences
      if (REVERSE_DIRECTION) {
        normalizedAngle = (2 * Math.PI - normalizedAngle) % (2 * Math.PI);
      }

      // Convert normalized angle to frame index (0..159)
      const frameIndex = Math.floor((normalizedAngle / (2 * Math.PI)) * TOTAL_FRAMES) % TOTAL_FRAMES;

      // Pick frame image: if inside deadzone OR scrolled down, render static center.webp
      let imgToDraw = null;
      if (isDeadzone || isScrolledDown) {
        imgToDraw = centerImageRef.current;
      } else {
        imgToDraw = framesRef.current[frameIndex] || centerImageRef.current;
      }

      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        // Calculate scaling to center character on screen cleanly and proportionally
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
      {/* Loading Overlay */}
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

      {/* Fullscreen HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />

      {/* Ambient Radial Shadow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}