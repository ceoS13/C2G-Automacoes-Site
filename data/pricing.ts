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
    subtitle: 'O "Concierge"',
    price: "R$ 599",
    description: "Foco: Produtividade individual. Sua secretária executiva digital.",
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
    subtitle: 'O "Filtro"',
    price: "R$ 1.499",
    description: "Foco: Tirar o peso do atendimento humano. A IA resolve o básico.",
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
    subtitle: 'O "Engajador"',
    price: "R$ 2.999",
    description: "Foco: Aquecer o lead e trazer de volta quem sumiu. Humanização.",
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
    subtitle: 'O "Closer Autônomo"',
    price: "R$ 4.999",
    description: "Foco: A IA executa o trabalho sujo. Ela qualifica, agenda ou fecha.",
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
  subtitle: 'O "ECOSSISTEMA"',
  description: "Para operações complexas que exigem integrações profundas (API de Estoque, Logística, Banco de Dados Legado).",
  features: [
    "Engenharia de Soluções Dedicada",
    "Integração SQL/NoSQL & ERPs",
    "SLA Garantido em Contrato",
    "Gerente de Sucesso (CS)"
  ],
  quote: "A infraestrutura robusta para escalar sem limites"
};