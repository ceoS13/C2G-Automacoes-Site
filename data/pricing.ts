export interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  benefit: string;
  highlight: boolean;
  delay: string;
  floatDelay: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'personal',
    title: "Personal",
    subtitle: 'Ísis Personal',
    price: "R$ 199",
    description: "Sua secretária executiva digital. Organize sua vida pelo WhatsApp.",
    features: [
      "Organização de Agenda (Google/Outlook)",
      "Resumo e Resposta de E-mails",
      "Pesquisas de Mercado e Notícias",
      "Anotações e Lembretes"
    ],
    benefit: "Ganhe 2 horas do seu dia de volta.",
    highlight: false,
    delay: "0",
    floatDelay: "0s"
  },
  {
    id: 'standard',
    title: "Standard",
    subtitle: 'Ísis Conversão',
    price: "R$ 499",
    description: "Tire o peso do atendimento humano. A IA resolve o básico 24/7.",
    features: [
      "Mensagens Ilimitadas (24/7)",
      "Tira-Dúvidas (RAG FAQ)",
      "Triagem Inicial de Leads"
    ],
    benefit: "Pare de responder perguntas repetitivas.",
    highlight: false,
    delay: "0",
    floatDelay: "1s"
  },
  {
    id: 'plus',
    title: "Plus",
    subtitle: 'Ísis Growth',
    price: "R$ 799",
    description: "Aqueça leads, recupere quem sumiu e prospecte decisores todos os dias.",
    features: [
      "Tudo do Standard",
      "Envio de Áudio Humano (PTT)",
      "Recuperação de Leads (Follow-up)",
      "Envio de Mídia/Catálogos"
    ],
    benefit: "Humanize o atendimento e recupere vendas perdidas.",
    highlight: false,
    delay: "100",
    floatDelay: "2s"
  },
  {
    id: 'pro',
    title: "Pro",
    subtitle: 'Ísis Closer',
    price: "R$ 999",
    description: "A IA executa o trabalho pesado. Qualifica, agenda e fecha sozinha.",
    features: [
      "Tudo do Plus",
      "Autonomia Executiva",
      "Gestão de CRM (Qualificação Automática)",
      "Memória de Longo Prazo (Vitalícia)",
      "RAG Técnico Avançado"
    ],
    benefit: "Um funcionário digital completo que organiza seu pipeline.",
    highlight: true,
    delay: "200",
    floatDelay: "1s"
  }
];

export const ENTERPRISE_PLAN = {
  title: "Enterprise",
  subtitle: 'Ísis Ops',
  description: "Todos os módulos do ecossistema com integrações profundas e engenharia dedicada sob medida.",
  features: [
    "Ecossistema Completo (5 módulos)",
    "Integração SQL/NoSQL & ERPs",
    "SLA Garantido em Contrato",
    "Gerente de Sucesso (CS)"
  ],
  quote: "A infraestrutura robusta para escalar sem limites."
};
