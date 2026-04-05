import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ArrowLeft, ShieldCheck, Scale, Lock, FileText, AlertTriangle, Cpu } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scroller } from 'react-scroll';

import { Logo } from '../components/ui/Logo';
import { WHATSAPP_LINK } from '../lib/constants';

interface TermsPageProps {
    onBack: () => void;
    initialSection?: string;
}

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: 'easeOut' },
};

const fadeRight = {
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: 'easeOut' },
};

const fadeLeft = {
    initial: { opacity: 0, x: 20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: 'easeOut' },
};

const fadeDown = {
    initial: { opacity: 0, y: -15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: 'easeOut' },
};

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
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        // Se houver uma seção específica, rola até ela suavemente
        if (initialSection) {
            timer = setTimeout(() => {
                scroller.scrollTo(initialSection, {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart',
                    offset: window.innerWidth < 768 ? -100 : -120,
                });
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [initialSection]);

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-cyan-500/30 selection:text-white flex flex-col relative overflow-hidden">

            {/* Background Elements */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none z-0" />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.08)_0%,transparent_50%)] pointer-events-none z-0" />

            {/* Simple Navbar for Terms Page */}
            <motion.header {...fadeDown} className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 group hover:opacity-80 transition-opacity focus:outline-none"
                    >
                        <Logo className="h-12 md:h-16 w-auto" />
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="hidden md:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Início
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
            </motion.header>

            <main className="flex-1 pt-32 pb-20 px-6 relative z-10">
                <motion.article
                    style={{ y: isMobile ? 0 : parallaxY }}
                    className="max-w-3xl mx-auto"
                >

                    {/* Header Section */}
                    <motion.div {...fadeUp} className="mb-16 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]">
                            <Scale size={12} />
                            <span>Jurídico & Compliance</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            Termos de Uso <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">e Políticas</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Transparência total sobre como operamos nossos agentes, tratamos seus dados e garantimos a segurança da sua operação.
                        </p>
                    </motion.div>

                    {/* Content Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mb-16"
                    />

                    <div className="space-y-24">

                        {/* SECTION 1: TERMS OF USE */}
                        <section id="terms" className="scroll-mt-32">
                            <motion.div {...fadeRight} className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-xl text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10">
                                    <FileText size={28} />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Termos de Uso</h2>
                            </motion.div>

                            <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed">
                                <motion.p {...fadeUp} className="mb-8 text-lg">
                                    Bem-vindo à C2G Automações. Ao contratar ou utilizar nossos ecossistemas de agentes autônomos ("Serviços"), você concorda com os termos abaixo.
                                </motion.p>

                                <div className="space-y-6">
                                    <motion.div
                                        {...fadeUp}
                                        className="glass-panel p-6 rounded-2xl group hover:border-blue-500/30 transition-all duration-300"
                                    >
                                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                            <span className="text-blue-500">01.</span> Natureza dos Serviços (SaaS e IA)
                                        </h3>
                                        <p className="text-zinc-400">
                                            A C2G fornece infraestrutura de software baseada em Inteligência Artificial Generativa (LLMs) para automação de processos.
                                        </p>
                                        <div className="mt-4 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl flex items-start gap-3 text-sm text-yellow-200/90">
                                            <AlertTriangle size={16} className="shrink-0 mt-0.5 text-yellow-500" />
                                            <span>
                                                <strong className="text-yellow-400">Importante:</strong> Embora utilizemos protocolos avançados de validação, modelos de IA são probabilísticos e podem, ocasionalmente, gerar informações imprecisas ("alucinações"). O Cliente reconhece que a supervisão final sobre decisões críticas de negócio é humana.
                                            </span>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        {...fadeUp}
                                        className="glass-panel p-6 rounded-2xl hover:border-white/20 transition-all duration-300"
                                    >
                                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                            <span className="text-blue-500">02.</span> Responsabilidade sobre o Canal
                                        </h3>
                                        <p className="text-zinc-400">
                                            A C2G fornece a tecnologia de automação, mas a titularidade e a responsabilidade pelo uso do número de telefone junto à Meta (WhatsApp) são exclusivas do Cliente.
                                        </p>
                                        <ul className="list-none pl-0 mt-4 space-y-3">
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                                <span><strong className="text-zinc-200">Bloqueios:</strong> A C2G <strong>não se responsabiliza</strong> por bloqueios, banimentos ou suspensões de números decorrentes de denúncias de usuários, envio de spam ou violação das políticas comerciais da Meta.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="block w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                                                <span>Recomendamos estritamente o uso de bases de contatos "opt-in".</span>
                                            </li>
                                        </ul>
                                    </motion.div>

                                    <motion.div {...fadeUp} className="glass-panel p-6 rounded-2xl hover:border-white/20 transition-all duration-300">
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            <span className="text-blue-500">03.</span> Propriedade Intelectual
                                        </h3>
                                        <ul className="grid md:grid-cols-2 gap-4 mt-4 list-none pl-0">
                                            <li className="bg-white/5 p-4 rounded-xl border border-white/5">
                                                <strong className="text-white block mb-1">Tecnologia C2G</strong>
                                                <span className="text-sm">Fluxos n8n, códigos e prompts são propriedade exclusiva da C2G Automações.</span>
                                            </li>
                                            <li className="bg-white/5 p-4 rounded-xl border border-white/5">
                                                <strong className="text-white block mb-1">Dados do Cliente</strong>
                                                <span className="text-sm">Leads, histórico e inteligência de negócio pertencem exclusivamente ao Cliente.</span>
                                            </li>
                                        </ul>
                                    </motion.div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 2: PRIVACY POLICY */}
                        <section id="privacy" className="scroll-mt-32">
                            <motion.div {...fadeRight} className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                                    <Lock size={28} />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Privacidade e Proteção de Dados</h2>
                            </motion.div>

                            <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed space-y-8">
                                <motion.p {...fadeUp} className="text-lg">
                                    A C2G Automações atua como <strong>Operador de Dados</strong> sob a LGPD, coletando apenas o estritamente necessário para a automação.
                                </motion.p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <motion.div
                                        {...fadeUp}
                                        className="glass-panel p-6 rounded-2xl group hover:border-purple-500/30 transition-all duration-300 md:col-span-2 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                                            <Cpu size={20} className="text-purple-400" />
                                            Uso de IA e Terceiros
                                        </h3>
                                        <p className="relative z-10">
                                            Utilizamos APIs de parceiros homologados (<strong>OpenAI, Anthropic, Google Cloud</strong>) com configurações de privacidade empresarial.
                                        </p>
                                        <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg inline-block relative z-10">
                                            <p className="text-sm text-purple-200">
                                                <strong>Zero Retention:</strong> Seus dados <strong>NÃO</strong> são usados para treinar modelos públicos.
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div {...fadeUp} className="glass-panel p-6 rounded-2xl hover:border-emerald-500/30 transition-all duration-300">
                                        <h3 className="text-lg font-bold text-white mb-2">Armazenamento</h3>
                                        <p className="text-sm">Bancos de dados criptografados (Supabase/PostgreSQL) com SSL/TLS.</p>
                                    </motion.div>

                                    <motion.div {...fadeUp} className="glass-panel p-6 rounded-2xl hover:border-emerald-500/30 transition-all duration-300">
                                        <h3 className="text-lg font-bold text-white mb-2">Isolamento</h3>
                                        <p className="text-sm">Arquitetura Multi-tenant lógica protege sua base de conhecimento (RAG).</p>
                                    </motion.div>
                                </div>

                                <motion.div {...fadeUp}>
                                    <h3 className="text-xl font-bold text-white mb-4">Seus Direitos</h3>
                                    <div className="flex gap-4 flex-wrap">
                                        <span className="px-4 py-2 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm font-medium">Exportação de Dados</span>
                                        <span className="px-4 py-2 bg-red-950/30 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium">Exclusão Definitiva</span>
                                    </div>
                                </motion.div>
                            </div>
                        </section>

                        {/* SECTION 3: COMPLIANCE */}
                        <section id="compliance" className="scroll-mt-32">
                            <motion.div {...fadeLeft} className="glass-panel border-l-4 border-l-cyan-500 p-8 rounded-r-2xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <ShieldCheck size={32} className="text-cyan-400" />
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Compliance e Governança</h2>
                                        <p className="text-zinc-500 text-sm">Segurança em primeiro lugar</p>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <h4 className="text-white font-semibold mb-2">Limiter Rates</h4>
                                        <p className="text-sm text-zinc-400">Proteção nativa contra envio excessivo de mensagens para evitar banimentos.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-2">Human-in-the-Loop</h4>
                                        <p className="text-sm text-zinc-400">Transbordo automático para humanos em caso de sentimento negativo.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-2">Logs Auditáveis</h4>
                                        <p className="text-sm text-zinc-400">Rastreabilidade total de todas as ações executadas pela IA.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </section>

                    </div>
                </motion.article>
            </main>

            {/* Simplified Footer for Terms Page */}
            <motion.footer {...fadeUp} className="bg-[#020202] border-t border-white/5 py-10 px-6 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
                    <p>&copy; {new Date().getFullYear()} C2G Automações Ltda. Todos os direitos reservados.</p>
                    <button onClick={onBack} className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao site principal
                    </button>
                </div>
            </motion.footer>
        </div>
    );
};
