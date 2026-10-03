import React from 'react';
import CustomCursor from './components/CustomCursor';
import CanvasCharacterViewer from './components/CanvasCharacterViewer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ExperienceEducation from './components/ExperienceEducation';
import Skills from './components/Skills';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen text-white selection:bg-white selection:text-[#D31820]">
      {/* Custom Glowing Cursor */}
      <CustomCursor />

      {/* Interactive 3D Canvas Background (Renders solid red + character behind everything) */}
      <CanvasCharacterViewer />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Content Sections Layered Above Canvas */}
      <main className="relative z-10 pointer-events-auto">
        <Hero />
        <Projects />
        <ExperienceEducation />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}