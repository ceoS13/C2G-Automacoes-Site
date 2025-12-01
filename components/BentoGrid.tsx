import React, { useState, useEffect, useRef, useMemo } from 'react';
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
      className={`group relative bg-[#09090b]/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-cyan-500/30 transition-all duration-500 will-change-transform ${className}`}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between px-4 py-3 md:px-5 md:py-4 border-b border-white/5 bg-white/[0.02] z-20 relative shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
            <div className="text-zinc-400 group-hover:text-cyan-400 transition-colors">
                {icon}
            </div>
            <h3 className="text-xs md:text-sm font-semibold text-zinc-300 tracking-wide uppercase font-mono">{title}</h3>
        </div>
        <div>
            {headerAction || <MoreHorizontal size={16} className="text-zinc-600 cursor-pointer hover:text-white" />}
        </div>
      </div>

      {/* Widget Body */}
      <div className="relative flex-1 p-0 overflow-hidden h-full">
         {/* Grid Background */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
         {children}
      </div>
    </article>
  );
};

// --- WIDGET 1: Isis Analysis HUD (Redesigned Modular) ---
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
    <div className="flex flex-col h-full p-4 md:p-5 relative z-10 font-mono text-xs select-none gap-4">
        
        {/* 1. Topo: Contexto */}
        <div className="flex justify-between items-center pb-2 border-b border-white/5">
           <div className="flex items-center gap-2 text-zinc-500">
              <ScanEye size={12} />
              <span>ID: <span className="text-zinc-300">#8X92-A</span></span>
           </div>
           <motion.div 
             animate={{ opacity: [1, 0.4, 1] }}
             transition={{ duration: 2.0, repeat: Infinity }}
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
                transition={{ delay: 0.1, duration: 0.5 }}
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
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col justify-center gap-3 hover:bg-white/10 transition-colors"
            >
                {/* Intent */}
                <div className="flex items-center justify-between md:block">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase mb-1">
                        <Target size={10} /> Intenção
                    </div>
                    <div className="text-white font-bold">Agendamento</div>
                </div>
                {/* Sentiment */}
                <div className="flex flex-col md:block w-full">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase mb-1">
                        <Smile size={10} /> Sentimento
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <div className="h-1.5 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '98%' }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
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
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/5 border border-white/5 rounded-xl p-2 flex flex-row md:flex-col items-center justify-between md:justify-center relative hover:bg-white/10 transition-colors group h-16 md:h-auto px-4 md:px-2"
            >
                <div className="text-[10px] text-zinc-500 uppercase tracking-wide md:absolute md:top-2 md:left-2">Nota</div>
                
                <div className="relative w-12 h-12 md:w-20 md:h-20 flex items-center justify-center md:mt-2">
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
                            transition={{ duration: 2.0, ease: "easeOut", delay: 0.5 }}
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
                        <span className="text-sm md:text-xl font-bold text-white">92</span>
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
               relative w-full border rounded-lg p-3 flex items-center justify-between transition-all duration-300 overflow-hidden group outline-none shrink-0
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
        <div className="h-full flex flex-col p-4 md:p-5 relative z-10 min-h-[200px] md:min-h-0">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="text-xs text-zinc-500 font-mono mb-1">RECEITA GERADA</div>
                    <div className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                      +124k
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

            <div className="flex-1 flex items-end justify-between gap-1.5 md:gap-2" onMouseLeave={() => setHoveredIndex(null)}>
                {bars.map((height, i) => (
                    <div key={i} className="relative w-full h-full flex items-end justify-center group">
                        {/* Tooltip */}
                        <AnimatePresence>
                            {hoveredIndex === i && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 4, scale: 0.95, x: "-50%" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                                    exit={{ opacity: 0, y: 2, scale: 0.95, x: "-50%" }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    style={{ bottom: `${height}%`, marginBottom: '12px' }}
                                    className="absolute left-1/2 z-30 flex flex-col items-center pointer-events-none"
                                >
                                    <div className="relative bg-[#09090b] border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.5)] whitespace-nowrap">
                                        {/* Valor Formatado como Moeda (R$ X.Xk) */}
                                        {`R$ ${(height * 0.15).toFixed(1).replace('.', ',')}k`}
                                        
                                        {/* Seta do Tooltip */}
                                        <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#09090b] border-r border-b border-emerald-500/30 transform rotate-45"></div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.15, type: "spring", stiffness: 80 }}
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
            
            <div className="mt-2 flex justify-between text-[8px] md:text-[10px] text-zinc-600 font-mono">
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

// --- WIDGET 3: Analytics Waveform ---
const AnalyticsWidget = () => {
    // Config for jagged look
    const pointsCount = 35;
    const width = 500;
    const height = 200;
    const stepX = width / (pointsCount - 1);
    
    // State for the "scrolling" noise array
    const [noiseData, setNoiseData] = useState<number[]>([]);
    const [roi, setRoi] = useState(450);
    const [savings, setSavings] = useState(12.1);
    
    // Initialize noise
    useEffect(() => {
        const initialNoise = Array.from({ length: pointsCount }, () => (Math.random() * 40 - 20));
        setNoiseData(initialNoise);
    }, []);

    // Staccato Tick Animation & Number Updates
    useEffect(() => {
        const interval = setInterval(() => {
            setNoiseData(prev => {
                const next = [...prev];
                next.shift();
                next.push((Math.random() * 50 - 25)); 
                return next;
            });
            setRoi(prev => {
                const change = Math.floor(Math.random() * 15) - 7; 
                let next = prev + change;
                if (next > 490) next = 490;
                if (next < 420) next = 420;
                return next;
            });
            setSavings(prev => {
                const change = (Math.random() * 0.4) - 0.2; 
                let next = prev + change;
                if (next > 13.5) next = 13.5;
                if (next < 11.0) next = 11.0;
                return next;
            });

        }, 800);
        return () => clearInterval(interval);
    }, []);

    const startY = 170; // Bottom Left
    const endY = 40;    // Top Right
    
    // Optimization: Memoize path calculation to avoid re-computing on every render if noiseData hasn't changed
    const { d, fillD } = useMemo(() => {
        let d = "";
        let fillD = "";
        
        const points = noiseData.map((noise, i) => {
            const x = i * stepX;
            const trendY = startY - ((startY - endY) * (i / (pointsCount - 1)));
            let y = trendY + noise;
            y = Math.max(10, Math.min(190, y));
            return { x, y };
        });

        if (points.length > 0) {
            d = `M ${points[0].x},${points[0].y}`;
            fillD = `M ${points[0].x},${points[0].y}`;
            
            for (let i = 1; i < points.length; i++) {
                d += ` L ${points[i].x},${points[i].y}`;
                fillD += ` L ${points[i].x},${points[i].y}`;
            }
            
            fillD += ` L ${width},${height} L 0,${height} Z`;
        }
        return { d, fillD };
    }, [noiseData]);

    const lastPoint = { 
        x: (noiseData.length - 1) * stepX, 
        y: Math.max(10, Math.min(190, (startY - ((startY - endY)) + (noiseData[noiseData.length - 1] || 0))))
    };

    return (
        <div className="h-full flex flex-col relative overflow-hidden z-10 min-h-[220px] md:min-h-0">
             {/* Content Container with Z-Index higher than chart */}
             <div className="flex items-center justify-between p-4 md:p-5 relative z-20">
                <div className="flex gap-8">
                    <div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-mono">ROI Atual</div>
                        <div className="text-2xl md:text-3xl font-bold text-emerald-400 flex items-center gap-2">
                          {roi}%
                          <Activity size={16} className="animate-pulse" />
                        </div>
                    </div>
                    <div>
                         <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-mono">Economia</div>
                         <div className="text-2xl md:text-3xl font-bold text-white">
                             R$ {savings.toFixed(1).replace('.', ',')}k
                         </div>
                    </div>
                </div>
             </div>

            {/* Staccato Chart - Absolute Positioned to Bottom - Percentage Height for Responsiveness */}
            <div className="absolute bottom-0 left-0 right-0 h-[65%] w-full overflow-hidden pointer-events-none z-10">
                <svg viewBox="0 0 500 200" className="w-full h-full preserve-3d absolute bottom-0" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="financial-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d={fillD} fill="url(#financial-gradient)" className="transition-none" />
                    <path d={d} fill="none" stroke="#34d399" strokeWidth="2" strokeLinejoin="miter" vectorEffect="non-scaling-stroke" className="drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-none"/>
                    <motion.circle cx={lastPoint.x} cy={lastPoint.y} r="3" fill="#fff" animate={{ y: [-2, 2, -1, 3, 0], opacity: [1, 0.7, 1]}} transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}/>
                    <motion.circle cx={lastPoint.x} cy={lastPoint.y} r="8" fill="#34d399" opacity="0.4" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }}/>
                </svg>
            </div>
        </div>
    );
};

// --- WIDGET 4: Governance Terminal ---
const SecurityWidget = () => {
    const [lines, setLines] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const allLogs = [
          "Iniciando Protocolo AVA v2.4...",
          "Verificando integridade...",
          "Escaneando intenção...",
          "Analisando sentimento...",
          "Verificando padrões PII...",
          "Validando regras de negócio...",
          "Conectando Secure Gateway...",
          "Criptografia (AES-256): OK",
          "Acesso permitido."
        ];
        
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < allLogs.length) {
                const logToAdd = allLogs[currentIndex];
                setLines(prev => {
                    const newLines = [...prev, logToAdd];
                    // Keep a reasonable buffer history so scrolling is visible
                    // 50 ensures lines aren't removed too quickly, forcing scroll
                    if (newLines.length > 50) newLines.shift(); 
                    return newLines;
                });
                currentIndex++;
            } else if (currentIndex < allLogs.length + 4) {
                // Pause for ~3.2 seconds (4 * 800ms) showing the full state
                currentIndex++;
            } else {
                currentIndex = 0;
                setLines([]);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll to bottom whenever lines change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [lines]);

    return (
        <div className="flex flex-col h-[200px] md:h-full bg-[#050505] relative z-10">
             {/* Terminal Logs */}
             <div 
                ref={scrollRef}
                className="flex-1 p-4 font-mono text-[10px] text-zinc-400 space-y-2 overflow-y-auto flex flex-col [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none' }} // Firefox
             >
                {lines.map((line, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-2 shrink-0" // shrink-0 ensures lines are not compressed
                    >
                        <span className="text-zinc-600 shrink-0">{`>`}</span>
                        <span className={`truncate ${line && line.includes("permitido") ? "text-emerald-400 font-bold" : "text-zinc-400"}`}>
                          {line}
                        </span>
                    </motion.div>
                ))}
                {lines.length > 0 && lines.length < 9 && (
                    <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-2 h-4 bg-zinc-600 ml-4 shrink-0"
                    />
                )}
             </div>
             {/* Footer Status */}
             <div className="h-10 bg-emerald-950/30 border-t border-emerald-500/20 flex items-center justify-between px-4 shrink-0">
                 <div className="flex items-center gap-2">
                     <Lock size={12} className="text-emerald-500" />
                     <span className="text-[10px] font-bold text-emerald-400 tracking-wider">SEGURANÇA</span>
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
        <div className="p-4 md:p-5 flex flex-col justify-center h-full gap-4 md:gap-5 relative z-10 min-h-[160px] md:min-h-0">
             <div>
                 <div className="flex justify-between text-xs mb-1.5">
                     <span className="text-zinc-500 flex items-center gap-1"><Terminal size={10}/> WORKERS n8n</span>
                     <span className="text-cyan-400 font-mono text-[10px] bg-cyan-900/20 px-1 rounded">OPERACIONAL</span>
                 </div>
                 <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                     <motion.div 
                        animate={{ width: ["85%", "92%", "88%", "90%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                        className="h-full bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
                     />
                 </div>
             </div>
             <div>
                 <div className="flex justify-between text-xs mb-1.5">
                     <span className="text-zinc-500 flex items-center gap-1"><Server size={10}/> MEMÓRIA REDIS</span>
                     <span className="text-blue-400 font-mono text-[10px] bg-blue-900/20 px-1 rounded">OTIMIZADO</span>
                 </div>
                 <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                     <motion.div 
                        animate={{ width: ["78%", "82%", "80%", "81%"] }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
                        className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" 
                     />
                 </div>
             </div>
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

// --- WIDGET 6: Connected Team ---
const TeamWidget = () => {
    const roles = [
        { name: "Agente SDR", status: "Ativo", color: "bg-orange-400", shadowColor: "rgba(251,146,60,0.6)" },
        { name: "Agente Closer", status: "Ativo", color: "bg-emerald-400", shadowColor: "rgba(52,211,153,0.6)" },
        { name: "Bot Suporte", status: "Ocioso", color: "bg-blue-400", shadowColor: "rgba(96,165,250,0.6)" }
    ];
    return (
        <div className="p-4 md:p-5 flex flex-col justify-center h-full relative z-10 min-h-[140px] md:min-h-0">
            <div className="space-y-2 md:space-y-3">
                {roles.map((role, i) => (
                    <div key={i} className="flex items-center justify-between p-2 md:p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-2 md:gap-3">
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
        const interval = setInterval(() => {
            const rand = Math.random();
            if (rand > 0.7) {
                setPercent("99.99");
                setTimeout(() => setPercent("99.98"), 800);
            } else if (rand < 0.2) {
                setPercent("99.97");
                setTimeout(() => setPercent("99.98"), 800);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="border-l border-white/5 p-4 md:p-5 flex flex-col justify-center relative z-10 h-full min-h-[140px] md:min-h-0">
            <div className="text-zinc-500 text-xs mb-2">DISPONIBILIDADE</div>
            <div className="text-xl md:text-2xl font-mono text-white flex items-center gap-2">
                {percent}%
                <span className="text-[10px] text-emerald-400 bg-emerald-900/20 px-1 rounded border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.3)]">ESTÁVEL</span>
            </div>
        </div>
    );
};


export const BentoGrid: React.FC = () => {
  return (
    <section id="system" className="py-16 md:py-32 bg-transparent relative overflow-hidden">
       {/* Seamless Radial Gradient Background */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,78,99,0.15)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6" data-aos="fade-up">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Painel de Controle do Seu Império
            </h2>
            <p className="text-zinc-400 max-w-xl text-lg">
                Tenha visão total da eficiência e do lucro gerado pela sua operação autônoma em tempo real.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-white/10 rounded-full text-xs font-mono text-zinc-400 w-fit">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
             SISTEMA ONLINE
          </div>
        </div>

        {/* GRID LAYOUT - Increased height on desktop to prevent cramping, auto on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 h-auto md:h-[800px]">
          
          {/* 1. Ísis Analysis HUD (Redesigned Modular) */}
          <DashboardCard 
            title="Conversão de Vendas" 
            icon={<BrainCircuit size={16}/>} 
            className="md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-0"
            delay="0"
          >
             <IsisAnalysisWidget />
          </DashboardCard>

          {/* 2. Growth (Vertical) */}
          <DashboardCard 
            title="Máquina de Receita" 
            icon={<Zap size={16}/>} 
            className="md:col-span-1 md:row-span-2"
            delay="100"
          >
            <GrowthWidget />
          </DashboardCard>

          {/* 3. Governance (Pequeno) */}
          <DashboardCard 
            title="Segurança & Compliance" 
            icon={<ShieldCheck size={16}/>} 
            className="md:col-span-1 md:row-span-1"
            headerAction={<div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
            delay="200"
          >
            <SecurityWidget />
          </DashboardCard>
          
           {/* 4. Server Health (Pequeno) */}
           <DashboardCard 
            title="Performance Operacional" 
            icon={<Server size={16}/>} 
            className="md:col-span-1 md:row-span-1"
            delay="300"
          >
            <ServerWidget />
          </DashboardCard>

          {/* 5. Team Nodes (Largo) */}
          <DashboardCard 
            title="Equipe Digital Ativa" 
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
            title="Retorno Sobre Investimento (ROI)" 
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