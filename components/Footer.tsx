
import React from 'react';
import { Instagram, Globe } from 'lucide-react';
import { Logo } from './ui/Logo';
import { NAV_LINKS, SOCIAL_LINKS, COMPANY_NAME, CONTACT_EMAIL } from '../lib/constants';
import { scroller } from 'react-scroll';

interface FooterProps {
  onTermsClick?: (section?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTermsClick }) => {

  const handleScroll = (href: string) => {
    const sectionId = href.replace('#', '');
    scroller.scrollTo(sectionId, {
      duration: 1000,
      delay: 0,
      smooth: true,
      offset: -80,
    });
  };

  return (
    <footer className="bg-[#050505] border-t border-gray-900 pt-20 pb-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
                {/* 
                   Atualizado: 
                   1. showFullText={true} para forçar exibição do texto no mobile.
                   2. Altura ajustada para h-14 (mobile) e h-24 (desktop) para caber na tela do celular.
                */}
                <Logo className="h-14 md:h-24 w-auto" showFullText={true} />
            </div>
            <p className="text-zinc-500 max-w-sm mb-6 leading-relaxed">
              Engenharia de software aplicada a inteligência artificial. Criamos o futuro do trabalho autônomo para empresas que lideram seus setores.
            </p>
            <div className="flex gap-4">
              <a href={SOCIAL_LINKS.instagram} aria-label="Instagram" rel="noopener noreferrer" target="_blank" className="p-2 bg-[#111] border border-white/5 rounded-full text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Product Column */}
          <nav aria-label="Links de Produtos">
            <h4 className="text-white font-semibold mb-6">Produto</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><button onClick={() => handleScroll('#solutions')} className="hover:text-white transition-colors text-left">Ísis (Atendimento)</button></li>
              <li><button onClick={() => handleScroll('#solutions')} className="hover:text-white transition-colors text-left">Growth Autônomo</button></li>
              <li><button onClick={() => handleScroll('#solutions')} className="hover:text-white transition-colors text-left">Governança AI</button></li>
              <li><button onClick={() => handleScroll('#tech')} className="hover:text-white transition-colors text-left">Integrações (n8n)</button></li>
              <li><button onClick={() => handleScroll('#pricing')} className="hover:text-white transition-colors text-left">Preços</button></li>
            </ul>
          </nav>

          {/* Company Column */}
          <nav aria-label="Links da Empresa">
            <h4 className="text-white font-semibold mb-6">Empresa</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              {NAV_LINKS.filter(l => l.name === 'Sobre Nós' || l.name === 'Equipe').map(link => (
                  <li key={link.name}>
                    <button onClick={() => handleScroll(link.href)} className="hover:text-white transition-colors text-left">
                      {link.name}
                    </button>
                  </li>
              ))}
              <li><span className="text-zinc-600 cursor-default">Carreiras</span></li>
              <li><span className="text-zinc-600 cursor-default">Blog (Em breve)</span></li>
            </ul>
          </nav>

          {/* Legal Column */}
          <nav aria-label="Links Legais">
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>
                <button onClick={() => onTermsClick?.('terms')} className="hover:text-white transition-colors text-left">Termos de Uso</button>
              </li>
              <li>
                <button onClick={() => onTermsClick?.('privacy')} className="hover:text-white transition-colors text-left">Política de Privacidade</button>
              </li>
              <li>
                 <button onClick={() => onTermsClick?.('compliance')} className="hover:text-white transition-colors text-left">Compliance</button>
              </li>
              <li><button className="hover:text-white transition-colors flex items-center gap-2 cursor-default mt-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Status do Sistema</button></li>
            </ul>
          </nav>

        </div>
        
        <div className="border-t border-gray-900/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-600 gap-4">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME} Ltda. Todos os direitos reservados.</p>
          <div className="flex flex-col items-center md:items-end gap-1">
            <a 
              href={`mailto:${CONTACT_EMAIL}`} 
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Contato: {CONTACT_EMAIL}
            </a>
            <span className="flex items-center gap-2 text-zinc-700"><Globe size={14} /> Brasil (PT-BR)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
