import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen py-24 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-slate-200 dark:border-white/10 pb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-6">
            <Shield className="w-3 h-3" />
            Legal
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Privacy Policy</h1>
          <p className="text-slate-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-slate-700 dark:text-gray-200 mb-8">
            At SynthosLab, we prioritize the protection of your digital footprint. This Privacy Policy outlines how we collect, use, and safeguard your personal information in the age of AI.
          </p>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-12 mb-4">1. Information Collection</h3>
          <p className="text-slate-600 dark:text-gray-300">We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, request customer support, or communicate with our AI agents.</p>
          <ul className="list-disc pl-6 space-y-2 my-4 text-slate-600 dark:text-gray-300">
            <li>Contact Information (Name, Email, Phone)</li>
            <li>Project Specifications and Brand Assets</li>
            <li>Payment Information (processed via Stripe)</li>
            <li>Usage Data and AI Interaction Logs</li>
          </ul>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-12 mb-4">2. Use of AI Data</h3>
          <p className="text-slate-600 dark:text-gray-300">Our platform utilizes advanced Large Language Models (LLMs). Data submitted to specific automated workflows may be processed by third-party AI providers (e.g., OpenAI, Google Cloud) solely for the purpose of generating the requested output. We do not use client proprietary data to train public models.</p>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-12 mb-4">3. Data Security</h3>
          <p className="text-slate-600 dark:text-gray-300">We employ enterprise-grade encryption (AES-256) for data at rest and in transit. However, no digital transmission is 100% secure. We encourage clients to use secure channels for sensitive intellectual property.</p>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-12 mb-4">4. Your Rights</h3>
          <p className="text-slate-600 dark:text-gray-300">You have the right to access, correct, or delete your personal data. You may also object to the processing of your data by our AI systems at any time by contacting compliance@synthoslab.ai.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;