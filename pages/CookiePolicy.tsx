import React from 'react';
import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen py-24 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-slate-200 dark:border-white/10 pb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-6">
            <Cookie className="w-3 h-3" />
            Legal
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Cookie Policy</h1>
          <p className="text-slate-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-slate-700 dark:text-gray-200 mb-8">
            We use cookies to enhance your browsing experience and analyze our traffic. This policy explains what cookies are and how we use them.
          </p>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-12 mb-4">1. What Are Cookies?</h3>
          <p className="text-slate-600 dark:text-gray-300">Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser.</p>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-12 mb-4">2. How We Use Cookies</h3>
          <ul className="list-disc pl-6 space-y-2 my-4 text-slate-600 dark:text-gray-300">
            <li><strong className="text-slate-900 dark:text-white">Essential Cookies:</strong> Necessary for the website to function properly (e.g., secure login, shopping cart).</li>
            <li><strong className="text-slate-900 dark:text-white">Analytics Cookies:</strong> Help us understand how visitors interact with the website by collecting and reporting information anonymously.</li>
            <li><strong className="text-slate-900 dark:text-white">Marketing Cookies:</strong> Used to track visitors across websites to display relevant ads.</li>
          </ul>

          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-12 mb-4">3. Managing Preferences</h3>
          <p className="text-slate-600 dark:text-gray-300">You can change your cookie preferences at any time by clicking the "Cookie Settings" link in the footer or by changing your browser settings. Blocking some types of cookies may impact your experience of the site.</p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;