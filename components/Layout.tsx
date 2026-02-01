import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Twitter, Linkedin, Github, Sun, Moon, ChevronDown, Pickaxe, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Chatbot from './Chatbot';
import CookieBanner from './CookieBanner';
import { servicesData } from '../data/services';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Initialize theme state from DOM
    setIsDark(document.documentElement.classList.contains('dark'));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled || isOpen
          ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-black/5 dark:border-white/10'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group z-50">
          <div className="relative w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-lg group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-shadow">
            <Pickaxe className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white transition-colors">
            SYNTHOS<span className="text-indigo-500">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          
          <Link to="/" className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
            Home
            {location.pathname === '/' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo-500/10 dark:bg-white/10 border border-indigo-500/20 dark:border-white/5 rounded-full -z-10" />}
          </Link>

          {/* Services Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <Link 
                to="/services" 
                className={`relative px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                    location.pathname.includes('/services') ? 'text-indigo-600 dark:text-white' : 'text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white'
                }`}
            >
                Services <ChevronDown className="w-3 h-3" />
                {location.pathname.includes('/services') && !isServicesOpen && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo-500/10 dark:bg-white/10 border border-indigo-500/20 dark:border-white/5 rounded-full -z-10" />}
            </Link>
            
            <AnimatePresence>
                {isServicesOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[400px]"
                    >
                        <div className="bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-3 grid grid-cols-2 gap-2">
                             {servicesData.map((service) => (
                                 <Link 
                                    key={service.id}
                                    to={`/services/${service.id}`}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group/item"
                                 >
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform`}>
                                        <service.icon className="w-4 h-4 text-indigo-600 dark:text-white" />
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">
                                        {service.title}
                                    </h4>
                                 </Link>
                             ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>

          <Link to="/work" className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
            Work
            {location.pathname === '/work' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo-500/10 dark:bg-white/10 border border-indigo-500/20 dark:border-white/5 rounded-full -z-10" />}
          </Link>
          
          <Link to="/case-studies" className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
            Case Studies
            {location.pathname === '/case-studies' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo-500/10 dark:bg-white/10 border border-indigo-500/20 dark:border-white/5 rounded-full -z-10" />}
          </Link>

          <Link to="/about" className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
            About
            {location.pathname === '/about' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo-500/10 dark:bg-white/10 border border-indigo-500/20 dark:border-white/5 rounded-full -z-10" />}
          </Link>
          <Link to="/pricing" className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
            Pricing
            {location.pathname === '/pricing' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo-500/10 dark:bg-white/10 border border-indigo-500/20 dark:border-white/5 rounded-full -z-10" />}
          </Link>
          
          <div className="ml-4 pl-4 border-l border-slate-200 dark:border-white/10 flex items-center gap-4">
             {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              to="/contact"
              className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-900 dark:text-white relative z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 80px)" }} // 80px is nav height
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="md:hidden fixed top-20 left-0 right-0 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 overflow-y-auto z-40"
          >
            <div className="px-6 py-8 flex flex-col gap-6 min-h-full">
              <Link to="/" className={`text-2xl font-display font-medium ${location.pathname === '/' ? 'text-indigo-600 dark:text-white' : 'text-slate-600 dark:text-gray-500'}`}>Home</Link>
              
              <div>
                <Link to="/services" className={`text-2xl font-display font-medium block mb-4 ${location.pathname.includes('/services') ? 'text-indigo-600 dark:text-white' : 'text-slate-600 dark:text-gray-500'}`}>Services</Link>
                <div className="pl-4 border-l-2 border-slate-200 dark:border-white/10 space-y-3">
                    {servicesData.map(s => (
                        <Link key={s.id} to={`/services/${s.id}`} className="block text-slate-500 dark:text-gray-400 text-sm font-medium hover:text-indigo-600 dark:hover:text-white">{s.title}</Link>
                    ))}
                </div>
              </div>

              <Link to="/work" className={`text-2xl font-display font-medium ${location.pathname === '/work' ? 'text-indigo-600 dark:text-white' : 'text-slate-600 dark:text-gray-500'}`}>Work</Link>
              <Link to="/case-studies" className={`text-2xl font-display font-medium ${location.pathname === '/case-studies' ? 'text-indigo-600 dark:text-white' : 'text-slate-600 dark:text-gray-500'}`}>Case Studies</Link>
              <Link to="/about" className={`text-2xl font-display font-medium ${location.pathname === '/about' ? 'text-indigo-600 dark:text-white' : 'text-slate-600 dark:text-gray-500'}`}>About</Link>
              <Link to="/pricing" className={`text-2xl font-display font-medium ${location.pathname === '/pricing' ? 'text-indigo-600 dark:text-white' : 'text-slate-600 dark:text-gray-500'}`}>Pricing</Link>
              <Link to="/contact" className={`text-2xl font-display font-medium ${location.pathname === '/contact' ? 'text-indigo-600 dark:text-white' : 'text-slate-600 dark:text-gray-500'}`}>Contact</Link>
              
              <div className="flex items-center justify-between py-4 border-t border-slate-100 dark:border-white/5 mt-auto">
                <span className="text-slate-600 dark:text-gray-400">Appearance</span>
                <button 
                  onClick={toggleTheme}
                  className="p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-4 bg-indigo-600 text-white font-bold rounded-xl"
              >
                Start a Project <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#050505] pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded flex items-center justify-center">
                <Pickaxe className="w-3 h-3 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white">SYNTHOS.</span>
            </div>
            <p className="text-slate-500 dark:text-gray-400 max-w-sm mb-6">
              The agency for the AI era. We build digital products that merge human creativity with machine intelligence.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-slate-900 dark:text-white mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 dark:text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Services</Link></li>
              <li><Link to="/work" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Work</Link></li>
              <li><Link to="/case-studies" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Case Studies</Link></li>
              <li><Link to="/careers" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-slate-900 dark:text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-500 dark:text-gray-400 text-sm">
              <li><Link to="/privacy" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-white/5 pt-8 text-center text-slate-500 dark:text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} SynthosLab. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user is near bottom (within 100px of max scroll)
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      setShowScrollTop(isBottom);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0a0a0a] font-sans text-slate-900 dark:text-white overflow-x-hidden selection:bg-indigo-500/30 transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
      
      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={scrollToTop}
                className="fixed bottom-6 right-24 z-50 w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg flex items-center justify-center hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors border border-white/10"
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-5 h-5" />
            </motion.button>
        )}
      </AnimatePresence>
      
      <CookieBanner />
    </div>
  );
};