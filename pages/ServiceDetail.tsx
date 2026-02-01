import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles, X, Layers } from 'lucide-react';
import { servicesData } from '../data/services';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.id === slug);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInView = useInView(containerRef, { margin: "0px 0px -100px 0px" });

  // Playback Logic
  useEffect(() => {
    if (videoRef.current) {
        if (isInView && isLoaded) {
            videoRef.current.play().catch(() => {});
        } else {
            videoRef.current.pause();
        }
    }
  }, [isInView, isLoaded]);

  // Scroll Fade Logic
  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.3, 0]); // Starts at 0.6 opacity (from CSS), fades out

  // SEO Update
  useEffect(() => {
    if (service) {
      document.title = `${service.title} | SynthosLab`;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', service.description);

      // Update Open Graph tags for better social sharing
      const updateMeta = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      updateMeta('og:title', service.title);
      updateMeta('og:description', service.description);

      // Scroll to top when service changes
      window.scrollTo(0, 0);
    }
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white">
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
            <Link to="/services" className="text-indigo-600 dark:text-indigo-400 hover:underline">Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] pb-24">
      {/* Video Hero */}
      <section ref={containerRef} className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
             <div className="absolute inset-0 bg-indigo-900/30 mix-blend-overlay z-10" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20" />
             <motion.video 
                key={service.videoUrl} // Force re-render when video URL changes
                ref={videoRef}
                style={{ opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 0.6 : 0 }} // Max opacity 0.6 as per original design
                transition={{ duration: 1 }}
                onLoadedData={() => setIsLoaded(true)}
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover"
            >
                <source src={service.videoUrl} type="video/mp4" />
            </motion.video>
        </div>
        
        <div className="relative z-30 max-w-7xl mx-auto px-6 text-center">
             <motion.div
                key={service.id} // Re-animate text on change
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
             >
                <Link to="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors backdrop-blur-md bg-white/5 px-4 py-2 rounded-full border border-white/10 text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Services
                </Link>
                <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">{service.title}</h1>
                <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">{service.description}</p>
             </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 -mt-20 relative z-40">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-8`}>
                <service.icon className="w-8 h-8 text-indigo-600 dark:text-white" />
            </div>

            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-6">Overview</h2>
            <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed mb-12">
                {service.longDescription}
            </p>

            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/5 mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-6 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> What We Deliver
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
                                <Check className="w-3 h-3 text-green-500" />
                            </div>
                            <span className="text-slate-700 dark:text-gray-200 font-medium">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tech Stack Section */}
            {service.techStack && (
                <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/5 mb-12">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-6 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Technologies We Use
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {service.techStack.map((tech, idx) => (
                            <span 
                                key={idx} 
                                className="px-4 py-2 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-medium text-slate-700 dark:text-gray-200 shadow-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200 dark:border-white/10">
                <div className="text-center sm:text-left">
                    <p className="text-slate-900 dark:text-white font-bold text-lg">Ready to start?</p>
                    <p className="text-slate-500 dark:text-gray-400 text-sm">Let's discuss your project requirements.</p>
                </div>
                <Link
                    to="/contact"
                    className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2"
                >
                    Book Consultation <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ServiceDetail;