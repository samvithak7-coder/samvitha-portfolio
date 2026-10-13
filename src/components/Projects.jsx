import React from 'react';
import { Award, ShieldAlert, Bot, FileSearch, Mic, ExternalLink, Github, Brain, CheckCircle2 } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      id: 'interview-analyzer',
      title: 'AI Interview Analyzer',
      subtitle: 'Automated Candidate Evaluation System',
      badge: 'Full-Stack AI',
      icon: Mic,
      description:
        'An end-to-end full-stack web application that evaluates interview responses using LLM-based speech and sentiment analytics.',
      highlights: [
        'Containerized microservice backend built with Docker, FastAPI, and Uvicorn, hosted on Render',
        'LLM-based speech and sentiment analytics to evaluate candidate responses',
        'Integrated drowsiness detection alerts and an emergency assistance button to enhance road safety'
      ],
      tags: ['Python', 'Docker', 'FastAPI', 'Uvicorn', 'LLM APIs', 'HTML/CSS', 'JavaScript'],
      links: [
        { label: 'Live Demo', url: 'https://interview-analyzer-vgit.onrender.com', icon: ExternalLink },
        { label: 'GitHub', url: 'https://github.com/samvithak7-coder/interview-analyzer', icon: Github }
      ]
    },
    {
      id: 'ai-lead-assistant',
      title: 'AI Lead Assistant',
      subtitle: 'WordPress Plugin with Flask & LLM Backend',
      badge: 'LLM & WordPress',
      icon: Bot,
      description:
        'An AI chat assistant for business websites that answers visitor questions, remembers the conversation, and guides visitors to share their contact details for follow-up.',
      highlights: [
        'Python/Flask REST API integrating the Gemini LLM API with a business-specific system prompt, multi-turn memory, automatic model fallback, request timeouts and per-IP rate limiting',
        'Custom PHP WordPress plugin that adds a floating chat widget to any WordPress site',
        'Serverless deployment on Vercel, with a public demo page and a one-click WordPress Playground demo so recruiters can try it without installing anything'
      ],
      tags: ['Python', 'Flask', 'Gemini API', 'REST APIs', 'PHP', 'WordPress', 'JavaScript', 'HTML/CSS', 'Vercel', 'Git/GitHub'],
      links: [
        { label: 'Live Demo', url: 'https://ai-lead-assistant-backend.vercel.app', icon: ExternalLink },
        { label: 'Backend', url: 'https://github.com/samvithak7-coder/ai-lead-assistant-backend', icon: Github },
        { label: 'WP Plugin', url: 'https://github.com/samvithak7-coder/ai-lead-assistant-wp-plugin', icon: Github }
      ]
    },
    {
      id: 'ai-research-agent',
      title: 'AI Research & Report Generator',
      subtitle: 'Serverless Multi-Section Report Automation',
      badge: 'Generative AI',
      icon: FileSearch,
      description:
        'A serverless full-stack web application that automates query processing and multi-section technical report generation.',
      highlights: [
        'Flask backend using the Google GenAI SDK with secure, environment-injected API keys',
        'Responsive dark-mode frontend with real-time pipeline status tracking and dynamic markdown rendering',
        'Deployed natively on Vercel'
      ],
      tags: ['Python', 'Flask', 'Google Gemini API', 'HTML', 'CSS', 'Vercel'],
      links: [
        { label: 'Live Demo', url: 'https://ai-research-agent-eta-weld.vercel.app/', icon: ExternalLink },
        { label: 'GitHub', url: 'https://github.com/samvithak7-coder/ai-research-agent', icon: Github }
      ]
    },
    {
      id: 'vigil-netra',
      title: 'Vigil Netra',
      subtitle: 'Automotive Black Box for Vehicles',
      award: '🏆 3rd Prize - Mini Project Exhibition',
      badge: 'Embedded ML & Safety',
      icon: ShieldAlert,
      description:
        'An intelligent vehicle safety system integrating embedded hardware, real-time telemetry logging, computer vision drowsiness detection, and machine learning crash severity prediction. Research paper submitted to IEEE (under review).',
      highlights: [
        'Real-time GPS & accelerometer telemetry logging for black-box analytics',
        'TensorFlow & Scikit-learn models for crash severity prediction',
        'OpenCV facial landmark analysis for driver fatigue & drowsiness alerts',
        'Automated emergency notifications with live location payload'
      ],
      tags: ['TensorFlow', 'Scikit-learn', 'OpenCV', 'Python', 'Embedded C / IoT', 'GPS & IMU', 'Computer Vision']
    }
  ];

  return (
    <section id="work" className="relative w-full py-24 px-6 md:px-12 lg:px-16 z-20 bg-gradient-to-b from-transparent via-[#070203]/75 to-[#0D0506]/85 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-widest text-white/90 mb-3">
              <Brain className="w-3.5 h-3.5" /> Selected Work
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-400">Projects</span>
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-sm md:text-base">
            Full-stack AI applications built with Python, Flask, FastAPI and LLM APIs, plus an award-winning embedded safety system.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.id}
                className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group border border-white/15"
              >
                {/* Accent Glow Background */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D31820]/30 rounded-full blur-3xl group-hover:bg-[#FF4D55]/40 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-[#D31820] transition-all duration-300 shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 uppercase tracking-wider">
                      {project.badge}
                    </span>
                  </div>

                  {/* Award Banner if present */}
                  {project.award && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold">
                      <Award className="w-4 h-4 text-amber-300" />
                      <span>{project.award}</span>
                    </div>
                  )}

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-semibold text-white/60 mb-4 tracking-wide uppercase">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-8">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags */}
                <div>
                  <div className="h-px w-full bg-white/10 mb-6" />
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-[11px] font-medium text-white/70 hover:text-white hover:border-white/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  {project.links && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.links.map((link) => {
                        const LinkIcon = link.icon;
                        return (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#D31820] text-xs font-bold hover:bg-white/90 hover:-translate-y-0.5 transition-all"
                          >
                            <LinkIcon className="w-3.5 h-3.5" />
                            {link.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}