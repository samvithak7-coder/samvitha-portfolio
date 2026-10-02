import React from 'react';
import { Cpu, Code2, Database, Wrench, Sparkles, Terminal, Check } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      icon: Cpu,
      skills: [
        { name: 'TensorFlow & Keras', level: 'Advanced', percent: 90 },
        { name: 'Scikit-learn', level: 'Advanced', percent: 92 },
        { name: 'OpenCV & Computer Vision', level: 'Advanced', percent: 88 },
        { name: 'Ollama & LLM Integration', level: 'Intermediate', percent: 85 },
        { name: 'Deep Learning Architectures', level: 'Intermediate', percent: 84 },
      ],
    },
    {
      title: 'Full-Stack Development',
      icon: Code2,
      skills: [
        { name: 'React.js & Modern Frontend', level: 'Advanced', percent: 92 },
        { name: 'Python Flask', level: 'Advanced', percent: 90 },
        { name: 'JavaScript / ES6+', level: 'Advanced', percent: 90 },
        { name: 'HTML5 Canvas & 2D/3D Logic', level: 'Advanced', percent: 88 },
        { name: 'Tailwind CSS & Glassmorphism', level: 'Expert', percent: 95 },
      ],
    },
    {
      title: 'Data Science & Analytics',
      icon: Database,
      skills: [
        { name: 'Data Pipelines & Preprocessing', level: 'Advanced', percent: 90 },
        { name: 'Exploratory Data Analysis (EDA)', level: 'Advanced', percent: 94 },
        { name: 'Pandas & NumPy', level: 'Advanced', percent: 92 },
        { name: 'Tableau Live Dashboards', level: 'Advanced', percent: 88 },
        { name: 'SQL & Relational Databases', level: 'Intermediate', percent: 85 },
      ],
    },
    {
      title: 'Embedded Systems & Tools',
      icon: Wrench,
      skills: [
        { name: 'Embedded IoT & Sensors (GPS/IMU)', level: 'Advanced', percent: 86 },
        { name: 'Git & GitHub Version Control', level: 'Advanced', percent: 92 },
        { name: 'Linux / Shell Scripting', level: 'Intermediate', percent: 85 },
        { name: 'RESTful API Architecture', level: 'Advanced', percent: 90 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative w-full py-24 px-6 md:px-12 lg:px-16 z-20 bg-gradient-to-b from-[#0D0506]/85 via-[#070203]/85 to-[#0D0506]/85 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-widest text-white/90 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Core Competencies
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-400">Toolkit</span>
          </h2>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => {
            const IconComponent = category.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-3xl p-8 border border-white/15 relative overflow-hidden group hover:border-white/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-[#D31820] transition-all duration-300 shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    <p className="text-xs text-white/60 font-medium">Domain Proficiency</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-white/90 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-red-400" />
                          {skill.name}
                        </span>
                        <span className="text-white/60">{skill.level}</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-[#D31820] to-[#FF4D55] rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
