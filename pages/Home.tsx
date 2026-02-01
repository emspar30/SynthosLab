import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Code, Cpu, Palette, Star, Quote, Search, PenTool, Rocket, Globe, Zap, Database, Server, Smartphone, Layers, ChevronDown } from 'lucide-react';

const Hero = () => {
  const { scrollY } = useScroll();
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Dynamic Playback Logic
  const isInView = useInView(videoContainerRef, { margin: "0px 0px -100px 0px" });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView && isLoaded) {
        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, isLoaded]);

  // Scroll effects for video container
  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: videoContainerRef,
    offset: ["start end", "end start"]
  });

  // Opacity: Fade in when entering (0-0.3), Fade out when leaving (0.6-1)
  const opacity = useTransform(videoScrollProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(videoScrollProgress, [0, 0.3, 0.6, 1], [0.85, 1, 1, 0.85]);

  // Parallax effects for orbs
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-500 pt-20 pb-20">
      {/* Enhanced Ambient Background Effects with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orbs - opacity lowered for light mode to prevent washout */}
        <motion.div 
          style={{ y: y1 }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 dark:bg-indigo-600/30 rounded-full blur-[100px] dark:mix-blend-screen mix-blend-multiply" 
        />
        
        <motion.div 
          style={{ y: y2 }}
          animate={{ 
            scale: [1, 1.1, 0.9, 1],
            x: [0, -40, 60, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-[80px] dark:mix-blend-screen mix-blend-multiply" 
        />

        <motion.div 
          style={{ y: y3 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            x: [0, 30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/20 dark:bg-purple-600/20 rounded-full blur-[120px] dark:mix-blend-screen mix-blend-multiply" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-8 leading-[1.1] drop-shadow-xl dark:drop-shadow-2xl text-slate-900 dark:text-white">
            The Agency for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 dark:from-indigo-300 dark:via-purple-300 dark:to-cyan-300 animate-gradient-x">
              The AI Era
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            SynthosLab blends high-end aesthetic design with cutting-edge AI automation to build brands that dominate tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/work"
              className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-slate-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              View Our Work <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-full hover:bg-white/80 dark:hover:bg-white/10 transition-all backdrop-blur-md"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Interactive Video Placeholder */}
      <motion.div 
        ref={videoContainerRef}
        style={{ opacity, scale }}
        className="relative z-20 w-full max-w-6xl mx-auto px-6"
      >
        <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-sm group select-none">
            {/* Overlay for Light/Dark Adaptation */}
            <div className="absolute inset-0 z-10 bg-indigo-900/10 dark:bg-black/20 mix-blend-overlay pointer-events-none" />
            
            <motion.video 
              ref={videoRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 1.5 }}
              onLoadedData={() => setIsLoaded(true)}
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            </motion.video>
        </div>
      </motion.div>
    </section>
  );
};

const ClientLogos = () => {
  return (
    <section className="py-12 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-black/40 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-mono text-slate-500 dark:text-gray-500 mb-8 uppercase tracking-widest">Trusted by industry leaders</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 dark:opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Nike */}
           <svg className="h-8 w-auto text-slate-900 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
             <path d="M21.155 2.113c-7.398 5.438-12.793 9.404-16.188 11.898.813-2.926 2.506-5.267 5.078-7.02l-1.047-1.491c-3.13 2.13-5.344 5.163-6.641 9.098-1.782 5.396 2.051 9.941 7.203 9.941 6.578 0 12.375-7.988 12.375-15.543 0-1.879-.313-3.691-.78-6.883z"/>
           </svg>
           {/* n8n */}
           <svg className="h-8 w-auto text-slate-900 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12.9 20.4h-1.8v-3.6h1.8v3.6zm0-5.4h-1.8V9h1.8v6zm4.5 5.4h-1.8v-3.6h1.8v3.6zm0-5.4h-1.8V9h1.8v6zm-9 5.4H6.6v-3.6h1.8v3.6zm0-5.4H6.6V9h1.8v6zm-4.5 5.4H2.1v-3.6h1.8v3.6zm0-5.4H2.1V9h1.8v6zm18 5.4h-1.8v-3.6h1.8v3.6zm0-5.4h-1.8V9h1.8v6zM12 3.6c-1.2 0-2.2.6-2.9 1.5-.7-.9-1.7-1.5-2.9-1.5-2.1 0-3.8 1.8-3.8 4v.5h1.8v-.5c0-1.1.9-2 2-2s2 .9 2 2v.5h1.8v-.5c0-1.1.9-2 2-2s2 .9 2 2v.5h1.8v-.5c0-2.2-1.7-4-3.8-4z"/>
           </svg>
           {/* Alignerr */}
           <div className="flex items-center gap-1 font-bold text-xl text-slate-900 dark:text-white select-none">
             <div className="w-6 h-6 bg-slate-900 dark:bg-white rounded flex items-center justify-center text-white dark:text-black text-xs font-display">A</div>
             <span className="font-display tracking-tight">Alignerr</span>
           </div>
           {/* Vercel */}
            <svg className="h-6 w-auto text-slate-900 dark:text-white" viewBox="0 0 1155 1000" fill="currentColor">
                <path d="M577.344 0L1154.69 1000H0L577.344 0Z" />
            </svg>
           {/* Stripe */}
           <svg className="h-8 w-auto text-slate-900 dark:text-white" viewBox="0 0 60 25" fill="currentColor">
               <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.03c-1.08.54-2.72.95-4.58.95-4.52 0-7.39-2.81-7.39-7.38 0-4.63 2.95-7.38 6.78-7.38 4.29 0 6.01 3.24 6.01 6.84v2.34zm-8.24-2.15h4.4c0-1.22-.64-2.61-2.22-2.61-1.66 0-2.18 1.44-2.18 2.61zM42.75 6.06c3.48 0 5.46 1.81 5.46 5.25v8.52h-3.9v-7.8c0-1.39-.62-2.31-2.07-2.31-1.56 0-2.91.95-2.91 3.03v7.07h-4.06V6.28h3.91v1.65c.95-1.21 2.22-1.87 3.57-1.87zM24.7 6.28h3.98v1.66c1.1-1.34 2.8-1.88 4.31-1.53v3.91c-1.74-.29-3.41.05-4.22 1.5v8.01h-4.07V6.28zm-3.64 9.87c0 1.25.96 1.81 2.37 1.81 1.05 0 2.07-.31 2.76-.75v2.96c-1.01.59-2.5.95-3.91.95-3.66 0-5.25-2.21-5.25-5.37V9.45h-2.2v-3.17h2.2V2.5l4.03-1.19v4.97h3.33v3.17h-3.33v6.87zm-14.7-2.88c0-1.72 1.34-2.73 3.39-2.73 1.37 0 2.63.43 3.48.96v-3.32c-1-.53-2.34-.82-3.68-.82-3.64 0-6.19 2.53-6.19 6.22 0 4.06 2.8 6.36 7.15 6.36 2.37 0 4.27-.69 5.37-1.38v-3.17c-1.03.62-2.56 1.05-4.13 1.05-2.34 0-3.53-.98-3.53-2.61 0-.17 0-.34.03-.51h8.89c.08-.78.11-1.53.11-2.26 0-3.6-2.2-6.22-6.19-6.22-4.09 0-6.7 2.8-6.7 6.48 0 3.73 2.52 6.16 5.86 6.16 1.48 0 2.73-.39 3.52-.81v-3.19c-1 .59-2.02.84-3.05.84-1.39 0-2.34-.69-2.34-1.95v-1.02h2.2z" />
           </svg>
        </div>
      </div>
    </section>
  )
}

const BentoGridWhyUs = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-surface/50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          
          {/* Main Title Block */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 dark:from-indigo-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-6 h-6 text-indigo-600 dark:text-white" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-relaxed">
                Bridging <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">Creativity & Code</span>
              </h2>
              <p className="text-slate-600 dark:text-gray-400 text-lg max-w-lg leading-relaxed">
                We don't just design; we engineer systems that scale with your business using the latest web technologies. Our atomic design systems ensure consistency across every touchpoint.
              </p>
            </div>
            
            <Link to="/services" className="relative z-10 inline-flex items-center gap-2 text-indigo-600 dark:text-white font-bold mt-8 hover:translate-x-1 transition-transform">
              See capabilities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Clean Engineering Block */}
          <div className="md:col-span-1 md:row-span-1 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-8 flex flex-col justify-center relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5 group-hover:scale-110 transition-transform duration-500">
               <Code className="w-24 h-24" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-2 text-slate-900 dark:text-white">Clean Engineering</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm">Performance-obsessed development using React, Next.js and Node.</p>
          </div>

          {/* AI Integration Block */}
          <div className="md:col-span-1 md:row-span-1 rounded-3xl bg-slate-900 dark:bg-indigo-900/20 border border-slate-200 dark:border-white/5 p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="relative z-10">
               <Cpu className="w-8 h-8 text-white mb-4" />
               <h3 className="font-display text-2xl font-bold mb-2 text-white">AI Integration</h3>
               <p className="text-slate-300 dark:text-gray-300 text-sm">Leverage LLMs to reduce operational costs.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const VerticalVideoSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { margin: "0px 0px -100px 0px" });
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/Pause effect based on section visibility
  useEffect(() => {
    if (videoRef.current) {
        if (isSectionInView && isLoaded) {
            videoRef.current.play().catch(() => {});
        } else {
            videoRef.current.pause();
        }
    }
  }, [isSectionInView, isLoaded, activeTab]); // Trigger on tab change too

  const tabs = [
    {
      id: 0,
      title: "Immersion",
      subtitle: "Captivate your audience instantly.",
      color: "border-indigo-500",
      video: "https://videos.pexels.com/video-files/3048545/3048545-uhd_3840_2160_24fps.mp4" // Ink Swirls
    },
    {
      id: 1,
      title: "Motion",
      subtitle: "Fluid animations that guide the eye.",
      color: "border-cyan-500",
      video: "https://videos.pexels.com/video-files/2882787/2882787-uhd_2560_1440_24fps.mp4" // Abstract Fluid
    },
    {
      id: 2,
      title: "Impact",
      subtitle: "Design that converts and retains.",
      color: "border-purple-500",
      video: "https://videos.pexels.com/video-files/852421/852421-hd_1920_1080_30fps.mp4" // City/Fast movement
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-[#080808] border-y border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Vertical Text Layout */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-12">
            {tabs.map((tab, index) => (
                <div 
                    key={index}
                    onClick={() => {
                        setActiveTab(index);
                        setIsLoaded(false); // Reset load state on switch
                    }}
                    className={`pl-6 cursor-pointer transition-all duration-500 border-l-2 ${
                        activeTab === index 
                            ? `${tab.color}` 
                            : 'border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30'
                    }`}
                >
                    <h3 className={`text-sm font-bold uppercase tracking-widest mb-2 transition-colors duration-300 ${
                        activeTab === index 
                            ? 'text-indigo-600 dark:text-indigo-400' 
                            : 'text-slate-500 dark:text-gray-500'
                    }`}>
                        {tab.title}
                    </h3>
                    <p className={`text-3xl font-display font-bold transition-colors duration-300 ${
                         activeTab === index 
                            ? 'text-slate-900 dark:text-white' 
                            : 'text-slate-400 dark:text-gray-600'
                    }`}>
                        {tab.subtitle}
                    </p>
                </div>
            ))}
          </div>

          {/* Vertical Video Placeholder */}
          <div className="w-full md:w-1/2">
             <div className="relative aspect-[9/16] md:aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl pointer-events-none select-none">
                <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay z-10" />
                
                <AnimatePresence mode="wait">
                    <motion.video 
                      key={activeTab}
                      ref={videoRef}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isLoaded ? 1 : 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      onLoadedData={() => {
                          setIsLoaded(true);
                          if(isSectionInView) videoRef.current?.play().catch(() => {});
                      }}
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover absolute inset-0"
                    >
                      <source src={tabs[activeTab].video} type="video/mp4" />
                    </motion.video>
                </AnimatePresence>

                <div className="absolute bottom-6 right-6 z-20 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                   <p className="text-white text-xs font-bold tracking-widest uppercase">{tabs[activeTab].title} SYSTEM</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const TechStackScatter = () => {
    // Custom SVG Components for Logos
    const ReactLogo = (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <g stroke="currentColor" strokeWidth="1.5">
                <ellipse cx="12" cy="12" rx="10" ry="4"/>
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
            </g>
        </svg>
    );

    const NextLogo = (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 14.5v-9l-6.75 9h-2v-9h1.5v6.5l6.25-8.5h2v11h-1z"/>
        </svg>
    );

    const TailwindLogo = (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 6c-1.5 0-2.5.5-3.5 1.5 2 2 5.5 2 7.5 0 1.5-1.5 2.5-2 4-2 1.5 0 2.5.5 3.5 1.5 1.5 1.5 2.5 2 4 2v-2c-1.5 0-2.5-.5-3.5-1.5-2-2-5.5-2-7.5 0-1.5 1.5-2.5 2-4 2-1.5 0-2.5-.5-3.5-1.5-1.5-1.5-2.5-2-4 2v2c1.5 0 2.5.5 3.5 1.5z"/>
             <path d="M6 12c-1.5 0-2.5.5-3.5 1.5 2 2 5.5 2 7.5 0 1.5-1.5 2.5-2 4-2 1.5 0 2.5.5 3.5 1.5 1.5 1.5 2.5 2 4 2v-2c-1.5 0-2.5-.5-3.5-1.5-2-2-5.5-2-7.5 0-1.5 1.5-2.5 2-4 2-1.5 0-2.5.5-3.5 1.5-1.5 1.5-2.5 2-4 2v2c1.5 0 2.5.5 3.5 1.5z"/>
        </svg>
    );

    const TSLogo = (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <rect x="2" y="2" width="20" height="20" rx="4"/>
            <path d="M11.5 15h-1.5v-4h-2v-1.5h5.5v1.5h-2v4zM16.5 15h-1.5l-.5-1c-.5.5-1 .75-1.5.75-.75 0-1.5-.5-1.5-1.5v-.25l.25-.25c.5-.25 1-.5 1.5-.5h.75v-.5c0-.25-.1-.4-.4-.4-.3 0-.6.1-.8.25l-.5-1c.5-.4 1.1-.5 1.8-.5 1 0 1.75.6 1.75 1.6v3.3z" fill="white"/>
        </svg>
    );

    const NodeLogo = (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
             <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2l6.5 3.6v8.4L12 19.8 5.5 16.2V7.8L12 4.2z"/>
        </svg>
    );

    const FigmaLogo = (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 2H8C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8H12V2Z" fill="#F24E1E"/>
            <path d="M12 8H8C6.34315 8 5 9.34315 5 11C5 12.6569 6.34315 14 8 14H12V8Z" fill="#A259FF"/>
            <path d="M12 14H8C6.34315 14 5 15.3431 5 17C5 18.6569 6.34315 20 8 20C9.65685 20 11 18.6569 11 17V14H12Z" fill="#1ABCFE"/>
            <path d="M12 2H16C17.6569 2 19 3.34315 19 5C19 6.65685 17.6569 8 16 8H12V2Z" fill="#0ACF83"/>
            <path d="M12 8H16C17.6569 8 19 9.34315 19 11C19 12.6569 17.6569 14 16 14H12V8Z" fill="#FF7262"/>
        </svg>
    );

    const FramerLogo = (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
             <path d="M4 2h16v8h-8l8 8v4H4V10h8L4 2z"/>
        </svg>
    );

    const DockerLogo = (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M13 14h-2v-2h2v2zm0-3h-2V9h2v2zm-3 3H8v-2h2v2zm0-3H8V9h2v2zm-3 3H5v-2h2v2zm0-3H5V9h2v2zM5 8h2v-2H5v2zm-3 12h20c0-4-3-7-8-7-2 0-4 1-5 2v-1h-2v1c-1-1-3-2-5-2z"/>
        </svg>
    );

    const icons = [
        { Icon: ReactLogo, color: "text-[#61DAFB]", label: "React" },
        { Icon: NodeLogo, color: "text-[#339933]", label: "Node.js" },
        { Icon: Database, color: "text-[#4169E1]", label: "PostgreSQL" }, // Keeping Lucide for DB
        { Icon: NextLogo, color: "text-slate-900 dark:text-white", label: "Next.js" },
        { Icon: TSLogo, color: "text-[#3178C6]", label: "TypeScript" },
        { Icon: Cpu, color: "text-purple-500", label: "OpenAI" },
        { Icon: FramerLogo, color: "text-slate-900 dark:text-white", label: "Framer" },
        { Icon: FigmaLogo, color: "text-[#F24E1E]", label: "Figma" },
        { Icon: TailwindLogo, color: "text-[#06B6D4]", label: "Tailwind" },
        { Icon: DockerLogo, color: "text-[#2496ED]", label: "Docker" },
    ];

    return (
        <section className="py-32 overflow-hidden bg-slate-50 dark:bg-[#0a0a0a] relative">
            <div className="max-w-7xl mx-auto px-6 text-center mb-12 relative z-10">
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Built on Modern Foundations</h2>
                <p className="text-slate-600 dark:text-gray-400">Our engineering stack ensures scalability, security, and velocity.</p>
            </div>

            <div className="relative h-[450px] max-w-6xl mx-auto flex items-center justify-center">
                {icons.map((item, index) => {
                     // Calculate random positions for scatter effect
                     const randomX = (Math.random() - 0.5) * 800;
                     const randomY = (Math.random() - 0.5) * 350;
                     const randomRotate = (Math.random() - 0.5) * 20;

                     return (
                         <motion.div
                            key={index}
                            initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                            whileInView={{ 
                                x: randomX, 
                                y: randomY, 
                                opacity: 1, 
                                scale: 1,
                                rotate: randomRotate
                            }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ 
                                duration: 1.2, 
                                ease: "easeOut",
                                delay: index * 0.05 
                            }}
                            className="absolute flex flex-col items-center gap-2"
                         >
                             <div className="w-20 h-20 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer backdrop-blur-sm group">
                                <item.Icon className={`w-10 h-10 ${item.color} group-hover:scale-110 transition-transform`} />
                             </div>
                             <span className="text-xs font-bold text-slate-500 dark:text-gray-500 bg-white/80 dark:bg-black/50 px-2 py-1 rounded-full">{item.label}</span>
                         </motion.div>
                     )
                })}
            </div>
        </section>
    )
}

const ProcessGuide = () => {
  const steps = [
    {
      num: "01",
      title: "Discovery & Audit",
      desc: "We dive deep into your brand DNA, analyzing market gaps and identifying AI automation opportunities.",
      icon: Search
    },
    {
      num: "02",
      title: "Strategy Blueprint",
      desc: "We architect a custom digital roadmap, selecting the right tech stack to ensure scalability and speed.",
      icon: PenTool
    },
    {
      num: "03",
      title: "Build & Integrate",
      desc: "Our engineers and designers work in parallel to build high-fidelity products with integrated AI agents.",
      icon: Code
    },
    {
      num: "04",
      title: "Launch & Optimize",
      desc: "We deploy with zero downtime and monitor performance, iteratively refining for maximum conversion.",
      icon: Rocket
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0a0a] dark:to-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-indigo-600 dark:text-indigo-400 font-medium tracking-wider uppercase text-sm mb-4 block">The Synthos Protocol</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">How We Build the Future</h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            A transparent, streamlined workflow designed to take you from concept to market dominance in record time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="p-8 h-full rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all hover:shadow-lg dark:hover:bg-white/10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <step.icon className="w-6 h-6 text-slate-400 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                  </div>
                  <span className="text-4xl font-display font-bold text-slate-200 dark:text-white/10 group-hover:text-slate-300 dark:group-hover:text-white/20 transition-colors">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
              
              {/* Connector Line (Desktop Only) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-gradient-to-r from-slate-300 dark:from-white/10 to-transparent z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Parallax3DShowcase = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 3D Rotation and movement - Smoother transitions
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [35, 20, 45]);
    const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 45]);
    // Reduced max scale to prevent clipping
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 0.8]);
    
    // Layer separations - Increased distance for better 3D effect
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -220]); // Top layer moves up 
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 0]);    // Middle stays relative
    const y3 = useTransform(scrollYProgress, [0, 1], [0, 220]);  // Bottom moves down 
    
    // Fade effects
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0, 1, 0]);

    return (
        <section ref={containerRef} className="h-[180vh] relative bg-slate-50 dark:bg-[#0a0a0a] overflow-hidden">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
                
                {/* Text moved to Top to avoid overlap */}
                 <motion.div style={{ opacity: textOpacity }} className="absolute top-16 left-0 right-0 text-center pointer-events-none z-50">
                    <p className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-2">The Synthos Stack</p>
                    <p className="text-slate-500 dark:text-gray-400">Integrated layers of design, logic, and performance.</p>
                 </motion.div>

                {/* Container with increased height */}
                <div className="relative perspective-[1500px] w-full max-w-4xl flex items-center justify-center h-[800px]">
                    
                    {/* 3D Container - Moved significantly downwards (mt-96) to prevent overlap with top text */}
                    <motion.div 
                        style={{ rotateX, rotateZ, scale, transformStyle: "preserve-3d" }}
                        className="relative w-80 h-80 md:w-[450px] md:h-[450px] mt-96"
                    >
                        {/* Top Layer: Design */}
                        <motion.div 
                            style={{ y: y1, z: 120, transformStyle: "preserve-3d" }}
                            className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 backdrop-blur-md border border-white/30 rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.3)] flex items-center justify-center"
                        >
                             <div className="text-center transform -rotate-45">
                                <Palette className="w-16 h-16 text-white mx-auto mb-2 drop-shadow-lg" />
                                <h3 className="font-display font-bold text-2xl text-white drop-shadow-md">Experience</h3>
                             </div>
                        </motion.div>

                        {/* Middle Layer: Intelligence */}
                        <motion.div 
                            style={{ y: y2, z: 0, transformStyle: "preserve-3d" }}
                            className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 backdrop-blur-md border border-white/30 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.3)] flex items-center justify-center"
                        >
                            <div className="text-center transform -rotate-45">
                                <Cpu className="w-16 h-16 text-white mx-auto mb-2 drop-shadow-lg" />
                                <h3 className="font-display font-bold text-2xl text-white drop-shadow-md">Intelligence</h3>
                             </div>
                        </motion.div>

                        {/* Bottom Layer: Infrastructure */}
                        <motion.div 
                            style={{ y: y3, z: -120, transformStyle: "preserve-3d" }}
                            className="absolute inset-0 bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center"
                        >
                            <div className="text-center transform -rotate-45">
                                <Database className="w-16 h-16 text-slate-300 mx-auto mb-2 drop-shadow-lg" />
                                <h3 className="font-display font-bold text-2xl text-slate-200 drop-shadow-md">Infrastructure</h3>
                             </div>
                        </motion.div>
                    </motion.div>

                </div>

            </div>
        </section>
    )
}

const TestimonialsTicker = () => {
    const testimonials = [
        {
            quote: "SynthosLab transformed our vague concept into a market-leading product in just 12 weeks.",
            author: "Sarah Jenkings",
            role: "CTO at Vertex",
        },
        {
            quote: "The design system they created didn't just look good—it streamlined our entire engineering workflow.",
            author: "Marcus Chen",
            role: "Founder at Nebula",
        },
        {
            quote: "We've seen a 300% increase in conversions since launching the new site.",
            author: "Elena Rodriguez",
            role: "CMO at Horizon",
        },
        {
            quote: "Their AI automation solutions saved us 20 hours a week of manual data entry.",
            author: "David Kim",
            role: "COO at Echo Valley",
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#080808]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 dark:bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-[1920px] mx-auto relative z-10">
                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 dark:bg-white/5 border border-indigo-200 dark:border-white/10 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-6">
                        Success Stories
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">What our partners say</h2>
                </div>
                
                {/* Ticker Container */}
                <div className="flex overflow-hidden mask-gradient-x">
                    <motion.div 
                        className="flex gap-8 px-4"
                        animate={{ x: "-50%" }}
                        transition={{ 
                            duration: 40, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                    >
                        {/* Render twice for seamless loop */}
                        {[...testimonials, ...testimonials].map((t, i) => (
                            <div key={i} className="min-w-[400px] md:min-w-[500px] p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-colors group shadow-sm dark:shadow-none">
                                <Quote className="w-8 h-8 text-indigo-500/30 dark:text-indigo-500/50 mb-6" />
                                <p className="text-lg text-slate-700 dark:text-gray-200 mb-6 leading-relaxed font-light">"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm">
                                        {t.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white font-display text-sm">{t.author}</h4>
                                        <p className="text-indigo-600 dark:text-indigo-400 text-xs">{t.role}</p>
                                    </div>
                                    <div className="flex gap-0.5 ml-auto">
                                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-indigo-500 text-indigo-500" />)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is your typical project timeline?",
      answer: "Most web projects take 4-8 weeks from kickoff to launch. AI automation integrations can be deployed in as little as 2 weeks, depending on complexity."
    },
    {
      question: "Do you offer post-launch support?",
      answer: "Yes, we offer monthly retainer packages that include server maintenance, content updates, and continuous AI model optimization to ensure your systems remain peak performing."
    },
    {
      question: "How does the AI integration work?",
      answer: "We analyze your current workflows to identify repetitive tasks. Then, we build custom agents using tools like n8n and OpenAI that connect to your existing software (Slack, CRM, Email) to automate these processes securely."
    },
    {
      question: "What is your pricing model?",
      answer: "We offer both project-based pricing and monthly retainers. Our 'Growth' retainer starts at $4,500/mo, covering continuous design and development needs. See our Pricing page for more details."
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0a0a0a] border-t border-slate-200 dark:border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-slate-600 dark:text-gray-400">Everything you need to know about working with SynthosLab.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-slate-900 dark:text-white text-lg pr-8">{faq.question}</span>
                <span className={`transform transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-600 dark:text-gray-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a]">
      <Hero />
      <ClientLogos />
      <BentoGridWhyUs />
      <VerticalVideoSection />
      <TechStackScatter />
      <ProcessGuide />
      <Parallax3DShowcase />
      <TestimonialsTicker />
      <FAQ />
      <section className="py-32 text-center px-6">
        <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900/20 dark:to-transparent border border-indigo-100 dark:border-indigo-500/20 shadow-xl dark:shadow-none">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Ready to upgrade?</h2>
          <p className="text-slate-600 dark:text-gray-400 mb-8 text-lg">Let's turn your vision into a digital reality.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)]">
            Start Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;