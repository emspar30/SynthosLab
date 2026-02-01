import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen py-24 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-slate-200 dark:border-white/10 pb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-6">
            <FileText className="w-3 h-3" />
            Legal
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Terms of Service</h1>
          <p className="text-slate-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-slate-700 dark:text-gray-200 mb-8">
            Welcome to SynthosLab. By accessing our website or using our services, you agree to be bound by these Terms.
          </p>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-12 mb-4">1. Services</h3>
          <p className="text-slate-600 dark:text-gray-300">SynthosLab provides digital design, development, and AI automation services. We reserve the right to refuse service to anyone for any reason at any time.</p>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-12 mb-4">2. Intellectual Property</h3>
          <p className="text-slate-600 dark:text-gray-300">Upon full payment, all final deliverables (designs, code, strategies) become the exclusive property of the Client. SynthosLab retains the right to display the work in our portfolio unless a Non-Disclosure Agreement (NDA) is signed.</p>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-12 mb-4">3. AI-Generated Content</h3>
          <p className="text-slate-600 dark:text-gray-300">Parts of our deliverables may be generated using Artificial Intelligence. Due to the nature of AI, we cannot guarantee that AI-generated assets are unique or capable of being trademarked in all jurisdictions.</p>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-12 mb-4">4. Payment Terms</h3>
          <p className="text-slate-600 dark:text-gray-300">Retainers are billed monthly in advance. One-time projects require a 50% deposit before commencement. Late payments may result in a suspension of services.</p>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-12 mb-4">5. Limitation of Liability</h3>
          <p className="text-slate-600 dark:text-gray-300">In no event shall SynthosLab be liable for any indirect, incidental, special, or consequential damages arising out of the use of our services.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;