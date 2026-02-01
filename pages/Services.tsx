import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { servicesData } from '../data/services';

const SkeletonServiceCard = () => (
    <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 h-[300px] animate-pulse flex flex-col">
        <div className="w-14 h-14 bg-slate-200 dark:bg-white/10 rounded-2xl mb-6" />
        <div className="h-8 w-2/3 bg-slate-200 dark:bg-white/10 rounded mb-4" />
        <div className="h-4 w-full bg-slate-200 dark:bg-white/10 rounded mb-2" />
        <div className="h-4 w-4/5 bg-slate-200 dark:bg-white/10 rounded" />
    </div>
);

const Services: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">Our Capabilities</h1>
          <p className="text-slate-500 dark:text-gray-400 max-w-2xl text-lg">
            We provide a full spectrum of digital services, from initial ideation to final deployment. Click on a service to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
             Array.from({ length: 6 }).map((_, i) => (
                <SkeletonServiceCard key={i} />
             ))
          ) : (
            servicesData.map((service, index) => (
                <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`group h-full relative p-8 rounded-3xl bg-white dark:bg-white/5 border overflow-hidden hover:border-indigo-200 dark:hover:border-white/20 transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-none cursor-pointer ${
                          service.featured 
                            ? 'border-indigo-500/50 dark:border-indigo-500/50 ring-2 ring-indigo-500/20 dark:ring-indigo-500/10' 
                            : 'border-slate-200 dark:border-white/10'
                        }`}
                    >
                        {/* Featured Badge */}
                        {service.featured && (
                            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                <Sparkles className="w-3 h-3" /> Featured
                            </div>
                        )}

                        {/* Hover Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 bg-slate-100 dark:bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-white group-hover:scale-110 transition-transform duration-300">
                                <service.icon className="w-7 h-7" />
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-3 text-slate-900 dark:text-white">{service.title}</h3>
                            <p className="text-slate-500 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-gray-200 transition-colors mb-6">
                                {service.description}
                            </p>
                            <div className="mt-auto flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                Learn More <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </motion.div>
                </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;