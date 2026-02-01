import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Target, Zap, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { caseStudies, CaseStudy } from '../data/caseStudies';

const CaseStudyCard: React.FC<{ study: CaseStudy; index: number }> = ({ study, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl dark:shadow-none hover:border-indigo-500/30 transition-all duration-500 transform will-change-transform">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Image Side */}
          <div className={`relative h-64 lg:h-auto overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
            <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0 duration-500 pointer-events-none" />
            
            <motion.div 
              style={{ y }} 
              className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
              <img 
                src={study.image} 
                alt={study.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>
            
            {/* Tags Overlay */}
            <div className="absolute bottom-6 left-6 z-20 flex flex-wrap gap-2 pointer-events-none">
              {study.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div className="p-8 md:p-12 flex flex-col justify-between relative z-20 bg-white dark:bg-[#121212]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-xs">{study.industry}</span>
                <span className="w-1 h-1 bg-slate-300 dark:bg-white/20 rounded-full" />
                <span className="text-slate-500 dark:text-gray-400 text-sm">{study.client}</span>
              </div>
              
              <Link to={`/case-studies/${study.id}`} className="group/link">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 group-hover/link:text-indigo-500 transition-colors">
                    {study.title}
                  </h2>
              </Link>

              <div className="space-y-6 mb-8">
                <div>
                   <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-wide">
                     <Target className="w-4 h-4 text-rose-500" /> The Challenge
                   </h4>
                   <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                     {study.challenge}
                   </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 border-t border-slate-100 dark:border-white/5 pt-6">
                <div className="flex gap-4">
                    {study.results.slice(0, 2).map((result, i) => (
                        <div key={i}>
                            <div className="font-bold text-indigo-600 dark:text-indigo-400">{result.value}</div>
                            <div className="text-[10px] uppercase text-slate-400">{result.label}</div>
                        </div>
                    ))}
                </div>
                <Link 
                    to={`/case-studies/${study.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    Read Full Story <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CaseStudies: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo-600 dark:text-indigo-400 font-medium tracking-wider uppercase text-sm mb-4 block">Proven Results</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-8 text-slate-900 dark:text-white">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">Success</span> Stories
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              Deep dives into how we solve complex problems. We don't just deliver code; we deliver measurable business impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Loop */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-100 dark:bg-white/5 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">Have a similar challenge?</h2>
            <p className="text-slate-600 dark:text-gray-400 mb-8">
                We apply this same level of engineering rigor and design excellence to every project we touch.
            </p>
            <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-indigo-500/25"
            >
                Start Your Success Story <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
      </section>

    </div>
  );
};

export default CaseStudies;