import React from 'react';
import { Award, ShieldAlert, Stethoscope, QrCode, ExternalLink, Cpu, Brain, Layers, CheckCircle2 } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      id: 'vigil-netra',
      title: 'Vigil Netra',
      subtitle: 'Embedded Vehicle Accident Data Recording & Safety System',
      award: '🏆 3rd Prize Winner - Mini Project Exhibition',
      badge: 'Embedded ML & Safety',
      icon: ShieldAlert,
      description:
        'An end-to-end intelligent vehicle safety architecture integrating embedded hardware, real-time telemetry logging, computer vision drowsiness detection, and machine learning crash severity prediction.',
      highlights: [
        'Real-time GPS & Accelerometer telemetry logging for blackbox analytics',
        'TensorFlow & Scikit-learn models for instant crash severity prediction',
        'OpenCV facial landmark analysis for driver fatigue & drowsiness alerts',
        'Automated emergency dispatch notifications with live location payload'
      ],
      tags: ['TensorFlow', 'Scikit-learn', 'OpenCV', 'Python', 'Embedded C / IoT', 'GPS & IMU', 'Computer Vision']
    },
    {
      id: 'smart-hospital',
      title: 'Smart Hospital Appointment System',
      subtitle: 'AI Triage & Live Workload Analytics Platform',
      badge: 'AI & Healthcare Analytics',
      icon: Stethoscope,
      description:
        'Next-generation healthcare triage engine that dynamically assesses patient symptom severity using local LLM intelligence while visualizing hospital resources in real time.',
      highlights: [
        'AI Triage powered by Ollama LLM for automated symptom analysis & queue prioritization',
        'Embedded live Tableau interactive dashboards for doctor workload & bed availability visualization',
        'Secure patient portal with seamless booking workflow and automated reminders',
        'Role-based access control for medical staff and department administrators'
      ],
      tags: ['Ollama LLM', 'React.js', 'Tableau API', 'Python', 'REST API', 'Node.js', 'Healthcare AI']
    },
    {
      id: 'qr-payment',
      title: 'Secure QR Code Payment Generator',
      subtitle: 'Dynamic Full-Stack Cryptographic Payment Gateway',
      badge: 'Full-Stack & Fintech Security',
      icon: QrCode,
      description:
        'Full-stack payment link and dynamic QR code generation platform designed with microservices architecture, instant parameter encoding, and tamper-proof security features.',
      highlights: [
        'Dynamic UPI & Banking QR code payload generation with custom merchant parameters',
        'Robust RESTful API routing and backend validation implemented in Python Flask',
        'Cryptographic checksum verification to prevent transaction tampering',
        'Clean responsive user interface with instant one-click download & copy capabilities'
      ],
      tags: ['Python Flask', 'RESTful Routing', 'QR Encoding', 'Security & Cryptography', 'JavaScript', 'Tailwind CSS']
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
            Innovative solutions spanning embedded machine learning, AI triage engines, computer vision, and secure web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
