import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, Sparkles, Building2, Globe } from 'lucide-react';

export default function ExperienceEducation() {
  const experiences = [
    {
      title: 'Data Processing & Research Intern',
      organization: 'CSIR Fourth Paradigm Institute (CSIR-4PI)',
      location: 'Bengaluru, India',
      period: 'Recent Research Internship',
      type: 'Research & Data Engineering',
      icon: Building2,
      details: [
        'Architected automated data preprocessing pipelines for high-dimensional scientific datasets.',
        'Performed exploratory data analysis (EDA), anomaly detection, and statistical modeling to surface key domain insights.',
        'Collaborated with scientific researchers to optimize data pipeline latency and analytical accuracy.'
      ],
      skills: ['Python', 'Pandas', 'NumPy', 'Data Pipelines', 'EDA', 'Statistical Modeling']
    },
    {
      title: 'Google Student Ambassador',
      organization: 'Gemini AI Movement',
      location: 'CMRIT Campus',
      period: 'Leadership & AI Advocacy',
      type: 'Community & AI Evangelism',
      icon: Globe,
      details: [
        'Pioneered AI outreach initiatives and technical workshops educating 200+ students on Generative AI & Gemini API.',
        'Organized hackathons, hands-on coding bootcamps, and developer community events focused on practical AI applications.',
        'Acted as a liaison between Google Developer Student networks and campus innovation groups.'
      ],
      skills: ['Generative AI', 'Gemini API', 'Community Leadership', 'Technical Mentorship', 'Event Management']
    }
  ];

  const education = {
    degree: 'Bachelor of Engineering (B.E.) in Artificial Intelligence & Data Science',
    institution: 'CMR Institute of Technology (CMRIT)',
    location: 'Bengaluru, Karnataka',
    period: 'Pursuing Degree',
    icon: GraduationCap,
    highlights: [
      'Specialized in Machine Learning, Computer Vision, Embedded Systems, and Data Engineering.',
      'Achieved 3rd Prize in Mini Project Exhibition for Vigil Netra vehicle safety innovation.',
      'Active contributor to tech communities, hackathons, and AI research projects.'
    ],
    coursework: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Data Structures & Algorithms',
      'Database Management (SQL)',
      'Embedded IoT Systems'
    ]
  };

  return (
    <section id="about" className="relative w-full py-24 px-6 md:px-12 lg:px-16 z-20 bg-[#0D0506]/85 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-widest text-white/90 mb-3">
            <Briefcase className="w-3.5 h-3.5" /> Career Journey
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-400">Education</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Experience Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-sm">
                💼
              </span>
              Work Experience
            </h3>

            <div className="space-y-6">
              {experiences.map((exp, index) => {
                const IconComponent = exp.icon;
                return (
                  <div
                    key={index}
                    className="glass-card glass-card-hover rounded-2xl p-7 relative border border-white/15 overflow-hidden group"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white/80 uppercase tracking-wide">
                          {exp.type}
                        </span>
                        <h4 className="text-xl font-bold text-white mt-2 group-hover:text-red-200 transition-colors">
                          {exp.title}
                        </h4>
                        <p className="text-sm font-semibold text-white/70 flex items-center gap-1.5 mt-0.5">
                          <IconComponent className="w-4 h-4 text-white/50" />
                          {exp.organization}
                        </p>
                      </div>
                      <div className="text-right text-xs text-white/60 font-medium space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6 text-sm text-white/80">
                      {exp.details.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D55] shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 rounded-md bg-black/40 border border-white/10 text-xs text-white/70"
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

          {/* Education Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-sm">
                🎓
              </span>
              Academic Background
            </h3>

            <div className="glass-card rounded-2xl p-7 border border-white/15 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-5 shadow-inner">
                <GraduationCap className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white/80 uppercase tracking-wide">
                Undergraduate Degree
              </span>

              <h4 className="text-xl font-bold text-white mt-3 mb-1">
                {education.degree}
              </h4>
              
              <p className="text-sm font-semibold text-white/80 mb-4">
                {education.institution} • {education.location}
              </p>

              <div className="space-y-3 mb-6 text-sm text-white/80">
                {education.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-5 border-t border-white/10">
                <h5 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                  Core Technical Coursework
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {education.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-medium text-white/80"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
