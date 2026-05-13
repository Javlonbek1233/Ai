import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Trash2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function ChatWorkspace() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'chats'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'chats');
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || !auth.currentUser) return;

    const userMessage = input;
    setInput('');
    setIsTyping(true);

    try {
      // 1. Save user message to Firestore
      await addDoc(collection(db, 'chats'), {
        userId: auth.currentUser.uid,
        text: userMessage,
        role: 'user',
        createdAt: serverTimestamp(),
      });

      // 2. Get AI Response
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "You are Aura AI, a high-performance intelligence assistant for a $1B SaaS platform. Be concise, professional, and insightful.",
        }
      });

      const aiResponse = response.text || "I apologize, I encountered a semantic misalignment.";

      // 3. Save AI message to Firestore
      await addDoc(collection(db, 'chats'), {
        userId: auth.currentUser.uid,
        text: aiResponse,
        role: 'assistant',
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsTyping(false);
    }
  }

  async function clearHistory() {
    if (!auth.currentUser) return;
    const chatDocs = messages.map(m => m.id);
    for (const id of chatDocs) {
      try {
        await deleteDoc(doc(db, 'chats', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `chats/${id}`);
      }
    }
  }

  return (
    <div className="h-screen pt-16 flex flex-col bg-[#050505] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#080808]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Orchestrator Node v1.4</h2>
            <p className="text-[10px] text-emerald-500 flex items-center gap-2 uppercase tracking-[0.2em] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              L-4096-ALPHA :: STABLE
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded">SSL-4.0_READY</span>
          <button 
            onClick={clearHistory}
            className="p-2.5 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-colors border border-transparent hover:border-white/5"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto px-8 sm:px-12 py-10 space-y-10">
        <AnimatePresence initial={false}>
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full text-center space-y-8"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-indigo-600/5 border border-indigo-500/10 flex items-center justify-center relative">
                <Sparkles className="w-10 h-10 text-indigo-400 animate-pulse" />
                <div className="absolute inset-0 bg-indigo-500/5 blur-[40px] rounded-full"></div>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-white tracking-tight">Handshake Initialized.</h3>
                <p className="max-w-xs mx-auto text-slate-500 text-sm font-medium leading-relaxed">System ready for command inference. Input your next objective below.</p>
              </div>
            </motion.div>
          )}
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id || index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex items-start gap-5 max-w-4xl relative group",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all",
                msg.role === 'user' ? "bg-white text-black border-transparent shadow-lg shadow-white/5" : "bg-[#111] text-indigo-400 border-white/5 shadow-xl"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={cn(
                "px-6 py-5 rounded-3xl text-sm leading-relaxed border transition-all relative overflow-hidden",
                msg.role === 'user' 
                  ? "bg-indigo-600/10 text-white border-indigo-500/20 shadow-md" 
                  : "bg-[#111] text-slate-300 border-white/5 markdown-body group-hover:border-white/10"
              )}>
                {msg.role !== 'user' && <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/[0.02] blur-3xl" />} 
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4 text-indigo-400"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Processing Neural Weights...</span>
            </motion.div>
          )}
          <div ref={scrollRef} />
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-8 sm:p-12 border-t border-white/5 bg-[#080808]">
        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-slate-700 font-mono text-xs hidden lg:block">{'>'}</div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Execute system command or AI prompt..."
            className="w-full bg-[#111] border border-white/10 rounded-2xl px-8 py-5 text-slate-200 placeholder:text-slate-600 font-medium focus:outline-none focus:border-indigo-500/50 focus:bg-[#151515] transition-all shadow-inner"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
             <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest hidden sm:block">CMD + K</span>
             <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-3.5 rounded-xl bg-indigo-600 text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
          </div>
        </div>
        <p className="text-center mt-6 text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">
          CORE-09-X // DATALINK: SECURE // REGION-US-E
        </p>
      </div>
    </div>
  );
}
