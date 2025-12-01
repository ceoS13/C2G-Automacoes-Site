import React, { useState } from 'react';
import { Database, Workflow, Shield, Server, Webhook, BrainCircuit, Globe, MessageSquare, Zap, ChevronRight, MousePointerClick, Layers, Smartphone, Bot, Calendar, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Node Data Structure reflects the REAL n8n workflow provided (Agente principal c2g v6.3)
const WORKFLOW_NODES = [
  { 
    id: 'webhook',
    title: 'Webhook (Evolution)',
    short: 'Entrada',
    description: 'Gateway de entrada que recebe eventos do WhatsApp (Evolution API). Normaliza áudios (transcrição), imagens e texto antes do processamento.',
    icon: Webhook,
    color: 'green',
    borderColor: 'border-emerald-500/50',
    shadowColor: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500'
  },
  { 
    id: 'context',
    title: 'Context Loader',
    short: 'Memória',
    description: 'Carregamento de Estado: Busca histórico recente no Redis (Hot Storage) e dados cadastrais do cliente no Supabase (Cold Storage).',
    icon: Database,
    color: 'blue',
    borderColor: 'border-blue-500/50',
    shadowColor: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]',
    textColor: 'text-blue-400',
    bgColor: 'bg-blue-500'
  },
  { 
    id: 'router',
    title: 'Router & Safety',
    short: 'Filtro',
    description: 'Nó de decisão "Switch" que verifica regras de negócio, detecta loops, filtra mensagens de outros bots e decide se transfere para humano.',
    icon: Shield,
    color: 'red',
    borderColor: 'border-red-500/50',
    shadowColor: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]',
    textColor: 'text-red-400',
    bgColor: 'bg-red-500'
  },
  { 
    id: 'isis_core',
    title: 'Agente Ísis (LLM)',
    short: 'Cérebro',
    description: 'O Agente Principal. Utiliza LangChain para raciocinar sobre a intenção do usuário, manter a persona e orquestrar o uso de ferramentas.',
    icon: BrainCircuit,
    color: 'cyan',
    borderColor: 'border-cyan-400',
    shadowColor: 'shadow-[0_0_30px_rgba(34,211,238,0.4)]',
    textColor: 'text-cyan-400',
    bgColor: 'bg-cyan-400'
  },
  { 
    id: 'tools',
    title: 'Tool Executor',
    short: 'Ação',
    description: 'Sub-agente que executa ações práticas: Consulta disponibilidade no GCalendar, busca na Base de Conhecimento (RAG) ou atualiza o CRM.',
    icon: Calendar,
    color: 'orange',
    borderColor: 'border-orange-500/50',
    shadowColor: 'shadow-[0_0_20px_rgba(249,115,22,0.2)]',
    textColor: 'text-orange-400',
    bgColor: 'bg-orange-400'
  },
  { 
    id: 'output',
    title: 'Response Gateway',
    short: 'Saída',
    description: 'Processamento final. Calcula "Delay Humanizado" baseado no tamanho da resposta e dispara a mensagem via Evolution API.',
    icon: Send,
    color: 'purple',
    borderColor: 'border-purple-500/50',
    shadowColor: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]',
    textColor: 'text-purple-400',
    bgColor: 'bg-purple-500'
  }
];

export const TechSpecs: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const activeNode = WORKFLOW_NODES.find(n => n.id === activeNodeId);

  return (
    <section id="tech" className="py-12 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Why C2G - Top Section */}
        <div className="mb-20 md:mb-24" data-aos="fade-up">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Por que a <span className="text-cyan-400">C2G</span>?
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
              Não somos apenas integradores de API. Somos engenheiros de software construindo a infraestrutura para operações autônomas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
             {[
                { icon: <Workflow size={24} />, title: "Engenharia, não 'Prompt'", text: "Fluxos complexos em n8n com tratamento de erros e redundância (Fallbacks)." },
                { icon: <Server size={24} />, title: "Memória Híbrida", text: "Redis para velocidade instantânea e Supabase para histórico vitalício." },
                { icon: <Database size={24} />, title: "Multicanal Real", text: "Integração total: Web, CRM e Sistemas Internos via Webhooks." },
                { icon: <Shield size={24} />, title: "Segurança Total", text: "Seus dados não treinam a IA pública. Ambiente isolado e seguro." }
              ].map((item, i) => (
                <div 
                    key={i} 
                    className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:bg-cyan-950/20 transition-all">
                    {item.icon}
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-3">{item.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{item.text}</p>
                </div>
              ))}
          </div>
        </div>
        
        {/* n8n Workflow Simulation - INTERACTIVE (Full Width) */}
        <div className="relative w-full" data-aos="fade-up" data-aos-delay="200">
             <span id="cases" className="absolute -top-32 invisible"></span>
            
            {/* Adjusted vertical padding for mobile to be less huge */}
            <div className="relative bg-[#0a0a0a]/90 backdrop-blur border border-white/10 rounded-2xl px-6 py-20 md:p-12 shadow-2xl overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col justify-center h-auto">
                {/* Grid Background - Inner Card Grid (Kept for Technical Aesthetic inside the "Monitor") */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
                
                {/* Workflow Nodes */}
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-0 md:gap-0 w-full max-w-6xl mx-auto">
                    
                    {WORKFLOW_NODES.map((node, index) => {
                      const isActive = activeNodeId === node.id;
                      const Icon = node.icon;
                      
                      return (
                        <React.Fragment key={node.id}>
                          {/* Node Item */}
                          <div 
                            className="flex flex-col items-center gap-2 md:gap-3 w-28 group shrink-0 cursor-pointer !outline-none focus:!outline-none focus:!ring-0 focus:!border-none focus-visible:!outline-none select-none p-2 -m-2"
                            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
                            onClick={() => setActiveNodeId(node.id)}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveNodeId(node.id)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Ver detalhes de ${node.title}`}
                          >
                              <div 
                                className={`
                                  w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#111] flex items-center justify-center z-10 relative 
                                  transition-all duration-300 group-hover:scale-105 pointer-events-none
                                  ${isActive ? `${node.shadowColor} scale-105 bg-opacity-100` : 'bg-opacity-80 backdrop-blur-sm'}
                                `}
                              >
                                  <Icon 
                                    className={`transition-colors duration-300 w-5 h-5 md:w-7 md:h-7 ${isActive ? node.textColor : 'text-zinc-500 group-hover:text-zinc-300'}`} 
                                  />
                                  {isActive && (
                                    <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 ${node.bgColor} rounded-full animate-pulse`} />
                                  )}
                              </div>
                              <div className="text-center pointer-events-none">
                                  <span className={`
                                    block text-[9px] md:text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors duration-300 whitespace-nowrap
                                    ${isActive 
                                      ? `${node.textColor} bg-black/50` 
                                      : 'text-zinc-500 bg-black/30'
                                    }
                                  `}>
                                    {node.short}
                                  </span>
                              </div>
                          </div>

                          {/* Connector (Render for all except last item) */}
                          {index < WORKFLOW_NODES.length - 1 && (
                            <div className="relative flex items-center justify-center -my-1 md:my-0 md:-mx-6 md:mt-8 flex-1 w-full md:w-auto pointer-events-none">
                                <div className="h-14 md:h-0.5 w-0.5 md:w-full bg-zinc-800 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 animate-flow" />
                                </div>
                                <div className="absolute bg-[#0a0a0a] border border-zinc-800 rounded-full p-0.5 text-zinc-500 shadow-sm z-10">
                                    <ChevronRight size={10} className="transform rotate-90 md:rotate-0" />
                                </div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}

                </div>

                {/* Description Panel (Inspector) */}
                <div className="relative z-10 mt-12 md:mt-20 h-32 md:h-24 flex items-center justify-center px-4 md:px-0">
                  <AnimatePresence mode="wait">
                    {activeNode ? (
                      <motion.div
                        key={activeNode.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-xl p-3 md:p-4 flex items-start gap-3 md:gap-4 shadow-lg z-20"
                      >
                         <div className={`p-2 rounded-lg bg-black border border-white/5 ${activeNode.textColor} shrink-0`}>
                            <activeNode.icon size={18} />
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
                         <span className="text-xs md:text-sm font-mono">Clique nos nós acima para inspecionar o fluxo da Ísis</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Floating Tags */}
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                    <div className="px-2 py-1 bg-white/5 rounded text-[10px] text-zinc-500 font-mono border border-white/5">v6.3 Stable</div>
                    <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-mono border border-emerald-500/20">System: Online</div>
                </div>

                {/* Disclaimer Caption - Aligned to bottom LEFT with parent padding */}
                <div className="absolute bottom-4 left-6 md:left-12 z-20 flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600 italic">* Imagem meramente ilustrativa</span>
                </div>

            </div>
            
            {/* Stats Cards overlay - Positioned to not overlap mobile flow */}
            <div className="absolute -bottom-4 right-2 md:-bottom-6 md:right-8 bg-[#111] border border-white/10 p-3 md:p-4 rounded-xl shadow-2xl transform rotate-3 z-30 scale-90 md:scale-100" data-aos="zoom-in" data-aos-delay="400">
                <div className="flex items-center gap-2 mb-1">
                    <Zap size={14} className="text-yellow-400" />
                    <span className="text-xs text-zinc-400">Latência</span>
                </div>
                <div className="text-xl md:text-2xl font-bold text-white">Humanizada</div>
            </div>
             <div className="absolute -top-4 left-2 md:-top-6 md:left-8 bg-[#111] border border-white/10 p-3 md:p-4 rounded-xl shadow-2xl transform -rotate-2 z-30 scale-90 md:scale-100" data-aos="zoom-in" data-aos-delay="500">
                <div className="flex items-center gap-2 mb-1">
                     <Globe size={14} className="text-blue-400" />
                    <span className="text-xs text-zinc-400">Conectores</span>
                </div>
                <div className="text-xl md:text-2xl font-bold text-white">200+</div>
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