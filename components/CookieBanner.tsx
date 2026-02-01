import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check, Settings, Shield } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('nova_cookie_consent');
    if (!savedConsent) {
        // Small delay for better UX on initial load
        setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    localStorage.setItem('nova_cookie_consent', JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const allRejected = { essential: true, analytics: false, marketing: false };
    localStorage.setItem('nova_cookie_consent', JSON.stringify(allRejected));
    setPreferences(allRejected);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('nova_cookie_consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-5xl mx-auto bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative">
            <div className="p-6 md:flex items-start gap-6">
                <div className="flex-shrink-0 mb-4 md:mb-0 hidden md:block">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                        <Cookie className="w-6 h-6 text-indigo-400" />
                    </div>
                </div>
                
                <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2 md:mb-2">
                         <div className="md:hidden w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center border border-indigo-500/20">
                            <Cookie className="w-4 h-4 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-bold font-display text-white">We value your privacy</h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-3xl">
                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                    </p>

                    {/* Controls */}
                    {!showDetails ? (
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                                onClick={handleAcceptAll}
                                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-sm transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                            >
                                Accept All
                            </button>
                            <button 
                                onClick={handleRejectAll}
                                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg text-sm transition-colors"
                            >
                                Reject All
                            </button>
                            <button 
                                onClick={() => setShowDetails(true)}
                                className="px-6 py-2.5 text-gray-400 hover:text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
                            >
                                <Settings className="w-4 h-4" /> Customize
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 border-t border-white/10 pt-4 mt-4 animate-in fade-in slide-in-from-top-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Essential */}
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between opacity-50 cursor-not-allowed">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-4 h-4 text-green-400" />
                                        <div>
                                            <p className="text-sm font-bold text-white">Essential</p>
                                            <p className="text-xs text-gray-400">Required</p>
                                        </div>
                                    </div>
                                    <div className="w-10 h-5 bg-indigo-500 rounded-full relative">
                                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                                    </div>
                                </div>

                                {/* Analytics */}
                                <div 
                                    onClick={() => togglePreference('analytics')}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${preferences.analytics ? 'bg-indigo-500 border-indigo-500' : 'border-gray-500'}`}>
                                            {preferences.analytics && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Analytics</p>
                                            <p className="text-xs text-gray-400">Performance</p>
                                        </div>
                                    </div>
                                    <div className={`w-10 h-5 rounded-full relative transition-colors ${preferences.analytics ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${preferences.analytics ? 'right-1' : 'left-1'}`} />
                                    </div>
                                </div>

                                {/* Marketing */}
                                <div 
                                    onClick={() => togglePreference('marketing')}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${preferences.marketing ? 'bg-indigo-500 border-indigo-500' : 'border-gray-500'}`}>
                                            {preferences.marketing && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Marketing</p>
                                            <p className="text-xs text-gray-400">Targeting</p>
                                        </div>
                                    </div>
                                    <div className={`w-10 h-5 rounded-full relative transition-colors ${preferences.marketing ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${preferences.marketing ? 'right-1' : 'left-1'}`} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button 
                                    onClick={handleSavePreferences}
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-sm transition-colors"
                                >
                                    Save Preferences
                                </button>
                                <button 
                                    onClick={() => setShowDetails(false)}
                                    className="px-6 py-2.5 text-gray-400 hover:text-white font-medium text-sm transition-colors"
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <button 
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;