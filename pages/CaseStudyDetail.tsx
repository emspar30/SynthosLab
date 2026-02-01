import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Zap, Quote, TrendingUp, ArrowRight, Share2 } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams();
  const study = caseStudies.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white">
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Case Study Not Found</h2>
            <Link to="/case-studies" className="text-indigo-600 dark:text-indigo-400 hover:underline">Back to Case Studies</Link>
        </div>
      </div>
    );
  }

  // Related Projects Logic
  const relatedProjects = caseStudies
    .filter(s => s.id !== study.id)
    .filter(s => s.industry === study.industry || s.tags.some(tag => study.tags.includes(tag)))
    .slice(0, 3); // Increased to 3

  const finalRelated = relatedProjects.length > 0 
    ? relatedProjects 
    : caseStudies.filter(s => s.id !== study.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 pb-20">
      
      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6 bg-white dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
         <div className="max-w-5xl mx-auto">
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to Case Studies
            </Link>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                        {study.industry}
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-600 dark:text-gray-400 font-medium">{study.client}</span>
                </div>
                
                <h1 className="font-display text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                    {study.title}
                </h1>

                <div className="flex flex-wrap gap-3">
                    {study.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-medium text-slate-600 dark:text-gray-300">
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
         </div>
      </section>

      {/* Hero Image - Removed negative margin to fix spacing issues */}
      <section className="px-6 py-12">
         <div className="max-w-6xl mx-auto">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10"
             >
                 <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
             </motion.div>
         </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-16">
              <div>
                  <h3 className="flex items-center gap-3 font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
                      <Target className="w-6 h-6 text-rose-500" /> The Challenge
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                      {study.challenge}
                  </p>
              </div>

              <div>
                  <h3 className="flex items-center gap-3 font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
                      <Zap className="w-6 h-6 text-amber-500" /> The Solution
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                      {study.solution}
                  </p>
              </div>

               <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20 p-8 rounded-2xl relative">
                    <Quote className="absolute top-6 left-6 w-8 h-8 text-indigo-500/20" />
                    <p className="text-xl font-medium text-indigo-900 dark:text-indigo-100 italic mb-6 relative z-10">
                        "{study.testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-200 dark:bg-indigo-700 flex items-center justify-center text-indigo-800 dark:text-white font-bold">
                            {study.testimonial.author.charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white">{study.testimonial.author}</div>
                            <div className="text-sm text-indigo-600 dark:text-indigo-400">{study.testimonial.role}</div>
                        </div>
                    </div>
               </div>
          </div>

          {/* Sidebar / Results */}
          <div className="space-y-8">
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl sticky top-24">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold text-slate-900 dark:text-white mb-6">
                      <TrendingUp className="w-5 h-5 text-green-500" /> Key Results
                  </h3>
                  <div className="space-y-6">
                      {study.results.map((result, i) => (
                          <div key={i} className="pb-6 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0">
                              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{result.value}</div>
                              <div className="text-sm text-slate-500 dark:text-gray-400 font-medium uppercase tracking-wide">{result.label}</div>
                          </div>
                      ))}
                  </div>
                  <button className="w-full mt-8 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" /> Share Case Study
                  </button>
              </div>
          </div>
      </section>

      {/* Related Projects Section */}
      <section className="border-t border-slate-200 dark:border-white/5 py-24 px-6 bg-slate-50 dark:bg-black/20">
          <div className="max-w-7xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-12">More Success Stories</h2>
              
              {/* Bento Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {finalRelated.map((related, i) => (
                      <Link 
                        key={related.id} 
                        to={`/case-studies/${related.id}`} 
                        className={`group block relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 ${i === 0 ? 'md:col-span-2' : ''} h-[400px]`}
                      >
                           <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply transition-opacity group-hover:opacity-10 z-10" />
                           <img src={related.image} alt={related.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                           
                           {/* Card Overlay Content */}
                           <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                               <div className="flex justify-between items-start">
                                   <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
                                       {related.industry}
                                   </span>
                                   <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black text-white transition-colors">
                                       <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                   </div>
                               </div>
                               <div>
                                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                       {related.title}
                                   </h3>
                                   <p className="text-white/70 line-clamp-2 max-w-lg text-sm md:text-base">
                                       {related.challenge}
                                   </p>
                               </div>
                           </div>
                      </Link>
                  ))}
              </div>
          </div>
      </section>

    </div>
  );
};

export default CaseStudyDetail;