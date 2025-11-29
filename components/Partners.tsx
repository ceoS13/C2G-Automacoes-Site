import React from 'react';

// Official Brand Colors & SVG Paths
const PARTNERS = [
  {
    name: 'n8n',
    color: '#FF6D5A', // n8n Orange/Red
    viewBox: "0 0 24 24",
    path: (
      <>
        <path d="M12.9 20.1c0 1.2-1 2.2-2.2 2.2-1.2 0-2.2-1-2.2-2.2v-1.6l-2.6 1.5c-1.1.6-2.4.2-3-.9-.6-1.1-.2-2.4.9-3l1.4-.8v-3L3.8 11.5c-1.1-.6-1.5-2-.9-3 .6-1.1 2-1.5 3-.9l1.4.8V6.1c0-1.2 1-2.2 2.2-2.2 1.2 0 2.2 1 2.2 2.2v1.6l2.6-1.5c1.1-.6 2.4-.2 3 .9.6 1.1.2 2.4-.9 3l-1.4.8v3l1.4.8c1.1.6 1.5 2 .9 3-.6 1.1-2 1.5-3 .9l-1.4-.8v2.3z" />
        <circle cx="10.7" cy="6.1" r="1" />
        <circle cx="10.7" cy="18.5" r="1" />
        <circle cx="18" cy="14.3" r="1" />
        <circle cx="3.4" cy="14.3" r="1" />
      </>
    )
  },
  {
    name: 'Supabase',
    color: '#3ECF8E', // Supabase Green
    viewBox: "0 0 24 24",
    path: (
      <path d="M11.97 0C5.358 0 0 5.358 0 11.97c0 6.611 5.358 11.97 11.97 11.97 6.611 0 11.97-5.359 11.97-11.97C23.94 5.358 18.582 0 11.97 0zM17.48 8.657l-6.85 9.773c-.235.336-.78.083-.68-.318l1.446-5.817H6.554c-.456 0-.712-.527-.427-.878l6.85-8.433c.235-.336.78-.083.68.318l-1.446 4.314h3.84c.456 0 .713.527.428.878z" />
    )
  },
  {
    name: 'Meta Business',
    color: '#0668E1', // Meta Blue
    viewBox: "0 0 24 24",
    path: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.93 13.91c-1.74 0-2.34-1.29-3.23-3.21-.92 1.96-1.57 3.21-3.27 3.21-1.44 0-2.43-1.07-2.43-2.62 0-1.89 1.43-3.04 2.65-3.04 1.48 0 2.22 1.05 3.05 2.87.89-1.92 1.62-2.87 3.14-2.87 1.54 0 2.5 1.14 2.5 2.76 0 1.66-1.04 2.9-2.41 2.9z" />
    )
  },
  {
    name: 'Google Gemini',
    color: '#8E75B2', // Gemini Purple/Blue representation
    viewBox: "0 0 24 24",
    path: (
      <path d="M13.5 2.5c0 3.5 2.5 6 6 6-3.5 0-6 2.5-6 6 0-3.5-2.5-6-6-6 3.5 0 6-2.5 6-6zM13.5 14.5c0 1.5 1.5 2.5 3.5 2.5-2 0-3.5 1-3.5 2.5 0-1.5-1.5-2.5-3.5-2.5 2 0 3.5-1 3.5-2.5z" />
    )
  },
  {
    name: 'Redis',
    color: '#DC382D', // Redis Red
    viewBox: "0 0 24 24",
    path: (
      <path d="M20.2 7.7l-7.7-4.4c-.3-.2-.7-.2-1 0L3.8 7.7c-.3.2-.5.5-.5.9v8.8c0 .3.2.7.5.9l7.7 4.4c.3.2.7.2 1 0l7.7-4.4c.3-.2.5-.5.5-.9V8.6c0-.4-.2-.7-.5-.9zM12 20.3l-6.5-3.8V9l6.5 3.8v7.5zm0-8.6L5.5 7.9 12 4.2l6.5 3.7-6.5 3.8zm1 .9l6.5-3.8v7.6L13 20.3v-7.7z" />
    )
  },
  {
    name: 'PostgreSQL',
    color: '#336791', // Postgres Blue
    viewBox: "0 0 24 24",
    path: (
      <path d="M12.9 11.2c-.8.6-2.1.3-2.6-.7-.5-1 .5-2.2 1.6-2.1 1.2.1 1.7 1.6 1 2.8zM2.6 15.3c-1.5 2 1.5 5 1.5 5s2-5.4 6-5c-.9 1.4-.4 3 .8 2.6.3-.1.4.1.2.4-.9 1.4 1 3.1 2.5 2.4.4-.2.9-.8 1.4-.6 1.4.6.4 3.7 3.3 2.9.2-.1.4-.2.5-.4 0 .7 1.2.9 1.9.3 2.5-2 1.4-8.8-5.3-7.5-3.1.6-4.6 1.9-5.9.1-1.3-1.8-1-5.1-.3-6.6.7-1.4 1.2-3.2 4-3.5.7-.1 1.5-.2 2.2-.1 3.6.3 6.6 4.3 6 8.3-.3 1.9-2.1 3-3.9 3.1-1.9.1-4.8-.4-4.8-.4z" />
    )
  }
];

export const Partners: React.FC = () => {
  // Triple the list for smooth infinite looping
  const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="pt-8 pb-12 bg-[#050505] border-y border-white/5 relative overflow-hidden z-20 select-none">
      {/* 1. Static Title Block */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8 text-center relative z-10">
        <h3 
          className="text-[10px] md:text-xs font-mono text-cyan-900/80 font-bold uppercase tracking-[0.3em]"
          data-aos="fade-in"
        >
          Powered By Industry Leaders
        </h3>
      </div>
      
      {/* 2. Marquee Container */}
      <div className="relative w-full overflow-hidden mask-linear-fade">
         <div className="flex w-max animate-marquee items-center group/marquee">
            {MARQUEE_ITEMS.map((partner, index) => (
               <div 
                 key={`${partner.name}-${index}`}
                 className="flex items-center justify-center mx-10 md:mx-16 relative group cursor-pointer"
               >
                 <svg 
                   viewBox={partner.viewBox} 
                   className="w-8 h-8 md:w-10 md:h-10 transition-all duration-500 ease-out"
                   style={{
                     fill: partner.color,
                     // Default: Desaturated (40%) and slightly transparent
                     filter: 'saturate(40%) opacity(0.5)', 
                   }}
                   // Hover: Full saturation, full opacity, and brand colored glow
                   onMouseEnter={(e) => {
                     e.currentTarget.style.filter = `saturate(100%) opacity(1) drop-shadow(0 0 8px ${partner.color}60)`;
                     e.currentTarget.style.transform = 'scale(1.1)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.filter = 'saturate(40%) opacity(0.5)';
                     e.currentTarget.style.transform = 'scale(1)';
                   }}
                   aria-label={partner.name}
                 >
                   {partner.path}
                 </svg>
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
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
          will-change: transform;
        }
        /* Pause on hover if desired, though not strictly requested, it's good UX */
        .group\\/marquee:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
