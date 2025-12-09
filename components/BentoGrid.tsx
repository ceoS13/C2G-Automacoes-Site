import React from 'react';
import { 
  BrainCircuit, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Server, 
  Users
} from 'lucide-react';
import { DashboardCard } from './ui/DashboardCard';

// Importing extracted widgets
import { IsisAnalysisWidget } from './widgets/IsisAnalysisWidget';
import { GrowthWidget } from './widgets/GrowthWidget';
import { SecurityWidget } from './widgets/SecurityWidget';
import { ServerWidget } from './widgets/ServerWidget';
import { TeamWidget } from './widgets/TeamWidget';
import { UptimeWidget } from './widgets/UptimeWidget';
import { AnalyticsWidget } from './widgets/AnalyticsWidget';

export const BentoGrid: React.FC = () => {
  return (
    <section id="system" className="py-16 md:py-32 bg-[#050505] relative overflow-hidden">
       {/* Seamless Radial Gradient Background */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,78,99,0.15)_0%,transparent_70%)] pointer-events-none z-0" aria-hidden="true" />
      
       {/* Feathering Gradients */}
       <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />
       <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6" data-aos="fade-up">
          <div>
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel mb-6 bg-black/50" role="status">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Monitoramento: Online</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                O Sistema Operacional da Sua Empresa
            </h2>
            <p className="text-zinc-400 max-w-xl text-lg">
                Tenha visão total da eficiência e do lucro gerado pela sua operação autônoma em tempo real.
            </p>
          </div>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 h-auto md:h-[800px]">
          
          <DashboardCard 
            title="Conversão de Vendas" 
            icon={<BrainCircuit size={16}/>} 
            className="md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-0"
            delay="0"
            floatDelay="0s"
          >
             <IsisAnalysisWidget />
          </DashboardCard>

          <DashboardCard 
            title="Máquina de Receita" 
            icon={<Zap size={16}/>} 
            className="md:col-span-1 md:row-span-2"
            delay="100"
            floatDelay="2.5s"
          >
            <GrowthWidget />
          </DashboardCard>

          <DashboardCard 
            title="Segurança & Compliance" 
            icon={<ShieldCheck size={16}/>} 
            className="md:col-span-1 md:row-span-1"
            headerAction={<div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
            delay="200"
            floatDelay="1s"
          >
            <SecurityWidget />
          </DashboardCard>
          
           <DashboardCard 
            title="Performance Operacional" 
            icon={<Server size={16}/>} 
            className="md:col-span-1 md:row-span-1"
            delay="300"
            floatDelay="3.5s"
          >
            <ServerWidget />
          </DashboardCard>

          <DashboardCard 
            title="Equipe Digital Ativa" 
            icon={<Users size={16}/>} 
            className="md:col-span-2 md:row-span-1"
            delay="400"
            floatDelay="1.5s"
          >
            <div className="h-full grid grid-cols-2">
                <TeamWidget />
                <UptimeWidget />
            </div>
          </DashboardCard>

          <DashboardCard 
            title="Retorno Sobre Investimento (ROI)" 
            icon={<Activity size={16}/>} 
            className="md:col-span-2 md:row-span-1"
            delay="500"
            floatDelay="0.5s"
          >
            <AnalyticsWidget />
          </DashboardCard>
          
        </div>
      </div>
    </section>
  );
};