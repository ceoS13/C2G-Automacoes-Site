import React from 'react';
import { Linkedin, Instagram, Twitter, Globe } from 'lucide-react';
import { Logo } from './ui/Logo';
import { NAV_LINKS, SOCIAL_LINKS } from '../lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-gray-900 pt-20 pb-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
                <Logo className="w-6 h-6" />
            </div>
            <p className="text-zinc-500 max-w-sm mb-6 leading-relaxed">
              Engenharia de software aplicada a inteligência artificial. Criamos o futuro do trabalho autônomo para empresas que lideram seus setores.
            </p>
            <div className="flex gap-4">
              <a href={SOCIAL_LINKS.linkedin} aria-label="LinkedIn" rel="noopener noreferrer" target="_blank" className="p-2 bg-[#111] border border-white/5 rounded-full text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"><Linkedin size={18} /></a>
              <a href={SOCIAL_LINKS.instagram} aria-label="Instagram" rel="noopener noreferrer" target="_blank" className="p-2 bg-[#111] border border-white/5 rounded-full text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"><Instagram size={18} /></a>
              <a href={SOCIAL_LINKS.twitter} aria-label="Twitter" rel="noopener noreferrer" target="_blank" className="p-2 bg-[#111] border border-white/5 rounded-full text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Product Column */}
          <nav aria-label="Links de Produtos">
            <h4 className="text-white font-semibold mb-6">Produto</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><a href="#solutions" className="hover:text-white transition-colors">Ísis (Atendimento)</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Growth Autônomo</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Governança AI</a></li>
              <li><a href="#tech" className="hover:text-white transition-colors">Integrações (n8n)</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Preços</a></li>
            </ul>
          </nav>

          {/* Company Column */}
          <nav aria-label="Links da Empresa">
            <h4 className="text-white font-semibold mb-6">Empresa</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              {NAV_LINKS.filter(l => l.name === 'Sobre Nós' || l.name === 'Equipe').map(link => (
                  <li key={link.name}><a href={link.href} className="hover:text-white transition-colors">{link.name}</a></li>
              ))}
              <li><a href="#" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">Carreiras <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/20">Contratando</span></a></li>
              <li><a href="#" rel="noopener noreferrer" className="hover:text-white transition-colors">Blog Tech</a></li>
              <li><a href="#" rel="noopener noreferrer" className="hover:text-white transition-colors">Imprensa</a></li>
              <li><a href="#" rel="noopener noreferrer" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </nav>

          {/* Legal Column */}
          <nav aria-label="Links Legais">
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><a href="#" rel="noopener noreferrer" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" rel="noopener noreferrer" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" rel="noopener noreferrer" className="hover:text-white transition-colors">Compliance</a></li>
              <li><a href="#" rel="noopener noreferrer" target="_blank" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Status do Sistema</a></li>
            </ul>
          </nav>

        </div>
        
        <div className="border-t border-gray-900/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-600 gap-4">
          <p>&copy; {new Date().getFullYear()} C2G Automações Ltda. Todos os direitos reservados.</p>
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-2 text-zinc-700"><Globe size={14} /> Brasil (PT-BR)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};