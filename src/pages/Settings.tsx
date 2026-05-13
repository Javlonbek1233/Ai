import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Bell, CreditCard, Cloud, Key, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Settings() {
  const { user } = useAuth();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-24 pb-12 px-8 sm:px-12 max-w-7xl mx-auto"
    >
      <header className="mb-12 border-b border-white/5 pb-8">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">System Preferences.</h1>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Configuring Aura Core // Instance-09</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Navigation */}
        <div className="lg:col-span-1 space-y-1">
           <SettingsNavItem icon={User} label="Profile" active />
           <SettingsNavItem icon={Shield} label="Security" />
           <SettingsNavItem icon={Bell} label="Notifications" />
           <SettingsNavItem icon={CreditCard} label="Billing" />
           <SettingsNavItem icon={Key} label="API Access" />
           <SettingsNavItem icon={Cloud} label="Integrations" />
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-8">
           <section className="bg-[#111] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px]" />
              <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-slate-500 mb-8 relative">Identity Overview</h3>
              <div className="flex flex-col sm:flex-row items-center gap-10 relative">
                 <div className="w-28 h-28 rounded-[2rem] bg-indigo-600/10 border border-white/5 flex items-center justify-center overflow-hidden shadow-2xl relative group">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="pfp" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="text-4xl font-bold text-indigo-400">{user?.displayName?.[0]}</div>
                    )}
                 </div>
                 <div className="flex-1 space-y-6 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <InputGroup label="Display Name" value={user?.displayName || "Anonymous User"} />
                       <InputGroup label="Network ID" value={user?.email || "No email linked"} readOnly />
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Metadata synchronized via Global Auth Handshake</p>
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-[#111] border border-white/5 rounded-3xl p-8">
              <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-slate-500 mb-8">Ecosystem Plan</h3>
              <div className="p-1 border border-indigo-500/20 rounded-2xl bg-indigo-500/5 overflow-hidden">
                 <div className="p-8 rounded-xl bg-[#151515] flex flex-col sm:flex-row items-center justify-between gap-8 border border-white/5">
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                          <Sparkles className="w-7 h-7 text-white" />
                       </div>
                       <div>
                          <h4 className="font-bold uppercase tracking-[0.15em] text-white">Professional Tier</h4>
                          <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-wider">Enterprise Cluster // Billed Annual</p>
                       </div>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all shadow-lg shadow-white/5 active:scale-95">
                       Manage Ecosystem
                    </button>
                 </div>
              </div>
           </section>

           <div className="flex justify-end gap-6 pt-4">
              <button className="text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:text-white transition-colors">Abort Changes</button>
              <button className="px-10 py-4 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-95">
                 Update Core State
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function SettingsNavItem({ icon: Icon, label, active }: any) {
  return (
    <button className={cn(
      "w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group",
      active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 hover:bg-white/5 hover:text-white"
    )}>
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4" />
        <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <ChevronRight className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity", active && "opacity-100")} />
    </button>
  );
}

function InputGroup({ label, value, readOnly }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold ml-1">{label}</label>
      <input 
        type="text" 
        defaultValue={value} 
        readOnly={readOnly}
        className={cn(
          "w-full bg-[#080808] border border-white/5 rounded-xl px-4 py-3 text-sm font-medium text-slate-200 focus:outline-none transition-all",
          readOnly ? "opacity-40 cursor-not-allowed font-mono text-xs" : "hover:border-white/10 focus:border-indigo-500/50 focus:bg-[#0c0c0c]"
        )}
      />
    </div>
  );
}

import { Sparkles } from 'lucide-react';
