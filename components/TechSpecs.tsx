
import React, { useState } from 'react';
import { Database, Shield, Webhook, Bot, Calendar, Send, MousePointerClick, Zap, Globe, Workflow, Server, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Node Data Structure
const WORKFLOW_NODES = [
  { 
    id: 'webhook',
    title: 'Webhook',
    short: 'Entrada',
    description: 'Gateway de entrada que recebe eventos do WhatsApp (Evolution API). Normaliza áudios (transcrição), imagens e texto.',
    icon: Webhook
  },
  { 
    id: 'context',
    title: 'Context Loader',
    short: 'Memória',
    description: 'Busca histórico recente no Redis (Hot Storage) e dados cadastrais do cliente no Supabase (Cold Storage).',
    icon: Database
  },
  { 
    id: 'router',
    title: 'Router',
    short: 'Filtro',
    description: 'Switch de decisão que verifica regras de negócio, detecta loops e decide se transfere para humano.',
    icon: Shield
  },
  { 
    id: 'isis_core',
    title: 'Agente Ísis',
    short: 'Raciocínio',
    description: 'O Cérebro (LLM). Utiliza LangChain para entender a intenção, manter a persona e orquestrar ferramentas.',
    icon: Bot
  },
  { 
    id: 'tools',
    title: 'Executor',
    short: 'Ação',
    description: 'Executa ações práticas: Consulta agenda, busca na Base de Conhecimento (RAG) ou atualiza o CRM.',
    icon: Calendar
  },
  { 
    id: 'output',
    title: 'Gateway',
    short: 'Saída',
    description: 'Calcula "Delay Humanizado" baseado no tamanho da resposta e dispara a mensagem final.',
    icon: Send
  }
];

export const TechSpecs: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const activeNode = WORKFLOW_NODES.find(n => n.id === activeNodeId);

  // Cards com delays específicos para animação dessincronizada
  const WHY_CARDS = [
    { 
        icon: <Workflow size={24} />, 
        title: "Engenharia, não 'Prompt'", 
        text: "Fluxos complexos em n8n com tratamento de erros e redundância (Fallbacks).",
        floatDelay: "0s"
    },
    { 
        icon: <Server size={24} />, 
        title: "Memória Híbrida", 
        text: "Redis para velocidade instantânea e Supabase para histórico vitalício.",
        floatDelay: "1.5s" 
    },
    { 
        icon: <Database size={24} />, 
        title: "Multicanal Real", 
        text: "Integração total: Web, CRM e Sistemas Internos via Webhooks.",
        floatDelay: "0.5s"
    },
    { 
        icon: <Shield size={24} />, 
        title: "Segurança Total", 
        text: "Seus dados não treinam a IA pública. Ambiente isolado e seguro.",
        floatDelay: "2s"
    }
  ];

  return (
    <section id="tech" className="py-12 md:py-32 bg-[#050505] relative overflow-hidden">
      
      {/* Background Grid & Feathering */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0 opacity-20" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Why C2G - Top Section */}
        <div className="mb-20 md:mb-24" data-aos="fade-up">
          <div className="text-center max-w-4xl mx-auto mb-16">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel mb-6 md:mb-8 bg-black/50">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Arquitetura: Online</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Por que a <span className="text-cyan-400">C2G</span>?
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
              Não somos apenas integradores de API. Somos engenheiros de software construindo a infraestrutura para operações autônomas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
             {WHY_CARDS.map((item, i) => (
                <div 
                    key={i} 
                    className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-cyan-500/30 hover:bg-white/10 hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.15)] transition-all duration-300 group animate-float-subtle will-change-transform overflow-hidden"
                    style={{ animationDelay: item.floatDelay }}
                >
                  {/* Glass Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-all duration-300 shadow-inner shadow-white/5">
                        {item.icon}
                    </div>
                    <h4 className="text-white font-bold text-lg mb-3 tracking-tight">{item.title}</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">{item.text}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        {/* Architecture Diagram */}
        <div className="relative w-full" data-aos="fade-up" data-aos-delay="200">
            
            {/* Main Container */}
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-20 md:p-12 shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-center">
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
                
                {/* WORKFLOW CONTAINER */}
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between w-full max-w-6xl mx-auto">
                    
                    {WORKFLOW_NODES.map((node, index) => {
                      const isActive = activeNodeId === node.id;
                      const Icon = node.icon;
                      
                      return (
                        <React.Fragment key={node.id}>
                          {/* NODE ITEM */}
                          <div 
                            className="flex flex-col items-center group shrink-0 cursor-pointer relative z-20 w-24 md:w-auto"
                            onClick={() => setActiveNodeId(node.id)}
                          >
                              {/* Icon Box */}
                              <div 
                                className={`
                                  relative flex items-center justify-center transition-all duration-300
                                  w-16 h-16 md:w-20 md:h-20 rounded-2xl border backdrop-blur-sm
                                  ${isActive 
                                    ? 'bg-[#111] border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                                    : 'bg-[#0a0a0a] border-white/10 hover:border-white/30 hover:bg-[#111]'
                                  }
                                `}
                              >
                                  <Icon 
                                    className={`
                                      w-6 h-6 md:w-8 md:h-8 transition-colors duration-300
                                      ${isActive ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-white'}
                                    `} 
                                  />
                                  
                                  {/* Active Pulse Ring */}
                                  {isActive && (
                                    <div className="absolute inset-0 rounded-2xl border border-cyan-400/30 animate-pulse-slow" />
                                  )}
                              </div>
                              
                              {/* Label */}
                              <div className="mt-4 text-center">
                                  <span className={`
                                    block text-[10px] font-mono px-2 py-1 rounded-full border transition-all duration-300 uppercase tracking-wider
                                    ${isActive 
                                      ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-400' 
                                      : 'bg-transparent border-transparent text-zinc-600 group-hover:text-zinc-400'
                                    }
                                  `}>
                                    {node.short}
                                  </span>
                              </div>
                          </div>

                          {/* CONNECTOR LINE (Desktop) */}
                          {index < WORKFLOW_NODES.length - 1 && (
                            <div className="hidden md:flex flex-1 h-[1px] bg-white/10 mx-4 relative self-start mt-10 overflow-hidden">
                                <motion.div 
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ 
                                        duration: 1.5, 
                                        repeat: Infinity, 
                                        ease: "linear",
                                        delay: index * 0.2
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-1/2 blur-[1px]"
                                />
                            </div>
                          )}

                          {/* CONNECTOR LINE (Mobile) */}
                          {index < WORKFLOW_NODES.length - 1 && (
                            <div className="md:hidden h-12 w-[1px] bg-white/10 my-2 relative overflow-hidden">
                                <motion.div 
                                    initial={{ y: '-100%' }}
                                    animate={{ y: '100%' }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500 to-transparent h-1/2 blur-[1px]"
                                />
                            </div>
                          )}

                        </React.Fragment>
                      );
                    })}

                </div>

                {/* Mobile Description Overlay - NEW: To avoid scroll on mobile */}
                <AnimatePresence>
                  {activeNode && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="md:hidden absolute inset-0 z-40 bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
                      onClick={() => setActiveNodeId(null)}
                    >
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl relative w-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                         <button 
                            onClick={() => setActiveNodeId(null)}
                            className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white"
                         >
                            <X size={20} />
                         </button>
                         <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit mb-4">
                            <activeNode.icon size={24} />
                         </div>
                         <h5 className="text-xl font-bold text-white mb-2">{activeNode.title}</h5>
                         <p className="text-sm text-zinc-400 leading-relaxed mb-6">{activeNode.description}</p>
                         <button 
                            onClick={() => setActiveNodeId(null)}
                            className="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium"
                         >
                            Entendido
                         </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Description Panel (Desktop) */}
                <div className="hidden md:flex relative z-10 mt-24 h-24 items-center justify-center">
                  <AnimatePresence mode="wait">
                    {activeNode ? (
                      <motion.div
                        key={activeNode.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-xl p-5 flex items-start gap-4 shadow-2xl shadow-black z-20"
                      >
                         <div className="p-2.5 rounded-lg bg-black border border-white/5 text-cyan-400 shrink-0">
                            <activeNode.icon size={20} />
                         </div>
                         <div>
                            <h5 className="text-base font-bold text-white mb-1">{activeNode.title}</h5>
                            <p className="text-sm text-zinc-400 leading-relaxed">{activeNode.description}</p>
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center text-zinc-600 gap-3 text-center"
                      >
                         <MousePointerClick size={24} className="animate-bounce text-zinc-500" />
                         <span className="text-sm font-mono">Clique nos nós acima para ver detalhes da engenharia</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Hint (Only if no node selected) */}
                {!activeNode && (
                  <div className="md:hidden relative z-10 mt-12 flex flex-col items-center text-zinc-600 gap-2">
                      <MousePointerClick size={20} className="animate-bounce" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">Toque nos ícones acima</span>
                  </div>
                )}

                {/* Floating Tags */}
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                    <div className="px-2 py-1 bg-white/5 rounded text-[10px] text-zinc-500 font-mono border border-white/5">latest Stable</div>
                    <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-mono border border-emerald-500/20">System: Online</div>
                </div>

                {/* Disclaimer Caption */}
                <div className="absolute bottom-4 left-6 md:left-12 z-20 flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600 italic">* Imagem meramente ilustrativa</span>
                </div>

            </div>
            
            {/* Stats Cards overlay */}
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
    </section>
  );
};
