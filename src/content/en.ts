import { C, candidatesByDomain, pools } from "./companies";
import type { Content } from "./types";

export const en: Content = {
  meta: {
    locale: "en",
    title: "Technology Resilience Cluster of Azerbaijan",
    description:
      "Internal team briefing: the Technology Resilience Cluster of Azerbaijan — model, focus domains, incentives and anchor company strategy (based on BCG materials, September 2026).",
  },
  ui: {
    skipToContent: "Skip to content",
    internalBadge: "Internal",
    internalNotice: "Internal working material — not for public distribution",
    sourcesOn: "Source marks: on",
    sourcesOff: "Source marks: off",
    deckOnly: "Deck only",
    wordOnly: "Word only",
    sourceLegend:
      "Content merges the BCG website draft (Word) and the BCG presentation (deck). Items found only in one source are marked.",
    languageLabel: "Language",
    nav: [
      { id: "about", label: "About" },
      { id: "domains", label: "Focus domains" },
      { id: "why-azerbaijan", label: "Why Azerbaijan" },
      { id: "incentives", label: "Incentives" },
      { id: "strategy", label: "Anchor strategy" },
      { id: "review", label: "Review notes" },
    ],
    sectionPublic: "Cluster narrative",
    sectionInternal: "Internal strategy",
    backToTop: "Back to top",
  },
  hero: {
    eyebrow: "Resilience cluster company landing",
    title: "Technology Resilience Cluster of Azerbaijan",
    lead:
      "Azerbaijan is positioning the Resilience Cluster as a core platform to attract and localize technologies that strengthen the security and continuity of essential systems, while enabling these solutions to scale and compete in export markets.",
    ambitionLabel: "Clear national ambition",
    ambitionValue: "$1B",
    ambitionCaption: "ICT export",
    tagline: "Azerbaijan aims to attract, scale and export solutions",
    stats: [
      { value: "4", label: "connected commitments" },
      { value: "4 + 2", label: "core domains + enabling domains", source: "deck" },
      { value: "0%", label: "long-term profit tax for qualifying tech activities" },
      { value: "$20K / $50K", label: "annual export research grant / sales hire support" },
    ],
    date: "BCG materials · September 2026",
  },
  about: {
    kicker: "01 · About the cluster",
    title: "What the cluster is",
    lead:
      "Azerbaijan is positioning the Resilience Cluster as a core platform to attract and localize technologies that strengthen the security and continuity of essential systems, while enabling these solutions to scale and compete in export markets.",
    modelTitle: "How the model works",
    modelLead: "The cluster runs on four connected commitments.",
    deckBulletsLabel: "From the deck",
    commitments: [
      {
        title: "Build on existing strengths",
        body:
          "The cluster builds on Azerbaijan's infrastructure, its established technical capabilities, and its international partnerships with other technology clusters and providers.",
        bullets: [
          "Leverage Azerbaijan's infrastructure, capabilities and international partnerships with other ecosystems/tech providers",
        ],
      },
      {
        title: "Enable the ecosystem",
        body:
          "The cluster provides international players with a soft-landing platform, offering a streamlined route into the market without requiring companies to navigate entity setup, partner identification, and regulatory requirements independently.",
        bullets: [
          "Provide a soft-landing platform for international players",
          "Foster collaboration between local and global companies",
        ],
      },
      {
        title: "Attract and localize",
        body:
          "The cluster attracts leading resilience technology providers and supports the localization of selected parts of their value chain in Azerbaijan, particularly services, integration, and deployment, while building local capabilities and expertise.",
        bullets: [
          "Attract leading resilience technology providers",
          "Localize selected parts of their value chain (services, integration, deployment)",
          "Build local capabilities and expertise",
        ],
      },
      {
        title: "Develop the export model",
        body:
          "The end state is a portfolio of integrated, export-ready solutions delivered from Azerbaijan, with selected value-chain activities serving customers abroad. Priority markets include Central Asia, the Middle East, Africa, and adjacent regions.",
        bullets: [
          "Create integrated, export-ready solutions performing selected parts of the value chain",
          "Priority focus on Central Asia, Middle East & Africa and adjacent markets",
        ],
      },
    ],
  },
  domains: {
    kicker: "02 · Focus domains",
    title: "Civilian and dual-use resilience technologies",
    lead:
      "The Resilience Cluster focuses on civilian and dual-use resilience technologies. Four core technology domains are covered.",
    deckTitle:
      "The two sources frame the domains differently: the Word draft names four core domains, while the deck names six priority domains — the same four core domains plus civilian autonomous & UAV systems (covered separately) and data & AI (a cross-cutting enabler). Both framings are shown below.",
    statusLabels: {
      core: "Core domain",
      separate: "Covered separately",
      crossCutting: "Cross-cutting enabler",
    },
    items: [
      {
        id: "cyber",
        title: "Cybersecurity and digital trust",
        description: "Protecting the networks, systems and data that critical services depend on",
        bullets: ["Threat detection and response", "Identity and access management", "Data protection"],
        status: "core",
      },
      {
        id: "comms",
        title: "Secure communications",
        description:
          "Keeping communication available and protected when primary infrastructure is degraded or contested",
        bullets: ["Mission-critical communications", "Network resilience", "Encryption and secure data exchange"],
        status: "core",
      },
      {
        id: "awareness",
        title: "Situation awareness and monitoring",
        description:
          "Giving civilian operators an accurate, current picture of what is happening across assets, infrastructure and territory",
        bullets: ["Real-time monitoring systems", "Command and control, civilian", "Remote sensing and alerting"],
        status: "core",
      },
      {
        id: "space",
        title: "Space-enabled solutions",
        description: "Using space infrastructure to deliver connectivity, observation and data services on the ground",
        bullets: ["Satellite communications", "Earth observation", "Data and connectivity services"],
        status: "core",
      },
      {
        id: "uav",
        title: "Autonomous and UAV systems (civilian)",
        bullets: ["Inspection and monitoring", "Logistics and infrastructure support"],
        status: "separate",
        note: "Covered separately",
        source: "deck",
      },
      {
        id: "data-ai",
        title: "Data and AI-enabled resilience",
        bullets: ["Data platforms", "AI-driven analytics", "Decision support systems"],
        status: "crossCutting",
        note: "Cross-cutting enabling capabilities rather than a distinct end-use domain",
        source: "deck",
      },
    ],
    listNote: "Lists are indicative — each domain ends with “…” in the deck.",
    exclusion: {
      title: "Out of scope",
      body:
        "The cluster won't include military-grade solutions, e.g. weapons systems, kinetic military platforms, offensive cyber capabilities.",
    },
  },
  why: {
    kicker: "03 · Why Azerbaijan",
    title: "A compelling platform for scaling resilience solutions",
    lead: "Azerbaijan is a compelling platform for scaling resilience solutions for the following reasons.",
    reasons: [
      {
        icon: "landmark",
        title: "A state-backed resilience agenda",
        body:
          "Resilience technology is a national-level priority in Azerbaijan, with local state-backed demand, supported by national priorities across public infrastructure and services.",
        bullets: [
          "Resilience technology cluster is a national-level priority with local state-backed demand",
          "Long-term plans to build an export-oriented technology ecosystem with significant state backing",
        ],
      },
      {
        icon: "bridge",
        title: "A trusted regional gateway with no political affiliation",
        body:
          "Azerbaijan's strategic geographic location connects Europe, Central Asia, the Middle East, Africa and beyond, which puts a large share of the addressable resilience market within regional reach of a single base. The country maintains balanced, friendly and politically independent relations with all its neighbors and with countries across the region.",
        bullets: [
          "Strategic geographic location connecting Europe, Central Asia, Middle East, Africa and beyond",
          "Balanced, friendly, politically independent relations with all neighbors and countries in the region",
        ],
      },
      {
        icon: "gavel",
        title: "An ongoing economic reform agenda",
        body:
          "Azerbaijan is advancing a broader transformation agenda to improve the ease of doing business and strengthen investor confidence. Further regulatory reforms are planned to simplify business operations and reduce barriers to market entry and growth.",
        bullets: [
          "Ongoing transformation agenda focused on improving ease of doing business and boosting investor confidence",
          "Regulatory changes on the way aimed at improving the transparency of the market",
        ],
      },
    ],
  },
  incentives: {
    kicker: "04 · Incentives and benefits",
    title: "A defined support package for cluster members",
    lead:
      "Membership in the Resilience Cluster provides access to a defined support package, including fiscal incentives, export development programs, and assistance with market entry and establishing operations in Azerbaijan.",
    tax: {
      title: "4.1 A tax and regulatory framework built for technology companies",
      headline:
        "To support development of the resilience cluster, Azerbaijan is currently implementing the most comprehensive economic reform in the post-Soviet space",
      subline:
        "This reform combines Estonia's governance architecture, the UAE's zero-tax fiscal stack, and Singapore's IP precision into a single legislative cycle, and positions Azerbaijan to leapfrog every regional peer on the tax and regulatory axis.",
      intro:
        "Azerbaijan is implementing a wide-ranging economic reform designed to make the country a competitive base for technology businesses:",
      selectedExamples: "Selected examples",
      groups: [
        {
          title: "Profits and dividends",
          body:
            "Long-term zero-rate profit tax for qualifying activities including AI, digital and cybersecurity, and a zero rate on dividends in the innovation sector.",
          addition:
            "Export condition: to qualify for the zero rate, income must be received into bank accounts in Azerbaijan (bank inflow condition).",
          rows: [
            { category: "Corporate & digital taxation", label: "Profit tax", value: "0% (long-term)", note: "Applies to AI, digital, cybersecurity activities" },
            { category: "Corporate & digital taxation", label: "Export condition", value: "Bank inflow condition", note: "Income must enter AZ accounts", source: "deck" },
            { category: "Dividends", label: "Dividend tax", value: "0%", note: "Applies to innovation sector" },
          ],
        },
        {
          title: "People",
          body:
            "A twenty-year zero rate on personal income tax for ICT specialists, covering foreign experts, returning residents and R&D staff.",
          rows: [
            { category: "Personal income tax", label: "ICT specialists", value: "0% (20 years)", note: "Applies to foreign experts, returning residents, R&D staff" },
          ],
        },
        {
          title: "Investment and R&D",
          body:
            "Full deductibility of qualifying investment, and a super deduction for R&D spending that covers salaries, materials and testing, including projects that do not succeed.",
          rows: [
            { category: "Investment deductions", label: "Investment deduction", value: "100% (<50%)", note: "Deductible from income/profit", source: "deck" },
            { category: "R&D incentives", label: "Deduction", value: "250% (super deduction)", note: "Including salaries, materials, testing", source: "deck" },
            { category: "R&D incentives", label: "Failed R&D", value: "Deductible", note: "Includes unsuccessful projects" },
          ],
        },
        {
          title: "Intellectual property",
          body:
            "Royalty income is largely exempt, bringing the effective rate on qualifying IP income close to one percent.",
          rows: [
            { category: "IP / technology income", label: "Royalty income", value: "95% exempt", note: "Only 5% taxed → ~1% effective" },
          ],
        },
        {
          title: "Imports",
          body:
            "Technology imports and services are exempt from VAT, and equipment imports are exempt from customs duty.",
          rows: [
            { category: "VAT / customs", label: "VAT", value: "0%", note: "Tech imports & services exempt" },
            { category: "VAT / customs", label: "Customs", value: "0%", note: "Equipment imports exempt" },
          ],
        },
        {
          title: "Remote setup",
          body:
            "Company registration, digital identity and bank account onboarding are all completed remotely, so a company can be established and operating in Azerbaijan without travelling to do it.",
          rows: [
            { category: "Soft landing", label: "Digital ID – Virtual FIN", value: "Remote" },
            { category: "Soft landing", label: "Company registration", value: "Remote" },
            { category: "Soft landing", label: "Bank account", value: "Digital onboarding" },
          ],
        },
      ],
    },
    exportSupport: {
      title: "4.2 Export support programs",
      intro:
        "In order to accelerate the growth of cluster members, dedicated export support programs are being developed across four areas:",
      deckIntro:
        "In order to accelerate growth of each and every member of the Cluster, dedicated export support programs are being developed.",
      areas: [
        {
          title: "Target market support",
          body:
            "Members can access a grant of up to $20,000 per company annually for compiling target market research, used to evaluate the export potential of a specific market before committing to it. Once a market is chosen, financial support of up to $50,000 annually goes toward hiring a dedicated salesperson for that market, together with training for the sales personnel.",
          programs: [
            {
              name: "Target market research",
              amount: "≤ $20,000 / year",
              detail:
                "Target market research max $20,000 per one company annually. Grant is allocated for compiling a target market research to evaluate the potential export market for the company.",
            },
            {
              name: "Target market sales support",
              amount: "≤ $50,000 / year",
              detail:
                "Financial support in hiring a dedicated target market salesperson up to $50,000 annually and training the sales personnel.",
            },
          ],
        },
        {
          title: "International networking",
          body:
            "Azerbaijan maintains a national booth at major regional conferences and global industry events, enabling members to exhibit without bearing the full cost of a standalone presence. In addition, travel and participation costs for selected industry-leading conferences are reimbursed, helping members build relationships, develop commercial opportunities, and convert them into contracts.",
          programs: [
            { name: "International fairs", detail: "Azerbaijan booth in major regional conferences and global industry events." },
            {
              name: "Participation in conferences",
              detail:
                "Compensating trips and tickets to industry-leading conferences to support networking and export contract signing.",
            },
          ],
        },
        {
          title: "Marketing and promotion",
          body:
            "Azerbaijani embassies support member companies as active market-development partners, facilitating relevant introductions and meetings in priority markets. In parallel, IDDA and the Ministry work to strengthen the visibility of both Azerbaijan and cluster companies across target geographies.",
          programs: [
            {
              name: "Embassy networking",
              detail:
                "Embassies will become proactive sales representatives for companies, organizing meaningful meetings in destination countries.",
            },
            {
              name: "Targeted media outreach",
              detail:
                "The cluster will support, through IDDA and the Ministry, the visibility of Azerbaijan and cluster companies in target markets.",
            },
          ],
        },
        {
          title: "Government sales",
          body:
            "Members benefit from both inbound and outbound government-led networking, including engagement with foreign delegations visiting Azerbaijan and participation in selected international missions led by IDDA and the Minister.",
          programs: [
            {
              name: "Government road-trips",
              detail:
                "Cluster members will be invited to inbound and outbound government networking (meeting delegations visiting Azerbaijan and joining foreign trips of IDDA and the Minister).",
            },
          ],
        },
      ],
    },
  },
  strategy: {
    kicker: "05 · Anchor company strategy",
    title: "Attracting anchor companies",
    lead:
      "BCG working material on which companies could anchor the cluster, how they are prioritized, and two pathways toward localization in Azerbaijan. Appears in the deck only.",
    criteria: {
      kicker: "Prioritization",
      title:
        "Anchor companies should be prioritized where strategic value to Azerbaijan intersects with a credible path to localization",
      duplicateNote: "Shown on deck slides 7 and 10 (identical content).",
      columns: [
        {
          title: "Strategic attractiveness to Azerbaijan",
          tone: "blue",
          items: [
            { icon: "cog", title: "Domain fit", body: "Fit with resilience technology domains (cyber, communications, monitoring, UAV, space, data/AI)" },
            { icon: "chart", title: "Sector relevance", body: "Relevance to priority deployment sectors (e.g. transport & logistics, digital & connectivity)" },
            { icon: "network", title: "Anchor / ecosystem effect", body: "Potential to attract suppliers, talent, innovation and additional investment" },
            { icon: "globe", title: "Regional export potential", body: "Ability to serve markets beyond Azerbaijan (Central Asia, Middle East, Africa)" },
            { icon: "cloud", title: "Scale and credibility", body: "Global player with proven technology, financial strength and long-term commitment" },
          ],
        },
        {
          title: "Localization feasibility",
          tone: "green",
          items: [
            { icon: "pin", title: "Localization depth", body: "Scope to localize meaningful activities (engineering, integration, deployment, assembly, R&D)" },
            { icon: "hub", title: "New regional hub rationale", body: "Strategic logic to establish a new regional hub in Azerbaijan (e.g., post-Russia, coverage of new markets)" },
            { icon: "handshake", title: "Ongoing talks", body: "Already established relationship/operations with local companies" },
            { icon: "shield", title: "Geopolitical feasibility", body: "Acceptable geopolitical and regulatory conditions (export controls, approvals, alignment)" },
          ],
        },
      ],
    },
    candidates: {
      kicker: "Strategic fit",
      title:
        "A preliminary list of candidate companies¹ was identified across each key domain with the potential to anchor in the Azerbaijan technology resilience cluster",
      domains: [
        { title: "Cybersecurity & digital trust", companies: candidatesByDomain[0] },
        { title: "Secure communications", companies: candidatesByDomain[1] },
        { title: "Situation awareness & monitoring", companies: candidatesByDomain[2] },
        { title: "Space-enabled solutions", companies: candidatesByDomain[3] },
      ],
      footnotes: [
        "1. Preliminary universe includes companies based on global scale, category leadership and proven mission-critical deployments",
        "2. Estonian companies included separately based on strategic partnership considerations",
      ],
    },
    pools: {
      kicker: "Strategic fit",
      title:
        "Potential anchor companies can be sourced from five priority pools, including global players and companies already engaged with Azerbaijan",
      pools: [
        { title: "Global industrial-tech leaders", tone: "navy", companies: pools[0] },
        { title: "Israeli defense-tech players", tone: "green", companies: pools[1] },
        { title: "Potential Chinese players", tone: "blue", companies: pools[2] },
        { title: "Players engaged in AZ negotiations/tenders", tone: "ink", companies: pools[3] },
        { title: "Cyber-players", tone: "gray", companies: pools[4] },
      ],
      chainTitle:
        "Potential anchors are attracted from priority company pools and localized across selected parts of the value chain",
      chain: [
        { icon: "blueprint", label: "Local engineering & integration" },
        { icon: "monitor", label: "Services / SOC / monitoring" },
        { icon: "wrench", label: "Deployment & maintenance" },
        { icon: "certificate", label: "Training & certification" },
        { icon: "tools", label: "Selected assembly / testing" },
        { icon: "ship", label: "Regional export hub" },
      ],
      footnote: "* Schneider Electric operates a Turkey & Central Asia cluster headed from Istanbul",
    },
    pathway1: {
      kicker: "Pathway 1 localization",
      title:
        "Companies with a regional-footprint gap represent an opportunity for Azerbaijan to position itself as a new operating hub",
      subtitle: "These companies may now have an unmet regional operating need that Azerbaijan could address",
      headers: {
        company: "Company",
        domain: "Domain",
        exit: "Russia exit",
        footprint: "Regional footprint",
        fit: "Resilience cluster fit",
        value: "Value proposition for landing in AZE",
        current: "Current footprint in AZE",
      },
      rows: [
        {
          company: C.honeywell,
          domain: "Cybersecurity & digital trust",
          exit: "Jun-22",
          footprint: "Regional hub in KZ proposed by gov., no updates",
          fit: [
            "OT asset discovery & inventory",
            "Industrial network / intrusion monitoring",
            "24/7 OT SOC & incident response",
            "Vulnerability management, segmentation & compliance",
          ],
          value: ["Existing SOCAR reference base", "Potential to localize OT SOC / security services"],
          current: "Local office + engineering/service",
          currentTone: "green",
        },
        {
          company: C.emerson,
          domain: "Situation awareness & monitoring",
          exit: "Mar-23",
          footprint: "No clear hub in region",
          fit: [
            "Process control & SCADA – DeltaV / Ovation",
            "Machinery & asset-health monitoring",
            "Predictive condition monitoring / early-warning analytics",
            "Remote monitoring of power, water and industrial assets",
          ],
          value: ["Active AZE project base (e.g. Shah Deniz project)", "Anchors engineering scale-up"],
          current: "Local office + project delivery",
          currentTone: "green",
        },
        {
          company: C.abb,
          domain: "Situation awareness & monitoring",
          exit: "Jul-22",
          footprint: "Istanbul HQ covering Central Asia",
          fit: [
            "Asset-performance management – ABB Ability Genix APM",
            "Real-time equipment condition monitoring",
            "Predictive maintenance & failure detection",
            "Fleet / infrastructure health dashboards and alerts",
          ],
          value: ["Office & installed base", "Base for automation hub", "Active electrification anchor"],
          current: "Local office + lifecycle services",
          currentTone: "green",
        },
        {
          company: C.siemens,
          domain: "Data, cloud & AI",
          exit: "2022",
          footprint: "No post-Russia hub, strong pre-existing KZ base",
          fit: [
            "OT asset discovery & intrusion detection",
            "Industrial automation / control-system monitoring",
            "Rail and infrastructure condition monitoring",
            "Predictive maintenance & operational analytics",
          ],
          value: [
            "Proven CII reference base",
            "Path to deeper engineering",
            "Cross-sector resilience pipeline (power, metro, smart infra.)",
          ],
          current: "Representative / channel-led",
          currentTone: "blue",
        },
        {
          company: C.nokia,
          domain: "Secure communication",
          exit: "2023",
          footprint: "No clear hub in region",
          fit: [
            "Mission-critical private 4G/5G networks",
            "Secure voice, video & data communications / MCX",
            "Resilient connectivity for utilities, rail and public safety",
            "Command-center, field-device & industrial-OT connectivity",
          ],
          value: ["Existing anchor customer & deployment", "Expansion into critical enterprise connectivity"],
          current: "Local office + network deployment",
          currentTone: "green",
        },
      ],
    },
    pathway2: {
      kicker: "Pathway 2 localization",
      title:
        "For companies already active in Azerbaijan, existing projects can provide a lower-friction pathway toward deeper localization",
      subtitle: "These companies already possess relationship and reference base, leading to lower perceived entry risk",
      headers: {
        company: "Company",
        domain: "Domain",
        projects: "Projects / tenders involved",
        fit: "Resilience cluster fit",
      },
      rows: [
        {
          company: [C.radware],
          domain: "Cybersecurity & digital trust",
          projects: [
            "Radware deployed in AzInTelecom data center",
            "Multiple SOFAZ tenders for extension of existing security licenses",
          ],
          fit: ["DDoS and application protection", "Resilience of GovCloud / public digital services"],
        },
        {
          company: [C.crowdstrike],
          domain: "Cybersecurity & digital trust",
          projects: [
            "Involvement in National Cybersecurity Forum, roundtables with government officials, and other events",
          ],
          fit: ["Threat detection & response", "Identity & access management"],
          flag:
            "Corrected: the deck repeated the IAI row here (Earth observation / satellites). Replaced with the matching cybersecurity capabilities from deck slide 3 — to be confirmed by BCG.",
        },
        {
          company: [C.google, C.mandiant],
          domain: "Data, cloud & AI",
          projects: [
            "2025 MDDT–Google discussions on cloud, innovation labs and skills",
            "No Mandiant-specific AZE project publicly identified",
          ],
          fit: ["Cyber incident response & threat intelligence", "Critical-infrastructure cyber readiness"],
        },
        {
          company: [C.microsoft],
          domain: "Data, cloud & AI",
          projects: [
            "Government software licensing via AzInTelecom",
            "Supported PKI / e-signature infrastructure and IoT lab cooperation",
          ],
          fit: ["Digital identity & trusted e-government", "Government / critical-infrastructure cyber protection"],
        },
        {
          company: [C.iai],
          domain: "Space-enabled solutions",
          projects: ["Azersky-2 program with Azercosmos", "Technology transfer; second satellite planned for local build"],
          fit: ["Sovereign EO & monitoring capability", "Local satellite engineering, assembly and skills transfer"],
        },
        {
          company: [C.spacex],
          domain: "Space-enabled solutions",
          projects: [
            "2023 Azercosmos–SpaceX agreement for Starlink resale",
            "Starlink tested for government, transport, maritime and remote-site use",
          ],
          fit: ["Resilient satellite connectivity", "Backup communications for critical infrastructure"],
        },
        {
          company: [C.thales],
          domain: "Situation awareness & monitoring",
          projects: [
            "Baku Metro: Purple Line control center, signaling & telecom systems",
            "SCADA, CBTC & TETRA deployment; staff training",
          ],
          fit: [
            "Real-time infrastructure monitoring & control",
            "Mission-critical communications",
            "Transport operational resilience",
          ],
        },
      ],
    },
  },
  charts: {
    tableToggle: "Show as table",
    framing: {
      title: "Two framings of the focus domains",
      word: { label: "Word draft", value: "4", caption: "core technology domains" },
      deck: { label: "Deck, slide 3", value: "6", caption: "priority domains (4 core + 2 additional)" },
      coreLabel: "Core domain",
      extraLabel: "Additional in the deck",
    },
    candidates: {
      title: "Candidate anchor companies per domain",
      subtitle: "Deck slide 8 · preliminary list, including Estonian companies",
      unit: "companies",
      notMapped: "not mapped",
      domainHeader: "Domain",
    },
    zeroRates: {
      title: "Zero-rate items",
      items: [
        { value: "0%", label: "Profit tax (long-term)" },
        { value: "0%", label: "Dividend tax (innovation sector)" },
        { value: "0%", label: "Personal income tax, ICT specialists (20 years)" },
        { value: "0%", label: "VAT on tech imports & services" },
        { value: "0%", label: "Customs on equipment imports" },
      ],
    },
    deductions: {
      title: "Deduction per 100 of qualifying spend",
      subtitle: "Deck slide 5",
      baseline: "100 = full deductibility",
      rows: [
        { label: "Investment deduction (<50%)", value: 100 },
        { label: "R&D super deduction", value: 250 },
      ],
    },
    royalty: {
      title: "Royalty income",
      exempt: "Exempt",
      taxed: "Taxed",
      effective: "≈ 1% effective tax rate",
    },
    exportFunding: {
      title: "Target market support per company, per year",
      subtitle: "Maximum amounts, deck slide 6",
      research: "Market research grant",
      sales: "Sales hire & training",
      total: "up to $70,000 if both programs are used (sum of the two ceilings)",
    },
    pools: { title: "Companies per priority pool", unit: "companies" },
    exits: {
      title: "Pathway 1: Russia exit timeline",
      subtitle: "Deck slide 11 · companies that left Russia and have no clear regional hub",
      exact: "Month given",
      yearOnly: "Year only",
      companyHeader: "Company",
      exitHeader: "Russia exit",
      footprintHeader: "Regional footprint",
    },
  },
  review: {
    kicker: "06 · Review notes",
    title: "Open points found while merging the two sources",
    lead:
      "Inconsistencies and gaps to clarify with BCG before any content goes further. Obvious typos are corrected on the page; everything substantive is shown as in the source and flagged here.",
    severity: { high: "Clarify", medium: "Check", low: "Fix", done: "Addressed" },
    items: [
      {
        severity: "done",
        title: "Number of domains: four vs. six",
        body:
          "The Word draft covers four core domains; deck slide 3 says “six priority domains”, adding civilian UAV systems (“covered separately”) and data & AI (“cross-cutting”). Both framings are now shown side by side in section 02, with a chart of candidate companies per domain.",
      },
      {
        severity: "done",
        title: "0% profit tax: export condition added to the copy",
        body:
          "Deck slide 5 attaches a bank inflow condition (“income must enter AZ accounts”) to the zero-rate profit tax, which the Word draft omitted. The condition is now included in the “Profits and dividends” text in section 4.1.",
      },
      {
        severity: "done",
        title: "CrowdStrike “cluster fit” corrected",
        body:
          "On slide 12 the CrowdStrike row repeated the IAI text (Earth observation / satellite engineering). It is replaced with the matching cybersecurity capabilities from slide 3 (threat detection & response; identity & access management), so no row is duplicated. BCG should confirm the final wording.",
      },
      {
        severity: "medium",
        title: "$1B ICT export ambition appears only in the deck",
        body:
          "Slide 2 shows “$1B ICT export” as the national ambition, without a target year or baseline. The Word draft does not use the figure.",
      },
      {
        severity: "medium",
        title: "Investment deduction “100% (<50%)” is ambiguous",
        body:
          "The meaning of “(<50%)” is not explained (cap on share of income/profit?). The Word draft only says “full deductibility of qualifying investment”.",
      },
      {
        severity: "medium",
        title: "Mandiant: “engaged in AZ” vs. “no project identified”",
        body:
          "Slide 9 places Google/Mandiant in the pool of players engaged in AZ negotiations/tenders, while slide 12 states that no Mandiant-specific AZE project is publicly identified.",
      },
      {
        severity: "medium",
        title: "Domain taxonomy differs between slides",
        body:
          "Slides 11–12 group companies under “Data, cloud & AI” (e.g. Siemens, Microsoft), while slide 3 treats data & AI as cross-cutting rather than a domain.",
      },
      {
        severity: "low",
        title: "Duplicate slide",
        body: "Slides 7 and 10 (prioritization criteria) are identical. Shown once on this page.",
      },
      {
        severity: "low",
        title: "Typos and stray text in the deck",
        body:
          "Slide 5: “Estonian's governance architecture” → “Estonia's”. Slide 6: stray word “Remote” under targeted media outreach; “meting” → “meeting”; “Developed” capitalized mid-sentence; unclosed parenthesis in government road-trips.",
      },
      {
        severity: "low",
        title: "Formatting errors in the Word draft",
        body:
          "Several body paragraphs are styled as headings (the “What the cluster is” text, “Enable the ecosystem” text, and the “economic reform agenda” text, which is styled as Heading 1). “For outlined reasons” reads awkwardly. Fix before hand-off to any CMS.",
      },
      {
        severity: "low",
        title: "Azerbaijani version is a draft translation",
        body:
          "The AZ version of this page is an internal draft translation and needs review by the content owner before any external use.",
      },
    ],
  },
  footer: {
    prepared: "Internal team briefing prepared from BCG materials (September 2026).",
    sources:
      "Sources: “Resilience Cluster — website content draft” (Word) and “Technology resilience cluster v4” (BCG presentation).",
    confidentiality: "Internal — contains preliminary company targeting. Do not distribute.",
  },
};
