/**
 * Where a piece of content comes from.
 * - "word": BCG website content draft (.docx)
 * - "deck": BCG presentation "Technology resilience cluster v4" (.pdf)
 * Items without a source appear in both.
 */
export type Source = "word" | "deck";

export type LogoRef = {
  /** File name in /public/logos (without extension). Omit for companies shown as text in the deck. */
  logo?: string;
  name: string;
  /** Marked with footnote 2 in the deck (Estonian strategic partnership). */
  estonian?: boolean;
  /** Extra footnote marker shown next to the logo (e.g. "*"). */
  mark?: string;
};

export type DomainStatus = "core" | "separate" | "crossCutting";

export type Content = {
  meta: { locale: string; title: string; description: string };
  ui: {
    skipToContent: string;
    sourcesOn: string;
    sourcesOff: string;
    deckOnly: string;
    wordOnly: string;
    languageLabel: string;
    nav: { id: string; label: string }[];
    backToTop: string;
    readMore: string;
    showLess: string;
    all: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    ambitionLabel: string;
    ambitionValue: string;
    ambitionCaption: string;
    tagline: string;
    stats: { value: string; label: string; source?: Source }[];
    date: string;
  };
  about: {
    kicker: string;
    title: string;
    lead: string;
    modelTitle: string;
    modelLead: string;
    commitments: {
      title: string;
      /** One-line summary shown by default; `body` and `bullets` sit behind "Read more". */
      short: string;
      body: string;
      bullets: string[];
    }[];
    deckBulletsLabel: string;
  };
  domains: {
    kicker: string;
    title: string;
    lead: string;
    statusLabels: Record<DomainStatus, string>;
    items: {
      id: string;
      title: string;
      description?: string;
      bullets: string[];
      status: DomainStatus;
      note?: string;
      source?: Source;
    }[];
    listNote: string;
    exclusion: { title: string; body: string };
  };
  why: {
    kicker: string;
    title: string;
    lead: string;
    reasons: {
      icon: "landmark" | "bridge" | "gavel";
      title: string;
      short: string;
      body: string;
      bullets: string[];
    }[];
    gateway: { title: string; center: string; nodes: string[]; caption: string };
  };
  incentives: {
    kicker: string;
    title: string;
    lead: string;
    tax: {
      title: string;
      headline: string;
      subline: string;
      intro: string;
      selectedExamples: string;
      hint: string;
      groups: {
        title: string;
        /** Big figure shown on the tile. */
        headline: { value: string; label: string };
        body: string;
        /** Sentence added to the Word copy from the deck (shown highlighted). */
        addition?: string;
        rows: { category: string; label: string; value: string; note?: string; source?: Source }[];
      }[];
    };
    exportSupport: {
      title: string;
      intro: string;
      builderHint: string;
      areas: {
        title: string;
        body: string;
        programs: { name: string; detail: string; amount?: string }[];
      }[];
    };
  };
  strategy: {
    kicker: string;
    title: string;
    lead: string;
    explorer: {
      title: string;
      hint: string;
      byDomain: string;
      byPool: string;
      showing: string;
      multiDomain: string;
    };
    criteria: {
      kicker: string;
      title: string;
      duplicateNote: string;
      columns: {
        title: string;
        tone: "blue" | "green";
        items: { icon: string; title: string; body: string }[];
      }[];
    };
    candidates: {
      kicker: string;
      title: string;
      domains: { title: string; companies: LogoRef[] }[];
      footnotes: string[];
    };
    pools: {
      kicker: string;
      title: string;
      pools: { title: string; tone: string; companies: LogoRef[] }[];
      chainTitle: string;
      chain: { icon: string; label: string }[];
      footnote: string;
    };
    pathway1: {
      kicker: string;
      title: string;
      subtitle: string;
      headers: {
        company: string;
        domain: string;
        exit: string;
        footprint: string;
        fit: string;
        value: string;
        current: string;
      };
      rows: {
        company: LogoRef;
        domain: string;
        exit: string;
        footprint: string;
        fit: string[];
        value: string[];
        current: string;
        currentTone: "green" | "blue";
      }[];
    };
    pathway2: {
      kicker: string;
      title: string;
      subtitle: string;
      headers: { company: string; domain: string; projects: string; fit: string };
      rows: {
        company: LogoRef[];
        domain: string;
        projects: string[];
        fit: string[];
        flag?: string;
      }[];
    };
  };
  charts: {
    framing: {
      title: string;
      word: { label: string; value: string; caption: string };
      deck: { label: string; value: string; caption: string };
      coreLabel: string;
      extraLabel: string;
    };
    candidates: { title: string; short: string; subtitle: string; unit: string; notMapped: string };
    deductions: { title: string; subtitle: string; baseline: string; rows: { label: string; value: number }[] };
    royalty: { title: string; exempt: string; taxed: string; effective: string };
    exportFunding: { title: string; subtitle: string; research: string; sales: string; total: string };
    pools: { title: string; unit: string };
    exits: {
      title: string;
      subtitle: string;
      exact: string;
      yearOnly: string;
    };
  };
  footer: {
    prepared: string;
    sources: string;
  };
};
