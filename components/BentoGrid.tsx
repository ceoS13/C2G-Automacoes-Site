import React, { useState, useEffect, useRef } from 'react';
import { 
  BrainCircuit, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Server, 
  Users, 
  MoreHorizontal,
  ArrowUpRight,
  Lock,
  Terminal,
  Target,
  Smile,
  Code2,
  ScanEye,
  User,
  Briefcase,
  Loader2,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- WRAPPER COMPONENT: Dashboard Panel ---
const DashboardCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  headerAction?: React.ReactNode;
  delay?: string;
}> = ({ title, icon, className, children, headerAction, delay }) => {
  return (
    <article 
      className={`group relative bg-[#09090b]/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-cyan-500/30 transition-all duration-500 ${className}`}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.02] z-20 relative">
        <div className="flex items-center gap-3">
            <div className="text-zinc-400 group-hover:text-cyan-400 transition-colors">
                {icon}
            </div>
            <h3 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase font-mono">{title}</h3>
        </div>
        <div>
            {headerAction || <MoreHorizontal size={16} className="text-zinc-600 cursor-pointer hover:text-white" />}
        </div>
      </div>

      {/* Widget Body */}
      <div className="relative flex-1 p-0 overflow-hidden">
         {/* Grid Background */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
         {children}
      </div>
    </article>
  );
};

// --- WIDGET 1: Ísis Analysis HUD (Redesigned Modular) ---
const IsisAnalysisWidget = () => {
  // Donut Chart Props
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = 92;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Interaction State for "Next Action"
  const [actionStatus, setActionStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleActionClick = () => {
    if (actionStatus !== 'idle') return;

    setActionStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
        setActionStatus('success');
        
        // Reset after 3 seconds
        setTimeout(() => {
            setActionStatus('idle');
        }, 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full p-5 relative z-10 font-mono text-xs select-none gap-4">
        
        {/* 1. Topo: Contexto */}
        <div className="flex justify-between items-center pb-2 border-b border-white/5">
           <div className="flex items-center gap-2 text-zinc-500">
              <ScanEye size={12} />
              <span>ID: <span className="text-zinc-300">#8X92-A</span></span>
           </div>
           <motion.div 
             animate={{ opacity: [1, 0.4, 1] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="flex items-center gap-1.5 text-emerald-400 font-bold tracking-wider"
           >
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
              ANÁLISE AO VIVO
           </motion.div>
        </div>

        {/* 2. Grid Modular (3 Colunas) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
            
            {/* Bloco Esquerda: Quem é o Lead */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col justify-center gap-2 hover:bg-white/10 transition-colors"
            >
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                    <div className="p-1.5 bg-blue-500/10 rounded text-blue-400">
                        <User size={14} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wide">Lead</span>
                </div>
                <div>
                    <div className="text-white font-bold text-sm">Carlos Mendes</div>
                    <div className="flex items-center gap-1.5 mt-1">
                        <Briefcase size={10} className="text-zinc-500"/>
                        <span className="text-[10px] text-zinc-300">
                            Dir. Comercial @ <span className="text-cyan-400 font-bold">Vtex</span>
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Bloco Centro: Intenção & Sentimento */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col justify-center gap-3 hover:bg-white/10 transition-colors"
            >
                {/* Intent */}
                <div>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase mb-1">
                        <Target size={10} /> Intenção
                    </div>
                    <div className="text-white font-bold">Agendamento</div>
                </div>
                {/* Sentiment */}
                <div>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase mb-1">
                        <Smile size={10} /> Sentimento
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '98%' }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-emerald-500" 
                            />
                        </div>
                        <span className="text-emerald-400 font-bold">0.98</span>
                    </div>
                </div>
            </motion.div>

            {/* Bloco Direita: Score Visual (Donut) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 border border-white/5 rounded-xl p-2 flex flex-col items-center justify-center relative hover:bg-white/10 transition-colors group"
            >
                <div className="absolute top-2 left-2 text-[10px] text-zinc-500 uppercase tracking-wide">Nota</div>
                
                <div className="relative w-20 h-20 flex items-center justify-center mt-2">
                    {/* SVG Donut */}
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Track */}
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="5"
                            fill="transparent"
                            className="text-zinc-800"
                        />
                        {/* Progress */}
                        <motion.circle
                            initial={{ strokeDashoffset: circumference }}
                            whileInView={{ strokeDashoffset: strokeDashoffset }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                            cx="50%"
                            cy="50%"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="5"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeLinecap="round"
                            className="text-emerald-500 drop-shadow-[0_0_4px_rgba(16,185,129,0.6)]"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xl font-bold text-white">92</span>
                    </div>
                </div>
                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Lead Quente</span>
            </motion.div>

        </div>

        {/* 3. Fundo: Ação Interativa */}
        <motion.button 
           initial={{ opacity: 0, y: 5 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           onClick={handleActionClick}
           disabled={actionStatus !== 'idle'}
           className={`
               relative w-full border rounded-lg p-3 flex items-center justify-between transition-all duration-300 overflow-hidden group outline-none
               ${actionStatus === 'idle' 
                    ? 'bg-black/40 border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/20 hover:border-cyan-500/40' 
                    : actionStatus === 'success' 
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-400' 
                        : 'bg-black/40 border-zinc-700 text-zinc-400'}
           `}
        >
            <AnimatePresence mode="wait">
                {actionStatus === 'idle' && (
                    <motion.div 
                        key="idle"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center justify-between w-full"
                    >
                        <div className="flex items-center gap-2">
                            <Code2 size={12} className="text-cyan-600"/>
                            <span className="font-mono tracking-tight text-[11px] font-bold">{`> Trigger: Agenda_API.exec()`}</span>
                        </div>
                        <Zap size={14} className="fill-cyan-500/20 animate-pulse group-hover:fill-cyan-400 transition-colors" />
                    </motion.div>
                )}

                {actionStatus === 'loading' && (
                    <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center justify-center w-full gap-2"
                    >
                        <Loader2 size={14} className="animate-spin" />
                        <span className="font-mono text-[11px]">Processando requisição...</span>
                    </motion.div>
                )}

                {actionStatus === 'success' && (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center justify-center w-full gap-2"
                    >
                        <Check size={14} className="stroke-[3]" />
                        <span className="font-mono text-[11px] font-bold">Convite Enviado!</span>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Background Progress Bar for Loading */}
            {actionStatus === 'loading' && (
                <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 h-[2px] bg-cyan-500"
                />
            )}
        </motion.button>

    </div>
  );
};

// --- WIDGET 2: Growth Chart ---
const GrowthWidget = () => {
    const bars = [30, 45, 35, 60, 50, 75, 65, 90];
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    return (
        <div className="h-full flex flex-col p-5 relative z-10">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="text-xs text-zinc-500 font-mono mb-1">LEADS GERADOS</div>
                    <div className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                      +1,240
                      <span className="flex h-2 w-2 relative">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                </div>
                <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs text-emerald-400 font-mono flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    <ArrowUpRight size={12} /> 12%
                </div>
            </div>

            <div className="flex-1 flex items-end justify-between gap-2" onMouseLeave={() => setHoveredIndex(null)}>
                {bars.map((height, i) => (
                    <div key={i} className="relative w-full h-full flex items-end justify-center group">
                        {/* Tooltip - Perfectly centered above bar */}
                        <AnimatePresence>
                            {hoveredIndex === i && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 5, x: "-50%" }}
                                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                                    exit={{ opacity: 0, y: 2, x: "-50%" }}
                                    transition={{ duration: 0.15 }}
                                    style={{ bottom: `${height}%` }}
                                    className="absolute left-1/2 mb-2 z-30 flex flex-col items-center pointer-events-none"
                                >
                                    <div className="bg-zinc-900 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2 py-1.5 rounded shadow-xl whitespace-nowrap">
                                        {Math.round(height * 12.4)} Leads
                                    </div>
                                    <div className="w-2 h-2 bg-zinc-900 border-r border-b border-emerald-500/30 rotate-45 -mt-[5px]" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1, type: "spring", stiffness: 100 }}
                            onMouseEnter={() => setHoveredIndex(i)}
                            style={{ height: `${height}%`, transformOrigin: 'bottom' }}
                            className={`
                                w-full rounded-t-sm relative overflow-hidden transition-all duration-300
                                ${hoveredIndex === i ? 'bg-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}
                            `}
                        >
                            {/* Bar Gradient & Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-emerald-400 opacity-80 ${hoveredIndex === i ? 'opacity-100' : ''}`} />
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-emerald-300 shadow-[0_0_10px_2px_rgba(52,211,153,0.5)]" />
                        </motion.div>
                    </div>
                ))}
            </div>
            
            <div className="mt-2 flex justify-between text-[10px] text-zinc-600 font-mono">
                <span>SEG</span>
                <span>TER</span>
                <span>QUA</span>
                <span>QUI</span>
                <span>SEX</span>
                <span>SAB</span>
                <span>DOM</span>
            </div>
        </div>
    );
};

// --- WIDGET 3: Analytics Waveform (BRUTE STACCATO CHART) ---
const AnalyticsWidget = () => {
    // Config for jagged look
    const pointsCount = 35;
    const width = 500;
    const height = 200;
    const stepX = width / (pointsCount - 1);
    
    // State for the "scrolling" noise array
    const [noiseData, setNoiseData] = useState<number[]>([]);
    
    // Initialize noise
    useEffect(() => {
        const initialNoise = Array.from({ length: pointsCount }, () => (Math.random() * 40 - 20));
        setNoiseData(initialNoise);
    }, []);

    // Staccato Tick Animation
    useEffect(() => {
        const interval = setInterval(() => {
            setNoiseData(prev => {
                const next = [...prev];
                next.shift(); // Remove first (leftmost)
                // Add new random jittery noise at the end (rightmost)
                // Higher volatility for "nervous" look
                next.push((Math.random() * 50 - 25)); 
                return next;
            });
        }, 800); // 800ms = Slower, more deliberate update rate (Drastically slowed down from 100ms)
        return () => clearInterval(interval);
    }, []);

    // Construct the path
    // We combine a fixed upward Slope with the scrolling Noise
    const startY = 170; // Bottom Left
    const endY = 40;    // Top Right
    
    let d = "";
    let fillD = "";
    
    // Calculate points
    const points = noiseData.map((noise, i) => {
        const x = i * stepX;
        // Fixed linear trend
        const trendY = startY - ((startY - endY) * (i / (pointsCount - 1)));
        // Add noise
        let y = trendY + noise;
        // Clamp
        y = Math.max(10, Math.min(190, y));
        return { x, y };
    });

    if (points.length > 0) {
        // Build M/L commands (NO curves, pure jagged lines)
        d = `M ${points[0].x},${points[0].y}`;
        fillD = `M ${points[0].x},${points[0].y}`;
        
        for (let i = 1; i < points.length; i++) {
            d += ` L ${points[i].x},${points[i].y}`;
            fillD += ` L ${points[i].x},${points[i].y}`;
        }
        
        // Close fill
        fillD += ` L ${width},${height} L 0,${height} Z`;
    }

    const lastPoint = points[points.length - 1] || { x: 0, y: 0 };

    return (
        <div className="h-full flex flex-col p-5 relative overflow-hidden z-10">
             <div className="flex items-center justify-between mb-2 relative z-20">
                <div className="flex gap-4">
                    <div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">ROI Atual</div>
                        <div className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                          450%
                          <Activity size={14} className="animate-pulse" />
                        </div>
                    </div>
                    <div>
                         <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Economia</div>
                         <div className="text-xl font-bold text-white">R$ 12k</div>
                    </div>
                </div>
             </div>

            {/* Staccato Chart */}
            <div className="absolute bottom-0 left-0 right-0 h-40 w-full overflow-hidden">
                <svg viewBox="0 0 500 200" className="w-full h-full preserve-3d absolute bottom-0" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="financial-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    
                    {/* Fill Area - Instant update, no transition for "Staccato" feel */}
                    <path 
                        d={fillD}
                        fill="url(#financial-gradient)"
                        className="transition-none" 
                    />
                    
                    {/* Stroke Line - Sharp Miter Join for jagged look */}
                    <path 
                        d={d}
                        fill="none" 
                        stroke="#34d399" 
                        strokeWidth="2" 
                        strokeLinejoin="miter"
                        vectorEffect="non-scaling-stroke"
                        className="drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-none"
                    />

                    {/* Jitter Tip Point */}
                    {/* Independent fast vibration animation */}
                    <motion.circle 
                        cx={lastPoint.x} 
                        cy={lastPoint.y} 
                        r="3" 
                        fill="#fff"
                        animate={{ 
                            y: [-2, 2, -1, 3, 0],
                            opacity: [1, 0.7, 1]
                        }}
                        transition={{ 
                            duration: 0.5, // Slowed down jitter slightly to match slower chart
                            repeat: Infinity,
                            repeatType: "mirror"
                        }}
                    />
                    {/* Glow for Tip */}
                    <motion.circle 
                        cx={lastPoint.x} 
                        cy={lastPoint.y} 
                        r="8" 
                        fill="#34d399"
                        opacity="0.4"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    />
                </svg>
            </div>
        </div>
    );
};

// --- WIDGET 4: Governance Terminal ---
const SecurityWidget = () => {
    const [lines, setLines] = useState<string[]>([]);
    
    useEffect(() => {
        const allLogs = [
          "Iniciando Protocolo AVA v2.4...",
          "Escaneando intenção da mensagem...",
          "Analisando sentimento...",
          "Verificando padrões PII...",
          "Validando regras de negócio...",
          "Criptografia verificada (AES-256)",
          "Acesso permitido."
        ];
        
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < allLogs.length) {
                // Capture the value of the log to add synchronously
                const logToAdd = allLogs[currentIndex];
                setLines(prev => {
                    const newLines = [...prev, logToAdd];
                    if (newLines.length > 5) newLines.shift(); // Keep last 5 lines
                    return newLines;
                });
                currentIndex++;
            } else {
                // Reset to loop effect
                currentIndex = 0;
                setLines([]);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col h-full bg-[#050505] relative z-10">
             <div className="flex-1 p-3 font-mono text-[10px] text-zinc-400 space-y-1.5 overflow-hidden">
                {lines.map((line, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-2"
                    >
                        <span className="text-zinc-600">{`>`}</span>
                        <span className={line && line.includes("permitido") ? "text-emerald-400 font-bold" : "text-zinc-400"}>
                          {line}
                        </span>
                    </motion.div>
                ))}
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-4 bg-zinc-600 inline-block align-middle ml-2"
                />
             </div>
             {/* Security Check Status Bar */}
             <div className="h-8 bg-emerald-950/30 border-t border-emerald-500/20 flex items-center justify-between px-3">
                 <div className="flex items-center gap-2">
                     <Lock size={10} className="text-emerald-500" />
                     <span className="text-[10px] font-bold text-emerald-400 tracking-wider">VERIFICAÇÃO DE SEGURANÇA</span>
                 </div>
                 <motion.div 
                    animate={{ opacity: [0.6, 1, 0.6], boxShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 10px rgba(16,185,129,0.5)", "0 0 0px rgba(16,185,129,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
                 >
                     APROVADO
                 </motion.div>
             </div>
        </div>
    );
};

// --- WIDGET 5: Server Health (Stack) ---
const ServerWidget = () => {
    return (
        <div className="p-5 flex flex-col justify-center h-full gap-5 relative z-10">
             {/* CPU */}
             <div>
                 <div className="flex justify-between text-xs mb-1.5">
                     <span className="text-zinc-500 flex items-center gap-1"><Terminal size={10}/> WORKERS n8n</span>
                     <span className="text-cyan-400 font-mono text-[10px] bg-cyan-900/20 px-1 rounded">OPERACIONAL</span>
                 </div>
                 <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                     <motion.div 
                        animate={{ width: ["40%", "45%", "38%", "42%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                        className="h-full bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
                     />
                 </div>
             </div>
             {/* RAM */}
             <div>
                 <div className="flex justify-between text-xs mb-1.5">
                     <span className="text-zinc-500 flex items-center gap-1"><Server size={10}/> MEMÓRIA REDIS</span>
                     <span className="text-blue-400 font-mono text-[10px] bg-blue-900/20 px-1 rounded">OTIMIZADO</span>
                 </div>
                 <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                     <motion.div 
                        animate={{ width: ["60%", "62%", "60%", "61%"] }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
                        className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" 
                     />
                 </div>
             </div>
             {/* Latency */}
             <div>
                 <div className="flex justify-between text-xs mb-1.5">
                     <span className="text-zinc-500 flex items-center gap-1"><Activity size={10}/> LATÊNCIA API</span>
                     <span className="text-emerald-400 font-mono text-[10px]">24ms</span>
                 </div>
                 <div className="flex gap-0.5 mt-1">
                     {[...Array(20)].map((_, i) => (
                         <motion.div 
                            key={i} 
                            animate={{ opacity: i < 15 ? [0.5, 1, 0.5] : 1 }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                            className={`h-3 w-1 rounded-sm ${i < 15 ? 'bg-emerald-500' : 'bg-zinc-800'}`} 
                         />
                     ))}
                 </div>
             </div>
        </div>
    )
}

// --- WIDGET 6: Connected Team (Multi-Agent) ---
const TeamWidget = () => {
    const roles = [
        { name: "Agente SDR", status: "Ativo", color: "bg-orange-400", shadowColor: "rgba(251,146,60,0.6)" },
        { name: "Agente Closer", status: "Ativo", color: "bg-emerald-400", shadowColor: "rgba(52,211,153,0.6)" },
        { name: "Bot Suporte", status: "Ocioso", color: "bg-blue-400", shadowColor: "rgba(96,165,250,0.6)" }
    ];
    return (
        <div className="p-5 flex flex-col justify-center h-full relative z-10">
            <div className="space-y-3">
                {roles.map((role, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    boxShadow: [
                                        `0 0 2px ${role.shadowColor}`, 
                                        `0 0 8px ${role.shadowColor}`, 
                                        `0 0 2px ${role.shadowColor}`
                                    ] 
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                                className={`w-2 h-2 rounded-full ${role.color}`} 
                            />
                            <span className="text-xs font-medium text-zinc-300">{role.name}</span>
                        </div>
                        <span className={`text-[10px] font-mono ${role.status === 'Ativo' ? 'text-zinc-400' : 'text-zinc-600'}`}>{role.status}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// --- WIDGET 6 (Part 2): Uptime Counter ---
const UptimeWidget = () => {
    const [percent, setPercent] = useState("99.98");
    
    useEffect(() => {
        // Randomly fluctuate between 99.98, 99.99, 99.97 to simulate live tracking
        const interval = setInterval(() => {
            const rand = Math.random();
            if (rand > 0.7) {
                setPercent("99.99");
                setTimeout(() => setPercent("99.98"), 800); // Return to baseline
            } else if (rand < 0.2) {
                setPercent("99.97");
                setTimeout(() => setPercent("99.98"), 800);
            }
        }, 4000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="border-l border-white/5 p-5 flex flex-col justify-center relative z-10 h-full">
            <div className="text-zinc-500 text-xs mb-2">DISPONIBILIDADE</div>
            <div className="text-2xl font-mono text-white flex items-center gap-2">
                {percent}%
                <span className="text-[10px] text-emerald-400 bg-emerald-900/20 px-1 rounded border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.3)]">ESTÁVEL</span>
            </div>
        </div>
    );
};


export const BentoGrid: React.FC = () => {
  return (
    <section id="system" className="py-20 md:py-32 bg-[#050505] relative overflow-hidden">
       {/* Ambient Light */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6" data-aos="fade-up">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                O Sistema Operacional
            </h2>
            <p className="text-zinc-400 max-w-xl text-lg">
                Visão unificada da sua empresa rodando no piloto automático.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-white/10 rounded-full text-xs font-mono text-zinc-400">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
             SISTEMA ONLINE
          </div>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[600px]">
          
          {/* 1. Ísis Analysis HUD (Redesigned Modular) */}
          <DashboardCard 
            title="Analisador de Leads Ísis" 
            icon={<BrainCircuit size={16}/>} 
            className="md:col-span-2 md:row-span-2"
            delay="0"
          >
             <IsisAnalysisWidget />
          </DashboardCard>

          {/* 2. Growth (Vertical) */}
          <DashboardCard 
            title="Motor de Crescimento" 
            icon={<Zap size={16}/>} 
            className="md:col-span-1 md:row-span-2"
            delay="100"
          >
            <GrowthWidget />
          </DashboardCard>

          {/* 3. Governance (Pequeno) */}
          <DashboardCard 
            title="Protocolo A.V.A" 
            icon={<ShieldCheck size={16}/>} 
            className="md:col-span-1 md:row-span-1"
            headerAction={<div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
            delay="200"
          >
            <SecurityWidget />
          </DashboardCard>
          
           {/* 4. Server Health (Pequeno) */}
           <DashboardCard 
            title="Infraestrutura" 
            icon={<Server size={16}/>} 
            className="md:col-span-1 md:row-span-1"
            delay="300"
          >
            <ServerWidget />
          </DashboardCard>

          {/* 5. Team Nodes (Largo) */}
          <DashboardCard 
            title="Agentes Ativos" 
            icon={<Users size={16}/>} 
            className="md:col-span-2 md:row-span-1"
            delay="400"
          >
            <div className="h-full grid grid-cols-2">
                <TeamWidget />
                <UptimeWidget />
            </div>
          </DashboardCard>

          {/* 6. Analytics (Largo) */}
          <DashboardCard 
            title="Métricas em Tempo Real" 
            icon={<Activity size={16}/>} 
            className="md:col-span-2 md:row-span-1"
            delay="500"
          >
            <AnalyticsWidget />
          </DashboardCard>
          
        </div>
      </div>
    </section>
  );
};