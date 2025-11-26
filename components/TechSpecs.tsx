import React from 'react';
import { Database, Workflow, Shield, Server } from 'lucide-react';

export const TechSpecs: React.FC = () => {
  return (
    <section id="tech" className="py-20 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Why C2G */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-6">
              Por que a <span className="text-cyan-400">C2G</span>?
            </h2>
            <p className="text-zinc-400 mb-8 text-lg">
              Não somos apenas integradores de API. Somos engenheiros de software construindo a infraestrutura para operações autônomas.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <Workflow size={24} />, title: "Engenharia, não 'Prompt'", text: "Não vendemos prompts prontos. Construímos arquitetura de software robusta e escalável." },
                { icon: <Server size={24} />, title: "Memória Infinita", text: "A Ísis lembra do cliente que chamou mês passado. Contexto é tudo." },
                { icon: <Database size={24} />, title: "Multicanal", text: "O mesmo cérebro atende no WhatsApp, Instagram e Site." },
                { icon: <Shield size={24} />, title: "Segurança Total", text: "Seus dados não treinam a IA pública. Ambiente isolado e seguro." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="w-12 h-12 rounded-lg bg-[#111] border border-white/5 flex items-center justify-center text-cyan-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-zinc-100 font-semibold text-lg">{item.title}</h4>
                    <p className="text-sm text-zinc-500">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative" data-aos="fade-left" data-aos-delay="200">
             {/* Anchor for Cases Link */}
            <span id="cases" className="absolute -top-32 invisible"></span>
            
            {/* Abstract Tech Visual */}
            <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                <div className="font-mono text-sm space-y-2">
                    <div className="text-gray-500"># Inicializando Agente C2G...</div>
                    <div className="text-emerald-500">$ connecting to erp_system... <span className="text-gray-400">[OK]</span></div>
                    <div className="text-emerald-500">$ retrieving client_context (id: 4920)... <span className="text-gray-400">[OK]</span></div>
                    <div className="text-blue-400">$ analyzing intent...</div>
                    <div className="pl-4 text-gray-400">{`{ "intent": "sales_closing", "confidence": 0.98 }`}</div>
                    <div className="text-cyan-400">$ executing tool: check_inventory(sku_123)</div>
                    <div className="text-gray-300">...</div>
                    <div className="text-emerald-500">$ sending_response via whatsapp_api <span className="text-gray-400">[SENT]</span></div>
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-50 pointer-events-none"></div>
            </div>
            
            {/* Stats Cards overlay */}
            <div className="absolute -bottom-10 -right-4 bg-[#111] border border-gray-800 p-4 rounded-xl shadow-xl" data-aos="zoom-in" data-aos-delay="400">
                <div className="text-2xl font-bold text-white">40%</div>
                <div className="text-xs text-gray-400">Redução de Chamados</div>
            </div>
             <div className="absolute -top-6 -left-4 bg-[#111] border border-gray-800 p-4 rounded-xl shadow-xl" data-aos="zoom-in" data-aos-delay="500">
                <div className="text-2xl font-bold text-white">80+</div>
                <div className="text-xs text-gray-400">Lojas Autonômas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};