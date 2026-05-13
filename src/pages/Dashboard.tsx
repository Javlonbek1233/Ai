import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Users, Zap, TrendingUp, Sparkles, BrainCircuit } from 'lucide-react';
import { cn } from '../lib/utils';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-24 pb-12 px-8 sm:px-12 max-w-7xl mx-auto"
    >
      <header className="mb-12 border-b border-white/5 pb-8">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Active Infrastructure // <span className="text-slate-500">{user?.displayName?.split(' ')[0]}</span></h1>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Session Token: AUTH-902-XQ12</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard label="Active Threads" value="1,284" icon={BrainCircuit} trend="+12.5%" />
        <StatsCard label="Tokens Processed" value="48.2M" icon={Activity} trend="+4.2%" />
        <StatsCard label="System Integrity" value="94.8%" icon={Users} trend="STABLE" />
        <StatsCard label="Neural Latency" value="12ms" icon={Zap} trend="-4ms" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-slate-400 flex items-center gap-2">
              Intelligence Throughput
            </h3>
            <div className="flex gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#444', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{backgroundColor: '#080808', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px'}}
                  itemStyle={{color: '#fff', fontSize: '12px', fontWeight: 'bold'}}
                />
                <Area 
                  type="stepAfter" 
                  dataKey="value" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Activity */}
        <div className="glass-card p-8">
          <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-slate-400 mb-10">
            Active Agents
          </h3>
          <div className="space-y-8">
            <ActivityItem 
              title="Researcher-01" 
              desc="Compiling cross-chain market datasets." 
              status="active"
            />
            <ActivityItem 
              title="Strategist-Alpha" 
              desc="Optimizing high-frequency cost vectors." 
              status="active"
            />
            <ActivityItem 
              title="Protocol-V2" 
              desc="Deployment of neural patch pending approval." 
              status="pending"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatsCard({ label, value, icon: Icon, trend }: any) {
  return (
    <div className="bg-[#111] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl group-hover:bg-indigo-600/10 transition-colors"></div>
      <div className="flex justify-between items-start mb-6 relative">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          <Icon className="w-5 h-5 text-slate-400" />
        </div>
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-md tracking-widest",
          trend.includes('+') ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-slate-500"
        )}>
          {trend}
        </span>
      </div>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1 relative">{label}</p>
      <p className="text-3xl font-bold text-white relative tracking-tight">{value}</p>
    </div>
  );
}

function ActivityItem({ title, desc, status }: any) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer bg-white/2 p-3 rounded-2xl border border-transparent hover:border-white/5 transition-all">
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
        status === 'active' ? "bg-indigo-500/10 text-indigo-500" : "bg-white/5 text-slate-500"
      )}>
        <BrainCircuit className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-white mb-0.5 uppercase tracking-wide group-hover:text-indigo-400 transition-colors">{title}</p>
        <p className="text-[10px] text-slate-500 font-medium line-clamp-1">{desc}</p>
      </div>
      <div className={cn(
        "w-1.5 h-1.5 rounded-full",
        status === 'active' ? "bg-indigo-500 shadow-sm shadow-indigo-500/50 animate-pulse" : "bg-slate-700"
      )} />
    </div>
  );
}
