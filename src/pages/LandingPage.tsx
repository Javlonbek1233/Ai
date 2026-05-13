import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Zap, Globe, Shield, Star, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LandingPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 sm:px-12 max-w-7xl mx-auto py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-8">
            The Future of Intelligence is Here
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
            Intelligence <br />
            <span className="text-slate-500">Redefined.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg sm:text-xl font-medium mb-12">
            Aura Core is the premium environment for visionaries. High-performance AI tools, 
            seamless collaboration, and actionable intelligence—all in one elegant interface.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={signInWithGoogle}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all active:scale-95 shadow-xl shadow-indigo-500/20"
            >
              Start Building Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Feature Grid Reveal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-24 glass-card p-4 sm:p-8 premium-gradient relative"
        >
          <div className="aspect-video rounded-xl bg-neutral-900 border border-white/5 overflow-hidden flex items-center justify-center">
             <div className="text-center">
                <LayoutGridDemo />
             </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Pills */}
      <section className="py-20 bg-[#080808]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={Zap} 
            title="Instant Thinking" 
            description="Process complex data at the speed of thought with our next-gen neural engine."
          />
          <FeatureCard 
            icon={Globe} 
            title="Global Reach" 
            description="Deploy models globally with regional nodes for ultra-low latency execution."
          />
          <FeatureCard 
            icon={Shield} 
            title="Private-First" 
            description="Your data is encrypted, siloed, and never used for training without consent."
          />
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center">
         <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16 underline decoration-indigo-600 decoration-8 underline-offset-8">Scalable Ecosystems.</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard tier="Essential" price="0" features={["50 AI Messages/mo", "Basic Analytics", "Community Support"]} />
            <PricingCard tier="Professional" price="49" popular features={["Unlimited AI Messages", "Advanced Intelligence", "Team Collaboration", "Priority Support"]} />
            <PricingCard tier="Enterprise" price="Custom" features={["Custom Model Training", "Dedicated API Nodes", "White-glove Support", "SLA Guarantee"]} />
         </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <div className="space-y-4 group">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:border-indigo-500/50 transition-all shadow-lg group-hover:shadow-indigo-500/10">
        <Icon className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
      </div>
      <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
    </div>
  );
}

function PricingCard({ tier, price, popular, features }: any) {
  return (
    <div className={cn(
      "p-10 text-left border transition-all active:scale-[0.98]",
      popular ? "bg-[#111] border-indigo-600/50 scale-105 shadow-2xl shadow-indigo-600/10" : "glass-card border-white/5 text-white"
    )}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-500">{tier}</h4>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight">{price === "Custom" ? "" : "$"}{price}</span>
            {price !== "Custom" && <span className="text-sm opacity-50 font-medium">/mo</span>}
          </div>
        </div>
        {popular && <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-indigo-500/20">Recommended</span>}
      </div>
      <ul className="space-y-4 mb-10">
        {features.map((f: string) => (
          <li key={f} className="flex items-center gap-3 text-sm font-medium text-slate-300">
            <CheckCircle2 className={cn("w-4 h-4", popular ? "text-indigo-400" : "text-white opacity-20")} />
            <span className="opacity-80">{f}</span>
          </li>
        ))}
      </ul>
      <button className={cn(
        "w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
        popular ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/20" : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
      )}>
        Select {tier}
      </button>
    </div>
  );
}

function LayoutGridDemo() {
  return (
    <div className="grid grid-cols-6 grid-rows-6 gap-2 w-full max-w-4xl opacity-40">
      {[...Array(36)].map((_, i) => (
        <div key={i} className="aspect-square border border-white/10 rounded-sm bg-white/2" />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
         <Star className="w-12 h-12 text-white animate-pulse" />
      </div>
    </div>
  );
}
