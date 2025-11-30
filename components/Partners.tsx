import React from 'react';

// Using stable CDN (SimpleIcons/Devicon) to ensure logos load correctly
const PARTNERS = [
  {
    name: 'OpenAI',
    logoUrl: 'https://cdn.simpleicons.org/openai/ffffff', // White logo for dark bg
    className: 'opacity-100 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300'
  },
  {
    name: 'n8n',
    logoUrl: 'https://cdn.simpleicons.org/n8n/ff6584', // Official Red/Pink
    className: 'opacity-100 hover:drop-shadow-[0_0_15px_rgba(255,101,132,0.4)] transition-all duration-300'
  },
  {
    name: 'Supabase',
    logoUrl: 'https://cdn.simpleicons.org/supabase/3ecf8e', // Official Green
    className: 'opacity-100 hover:drop-shadow-[0_0_15px_rgba(62,207,142,0.4)] transition-all duration-300'
  },
  {
    name: 'Google Gemini',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
    className: 'invert opacity-100 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300'
  },
  {
    name: 'Redis',
    // The Red Cube (Official)
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', 
    className: 'h-7 md:h-9 w-auto opacity-100 hover:drop-shadow-[0_0_15px_rgba(220,53,69,0.4)] transition-all duration-300'
  },
  {
    name: 'PostgreSQL',
    // Authentic shaded logo
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 
    className: 'opacity-100 hover:drop-shadow-[0_0_15px_rgba(65,105,225,0.4)] transition-all duration-300'
  }
];

export const Partners: React.FC = () => {
  // Quadruple the list for an even smoother infinite loop on wider screens
  const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="py-8 md:py-10 bg-[#050505] border-y border-white/5 relative overflow-hidden z-20 select-none">
      
      {/* Subtle Spotlight Background - Central "Stage" Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[150%] bg-cyan-900/10 blur-[60px] rounded-full pointer-events-none mix-blend-screen" />

      {/* 1. Capsule Header (Compact & Close to Logos) */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-6 text-center relative z-10" data-aos="fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0a0a] border border-white/10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)] group hover:border-cyan-500/20 transition-colors">
           <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.8)]"></span>
            </span>
            <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest group-hover:text-zinc-300 transition-colors">
              Impulsionado por Líderes da Indústria
            </span>
        </div>
      </div>
      
      {/* 2. Marquee Container (Tight & Clean) */}
      <div className="relative w-full overflow-hidden mask-linear-fade">
         <div className="flex w-max animate-marquee items-center group/marquee">
            {MARQUEE_ITEMS.map((partner, index) => (
               <div 
                 key={`${partner.name}-${index}`}
                 className="flex items-center justify-center mx-8 md:mx-12 relative group cursor-pointer transition-all duration-500"
               >
                 {/* Logo Container */}
                 <div className="flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                    <img 
                      src={partner.logoUrl} 
                      alt={partner.name}
                      className={`h-6 md:h-8 w-auto object-contain ${partner.className}`}
                      loading="lazy"
                    />
                 </div>
               </div>
            ))}
         </div>
      </div>
      
      <style>{`
        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
        /* Pause on hover */
        .group\\/marquee:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};