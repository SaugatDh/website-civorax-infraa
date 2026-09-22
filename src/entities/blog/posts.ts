export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogFaq = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string;
  updated: string;
  category: string;
  related: string[];
  faqs: BlogFaq[];
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-construction-company-nepal",
    title: "How to Choose a Construction Company in Nepal",
    description:
      "Checklist for choosing a builder in Nepal: licensed engineers, BOQ contracts, supervision, warranty, municipal compliance — and red flags of low-bid contractors.",
    keywords: ["best construction company in Nepal", "best construction company in Koshi", "how to choose a builder Itahari", "civil contractor selection checklist"],
    date: "2026-09-01",
    updated: "2026-09-22",
    category: "Guides",
    related: ["house-construction-cost-per-sqft-nepal", "plot-3-aana-house-design-nepal"],
    faqs: [
      {
        question: "What should I ask before hiring a builder in Nepal?",
        answer: "Ask for engineer licenses, past projects, a detailed BOQ, supervision frequency, warranty terms, safety practices and municipal approval experience.",
      },
      {
        question: "Why are very low bids risky?",
        answer: "Low bids often hide thinner steel, lower-grade cement, fewer supervision visits, timeline slippage and surprise variation orders.",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        paragraphs: [
          "Choose a licensed team with a written BOQ contract, weekly supervision by an engineer, clear warranty terms and a portfolio you can visit. That combination beats the lowest quote almost every time.",
        ],
      },
      {
        heading: "Hallmarks of a reliable builder",
        paragraphs: ["Look for these before you sign anything:"],
        bullets: [
          "Licensed engineers and a formal contract with a line-item bill of quantities (BOQ)",
          "Municipal drawing approval and compliance history in your city",
          "Named site supervisor with weekly photo/progress reporting",
          "Written warranty on structure, waterproofing and finishes",
        ],
      },
      {
        heading: "Vetting questions to ask",
        paragraphs: ["Ask every shortlisted builder the same questions so you can compare:"],
        bullets: [
          "Who supervises daily, and how often does an engineer visit?",
          "What steel/cement brands and grades are included in the BOQ?",
          "How are variation orders priced and approved?",
          "Can I visit two past clients and one live site?",
        ],
      },
      {
        heading: "Hidden dangers of low-bid contractors",
        paragraphs: [
          "A bid 20–30% below the market usually recovers margin somewhere: compromised steel/cement grades, fewer supervision days, slower timelines or surprise extras. Insist on comparable BOQs before comparing prices.",
        ],
      },
    ],
  },
  {
    slug: "plot-3-aana-house-design-nepal",
    title: "I Have 3 Aana of Land — What House Can I Build?",
    description:
      "Realistic room layouts, setbacks and floor footprints for 3, 5 and 10 aana plots in Nepal, plus parking, light wells and vertical planning tips.",
    keywords: ["house design for 3 aana", "4 aana house plan Itahari", "small plot house design Dharan", "house plan Biratnagar"],
    date: "2026-09-02",
    updated: "2026-09-22",
    category: "House plans",
    related: ["best-house-designs-2026-nepal", "modern-house-designs-3d-plans-nepal"],
    faqs: [
      {
        question: "What fits on a 3 aana plot?",
        answer: "Typically a compact 2–3 storey home with 2–3 bedrooms per floor, parking for one bike or small car, and a light well for ventilation — subject to municipal setbacks.",
      },
      {
        question: "How do setbacks affect small plots?",
        answer: "Ground coverage and setback rules shrink the buildable footprint, so vertical stacking, open-plan floors and roof terraces matter more on small plots.",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        paragraphs: [
          "On 3 aana you can build a comfortable vertical home for a small family; on 5–10 aana you gain parking, guest rooms and terraces. Final size always depends on your municipality's ground coverage and setback rules.",
        ],
      },
      {
        heading: "What fits per plot size",
        paragraphs: ["Typical planning ranges architects use as a starting point:"],
        bullets: [
          "3 aana: compact footprint, 2–3 floors, 4–6 rooms, bike parking, light well",
          "5 aana: wider hall, 3–4 bedrooms, car porch option, front setback garden",
          "10 aana: villa layout, double-height living, guest annex, full parking court",
        ],
      },
      {
        heading: "Setbacks and ground coverage",
        paragraphs: [
          "Municipalities limit how much of your land the ground floor can cover and how far walls sit from boundaries. Get the setback drawing checked before fixing room sizes — it decides staircase, parking and window placement.",
        ],
      },
      {
        heading: "Design tactics for compact plots",
        paragraphs: ["Small plots live larger with:"],
        bullets: [
          "Vertical stacking: living below, sleeping above, terrace on top",
          "Light wells and cross-ventilation instead of dark corridors",
          "Parking integrated under a cantilevered first floor where allowed",
        ],
      },
    ],
  },
  {
    slug: "best-house-designs-2026-nepal",
    title: "Best House Designs in 2026",
    description:
      "2026 home trends for Nepal: open-plan living, double-height spaces, glass and concrete textures, passive solar design and rooftop terraces.",
    keywords: ["best house design 2026", "best house designs Itahari", "modern home trends Koshi Nepal", "contemporary residential architecture"],
    date: "2026-09-03",
    updated: "2026-09-22",
    category: "Trends",
    related: ["modern-house-designs-3d-plans-nepal", "small-house-modern-interior-nepal"],
    faqs: [
      {
        question: "What is trending in Nepali homes in 2026?",
        answer: "Open living-kitchen zones, double-height halls, floor-to-ceiling glass, rooftop terraces and passive solar orientation adapted to local climate.",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        paragraphs: [
          "The best 2026 designs pair minimalist concrete, wood and glass with Nepali climate realities: sun in winter, shade and airflow in summer, and a usable roof.",
        ],
      },
      {
        heading: "Plan trends that work",
        paragraphs: ["Most-requested layouts this year:"],
        bullets: [
          "Open-concept living/kitchen with a separate puja or store core",
          "Double-height living areas with stair-daylight",
          "Floor-to-ceiling glass only on shaded or recessed faces",
          "Rooftop terrace with pergola and outdoor kitchen point",
        ],
      },
      {
        heading: "Climate-first detailing",
        paragraphs: [
          "Passive solar orientation, deep eaves, cross-ventilation and insulated roofs cut running costs more than any gadget. In the Terai prioritize shading and airflow; in the hills prioritize sun capture and insulation.",
        ],
      },
    ],
  },
  {
    slug: "modern-house-designs-3d-plans-nepal",
    title: "Modern House Designs with 3D Plans & Pictures",
    description:
      "How exterior elevations, 3D renderings and 2D floor plans fit together — materials, louvers, cladding and turning visuals into buildable drawings.",
    keywords: ["modern house design Itahari", "3D house elevation Dharan", "bungalow designs Biratnagar", "house designs Birtamode"],
    date: "2026-09-04",
    updated: "2026-09-22",
    category: "Design",
    related: ["best-house-designs-2026-nepal", "interior-design-material-costs-nepal"],
    faqs: [
      {
        question: "Is a 3D design enough to build from?",
        answer: "No. 3D views guide decisions, but construction needs 2D working drawings: plans, sections, elevations, structural, electrical and plumbing sets.",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        paragraphs: [
          "Use 3D to decide massing and materials, then lock matching 2D floor plans and working drawings. A beautiful render without dimensions cannot be costed or approved.",
        ],
      },
      {
        heading: "What to review in a 3D set",
        paragraphs: ["Ask for these together, not just one hero render:"],
        bullets: [
          "Exterior elevations from street and rear with real material tags",
          "Matching 2D plan per floor with dimensions and furniture",
          "Material palette: stone cladding, louvers, railings, weather textures",
        ],
      },
      {
        heading: "From visual to buildable",
        paragraphs: [
          "Your architect should translate the approved 3D into structural grids, beam depths, opening sizes and service shafts — that is where cost and approval certainty come from. See our portfolio for concept-to-drawing examples.",
        ],
      },
    ],
  },
  {
    slug: "house-construction-cost-per-sqft-nepal",
    title: "How Much Does Construction Cost per Square Foot?",
    description:
      "Transparent per-sq-ft ranges for standard, premium and luxury builds in Koshi, Nepal, with phase-wise breakdowns and Itahari vs Dharan vs Biratnagar variance.",
    keywords: ["construction cost Itahari", "house building price per sq ft Koshi", "ghar banaune kharcha", "construction rate Dharan"],
    date: "2026-09-05",
    updated: "2026-09-22",
    category: "Costs",
    related: ["how-to-choose-construction-company-nepal", "interior-design-material-costs-nepal"],
    faqs: [
      {
        question: "What is the typical per-sq-ft cost in Nepal?",
        answer: "Rates move with materials and finishes. Get a BOQ-based quote for your design and city — standard, premium and luxury bands differ mainly in finishes, not just structure.",
      },
      {
        question: "Which phase costs the most?",
        answer: "Structure (RCC/steel/masonry) plus finishes (tiles, joinery, paint, sanitary) dominate. Rough-ins for plumbing and electrical are smaller but expensive to change later.",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        paragraphs: [
          "Think in bands, not single numbers: standard, premium and luxury finishes shift per-sq-ft cost more than structure alone. Always compare BOQ to BOQ for the same drawings and brands.",
        ],
      },
      {
        heading: "Cost breakdown by phase",
        paragraphs: ["Where the money goes:"],
        bullets: [
          "Structure: RCC frame or steel/masonry, foundation per soil",
          "Rough-ins: plumbing, electrical conduits, waterproofing",
          "Finishes: flooring, joinery, paint, sanitary, railings",
        ],
      },
      {
        heading: "Geography matters",
        paragraphs: [
          "Itahari, Dharan, Damak, Biratnagar and Birtamode differ in material transport, labor and foundation needs across Sunsari, Morang and Jhapa. A site visit and soil check beat any online average — book an estimate before fixing your budget.",
        ],
      },
    ],
  },
  {
    slug: "small-house-modern-interior-nepal",
    title: "My House Is Small — How to Make It Look Modern",
    description:
      "Space-expanding interiors for small Nepali homes: neutral palettes, continuous flooring, mirrors, multi-functional joinery and layered lighting.",
    keywords: ["small house interior design Itahari", "how to make small rooms look bigger", "space saving ideas Biratnagar"],
    date: "2026-09-06",
    updated: "2026-09-22",
    category: "Interiors",
    related: ["interior-design-material-costs-nepal", "best-house-designs-2026-nepal"],
    faqs: [
      {
        question: "How can I make a small room look bigger?",
        answer: "Use light neutrals, one continuous floor, large mirrors opposite windows, tall curtains and layered lighting to remove dark corners.",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        paragraphs: [
          "Keep the shell calm and continuous, then add depth with light, mirrors and built-ins. Fewer, larger storage pieces beat many small ones.",
        ],
      },
      {
        heading: "Space-expanding tactics",
        paragraphs: ["Highest-impact moves:"],
        bullets: [
          "Neutral palette with one accent wall, continuous flooring across rooms",
          "Mirrors opposite windows, glass partitions for borrowed light",
          "Under-stair storage, fold-down desks, full-height built-ins",
          "Layered lighting: ambient ceiling, task lamps, warm accents",
        ],
      },
    ],
  },
  {
    slug: "interior-design-material-costs-nepal",
    title: "Interior Design & Material Costs in Nepal",
    description:
      "Real-market options and price drivers in Nepal: plywood vs MDF, veneer vs solid wood, tiles vs SPC, plus false ceiling, kitchen and paneling estimates.",
    keywords: ["interior design Itahari", "false ceiling cost Dharan", "modular kitchen price Biratnagar"],
    date: "2026-09-07",
    updated: "2026-09-22",
    category: "Costs",
    related: ["small-house-modern-interior-nepal", "house-construction-cost-per-sqft-nepal"],
    faqs: [
      {
        question: "Plywood or MDF for kitchens in Nepal?",
        answer: "Marine/BWR plywood suits wet zones and lasts longer; MDF/HDF works for dry wardrobes and panels at lower cost but needs moisture care.",
      },
      {
        question: "What drives modular kitchen price?",
        answer: "Carcass material, shutter finish (laminate vs acrylic/veneer), hardware brand, countertop stone and tall-unit accessories.",
      },
    ],
    sections: [
      {
        heading: "Short answer",
        paragraphs: [
          "Match material to moisture: plywood where water lives, engineered boards where it stays dry. Hardware quality decides how premium a kitchen feels after two years.",
        ],
      },
      {
        heading: "Material trade-offs",
        paragraphs: ["Common choices:"],
        bullets: [
          "Marine/BWR plywood vs MDF/HDF for carcass and shutters",
          "Solid wood vs veneer vs laminate for visible faces",
          "Vitrified tiles vs SPC/wooden laminate for floors",
          "Gypsum vs PVC vs wooden baffles for false ceilings",
        ],
      },
      {
        heading: "Budgeting rule",
        paragraphs: [
          "Price false ceilings per sq-ft, kitchens per running-ft plus accessories, and paneling per sq-ft with finish specified. Always lock brand, thickness and edge-banding in writing.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
