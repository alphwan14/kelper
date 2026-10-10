import type { ImageSlot } from "./images";

/**
 * The three service lines. Every scope item below is a PROPOSED category the
 * owner must confirm before launch (see docs/owner-questions.md). Delete what
 * Kelper won't quote for rather than softening it.
 */

export type QuoteType = "construction" | "engineering" | "supplies";

export type ScopeGroup = { title: string; items: string[] };

export type ServiceLine = {
  slug: QuoteType;
  /** Display name, e.g. in nav and headings */
  name: string;
  /** Mono reference shown like a drawing number */
  ref: string;
  /** <title> (the layout template appends the company name) */
  seoTitle: string;
  description: string;
  /** One line for cards and the footer */
  short: string;
  /** Page headline */
  headline: string;
  intro: string;
  image: ImageSlot;
  imagePosition?: string;
  forWho: { title: string; body: string }[];
  scope: ScopeGroup[];
  /** What to include in an enquiry */
  enquiry: string[];
  /** A plain statement of limits or legal context, shown as an aside */
  note: { title: string; body: string };
  whatsapp: string;
};

export const services: ServiceLine[] = [
  {
    slug: "construction",
    name: "Construction",
    ref: "S-01",
    seoTitle: "Construction & Renovation Contractor in Mombasa",
    description:
      "Building works, renovations and civil works in Mombasa. Send your drawings, bill of quantities or brief to Kelper Investments Ltd for a quotation.",
    short: "Building works, renovations and external civil works, priced against your drawings or brief.",
    headline: "Building works, renovations and site works.",
    intro:
      "For homeowners, businesses and institutions with a project to build, extend or repair. Send your drawings, bill of quantities or a clear brief, and we'll come back with questions or a quotation.",
    image: "construction",
    imagePosition: "50% 30%",
    forWho: [
      { title: "Homeowners and developers", body: "Planning a new house, a rental block, an extension or an upgrade to an existing building." },
      { title: "Businesses", body: "Fitting out, repairing or extending shops, offices, warehouses and other commercial premises." },
      { title: "Schools, churches and institutions", body: "Classrooms, halls, ablution blocks, perimeter walls and planned maintenance." },
    ],
    scope: [
      {
        title: "Building works",
        items: [
          "New residential and commercial buildings to approved drawings",
          "Extensions and alterations to existing buildings",
          "Foundations, masonry, concrete frames and slabs",
        ],
      },
      {
        title: "Renovation and finishing",
        items: [
          "Plastering, screeding, tiling and painting",
          "Roofing repairs and replacement",
          "Ceilings, partitions, doors and windows",
        ],
      },
      {
        title: "External and civil works",
        items: [
          "Boundary walls and gates",
          "Paving, cabro and driveways",
          "Surface-water drainage and soakaways",
        ],
      },
    ],
    enquiry: [
      "Where the site is (town and area)",
      "What you want built or repaired, and roughly how big",
      "Drawings, a bill of quantities, or photos of the existing building",
      "Whether county approval has been obtained (for new buildings and extensions)",
      "When you'd like work to start",
    ],
    note: {
      title: "Ask any contractor for their NCA certificate",
      body: "In Kenya, construction contractors must be registered with the National Construction Authority, and the registration grade limits the size of contract they can take. Most new buildings and extensions also need county approval before work starts. Ask to see the certificate before you sign.",
    },
    whatsapp: "I'd like a quotation for construction work.",
  },
  {
    slug: "engineering",
    name: "Engineering Services",
    ref: "S-02",
    seoTitle: "Engineering Support & Installation Works, Mombasa",
    description:
      "Practical engineering support for building projects in Mombasa: site assessment, setting out, coordination with your professionals, and installation works.",
    short: "Site assessment, setting out, coordination and installation works for building projects.",
    headline: "Practical technical support, from site to installation.",
    intro:
      "Help with the technical side of a project: understanding what a building or site needs, setting out works accurately, coordinating with your architect, engineer and quantity surveyor, and carrying out installation works.",
    image: "engineering",
    imagePosition: "35% 40%",
    forWho: [
      { title: "Project owners", body: "Who need a clear picture of what a repair, upgrade or new build involves before committing to it." },
      { title: "Developers and their consultants", body: "Needing a site team that works to the drawings and keeps the design team informed." },
      { title: "Facilities and property managers", body: "Planning upgrades to water, drainage or steelwork on buildings they look after." },
    ],
    scope: [
      {
        title: "Site and technical support",
        items: [
          "Site visits and condition assessments to scope repairs and renovations",
          "Setting out and levels for works on site",
          "Site supervision and progress reporting against the programme",
        ],
      },
      {
        title: "Coordination",
        items: [
          "Working to your architect's and engineer's drawings and specifications",
          "Pricing against designs and bills of quantities",
          "Explaining which approvals and registered professionals a project needs",
        ],
      },
      {
        title: "Installation works",
        items: [
          "Water storage, plumbing and drainage installation",
          "Steel fabrication and installation: gates, grilles and light frames",
        ],
      },
    ],
    enquiry: [
      "Where the building or site is",
      "What the problem or requirement is, with photos if you have them",
      "Any drawings, specifications or engineer's reports",
      "Who else is involved (architect, engineer, quantity surveyor)",
      "Your timeline",
    ],
    note: {
      title: "What this service does not include",
      body: "Kenyan law reserves engineering design, structural calculations and the signing of engineering drawings or reports for engineers registered with the Engineers Board of Kenya. Where your project needs that work, it must be done by a registered professional, and we'll tell you when it does.",
    },
    whatsapp: "I'd like to discuss engineering support for a project.",
  },
  {
    slug: "supplies",
    name: "Supplies",
    ref: "S-03",
    seoTitle: "Building Materials & Construction Supplies, Mombasa",
    description:
      "Cement, steel, blocks, roofing, plumbing, hardware and site supplies in Mombasa, quoted against your materials list or bill of quantities.",
    short: "Construction materials and site supplies, quoted to your specification, quantity and delivery point.",
    headline: "Materials quoted to your list, specification and site.",
    intro:
      "Send a materials list or bill of quantities with specifications and quantities. We'll confirm what we can supply, the price and the delivery timing for that order. There are no prices on this site, because material prices move and every order is quoted on its own.",
    image: "supplies",
    imagePosition: "50% 60%",
    forWho: [
      { title: "Contractors and fundis", body: "Buying materials for a site and wanting one quotation for the whole list." },
      { title: "Owners managing their own build", body: "Who have a bill of quantities and need it priced and delivered in stages." },
      { title: "Businesses and institutions", body: "Procuring supplies through a request for quotation or a tender." },
    ],
    scope: [
      {
        title: "Structural materials",
        items: [
          "Cement",
          "Reinforcement steel and mesh",
          "Building blocks and machine-cut stone",
          "Sand, ballast and aggregates",
          "Timber for formwork and roofing",
        ],
      },
      {
        title: "Roofing and finishes",
        items: ["Roofing sheets and accessories", "Tiles, paint and ceiling boards", "Doors, windows and ironmongery"],
      },
      {
        title: "Plumbing, hardware and site supplies",
        items: [
          "Pipes, fittings and water tanks",
          "Nails, binding wire, fixings and hand tools",
          "PPE: helmets, boots, reflective vests and gloves",
        ],
      },
    ],
    enquiry: [
      "Each item with its specification or grade (for example cement class 42.5N, or Y12 high-yield bar)",
      "Quantity and unit for each item",
      "Delivery location, and any access limits for lorries",
      "The date you need it on site, and whether delivery can be phased",
      "Your bill of quantities, if you have one",
    ],
    note: {
      title: "Specify the standard, not just the item",
      body: "Kenya Bureau of Standards (KEBS) standards cover cement, reinforcement steel, roofing sheets and blocks. State the grade or standard you need on your list. We quote against that specification and say clearly if we propose an alternative.",
    },
    whatsapp: "I'd like a quotation for materials.",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
