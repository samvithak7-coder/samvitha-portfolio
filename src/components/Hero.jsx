import React from 'react';
import { FileText, Send, Sparkles, MapPin, GraduationCap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 md:pb-16 pt-32 pointer-events-none z-10">
      
      {/* Top Right Status Badge */}
      <div className="absolute top-24 right-6 md:right-12 pointer-events-auto hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/20 text-xs font-semibold tracking-wide text-white shadow-lg">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <span>Available for AI & Software Roles</span>
      </div>

      {/* Hero Bottom-Left Typography & Content Box */}
      <div className="max-w-2xl pointer-events-auto">
        {/* Subtitle / Greeting */}
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-white/90 animate-pulse" />
          <p className="tracking-widest uppercase text-xs md:text-sm font-semibold text-white/90">
            Hi, I'm
          </p>
        </div>

        {/* Large Elegant Cursive Name */}
        <h1 className="font-cursive text-7xl sm:text-8xl md:text-9xl text-white font-bold leading-none tracking-wide glow-text my-1 select-none">
          Samvitha
        </h1>

        {/* Full Name & Title Tag */}
        <div className="flex flex-wrap items-center gap-3 mt-1 mb-4 text-white/90 text-sm font-semibold">
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
            Kesapragada Samvitha
          </span>
          <span className="flex items-center gap-1 text-white/80">
            <GraduationCap className="w-4 h-4" /> B.E. AI & Data Science
          </span>
          <span className="flex items-center gap-1 text-white/80">
            <MapPin className="w-4 h-4" /> Bengaluru, IN
          </span>
        </div>

        {/* Compact 3-Line Bio */}
        <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed mb-8 drop-shadow-md max-w-xl">
          AI & Data Science student specializing in machine learning, computer vision, embedded safety systems, and full-stack software development.
        </p>

        {/* Two White Pill Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Resume Button */}
          <a
            href="/K_V_P_S_SAMVITHA_RESUME  (1).pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#D31820] font-bold text-sm shadow-[0_10px_25px_rgba(255,255,255,0.3)] hover:bg-white/90 hover:shadow-[0_15px_35px_rgba(255,255,255,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
          >
            <FileText className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Resume</span>
          </a>

          {/* Let's Talk Button */}
          <a
            href="mailto:samvithak7@gmail.com"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#D31820] font-bold text-sm shadow-[0_10px_25px_rgba(255,255,255,0.3)] hover:bg-white/90 hover:shadow-[0_15px_35px_rgba(255,255,255,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
          >
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>Let's Talk</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Hint Indicator */}
      <div className="absolute bottom-6 right-8 hidden md:flex items-center gap-3 text-white/70 text-xs font-semibold tracking-widest uppercase pointer-events-auto">
        <span>Scroll to Explore</span>
        <div className="w-5 h-9 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
