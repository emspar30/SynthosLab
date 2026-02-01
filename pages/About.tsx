import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Zap, Shield, Globe, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const stats = [
    { label: 'Years Active', value: '3+' },
    { label: 'Projects Shipped', value: '50+' },
    { label: 'Team Members', value: '12' },
    { label: 'Industry Awards', value: '8' },
  ];

  const team = [
    {
      name: 'Alex Rivera',
      role: 'Founder & Technical Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&h=1000',
      bio: 'Former Engineering Lead at a Fortune 500 fintech. Alex specializes in scalable microservices and high-performance React architecture, ensuring every line of code serves a business purpose.'
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=800&h=1000',
      bio: 'Award-winning creative director with a background in cognitive science. Sarah crafts digital experiences that are not just seen but felt, driving emotional connection and user retention.'
    },
    {
      name: 'Marcus Thorne',
      role: 'AI Solutions Architect',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=800&h=1000',
      bio: 'PhD in Computational Linguistics. Marcus bridges the gap between raw LLM capabilities and practical business applications, building the brains behind our custom automation tools.'
    },
    {
      name: 'Elena Volkov',
      role: 'Lead Strategist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=800&h=1000',
      bio: 'Digital strategist with a decade of experience in SaaS growth. Elena translates complex market data into actionable product roadmaps that position our clients for long-term dominance.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo-600 dark:text-indigo-400 font-medium tracking-wider uppercase text-sm mb-4 block">Our Story</span>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 text-slate-900 dark:text-white">
              We are the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">Architects</span><br />
              of the New Digital Frontier.
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              SynthosLab was founded on a simple premise: The future belongs to those who can seamlessly blend high-end aesthetics with the raw power of Artificial Intelligence.
            </p>
          </motion.div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* Stats Grid */}
      <section className="py-12 border-y border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <h3 className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-2">{stat.value}</h3>
                <p className="text-slate-500 dark:text-gray-500 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">Our DNA</h2>
              <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                We are not just a web design agency. We are a digital product lab. We believe that a website is a living, breathing entity that should work as hard as you do.
              </p>
              <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
                By integrating AI automation into our core design process, we deliver results that are not only visually stunning but operationally efficient. We don't just build for today; we build for the singularity.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Target, title: 'Precision', text: 'Pixel-perfect implementation of complex design systems.' },
                { icon: Zap, title: 'Velocity', text: 'Rapid deployment using modern frameworks and AI tools.' },
                { icon: Shield, title: 'Integrity', text: 'Robust security and scalable architecture by default.' },
                { icon: Award, title: 'Excellence', text: 'Award-winning aesthetics that drive conversion.' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                  <item.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                  <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-slate-100 dark:bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Meet the Visionaries</h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">The diverse team of experts behind your next digital breakthrough.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[3/4] bg-slate-200 dark:bg-white/5 shadow-md dark:shadow-none">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  {/* Soft Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-white font-display font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{member.name}</span>
                    <span className="text-indigo-400 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{member.role}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                    <div>
                        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{member.name}</h3>
                        <p className="text-indigo-600 dark:text-indigo-500 text-xs font-bold uppercase tracking-widest">{member.role}</p>
                    </div>
                    <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed border-t border-slate-200 dark:border-white/10 pt-3">
                        {member.bio}
                    </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-indigo-900 dark:bg-indigo-900/20 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 mix-blend-overlay" />
            </div>
            
            <div className="relative z-10 p-12 md:p-20 text-center">
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-white">Scale your vision with us.</h2>
                <p className="text-indigo-100 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Our team is ready to deploy enterprise-grade solutions tailored to your unique challenges. Stop guessing and start building.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                        to="/contact" 
                        className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-full hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    >
                        Hire Our Experts <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link 
                        to="/work" 
                        className="px-8 py-4 bg-indigo-800/50 text-white font-bold rounded-full hover:bg-indigo-800/70 border border-white/20 transition-all backdrop-blur-md"
                    >
                        View Case Studies
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;