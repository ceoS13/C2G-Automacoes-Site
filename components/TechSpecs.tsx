import React, { useState } from 'react';
import { Database, Workflow, Shield, Server, Webhook, BrainCircuit, Globe, MessageSquare, Zap, ChevronRight, MousePointerClick, Layers, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Node Data Structure reflects the ACTUAL n8n workflows provided: Evolution API -> Redis -> Router -> Tools
const WORKFLOW_NODES = [
  { 
    id: 'evolution',
    title: 'Evolution API',
    short: 'Gateway',
    description: 'Gateway Enterprise Oficial (Meta) que recebe mensagens, áudios e mídias com baixa latência e alta estabilidade.',
    icon: Smartphone,
    color: 'green',
    borderColor: 'border-emerald-500/50',
    shadowColor: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500'
  },
  { 
    id: 'memory',
    title: 'Redis + Vector',
    short: 'Contexto',
    description: 'Sistema Híbrido: Redis para memória rápida de conversa e Supabase Vector Store para busca semântica em documentos (RAG).',
    icon: Server,
    color: 'red',
    borderColor: 'border-red-500/50',
    shadowColor: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]',
    textColor: 'text-red-400',
    bgColor: 'bg-red-500'
  },
  { 
    id: 'router',
    title: 'LLM Router',
    short: 'Cérebro',
    description: 'Nó de decisão inteligente (Switch) que analisa a intenção e roteia para: Agendamento, Suporte, Financeiro ou Transbordo.',
    icon: BrainCircuit,
    color: 'cyan',
    borderColor: 'border-cyan-400',
    shadowColor: 'shadow-[0_0_30px_rgba(34,211,238,0.3)]',
    textColor: 'text-cyan-400',
    bgColor: 'bg-cyan-400'
  },
  { 
    id: 'tools',
    title: 'Ferramentas & ERP',
    short: 'Ação',
    description: 'Execução real: Consulta Google Calendar, cria registros no CRM/Supabase e dispara Webhooks para seu ERP.',
    icon: Database,
    color: 'orange',
    borderColor: 'border-orange-500/50',
    shadowColor: 'shadow-[0_0_20px_rgba(249,115,22,0.2)]',
    textColor: 'text-orange-400',
    bgColor: 'bg-orange-400'
  }
];

export const TechSpecs: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const activeNode = WORKFLOW_NODES.find(n => n.id === activeNodeId);

  return (
    <section id="tech" className="py-20 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Why C2G */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-24">
          <div data-aos="fade-right" className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Por que a <span className="text-cyan-400">C2G</span>?
            </h2>
            <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
              Não somos apenas integradores de API. Somos engenheiros de software construindo a infraestrutura para operações autônomas.
            </p>
            
            <ul className="space-y-6">
              {[
                { icon: <Workflow size={24} />, title: "Engenharia, não 'Prompt'", text: "Fluxos complexos em n8n com tratamento de erros e redundância (Fallbacks)." },
                { icon: <Server size={24} />, title: "Memória Híbrida", text: "Redis para velocidade instantânea e Supabase para histórico vitalício." },
                { icon: <Database size={24} />, title: "Multicanal Real", text: "Integração total: Web, CRM e Sistemas Internos via Webhooks." },
                { icon: <Shield size={24} />, title: "Segurança Total", text: "Seus dados não treinam a IA pública. Ambiente isolado e seguro." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="w-12 h-12 rounded-lg bg-[#111] border border-white/5 flex items-center justify-center text-cyan-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                    <p className="text-sm text-zinc-500">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* n8n Workflow Simulation - INTERACTIVE */}
          <div className="relative mt-8 lg:mt-0 z-0" data-aos="fade-left" data-aos-delay="200">
             <span id="cases" className="absolute -top-32 invisible"></span>
            
            {/* Added extra vertical padding on mobile (py-32) to clear the absolute stats cards */}
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-32 md:p-12 shadow-2xl overflow-hidden min-h-[600px] flex flex-col justify-center">
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
                
                {/* Workflow Nodes */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 w-full">
                    
                    {WORKFLOW_NODES.map((node, index) => {
                      const isActive = activeNodeId === node.id;
                      const Icon = node.icon;
                      
                      return (
                        <React.Fragment key={node.id}>
                          {/* Node Item */}
                          <div 
                            className="flex flex-col items-center gap-3 w-32 group shrink-0 cursor-pointer !outline-none focus:!outline-none focus:!ring-0 focus:!border-none focus-visible:!outline-none select-none"
                            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
                            onClick={() => setActiveNodeId(node.id)}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveNodeId(node.id)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Ver detalhes de ${node.title}`}
                          >
                              <div 
                                className={`
                                  w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#111] flex items-center justify-center z-10 relative 
                                  transition-all duration-300 group-hover:scale-105 pointer-events-none
                                  ${isActive ? `${node.shadowColor} scale-105 bg-opacity-100` : 'bg-opacity-80 backdrop-blur-sm'}
                                `}
                              >
                                  <Icon 
                                    className={`transition-colors duration-300 ${isActive ? node.textColor : 'text-zinc-500 group-hover:text-zinc-300'}`} 
                                    size={32} 
                                  />
                                  {isActive && (
                                    <div className={`absolute -top-1 -right-1 w-3 h-3 ${node.bgColor} rounded-full animate-pulse`} />
                                  )}
                              </div>
                              <div className="text-center pointer-events-none">
                                  <span className={`
                                    block text-xs font-mono px-2 py-1 rounded transition-colors duration-300
                                    ${isActive 
                                      ? `${node.textColor} bg-black/50` 
                                      : 'text-zinc-500 bg-black/30'
                                    }
                                  `}>
                                    {node.title}
                                  </span>
                              </div>
                          </div>

                          {/* Connector (Render for all except last item) */}
                          {index < WORKFLOW_NODES.length - 1 && (
                            <div className="relative flex items-center justify-center -my-2 md:my-0 md:-mx-4 flex-1 w-full md:w-auto pointer-events-none">
                                <div className="h-12 w-0.5 md:h-0.5 md:w-full bg-zinc-800 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 animate-flow" />
                                </div>
                                <div className="absolute bg-[#0a0a0a] border border-zinc-800 rounded-full p-1 text-zinc-500 shadow-sm z-10">
                                    <ChevronRight size={12} className="transform rotate-90 md:rotate-0" />
                                </div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}

                </div>

                {/* Description Panel (Inspector) */}
                <div className="relative z-10 mt-12 h-32 md:h-24 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {activeNode ? (
                      <motion.div
                        key={activeNode.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-xl p-4 flex items-start gap-4 shadow-lg z-20"
                      >
                         <div className={`p-2 rounded-lg bg-black border border-white/5 ${activeNode.textColor} shrink-0`}>
                            <activeNode.icon size={20} />
                         </div>
                         <div>
                            <h5 className={`text-sm font-bold ${activeNode.textColor} mb-1`}>{activeNode.title}</h5>
                            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{activeNode.description}</p>
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center text-zinc-600 gap-2 text-center"
                      >
                         <MousePointerClick size={24} className="animate-bounce" />
                         <span className="text-xs md:text-sm font-mono">Clique nos nós acima para ver a arquitetura real</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Floating Tags */}
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                    <div className="px-2 py-1 bg-white/5 rounded text-[10px] text-zinc-500 font-mono border border-white/5">Execução: 450ms</div>
                    <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-mono border border-emerald-500/20">Status: Sucesso</div>
                </div>

                {/* Disclaimer Caption - Aligned to bottom LEFT with parent padding */}
                <div className="absolute bottom-4 left-6 md:left-12 z-20 flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600 italic">* Imagem meramente ilustrativa</span>
                </div>

            </div>
            
            {/* Stats Cards overlay - Positioned carefully to avoid overlap on mobile */}
            <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-4 bg-[#111] border border-white/10 p-4 rounded-xl shadow-2xl transform rotate-3 z-30" data-aos="zoom-in" data-aos-delay="400">
                <div className="flex items-center gap-2 mb-1">
                    <Zap size={14} className="text-yellow-400" />
                    <span className="text-xs text-zinc-400">Automações/mês</span>
                </div>
                <div className="text-xl md:text-2xl font-bold text-white">120k+</div>
            </div>
             <div className="absolute -top-4 -left-2 md:-top-6 md:-left-4 bg-[#111] border border-white/10 p-4 rounded-xl shadow-2xl transform -rotate-2 z-30" data-aos="zoom-in" data-aos-delay="500">
                <div className="flex items-center gap-2 mb-1">
                     <Globe size={14} className="text-blue-400" />
                    <span className="text-xs text-zinc-400">Conectores</span>
                </div>
                <div className="text-xl md:text-2xl font-bold text-white">200+</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for flow animation injected here for component isolation */}
      <style>{`
        @keyframes flow-horizontal {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        @keyframes flow-vertical {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        /* Mobile: Vertical Flow */
        .animate-flow {
            animation: flow-vertical 1.5s linear infinite;
        }
        /* Desktop: Horizontal Flow */
        @media (min-width: 768px) {
            .animate-flow {
                animation: flow-horizontal 1.5s linear infinite;
            }
        }
      `}</style>
    </section>
  );
};