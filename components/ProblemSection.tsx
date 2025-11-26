import React from 'react';
import { AlertTriangle, TrendingUp, XCircle, CheckCircle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#080808] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4">
            O Abismo entre Ter um Chatbot e <span className="text-cyan-400">Ter Resultado</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A maioria das empresas aposta em bots "papagaios" que apenas respondem dúvidas básicas e travam na primeira complexidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* The Old Way */}
          <div 
            className="bg-[#0f0f0f] border border-red-500/10 rounded-2xl p-6 md:p-8 relative overflow-hidden"
            data-aos="fade-right"
            data-aos-delay="0"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <XCircle size={120} className="text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
              <AlertTriangle size={20} />
              O "Bot Burro" Padrão
            </h3>
            <ul className="space-y-4">
              {[
                "Responde apenas o que está no FAQ",
                "Esquece o contexto após 2 mensagens",
                "Transfere para humano (que demora a atender)",
                "Não acessa seu estoque ou agenda real",
                "Gera frustração no cliente"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-400">
                  <XCircle size={18} className="text-red-500/60 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The C2G Way */}
          <div 
            className="bg-[#0f0f0f] border border-cyan-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-[0_0_50px_-20px_rgba(6,182,212,0.1)]"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp size={120} className="text-cyan-500" />
            </div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
              <TrendingUp size={20} />
              Funcionários Digitais C2G
            </h3>
            <ul className="space-y-4">
              {[
                "Raciocina e toma decisões baseadas em regras",
                "Memória de longo prazo (lembra do cliente)",
                "Executa ações: Agendar, Vender, Consultar",
                "Integrado ao ERP, CRM e APIs bancárias",
                "Auditoria e Governança anti-erro"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-200">
                  <CheckCircle size={18} className="text-cyan-500 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};