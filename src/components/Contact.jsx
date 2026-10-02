import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin, Code, Copy, Check, Send, ArrowUp, Sparkles, Heart } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);

  const email = 'samvithak7@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(null), 5000);
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/samvithak7-coder',
      handle: 'samvithak7-coder',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kesapragada-samvitha',
      handle: 'kesapragada-samvitha',
      icon: Linkedin,
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/u/keve23ainds/',
      handle: 'keve23ainds',
      icon: Code,
    },
  ];

  return (
    <section id="contact" className="relative w-full pt-24 pb-12 px-6 md:px-12 lg:px-16 z-20 bg-gradient-to-b from-[#0D0506]/85 to-[#070203]/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-widest text-white/90 mb-3">
            <Mail className="w-3.5 h-3.5" /> Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-400">Extraordinary</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Left Column: Direct Contact Info & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card rounded-3xl p-8 border border-white/15 relative overflow-hidden">
              <h3 className="text-2xl font-bold text-white mb-2">Direct Contact</h3>
              <p className="text-white/70 text-sm mb-6">
                Open to full-time roles, AI research collaborations, embedded safety projects, and freelance work.
              </p>

              {/* Email Card with Copy Button */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-white/50 block">EMAIL ADDRESS</span>
                    <a href={`mailto:${email}`} className="text-white font-semibold text-sm hover:underline">
                      {email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#D31820] transition-colors relative"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Toast confirmation */}
              {copied && (
                <div className="mb-4 p-2.5 rounded-xl bg-green-500/20 border border-green-500/40 text-green-200 text-xs text-center font-semibold animate-fade-in">
                  ✓ Email address copied to clipboard!
                </div>
              )}

              {/* Phone Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-white/50 block">PHONE / WHATSAPP</span>
                  <a href="tel:+916360194317" className="text-white font-semibold text-sm hover:underline">
                    +91 6360194317
                  </a>
                </div>
              </div>

              {/* Social Link Cards */}
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                Online Profiles
              </h4>
              <div className="space-y-2.5">
                {socialLinks.map((social) => {
                  const IconComp = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-white/30 flex items-center justify-between text-white hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <IconComp className="w-4 h-4 text-white/70 group-hover:text-white" />
                        <span className="text-sm font-semibold">{social.name}</span>
                      </div>
                      <span className="text-xs text-white/50 group-hover:text-white/80 font-mono">
                        {social.handle} →
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Quick Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 border border-white/15">
              <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-white/70 text-sm mb-6">
                Have a project idea or inquiry? Leave a message below and I'll respond promptly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Samvitha, I would love to discuss..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full py-3.5 px-6 rounded-xl bg-white text-[#D31820] font-bold text-sm hover:bg-white/90 shadow-[0_10px_25px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2"
                >
                  {formStatus === 'sending' ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {formStatus === 'success' && (
                  <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/40 text-green-200 text-xs text-center font-semibold">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-medium">
          <p>© {new Date().getFullYear()} Kesapragada Samvitha. Built with React & HTML5 Canvas.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-card hover:bg-white/10 text-white transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
