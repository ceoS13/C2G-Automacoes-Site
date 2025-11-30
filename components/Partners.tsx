import React, { useMemo, useEffect } from 'react';

// Using stable CDN (SimpleIcons/Devicon/SVGL) to ensure logos load correctly
// Updated Google Gemini to jsDelivr for better caching headers
const PARTNERS = [
  {
    name: 'OpenAI',
    logoUrl: 'https://cdn.simpleicons.org/openai/ffffff', // White logo for dark bg
    className: 'hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-500'
  },
  {
    name: 'LangChain',
    logoUrl: 'https://cdn.simpleicons.org/langchain/ffffff',
    className: 'hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-500'
  },
  {
    name: 'n8n',
    logoUrl: 'https://cdn.simpleicons.org/n8n/ff6584', // Official Red/Pink
    className: 'hover:drop-shadow-[0_0_15px_rgba(255,101,132,0.4)] transition-all duration-500'
  },
  {
    name: 'WhatsApp',
    logoUrl: 'https://cdn.simpleicons.org/whatsapp/25D366', // Official Green
    className: 'hover:drop-shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all duration-500'
  },
  {
    name: 'Supabase',
    logoUrl: 'https://cdn.simpleicons.org/supabase/3ecf8e', // Official Green
    className: 'hover:drop-shadow-[0_0_15px_rgba(62,207,142,0.4)] transition-all duration-500'
  },
  {
    name: 'Google Gemini',
    // Optimized: Using jsDelivr CDN instead of raw.githubusercontent for better caching/performance
    logoUrl: 'https://cdn.jsdelivr.net/gh/pheralb/svgl@main/static/library/gemini.svg',
    className: 'hover:drop-shadow-[0_0_15px_rgba(66,133,244,0.4)] transition-all duration-500'
  },
  {
    name: 'LinkedIn',
    // Fix: Switching to jsDelivr/SVGL for reliability as SimpleIcons was failing
    logoUrl: 'https://cdn.jsdelivr.net/gh/pheralb/svgl@main/static/library/linkedin.svg',
    className: 'hover:drop-shadow-[0_0_15px_rgba(0,119,181,0.4)] transition-all duration-500'
  },
  {
    name: 'Redis',
    // The Red Cube (Official)
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', 
    className: 'h-7 md:h-9 w-auto hover:drop-shadow-[0_0_15px_rgba(220,53,69,0.4)] transition-all duration-500'
  },
  {
    name: 'PostgreSQL',
    // Authentic shaded logo
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 
    className: 'hover:drop-shadow-[0_0_15px_rgba(65,105,225,0.4)] transition-all duration-500'
  }
];

export const Partners: React.FC = () => {
  // Quadruple the list for an even smoother infinite loop on wider screens
  // Optimization: useMemo to prevent array recreation on every render
  const MARQUEE_ITEMS = useMemo(() => [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS], []);

  // Browser Cache Optimization: Preload images as soon as component mounts
  useEffect(() => {
    PARTNERS.forEach((partner) => {
        const img = new Image();
        img.src = partner.logoUrl;
    });
  }, []);

  return (
    <section className="py-12 md:py-24 bg-[#050505] relative overflow-hidden z-20 select-none">
      
      {/* 1. Capsule Header - Floating above */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-10 text-center relative z-10" data-aos="fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel bg-black/50">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">
                Impulsionado por Líderes da Indústria
              </span>
          </div>
      </div>
      
      {/* 2. Marquee Container - Seamless (No borders, no background) */}
      <div className="w-full py-8 relative">
         {/* Side Fades to blend into background - crucial for seamless look */}
         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

         <div className="relative w-full overflow-hidden">
             <div className="flex w-max animate-marquee items-center group/marquee will-change-transform">
                {MARQUEE_ITEMS.map((partner, index) => (
                   <div 
                     key={`${partner.name}-${index}`}
                     className="flex items-center justify-center mx-8 md:mx-12 relative group cursor-pointer"
                   >
                     {/* Logo Container */}
                     <div className="flex items-center justify-center transform transition-transform duration-500 hover:scale-110">
                        <img 
                          src={partner.logoUrl} 
                          alt={partner.name}
                          className={`h-6 md:h-8 w-auto object-contain ${partner.className}`}
                          loading="eager" // Eager loading since we want them visible immediately in the animation
                        />
                     </div>
                   </div>
                ))}
             </div>
         </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        /* Pause on hover */
        .group\\/marquee:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};