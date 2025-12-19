
import React, { useState, useMemo } from 'react';
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
  
  const activeNode = useMemo(() => 
    WORKFLOW_NODES.find(n => n.id === activeNodeId), 
    [activeNodeId]
  );

  return (
    <section id="tech" className="py-12 md:py-32 bg-[#050505] relative overflow-hidden [contain:paint]">
      
      {/* Background Grid - Static for performance */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0 opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Why C2G Section */}
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
             {[
                { icon: <Workflow size={24} />, title: "Engenharia, não 'Prompt'", text: "Fluxos complexos em n8n com tratamento de erros e redundância (Fallbacks)." },
                { icon: <Server size={24} />, title: "Memória Híbrida", text: "Redis para velocidade instantânea e Supabase para histórico vitalício." },
                { icon: <Database size={24} />, title: "Multicanal Real", text: "Integração total: Web, CRM e Sistemas Internos via Webhooks." },
                { icon: <Shield size={24} />, title: "Segurança Total", text: "Seus dados não treinam a IA pública. Ambiente isolado e seguro." }
              ].map((item, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:bg-cyan-950/20 transition-all">
                    {item.icon}
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-3">{item.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{item.text}</p>
                </div>
              ))}
          </div>
        </div>
        
        {/* Architecture Diagram */}
        <div className="relative w-full" data-aos="fade-up">
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-20 md:p-12 shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between w-full max-w-6xl mx-auto">
                    {WORKFLOW_NODES.map((node, index) => {
                      const isActive = activeNodeId === node.id;
                      const Icon = node.icon;
                      
                      return (
                        <React.Fragment key={node.id}>
                          <div 
                            className="flex flex-col items-center group shrink-0 cursor-pointer relative z-20 w-24 md:w-auto"
                            onClick={() => setActiveNodeId(node.id)}
                          >
                              <div className={`relative flex items-center justify-center transition-all duration-300 w-16 h-16 md:w-20 md:h-20 rounded-2xl border backdrop-blur-sm ${isActive ? 'bg-[#111] border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'bg-[#0a0a0a] border-white/10 hover:border-white/30 hover:bg-[#111]'}`}>
                                  <Icon className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-white'}`} />
                                  {isActive && <div className="absolute inset-0 rounded-2xl border border-cyan-400/30 animate-pulse" />}
                              </div>
                              <div className="mt-4 text-center">
                                  <span className={`block text-[10px] font-mono px-3 py-1 rounded-full border transition-all duration-300 uppercase tracking-widest ${isActive ? 'bg-cyan-950/30 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-white/5 border-white/10 text-zinc-500 group-hover:border-white/20 group-hover:text-zinc-300'}`}>
                                    {node.short}
                                  </span>
                              </div>
                          </div>

                          {index < WORKFLOW_NODES.length - 1 && (
                            <div className="hidden md:flex flex-1 h-[1px] bg-white/10 mx-4 relative self-start mt-10 overflow-hidden">
                                <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.3 }} className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-1/2 blur-[1px]" />
                            </div>
                          )}

                          {index < WORKFLOW_NODES.length - 1 && (
                            <div className="md:hidden h-12 w-[1px] bg-white/10 my-2 relative overflow-hidden">
                                <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.3 }} className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500 to-transparent h-1/2 blur-[1px]" />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                </div>

                {/* Desktop Description Panel */}
                <div className="hidden md:flex relative z-10 mt-24 h-24 items-center justify-center">
                  <AnimatePresence mode="wait">
                    {activeNode ? (
                      <motion.div
                        key={activeNode.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-xl p-5 flex items-start gap-4 shadow-2xl z-20"
                      >
                         <div className="p-2.5 rounded-lg bg-black border border-white/5 text-cyan-400 shrink-0"><activeNode.icon size={20} /></div>
                         <div>
                            <h5 className="text-base font-bold text-white mb-1">{activeNode.title}</h5>
                            <p className="text-sm text-zinc-400 leading-relaxed">{activeNode.description}</p>
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-zinc-600 gap-3 text-center">
                         <MousePointerClick size={24} className="animate-bounce text-zinc-500" />
                         <span className="text-sm font-mono uppercase tracking-widest">Clique nos nós para ver a engenharia</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="md:hidden flex flex-col items-center text-zinc-600 gap-2 mt-8 opacity-60">
                    <MousePointerClick size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Toque para analisar</span>
                </div>
            </div>
        </div>
      </div>

      {/* MOBILE FLOATING DESCRIPTION (Fix UX) */}
      <AnimatePresence>
        {activeNode && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed bottom-0 left-0 w-full z-[100] p-4 pb-8"
          >
            <div className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-2xl border-t border-cyan-500/30 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]" />
            <div className="relative z-10 max-w-lg mx-auto">
                <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-4" />
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0"><activeNode.icon size={24} /></div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="text-lg font-bold text-white">{activeNode.title}</h4>
                            <button onClick={() => setActiveNodeId(null)} className="p-1 rounded-full bg-white/5 text-zinc-500"><X size={18} /></button>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed pr-2">{activeNode.description}</p>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
