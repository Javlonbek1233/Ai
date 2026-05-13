import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, LayoutDashboard, MessageSquare, Settings as SettingsIcon, LogOut, Menu } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const { user, signInWithGoogle, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Chat', path: '/chat', icon: MessageSquare },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-16 flex items-center justify-between px-8 sm:px-12">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:bg-indigo-500 transition-colors">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <span className="text-slate-200 text-sm font-bold tracking-[0.1em] uppercase">Aura Core</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {user && navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-white",
              location.pathname === item.path ? "text-indigo-400" : "text-slate-500"
            )}
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest">Active</span>
            </div>
            <button 
              onClick={logout}
              className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button 
            onClick={signInWithGoogle}
            className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-slate-200 transition-all shadow-lg shadow-white/5 active:scale-95"
          >
            Authenticate
          </button>
        )}
      </div>
    </nav>
  );
}
