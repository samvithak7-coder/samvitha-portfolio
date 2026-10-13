import React from 'react';
import { Cpu, Code2, Database, Wrench, Sparkles, Server, Globe, Workflow, Bot } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Languages',
      icon: Code2,
      skills: ['Python', 'SQL', 'JavaScript', 'PHP (basic)', 'Java (basic)', 'C'],
    },
    {
      title: 'Backend & APIs',
      icon: Server,
      skills: ['Flask', 'FastAPI', 'REST APIs', 'Third-party API integration'],
    },
    {
      title: 'AI / LLM',
      icon: Cpu,
      skills: ['Gemini API', 'LLM APIs', 'Ollama (local LLMs)', 'Prompt engineering', 'Multi-turn conversation handling'],
    },
    {
      title: 'Web',
      icon: Globe,
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive design', 'WordPress plugin development'],
    },
    {
      title: 'Databases & Data',
      icon: Database,
      skills: ['MySQL', 'Pandas', 'NumPy', 'Matplotlib'],
    },
    {
      title: 'Tools & Cloud',
      icon: Wrench,
      skills: ['Git / GitHub', 'Docker', 'Vercel', 'Render', 'Linux (Ubuntu)'],
    },
    {
      title: 'AI-Assisted Development',
      icon: Bot,
      skills: ['Claude', 'Google Antigravity (Gemini)'],
    },
    {
      title: 'Automation & RAG',
      icon: Workflow,
      skills: ['n8n workflows', 'Webhooks', 'Embeddings', 'Vector databases'],
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

                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-medium text-white/80 hover:text-white hover:border-white/30 transition-colors"
                    >
                      {skill}
                    </span>
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