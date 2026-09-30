/** Page content. Both locales (az, en) share this shape. */
export type Content = {
  meta: { locale: string; title: string; description: string };
  ui: {
    skipToContent: string;
    languageLabel: string;
    sectionsLabel: string;
    /** Organisation shown in the header next to the ministry logo. */
    org: string;
    nav: { id: string; label: string }[];
    backToTop: string;
  };
  hero: {
    title: string;
    lead: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
    diagramLabel: string;
    legend: { anchor: string; members: string };
  };
  about: {
    kicker: string;
    title: string;
    lead: string;
    pillars: { title: string; body: string }[];
  };
  domains: {
    kicker: string;
    title: string;
    lead: string;
    items: { id: string; title: string; body: string }[];
  };
  partners: {
    kicker: string;
    title: string;
    lead: string;
    roles: { title: string; sectors?: string; body: string }[];
    stepsTitle: string;
    steps: { title: string; body: string }[];
  };
  benefits: {
    kicker: string;
    title: string;
    lead: string;
    items: { title: string; body: string }[];
    note: string;
  };
  join: {
    kicker: string;
    title: string;
    criteria: string[];
    box: {
      title: string;
      body: string;
      /** Rendered only when `href` is set (no application link has been provided yet). */
      button: { label: string; href?: string };
    };
  };
  footer: { text: string };
};
