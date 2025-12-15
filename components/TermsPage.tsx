import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ArrowLeft, ShieldCheck, Scale, Lock, FileText, AlertTriangle, Cpu } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scroller } from 'react-scroll';
import { Logo } from './ui/Logo';
import { WHATSAPP_LINK } from '../lib/constants';
import AOS from 'aos';

interface TermsPageProps {
  onBack: () => void;
  initialSection?: string;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack, initialSection }) => {
  
  // Mobile Detection for Scroll Optimization
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax Logic
  const { scrollYProgress } = useScroll();
  // Only apply parallax translation on desktop to ensure native smooth touch scrolling on mobile
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // CRITICAL: Scroll Reset Logic
  // Use useLayoutEffect to ensure DOM is painted starting at top before user sees it
  useLayoutEffect(() => {
    // Reset para todos os navegadores (Chrome, Safari, Firefox)
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    // Força o AOS a reconhecer os novos elementos da página de termos
    // Pequeno delay para garantir que o React renderizou o conteúdo
    setTimeout(() => {
      AOS.refreshHard();
    }, 100);

    // Se houver uma seção específica, rola até ela suavemente
    if (initialSection) {
      setTimeout(() => {
        scroller.scrollTo(initialSection, {
          duration: 800, // Slightly faster for better mobile feel
          delay: 0,
          smooth: 'easeInOutQuart',
          // Menor offset no mobile para aproveitar melhor a tela
          offset: window.innerWidth < 768 ? -100 : -120, 
        });
      }, 500); // Delay seguro para garantir que o scroll reset (0,0) já ocorreu
    }
  }, [initialSection]);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-cyan-500/30 selection:text-white flex flex-col relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.08)_0%,transparent_50%)] pointer-events-none z-0" />

      {/* Simple Navbar for Terms Page */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5" data-aos="fade-down" data-aos-duration="800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 group hover:opacity-80 transition-opacity focus:outline-none"
          >
            {/* Aumentado o tamanho do logo conforme solicitado: h-12 no mobile, h-16 no desktop */}
            <Logo className="h-12 md:h-16 w-auto" />
          </button>

          <div className="flex items-center gap-4">
             <button 
                onClick={onBack}
                className="hidden md:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
             >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Voltar ao Início
             </button>
             
             <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              Falar com Ísis
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 pb-20 px-6 relative z-10">
        {/* Usando motion.article para o parallax sutil (Apenas Desktop) */}
        <motion.article 
            style={{ y: isMobile ? 0 : parallaxY }}
            className="max-w-3xl mx-auto"
        >
            
            {/* Header Section */}
            <div className="mb-16 text-center" data-aos="fade-up" data-aos-duration="1000">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/20 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6">
                    <Scale size={12} />
                    <span>Jurídico & Compliance</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Termos de Uso e Políticas
                </h1>
                <p className="text-zinc-500">
                    Última atualização: Dezembro de 2025
                </p>
            </div>

            {/* Content Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" data-aos="zoom-in" data-aos-delay="200" />

            <div className="space-y-16">
                
                {/* SECTION 1: TERMS OF USE */}
                <section id="terms" className="space-y-6 scroll-mt-32">
                    <div className="flex items-center gap-3 mb-8" data-aos="fade-right">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                            <FileText size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Termos de Uso - C2G Automações</h2>
                    </div>

                    <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed">
                        <p className="mb-6" data-aos="fade-up">
                            Bem-vindo à C2G Automações. Ao contratar ou utilizar nossos ecossistemas de agentes autônomos ("Serviços"), você concorda com os termos abaixo.
                        </p>

                        <div className="space-y-8">
                            <div 
                                className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl group hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.1)]"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    1. Natureza dos Serviços (SaaS e IA)
                                </h3>
                                <p>
                                    A C2G fornece infraestrutura de software baseada em Inteligência Artificial Generativa (LLMs) para automação de processos.
                                </p>
                                <div className="mt-4 p-4 bg-yellow-900/10 border border-yellow-500/10 rounded-xl flex items-start gap-3 text-sm text-yellow-200/80">
                                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                                    <span>
                                        <strong>Importante:</strong> Embora utilizemos protocolos avançados de validação, modelos de IA são probabilísticos e podem, ocasionalmente, gerar informações imprecisas ("alucinações"). O Cliente reconhece que a supervisão final sobre decisões críticas de negócio é humana.
                                    </span>
                                </div>
                            </div>

                            <div 
                                className="bg-[#0a0a0a]/50 border border-transparent p-6 rounded-2xl hover:bg-[#0a0a0a] hover:border-white/10 transition-all duration-300"
                                data-aos="fade-up"
                                data-aos-delay="150"
                            >
                                <h3 className="text-lg font-semibold text-white mb-3">2. Responsabilidade sobre o Canal (WhatsApp/Meta)</h3>
                                <p>
                                    A C2G fornece a tecnologia de automação, mas a titularidade e a responsabilidade pelo uso do número de telefone junto à Meta (WhatsApp) são exclusivas do Cliente.
                                </p>
                                <ul className="list-disc pl-5 mt-3 space-y-2 marker:text-cyan-500">
                                    <li><strong>Bloqueios:</strong> A C2G <strong>não se responsabiliza</strong> por bloqueios, banimentos ou suspensões de números decorrentes de denúncias de usuários, envio de spam ou violação das políticas comerciais da Meta.</li>
                                    <li>A C2G recomenda estritamente o uso de bases de contatos "opt-in" (que aceitaram receber mensagens).</li>
                                </ul>
                            </div>

                            <div data-aos="fade-up" data-aos-delay="200">
                                <h3 className="text-lg font-semibold text-white mb-3">3. Propriedade Intelectual</h3>
                                <ul className="list-disc pl-5 space-y-2 marker:text-cyan-500">
                                    <li><strong>Tecnologia C2G:</strong> Todos os fluxos de automação (n8n), códigos, arquitetura de agentes e "prompts de sistema" desenvolvidos pela C2G são propriedade intelectual exclusiva da C2G Automações, licenciados para uso do Cliente enquanto o contrato estiver ativo.</li>
                                    <li><strong>Dados do Cliente:</strong> Toda a base de leads, histórico de conversas e informações do negócio pertencem exclusivamente ao Cliente.</li>
                                </ul>
                            </div>

                            <div data-aos="fade-up" data-aos-delay="250">
                                <h3 className="text-lg font-semibold text-white mb-3">4. Limitação de Responsabilidade</h3>
                                <p>
                                    Em nenhuma circunstância a C2G será responsável por lucros cessantes, perda de receita ou dados decorrentes de falhas de terceiros (ex: queda da API da OpenAI, instabilidade do WhatsApp ou servidores de hospedagem).
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-white/5" data-aos="fade-in" />

                {/* SECTION 2: PRIVACY POLICY */}
                <section id="privacy" className="space-y-6 scroll-mt-32">
                    <div className="flex items-center gap-3 mb-8" data-aos="fade-right">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                            <Lock size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Política de Privacidade e Proteção de Dados</h2>
                    </div>

                    <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed space-y-8">
                        <p data-aos="fade-up">
                            A C2G Automações leva a segurança dos seus dados a sério. Esta política descreve como coletamos, usamos e protegemos as informações processadas por nossos Agentes de IA.
                        </p>

                        <div data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-white mb-3">1. Coleta e Tratamento de Dados</h3>
                            <p>
                                Atuamos como <strong>Operador de Dados</strong> sob a LGPD (Lei Geral de Proteção de Dados). Coletamos apenas os dados estritamente necessários para a execução da automação (ex: Nome, Telefone, E-mail e Histórico de Conversas do WhatsApp).
                            </p>
                        </div>

                        <div 
                            className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl group hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.1)]"
                            data-aos="fade-up"
                        >
                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <Cpu size={18} className="text-purple-400"/>
                                2. Uso de Inteligência Artificial e Terceiros
                            </h3>
                            <p>
                                Para fornecer inteligência aos agentes, utilizamos APIs de parceiros homologados, incluindo, mas não se limitando a: <strong>OpenAI, Anthropic e Google Cloud</strong>.
                            </p>
                            <div className="mt-4 pl-4 border-l-2 border-purple-500/50">
                                <p className="text-sm text-zinc-300">
                                    <strong>Privacidade de IA:</strong> Os dados do Cliente processados por nossos agentes <strong>NÃO</strong> são utilizados para o treinamento de modelos públicos dessas fornecedoras. Utilizamos configurações de API que garantem a confidencialidade (Zero Data Retention Policies, onde aplicável).
                                </p>
                            </div>
                        </div>

                        <div data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-white mb-3">3. Armazenamento e Segurança</h3>
                            <p>
                                Seus dados são armazenados em bancos de dados seguros (Supabase/PostgreSQL) com criptografia em repouso e em trânsito (SSL/TLS).
                            </p>
                            <ul className="list-disc pl-5 mt-2 marker:text-emerald-500">
                                <li><strong>Isolamento:</strong> Utilizamos arquitetura "Multi-tenant" lógica, garantindo que a base de conhecimento (RAG) da sua empresa nunca seja acessada pelos agentes de outro cliente.</li>
                            </ul>
                        </div>

                        <div data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-white mb-3">4. Seus Direitos</h3>
                            <p>O Cliente pode solicitar, a qualquer momento:</p>
                            <ul className="list-disc pl-5 mt-2 marker:text-emerald-500">
                                <li>A exportação completa de seus dados (formato CSV/JSON).</li>
                                <li>A exclusão definitiva de dados pessoais de seus leads de nossos servidores, conforme exigido pela LGPD.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-white/5" data-aos="fade-in" />

                {/* SECTION 3: COMPLIANCE */}
                <section id="compliance" className="space-y-6 scroll-mt-32">
                    <div className="flex items-center gap-3 mb-8" data-aos="fade-right">
                        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
                            <ShieldCheck size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Compliance e Governança de IA</h2>
                    </div>

                    <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed space-y-8">
                        <p data-aos="fade-up">
                            A C2G Automações constrói sistemas desenhados para operar dentro de rigorosos padrões éticos e técnicos.
                        </p>

                        <div data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-white mb-3">1. Conformidade com a Meta (WhatsApp)</h3>
                            <p>
                                Nossos agentes são programados com "limiter rates" (limites de velocidade) nativos para respeitar as janelas de conversação e as diretrizes de frequência da WhatsApp Business API, minimizando riscos à saúde do número.
                            </p>
                        </div>

                        <div data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-white mb-3">2. Auditoria e "Human-in-the-Loop"</h3>
                            <p>Defendemos a IA Supervisionada. Nossos sistemas possuem gatilhos de transbordo automático:</p>
                            <ul className="list-disc pl-5 mt-2 marker:text-cyan-500">
                                <li><strong>Análise de Sentimento:</strong> Se o agente detectar irritação ou sentimento negativo no cliente final, o atendimento é imediatamente transferido para um humano (se configurado).</li>
                                <li><strong>Logs Auditáveis:</strong> Todas as ações tomadas pela IA (agendamentos, qualificações) geram logs acessíveis para auditoria do Cliente.</li>
                            </ul>
                        </div>

                        <div data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-white mb-3">3. Segurança da Infraestrutura</h3>
                            <ul className="grid md:grid-cols-2 gap-4 mt-4">
                                <li className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                                    <strong className="text-white block mb-1">Autenticação</strong>
                                    Acesso aos Dashboards protegido por autenticação segura.
                                </li>
                                <li className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                                    <strong className="text-white block mb-1">Segregação</strong>
                                    Ambientes de Desenvolvimento e Produção separados para garantir estabilidade.
                                </li>
                                <li className="bg-white/5 p-4 rounded-xl border border-white/5 md:col-span-2 hover:border-cyan-500/30 transition-colors">
                                    <strong className="text-white block mb-1">Backups</strong>
                                    Rotinas de backup automatizadas de bases de dados vetoriais e relacionais.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        </motion.article>
      </main>

      {/* Simplified Footer for Terms Page */}
      <footer className="bg-[#020202] border-t border-white/5 py-10 px-6 relative z-10" data-aos="fade-up" data-aos-offset="0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
            <p>&copy; {new Date().getFullYear()} C2G Automações Ltda. Todos os direitos reservados.</p>
            <button onClick={onBack} className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Voltar ao site principal
            </button>
        </div>
      </footer>
    </div>
  );
};