import React, { useState } from 'react';
import { Check, X, CreditCard, Lock, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { BillingCycle, PricingTier } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(BillingCycle.MONTHLY);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const monthlyTiers: PricingTier[] = [
    {
      name: 'Starter',
      price: '$2,500',
      description: 'Perfect for early-stage startups needing continuous design support.',
      features: ['Unlimited Graphic Design', '24-hour turnaround', 'Slack Communication', '1 Active Request', 'No Web Development'],
    },
    {
      name: 'Growth',
      price: '$4,500',
      description: 'Complete design & basic development for scaling teams.',
      features: ['Everything in Starter', 'Webflow/Framer Development', '2 Active Requests', 'Priority Support', 'Weekly Strategy Call'],
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: '$8,000',
      description: 'Full-service agency replacement.',
      features: ['Everything in Growth', 'Custom React/Node Dev', 'Unlimited Active Requests', 'Dedicated Project Manager', 'AI Workflow Automation'],
    },
  ];

  const projectTiers: PricingTier[] = [
    {
      name: 'Landing Page',
      price: '$3,000+',
      description: 'High converting landing page.',
      features: ['Design & Copywriting', 'Framer or React Build', 'SEO Optimization', 'Analytics Setup', '1 Week Delivery'],
    },
    {
      name: 'MVP Build',
      price: '$15,000+',
      description: 'Go from idea to functional product.',
      features: ['Full UI/UX Design', 'Database Architecture', 'Frontend & Backend', 'Authentication & Payments', '4-6 Weeks Delivery'],
      recommended: true,
    },
    {
      name: 'AI Integration',
      price: '$5,000+',
      description: 'Add intelligence to your workflow.',
      features: ['Process Analysis', 'Custom n8n Workflows', 'OpenAI Integration', 'Staff Training', '2 Weeks Delivery'],
    },
  ];

  const currentTiers = billingCycle === BillingCycle.MONTHLY ? monthlyTiers : projectTiers;

  const handleSelectPlan = (tier: PricingTier) => {
    setSelectedTier(tier);
    setShowPaymentModal(true);
    setPaymentSuccess(false);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
        setSelectedTier(null);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-20 px-6 relative bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">Simple Pricing</h1>
          <p className="text-slate-500 dark:text-gray-400 max-w-xl mx-auto mb-10">
            Choose a plan that fits your stage. Pause or cancel anytime for retainers.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center p-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full backdrop-blur-md shadow-sm dark:shadow-none">
            {Object.values(BillingCycle).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingCycle === cycle
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cycle}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 ${
                tier.recommended
                  ? 'bg-indigo-50 dark:bg-white/10 border-indigo-500 shadow-xl dark:shadow-[0_0_40px_rgba(99,102,241,0.15)]'
                  : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10'
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wide rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="font-display text-xl font-bold mb-2 text-slate-900 dark:text-white">{tier.name}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm h-10">{tier.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{tier.price}</span>
                {billingCycle === BillingCycle.MONTHLY && <span className="text-slate-500 dark:text-gray-500">/mo</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-gray-300">
                    <Check className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(tier)}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  tier.recommended
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/25'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
            <p className="text-slate-500 dark:text-gray-500 text-sm mb-4">Secure Payment Partners</p>
            <div className="flex justify-center items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <CreditCard className="w-8 h-8 text-slate-900 dark:text-white" />
                <span className="font-display font-bold text-xl text-slate-900 dark:text-white">VISA</span>
                <span className="font-display font-bold text-xl text-slate-900 dark:text-white">Mastercard</span>
                <span className="font-display font-bold text-xl text-slate-900 dark:text-white">Stripe</span>
                <Lock className="w-6 h-6 text-slate-900 dark:text-white" />
            </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedTier && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPaymentModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-400 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                {paymentSuccess ? (
                   <div className="text-center py-8">
                     <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Check className="w-8 h-8 text-green-500" />
                     </div>
                     <h3 className="font-display text-2xl font-bold mb-2 text-slate-900 dark:text-white">Payment Successful!</h3>
                     <p className="text-slate-600 dark:text-gray-400">Welcome to SynthosLab. We've sent a confirmation to your email.</p>
                   </div>
                ) : (
                  <>
                    <div className="mb-6 border-b border-slate-200 dark:border-white/10 pb-6">
                      <h3 className="font-display text-xl font-bold mb-1 text-slate-900 dark:text-white">Checkout</h3>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 dark:text-gray-400">{selectedTier.name} Plan</span>
                        <span className="font-bold text-slate-900 dark:text-white">{selectedTier.price}</span>
                      </div>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Cardholder Name</label>
                        <div className="relative">
                            <input type="text" placeholder="John Doe" required className="w-full bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-gray-600" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Card Number</label>
                        <div className="relative">
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-gray-500" />
                            <input type="text" placeholder="0000 0000 0000 0000" required className="w-full bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-gray-600" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Expiry</label>
                            <input type="text" placeholder="MM/YY" required className="w-full bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-gray-600" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">CVC</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500" />
                                <input type="text" placeholder="123" required className="w-full bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-gray-600" />
                            </div>
                         </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-4 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck className="w-5 h-5" /> Pay Securely</>}
                      </button>

                      <p className="text-xs text-center text-slate-500 dark:text-gray-500 mt-4 flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3" /> Encrypted by 256-bit SSL
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Pricing;