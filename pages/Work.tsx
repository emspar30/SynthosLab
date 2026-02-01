import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ProjectCategory } from '../types';
import { ArrowUpRight, Play, X, ExternalLink, Github, Tag } from 'lucide-react';

// Extended project data with tags and links for modal
const projects = [
  {
    id: 1,
    title: 'FinTech Dashboard',
    category: ProjectCategory.WEB,
    image: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2940&auto=format&fit=crop',
    description: 'A real-time financial analytics dashboard using D3.js.',
    tags: ['React', 'D3.js', 'Tailwind CSS', 'TypeScript'],
    link: '#',
    fullDescription: 'A comprehensive financial dashboard designed for high-frequency traders. Features real-time websocket data connections, customizable widgets, and sub-millisecond rendering performance using WebGL.'
  },
  {
    id: 2,
    title: 'Nexus Brand Identity',
    category: ProjectCategory.DESIGN,
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop',
    description: 'Complete visual overhaul for a Series B startup.',
    tags: ['Branding', 'Figma', 'Motion Graphics', 'Design System'],
    link: '#',
    fullDescription: 'We rebranded Nexus from the ground up, establishing a new visual language that communicates trust and innovation. Deliverables included a new logo, typography system, color palette, and comprehensive brand guidelines.'
  },
  {
    id: 3,
    title: 'AI Chatbot Integration',
    category: ProjectCategory.AI,
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2806&auto=format&fit=crop',
    description: 'Customer support automation reducing ticket load by 60%.',
    tags: ['OpenAI', 'Python', 'Vector DB', 'React'],
    link: '#',
    fullDescription: 'An intelligent customer support agent trained on company documentation. Using RAG (Retrieval-Augmented Generation), it provides accurate answers and routes complex queries to human agents, significantly reducing support costs.'
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    category: ProjectCategory.WEB,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop',
    description: 'Headless Shopify build with Next.js frontend.',
    tags: ['Shopify Plus', 'Next.js', 'Sanity CMS', 'Stripe'],
    link: '#',
    fullDescription: 'A high-performance headless e-commerce store built for speed and conversion. Features instant page transitions, dynamic personalization, and a custom checkout flow optimized for mobile devices.'
  },
  {
    id: 5,
    title: 'Automated CRM',
    category: ProjectCategory.AI,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    description: 'Zapier workflows connecting Lead gen to Salesforce.',
    tags: ['Zapier', 'Salesforce', 'n8n', 'Automation'],
    link: '#',
    fullDescription: 'A complex automation architecture connecting marketing funnels directly to sales pipelines. Leads are automatically scored, enriched with external data, and assigned to the right sales representative instantly.'
  },
  {
    id: 6,
    title: 'Mobile App Prototype',
    category: ProjectCategory.DESIGN,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2940&auto=format&fit=crop',
    description: 'High-fidelity Figma prototype for a wellness app.',
    tags: ['UI/UX', 'Figma', 'Prototyping', 'User Testing'],
    link: '#',
    fullDescription: 'An interactive high-fidelity prototype designed for user testing and investor presentations. Includes complex micro-interactions, gesture controls, and a complete design system ready for handoff to developers.'
  },
  {
    id: 7,
    title: 'Quantum Trading Interface',
    category: ProjectCategory.WEB,
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=3000&auto=format&fit=crop',
    description: 'High-frequency trading terminal with sub-millisecond latency.',
    tags: ['React', 'WebSockets', 'WebGL', 'Rust'],
    link: '#',
    fullDescription: 'A next-generation trading interface built for institutional investors. It handles millions of data points per second with zero lag, visualizing complex market trends in real-time using custom WebGL shaders.'
  },
  {
    id: 8,
    title: 'EcoTrack Mobile App',
    category: ProjectCategory.DESIGN,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2813&auto=format&fit=crop',
    description: 'Sustainability tracking app with gamified user experience.',
    tags: ['Figma', 'Prototyping', 'UX Research', 'Mobile Design'],
    link: '#',
    fullDescription: 'We designed an engaging mobile experience that helps users track their carbon footprint. Through gamification and social features, user retention increased by 200% compared to industry standards.'
  },
  {
    id: 9,
    title: 'Neural Voice Agent',
    category: ProjectCategory.AI,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop',
    description: 'Conversational AI for automated phone support.',
    tags: ['Python', 'Twilio', 'OpenAI', 'Whisper'],
    link: '#',
    fullDescription: 'Replacing traditional IVR systems with a natural-sounding AI agent. It understands context, sentiment, and accents, resolving 85% of calls without human intervention.'
  },
  {
    id: 10,
    title: 'Luxury Real Estate',
    category: ProjectCategory.WEB,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2942&auto=format&fit=crop',
    description: 'Immersive property showcase with virtual tours.',
    tags: ['Next.js', 'Three.js', 'Sanity CMS', 'Mapbox'],
    link: '#',
    fullDescription: 'A bespoke digital platform for high-end property listings. Features include 3D virtual walkthroughs, neighborhood analytics, and a seamless inquiry booking system.'
  }
];

const showcaseImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2855&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=2940&auto=format&fit=crop'
];

const WorkSlideshow = () => {
    return (
        <div className="w-full overflow-hidden bg-white dark:bg-white/5 border-y border-slate-200 dark:border-white/10 py-8 mb-16 relative">
             <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-[#0a0a0a] to-transparent z-10" />
             <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-[#0a0a0a] to-transparent z-10" />
             
             <motion.div 
                className="flex gap-8 px-8 w-max"
                animate={{ x: "-50%" }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             >
                 {[...showcaseImages, ...showcaseImages].map((img, i) => (
                     <div key={i} className="w-[400px] h-[250px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-white/10 flex-shrink-0 group">
                         <img src={img} alt="Project Showcase" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                     </div>
                 ))}
             </motion.div>
        </div>
    )
}

const VideoTutorialSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInView = useInView(containerRef, { margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (videoRef.current) {
        if (isInView && isLoaded) {
            videoRef.current.play().catch(() => {});
        } else {
            videoRef.current.pause();
        }
    }
  }, [isInView, isLoaded]);

  // Scroll fade effect
  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section className="py-24 mt-12 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Process in Motion</h2>
            <p className="text-slate-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                See how we tackle complex design challenges. A behind-the-scenes look at our workflow.
            </p>
        </div>

        <motion.div 
            ref={containerRef}
            style={{ opacity }}
            className="max-w-5xl mx-auto"
        >
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-indigo-900/10 dark:bg-black/40 mix-blend-overlay z-10 pointer-events-none" />
                
                <motion.video
                    ref={videoRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 1 }}
                    onLoadedData={() => setIsLoaded(true)}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="https://videos.pexels.com/video-files/5473806/5473806-uhd_2560_1440_24fps.mp4" type="video/mp4" />
                </motion.video>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

const SkeletonProjectCard = () => (
  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 h-[350px] animate-pulse">
    <div className="h-48 bg-slate-200 dark:bg-white/5" />
    <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
            <div className="h-6 w-32 bg-slate-200 dark:bg-white/5 rounded" />
            <div className="h-4 w-16 bg-slate-200 dark:bg-white/5 rounded" />
        </div>
        <div className="h-4 w-full bg-slate-200 dark:bg-white/5 rounded" />
        <div className="h-4 w-2/3 bg-slate-200 dark:bg-white/5 rounded" />
    </div>
  </div>
);

const Work: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory>(ProjectCategory.ALL);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Simulate data fetching/filtering delay
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [filter]);

  const filteredProjects = projects.filter(
    (project) => filter === ProjectCategory.ALL || project.category === filter
  );

  return (
    <div className="min-h-screen pt-20 pb-20">
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-8">
          <div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">Selected Work</h1>
            <p className="text-slate-500 dark:text-gray-400">A curation of our finest digital products.</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {Object.values(ProjectCategory).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg'
                    : 'bg-white/50 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <WorkSlideshow />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
                // Show 6 skeleton cards while loading
                Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonProjectCard key={i} />
                ))
            ) : (
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.map((project) => (
                    <motion.div
                        layout
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl">
                                <ArrowUpRight className="w-5 h-5 text-black" />
                            </div>
                        </div>
                        </div>
                        <div className="flex items-center justify-between">
                        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                        <span className="text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-wider border border-slate-200 dark:border-white/10 px-2 py-1 rounded">
                            {project.category}
                        </span>
                        </div>
                        <p className="text-slate-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">{project.description}</p>
                    </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </div>
      </div>

      <VideoTutorialSection />

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedProject(null)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />
                
                {/* Modal Card */}
                <motion.div 
                    layoutId={`project-${selectedProject.id}`}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0f0f0f] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl z-10 scrollbar-hide"
                >
                    <button 
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors backdrop-blur-sm"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="w-full h-64 md:h-96 relative">
                        <img 
                            src={selectedProject.image} 
                            alt={selectedProject.title} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent opacity-80" />
                        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                            <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-3 inline-block">
                                {selectedProject.category}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
                                {selectedProject.title}
                            </h2>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div className="md:col-span-2">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About the Project</h3>
                                <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                                    {selectedProject.fullDescription}
                                </p>
                                <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                                    {selectedProject.description}
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Tag className="w-4 h-4" /> Technologies
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-medium text-slate-700 dark:text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <a href={selectedProject.link} className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all">
                                        View Live Site <ExternalLink className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold rounded-xl transition-all border border-slate-200 dark:border-white/10">
                                        <Github className="w-4 h-4" /> View Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Work;