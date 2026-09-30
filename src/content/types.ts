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
  form: ApplicationFormText;
  footer: { text: string };
};

export type ApplicationFormText = {
  kicker: string;
  title: string;
  lead: string;
  requiredNote: string;
  groups: { type: string; company: string; activity: string; contact: string };
  fields: {
    type: { label: string; options: { value: "member" | "anchor"; label: string }[] };
    company: string;
    taxId: string;
    website: string;
    websiteHint: string;
    resident: { label: string; options: { value: "yes" | "no" | "applying"; label: string }[] };
    domains: string;
    domainsHint: string;
    product: string;
    productHint: string;
    teamSize: { label: string; placeholder: string; options: string[] };
    name: string;
    role: string;
    email: string;
    phone: string;
    message: string;
    consent: string;
  };
  optional: string;
  submit: string;
  submitting: string;
  errors: {
    summary: string;
    required: string;
    email: string;
    domains: string;
    url: string;
    tooLong: string;
    consent: string;
    failed: string;
  };
  success: { title: string; body: string; again: string };
};
