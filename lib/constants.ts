
export const COMPANY_NAME = "C2G Automações";

// URL da Logo Transparente (Leve) - Para Navbar, Footer e Favicon
export const LOGO_URL = "https://lh3.googleusercontent.com/d/1EglXv-1-n7OU6GwPF09GsjgWkAFk3gmk";

// URL da Logo Alta Definição (Fundo Preto) - Exclusiva para o Hero/Watermark
export const LOGO_HQ_URL = "https://lh3.googleusercontent.com/d/1a7v7opGKCyBswnFPse_lDUfuTKzKQhuB";

// Números de Telefone
export const ISIS_NUMBER = "5547933868794";
export const CONSULTANT_NUMBER = "556191300818"; // Guilherme C.

// Link oficial da Ísis com mensagem pré-definida (Padrão do site)
export const WHATSAPP_LINK = `https://wa.me/${ISIS_NUMBER}?text=${encodeURIComponent("Olá Ísis! Vi o site da C2G e gostaria de saber mais sobre as automações.")}`;

// Interface otimizada para tipagem estrita
export interface NavLink {
  name: string;
  href: string;
  offset: number;
}

export const NAV_LINKS: NavLink[] = [
  { name: 'Agentes', href: '#solutions', offset: 0 },
  { name: 'Sistema', href: '#system', offset: -10 },
  { name: 'Tecnologia', href: '#tech', offset: 20 },
  { name: 'Preços', href: '#pricing', offset: 90 },
  { name: 'Processo', href: '#process', offset: 100 },
  { name: 'Sobre Nós', href: '#about', offset: -30 },
  { name: 'Equipe', href: '#team', offset: -200 },
  { name: 'FAQ', href: '#faq', offset: -30 },
];

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/c2g-automações/",
  instagram: "https://www.instagram.com/c2g.automacoes/",
  twitter: "#"
};

export const CONTACT_EMAIL = "c2gautomacoes@gmail.com";
