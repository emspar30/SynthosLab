import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Send, Loader2, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject) newErrors.subject = 'Please select a service';
    if (!formData.message.trim()) newErrors.message = 'Please tell us about your project';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setShowToast(false), 4000);
    }, 1500);
  };

  // Glassmorphism Input Classes - Slightly adjusted for better contrast/feel
  const getInputClasses = (hasError: boolean) => `
    w-full rounded-xl px-5 py-4 text-slate-900 dark:text-white font-medium
    outline-none transition-all duration-300 backdrop-blur-xl
    ${hasError 
      ? 'bg-rose-50/50 dark:bg-rose-900/20 border border-rose-500/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 placeholder:text-rose-400/70' 
      : 'bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 focus:bg-white/80 dark:focus:bg-black/40 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:shadow-[0_0_30px_rgba(99,102,241,0.15)] placeholder:text-slate-400 dark:placeholder:text-gray-500'}
  `;

  return (
    <div className="min-h-screen py-24 px-6 relative bg-slate-50 dark:bg-[#0a0a0a] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Let's talk business</h1>
          <p className="text-slate-500 dark:text-gray-400 text-lg">
            Have a project in mind? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white/60 dark:bg-[#121212]/50 border border-slate-200 dark:border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-2xl shadow-2xl dark:shadow-none"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 ml-1">Name</label>
              <div className="relative">
                <motion.input
                  animate={errors.name ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={getInputClasses(!!errors.name)}
                  placeholder="Jane Smith"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute right-4 top-4 text-rose-500 pointer-events-none"
                    >
                      <AlertCircle className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-rose-500 font-bold ml-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 ml-1">Email</label>
              <div className="relative">
                <motion.input
                  animate={errors.email ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={getInputClasses(!!errors.email)}
                  placeholder="jane@company.com"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute right-4 top-4 text-rose-500 pointer-events-none"
                    >
                      <AlertCircle className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-rose-500 font-bold ml-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Subject Field */}
          <div className="space-y-2 mb-6">
            <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 ml-1">Service Interest</label>
            <div className="relative">
              <motion.select
                animate={errors.subject ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`${getInputClasses(!!errors.subject)} appearance-none cursor-pointer`}
              >
                <option value="" disabled className="text-slate-500 dark:text-gray-500">Select a service...</option>
                <option value="Web Development" className="text-slate-900 bg-white dark:bg-[#1a1a1a] dark:text-white">Web Development</option>
                <option value="Design" className="text-slate-900 bg-white dark:bg-[#1a1a1a] dark:text-white">Brand Design</option>
                <option value="AI Automation" className="text-slate-900 bg-white dark:bg-[#1a1a1a] dark:text-white">AI Automation</option>
                <option value="Other" className="text-slate-900 bg-white dark:bg-[#1a1a1a] dark:text-white">Other</option>
              </motion.select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
              <AnimatePresence>
                {errors.subject && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute right-10 top-4 text-rose-500 pointer-events-none"
                  >
                    <AlertCircle className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-rose-500 font-bold ml-1"
                >
                  {errors.subject}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Message Field */}
          <div className="space-y-2 mb-8">
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 ml-1">Message</label>
            <div className="relative">
              <motion.textarea
                animate={errors.message ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`${getInputClasses(!!errors.message)} resize-none`}
                placeholder="Tell us about your project goals, timeline, and budget..."
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute right-4 top-4 text-rose-500 pointer-events-none"
                  >
                    <AlertCircle className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-rose-500 font-bold ml-1"
                >
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Send Message <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </motion.form>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 px-8 py-4 bg-green-500/10 border border-green-500/50 rounded-full backdrop-blur-xl z-50 shadow-2xl"
          >
            <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-green-600 dark:text-green-400 font-bold text-lg">Message sent successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;