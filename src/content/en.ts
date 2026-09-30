import type { Content } from "./types";

// Translation of az.ts (the source copy).
export const en: Content = {
  meta: {
    locale: "en",
    title: "Technology Resilience Cluster of Azerbaijan",
    description:
      "A cluster that brings together companies working on technologies that keep essential systems running safely and without interruption.",
  },
  ui: {
    skipToContent: "Skip to content",
    languageLabel: "Language",
    sectionsLabel: "Sections",
    org: "Innovation and Digital Development Agency",
    nav: [
      { id: "haqqinda", label: "About the cluster" },
      { id: "istiqametler", label: "Focus areas" },
      { id: "terefdaslar", label: "Anchor partners" },
      { id: "imkanlar", label: "Member benefits" },
      { id: "qosulma", label: "Joining" },
    ],
    backToTop: "Back to top",
  },
  hero: {
    title: "Technology Resilience Cluster of Azerbaijan",
    lead: "We bring together companies working on technologies that keep essential systems running safely and without interruption. The cluster supports developing local solutions, deploying them and exporting them to the region.",
    primary: { label: "Join the cluster", href: "#qosulma" },
    secondary: { label: "See the focus areas", href: "#istiqametler" },
    diagramLabel: "Cluster members connected around an anchor partner",
    legend: { anchor: "Anchor partner", members: "Cluster members" },
  },
  about: {
    kicker: "01 · About the cluster",
    title: "What the cluster is",
    lead: "The cluster brings Technopark residents, anchor partner companies and government bodies together around a shared goal: building solutions that protect critical infrastructure and taking them to foreign markets.",
    pillars: [
      {
        title: "Build on existing capabilities",
        body: "Azerbaijan's infrastructure, technical skills and international partnerships are the starting point.",
      },
      {
        title: "Build an ecosystem",
        body: "Cooperation between local and international companies, and simpler market access for foreign companies.",
      },
      {
        title: "Build knowledge and experience locally",
        body: "Set up the service, integration and deployment work of leading technology companies in Azerbaijan and develop local expertise.",
      },
      {
        title: "Export-ready solutions",
        body: "Integrated solutions delivered from Azerbaijan for markets in Central Asia, the Middle East and Africa.",
      },
    ],
  },
  domains: {
    kicker: "02 · Focus areas",
    title: "Focus areas",
    lead: "The cluster covers civilian resilience technologies.",
    items: [
      { id: "cyber", title: "Cybersecurity and digital trust", body: "Threat detection, identification, data protection, electronic signature" },
      { id: "comms", title: "Secure communications", body: "Mission-critical communications, network resilience, encryption" },
      { id: "data", title: "Data and information", body: "Data platforms, analytics, decision support" },
      { id: "ai", title: "Artificial intelligence", body: "AI-based analytics, automation and forecasting" },
      { id: "cloud", title: "Cloud technologies", body: "Resilient cloud infrastructure and digital services" },
      { id: "resilience", title: "Resilience solutions", body: "Real-time monitoring, early warning, service continuity" },
      { id: "space", title: "Space technologies", body: "Satellite communications, Earth observation, data services" },
      { id: "uav", title: "Unmanned aerial vehicles", body: "Civilian uses: inspection, monitoring, logistics" },
    ],
  },
  partners: {
    kicker: "03 · Anchor partners",
    title: "Anchor partners",
    lead: "The cluster works with large national companies and global technology companies as anchor partners.",
    roles: [
      {
        title: "National companies",
        sectors: "Telecommunications, space, energy and transport",
        body: "Provide real tasks and pilot projects.",
      },
      {
        title: "Global technology companies",
        body: "Bring technology, standards and certification.",
      },
    ],
    stepsTitle: "How cooperation works",
    steps: [
      { title: "Task", body: "The anchor partner defines a specific task that needs a solution." },
      { title: "Team", body: "A group of cluster members suited to the task is formed." },
      { title: "Pilot", body: "The solution is tested as a pilot project in a real environment." },
      { title: "Export", body: "The finished solution, now with a reference, goes to foreign markets." },
    ],
  },
  benefits: {
    kicker: "04 · Member benefits",
    title: "Opportunities for cluster members",
    lead: "The following opportunities are offered first to cluster members.",
    items: [
      { title: "Start on projects right away", body: "Direct access to anchor partners' tasks and pilot projects." },
      { title: "Export support", body: "Target market research, and support for sales and market entry." },
      {
        title: "International events",
        body: "Taking part in international conferences and the Azerbaijan national pavilion, and joining visits of government delegations.",
      },
      { title: "Networking and partnerships", body: "Contacts with investors, foreign partners and other cluster members." },
    ],
    note: "Export support and participation in international events are delivered through IDDA programs. In addition, cluster members that are Technopark residents use the incentives set by law.",
  },
  join: {
    kicker: "05 · Joining",
    title: "Who can join the cluster",
    criteria: [
      "Technopark residents whose work falls within one of the areas above",
      "Companies with their own product or technology are preferred",
      "An established technical team and readiness to take part in joint projects",
    ],
    box: {
      title: "Application",
      body: "Send an application to join the cluster or to cooperate as an anchor partner.",
      button: { label: "Send an application" },
    },
  },
  footer: {
    text: "Innovation and Digital Development Agency, Ministry of Digital Development and Transport, 2026",
  },
};
