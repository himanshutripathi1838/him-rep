import shiftlyin from "@/assets/project-shiftlyin.jpg";
import pole from "@/assets/project-pole.jpg";
import omnidocs from "@/assets/project-omnidocs.jpg";
import career from "@/assets/project-career.jpg";
import pooja from "@/assets/project-pooja.jpg";
import kailora from "@/assets/project-kailora.jpg";
import food from "@/assets/project-food.jpg";

export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  year: string;
  image: string;
  featured: boolean;
  overview: string;
  problem: string;
  goals: string[];
  architecture: string[];
  challenges: { title: string; body: string }[];
  stack: string[];
  features: string[];
  results: { label: string; value: string }[];
  lessons: string[];
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "shiftlyin",
    name: "Shiftlyin",
    category: "Marketplace Platform",
    tagline: "A student-side marketplace connecting campus workers with local businesses.",
    year: "2024",
    image: shiftlyin,
    featured: true,
    overview:
      "Shiftlyin is a two-sided marketplace where local businesses post short shifts and verified students claim, complete and get paid for them. It ships two distinct dashboards, an attendance system, an internal wallet and a rating loop that keeps supply and demand honest.",
    problem:
      "Campus hiring ran on WhatsApp groups: no verification, no attendance record, no payment trail and no accountability when either side dropped out. Businesses lost hours coordinating, students lost money.",
    goals: [
      "One identity model that supports two very different dashboards without forking the app.",
      "Attendance that cannot be faked from a couch — location and time bounded.",
      "A wallet ledger where every balance change is traceable to an event.",
      "Sub-second listing feed even on poor campus networks.",
    ],
    architecture: [
      "React + Vite client with role-aware routing; a single auth context resolves role claims once and drives dashboard composition.",
      "Firebase Auth for identity, Firestore for the transactional model (users, businesses, shifts, attendance, wallet_entries, ratings).",
      "Wallet modelled as an append-only ledger of signed entries — balance is derived, never overwritten, so disputes are auditable.",
      "Cloudinary for image uploads with signed upload presets so the client never handles API secrets.",
      "Maps integration for shift geolocation plus a distance check on attendance check-in.",
      "Security rules enforce per-collection ownership; business writes and student writes never overlap.",
    ],
    challenges: [
      {
        title: "Preventing double-claimed shifts",
        body: "Two students could claim the same shift within the same tick. Solved with a transactional claim that reads the shift state and writes the assignment atomically, rejecting the loser with a clear UI state instead of a silent failure.",
      },
      {
        title: "Trustworthy attendance",
        body: "Check-in combines server timestamp, shift window validation and a distance threshold against the posted location. Out-of-window attempts are recorded as exceptions rather than blocked, so businesses can resolve edge cases themselves.",
      },
      {
        title: "Query cost at scale",
        body: "The naive feed read every shift. Composite indexes plus paginated, filter-first queries cut reads per session by roughly 70% and made the feed feel instant.",
      },
    ],
    stack: [
      "React",
      "TypeScript",
      "Firebase Auth",
      "Firestore",
      "Cloud Functions",
      "Cloudinary",
      "Maps API",
      "Tailwind CSS",
    ],
    features: [
      "Separate business and student dashboards",
      "Shift posting, claiming and lifecycle states",
      "Geo + time bounded attendance",
      "Append-only wallet ledger",
      "Two-way ratings with weighted recency",
      "Cloudinary media uploads",
      "Map-based shift discovery",
    ],
    results: [
      { label: "Reads per session", value: "-70%" },
      { label: "Dashboards", value: "2 roles" },
      { label: "Disputed payouts", value: "Auditable" },
      { label: "Feed load", value: "<1s" },
    ],
    lessons: [
      "Derived balances beat stored balances — the ledger paid for itself the first time a payout was contested.",
      "Security rules are part of the data model, not a deployment afterthought.",
      "Two dashboards can share one codebase if role resolution happens exactly once.",
    ],
  },
  {
    slug: "railway-pole-detection",
    name: "Railway Pole Detection",
    category: "Computer Vision",
    tagline: "A YOLOv8 detection pipeline for railway electrification poles.",
    year: "2025",
    image: pole,
    featured: true,
    overview:
      "Built during my AI/ML internship at Prudent Systems: an end-to-end detection pipeline that locates electrification poles in track-side footage, from dataset curation and augmentation through training, evaluation and a batch inference tool used by the review team.",
    problem:
      "Pole inspection was manual frame-by-frame review of route footage. It was slow, inconsistent between reviewers, and impossible to audit — and off-the-shelf models mistook signal masts and catenary supports for poles.",
    goals: [
      "A labelling spec precise enough that two annotators produce the same boxes.",
      "Detection accuracy high enough to shortlist frames for human review.",
      "Validation that reflects unseen routes, not random frames from seen routes.",
      "Fewer false positives, because each one costs a reviewer's attention.",
    ],
    architecture: [
      "Dataset layer: 500+ curated frames, class spec with explicit negative cases (signal masts, bridges, trees), split by route rather than at random.",
      "Augmentation: brightness/contrast jitter, horizontal flips, scale and motion-blur simulation to match real footage conditions.",
      "Training: YOLOv8 with transfer learning from COCO weights, tracked per-run against mAP@0.5, precision and per-class recall.",
      "Evaluation: held-out route split plus a confusion review of the worst 50 frames per run to find systematic failure modes.",
      "Inference: Python CLI over OpenCV that batches frames, applies calibrated confidence thresholds and writes annotated output plus a CSV report.",
    ],
    challenges: [
      {
        title: "False positives on look-alike structures",
        body: "The model confidently boxed signal masts. Fixed by mining hard negatives from the failing frames and adding them as explicit background examples — false positives dropped about 20%.",
      },
      {
        title: "Random splits lied about accuracy",
        body: "Frames from the same route leaked between train and validation, inflating scores. Splitting by route dropped the reported number but raised real generalization by roughly 15%.",
      },
      {
        title: "Thin, distant objects",
        body: "Poles far down the track occupy very few pixels. Higher input resolution and tiled inference on the vanishing-point region recovered most of those detections.",
      },
    ],
    stack: ["Python", "YOLOv8", "PyTorch", "OpenCV", "NumPy", "Roboflow", "Matplotlib"],
    features: [
      "Route-aware dataset splitting",
      "Hard-negative mining loop",
      "Augmentation matched to field conditions",
      "Per-class recall tracking",
      "Tiled inference for distant objects",
      "Batch CLI with CSV reporting",
    ],
    results: [
      { label: "Detection accuracy", value: "90%" },
      { label: "Training images", value: "500+" },
      { label: "Generalization", value: "+15%" },
      { label: "False positives", value: "-20%" },
    ],
    lessons: [
      "Your validation split is the most important hyperparameter.",
      "Model quality gains came from data decisions far more than architecture changes.",
      "A metric nobody can reproduce is not a metric.",
    ],
  },
  {
    slug: "omni-docs",
    name: "Omni Docs",
    category: "AI Workspace",
    tagline: "An AI workspace that turns documents into answers, with history you can trust.",
    year: "2024",
    image: omnidocs,
    featured: true,
    overview:
      "Omni Docs ingests PDFs and scans, extracts text through an OCR fallback chain, and lets users query their own documents. Every processing run is persisted so results are reproducible instead of ephemeral chat output.",
    problem:
      "Document tools either handle clean digital PDFs or scanned images — rarely both — and almost never keep a record of what was extracted, so the same file gets reprocessed and results silently drift.",
    goals: [
      "One ingestion path that handles digital text and scanned images.",
      "Durable processing history tied to a user account.",
      "Predictable latency for large files via background processing.",
      "Clear failure states instead of an empty result.",
    ],
    architecture: [
      "FastAPI service exposing typed endpoints for upload, processing status, query and history.",
      "React client with optimistic upload state and polled processing status.",
      "Extraction chain: native PDF text layer first, OCR fallback for image-only pages, normalisation and chunking after.",
      "JWT authentication with refresh handling; every document row is scoped to its owner.",
      "Processing runs stored with input hash, extractor used and timing so identical files are not reprocessed.",
    ],
    challenges: [
      {
        title: "Mixed-quality inputs",
        body: "A single PDF can hold digital and scanned pages. The extractor now decides per page, not per document, which raised usable text extraction dramatically on real-world files.",
      },
      {
        title: "Long jobs blocking requests",
        body: "Large scans held connections open. Moved processing behind a job model with a status endpoint, so the UI stays responsive and retries are cheap.",
      },
      {
        title: "Auth across a split stack",
        body: "Separate React and FastAPI deployments meant token refresh races on tab focus. A single-flight refresh in the API client removed duplicate 401 storms.",
      },
    ],
    stack: ["FastAPI", "Python", "React", "TypeScript", "PostgreSQL", "OCR (Tesseract)", "JWT"],
    features: [
      "Per-page extractor selection",
      "OCR fallback chain",
      "Background processing with status polling",
      "Query interface over user documents",
      "Full processing history",
      "Account-scoped access control",
    ],
    results: [
      { label: "Extraction coverage", value: "Digital + scanned" },
      { label: "Reprocessing avoided", value: "Hash-cached" },
      { label: "Blocking requests", value: "0" },
      { label: "Auth 401 storms", value: "Eliminated" },
    ],
    lessons: [
      "Decide at the smallest useful unit — pages, not documents.",
      "History turns an AI demo into a tool people can rely on.",
      "Single-flight token refresh should be the default in any split stack.",
    ],
  },
  {
    slug: "career-guidance",
    name: "Career Guidance Platform",
    category: "Education Platform",
    tagline: "Recommendation-driven career roadmaps with a student portal and admin console.",
    year: "2024",
    image: career,
    featured: false,
    overview:
      "A platform that profiles a student's interests and strengths, recommends career tracks, and renders a stage-by-stage roadmap with curated resources. Admins manage the taxonomy, resources and recommendation weights without a deploy.",
    problem:
      "Career advice at scale is generic. Students get a list of job titles with no path from where they are to where the title lives, and counsellors have no way to update guidance without engineering help.",
    goals: [
      "Recommendations explainable to the student, not a black box.",
      "Roadmaps as structured data so they can be updated centrally.",
      "An admin surface that changes behaviour without code changes.",
      "Role separation between student and admin from day one.",
    ],
    architecture: [
      "Node/Express API with a weighted scoring service mapping profile answers to career tracks.",
      "Roadmaps modelled as ordered stages, each with skills and linked resources.",
      "MongoDB collections for users, profiles, tracks, stages and resources.",
      "React portal with a stepped assessment flow and a persistent roadmap view.",
      "Admin console with CRUD over tracks, stages, resources and scoring weights.",
    ],
    challenges: [
      {
        title: "Explainability",
        body: "A score alone felt arbitrary. The API now returns the top contributing factors per recommendation, and the UI shows why a track surfaced.",
      },
      {
        title: "Content without deploys",
        body: "Every taxonomy tweak was a code change. Moving weights and roadmap content into the database handed ownership back to the people who actually curate it.",
      },
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "Stepped interest assessment",
      "Weighted, explainable recommendations",
      "Stage-based roadmaps",
      "Curated resource library",
      "Admin CRUD console",
      "Role-based authentication",
    ],
    results: [
      { label: "Content updates", value: "No deploy" },
      { label: "Recommendation", value: "Explainable" },
      { label: "Roles", value: "Student + admin" },
    ],
    lessons: [
      "Configuration in the database ages far better than configuration in code.",
      "Users trust a recommendation they can interrogate.",
    ],
  },
  {
    slug: "pooja-pandit",
    name: "Pooja Pandit",
    category: "Business Website",
    tagline: "A calm, fast, SEO-first website for a traditional services business.",
    year: "2025",
    image: pooja,
    featured: false,
    overview:
      "A conversion-focused business website for a pandit services provider: clear service listing, trust signals, and booking enquiry — designed to load fast on mid-range phones and rank for local intent searches.",
    problem:
      "The business ran entirely on phone referrals. There was no discoverable presence, no way to compare services, and no record of enquiries.",
    goals: [
      "Rank for local service intent queries.",
      "Load in under two seconds on a mid-range Android phone.",
      "Make enquiry the single obvious action on every screen.",
    ],
    architecture: [
      "Static-first rendering with per-route metadata and structured data for local business schema.",
      "Responsive image pipeline with modern formats and explicit dimensions to avoid layout shift.",
      "Enquiry form posting to an email delivery service with validation and honeypot spam protection.",
    ],
    challenges: [
      {
        title: "Trust in a traditional market",
        body: "Design credibility mattered more than feature count. Typography, real service detail and clear pricing language replaced generic stock imagery.",
      },
      {
        title: "Performance on low-end devices",
        body: "Font subsetting, deferred non-critical assets and a strict image budget kept the page interactive quickly on slow networks.",
      },
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Structured data", "Email delivery API"],
    features: [
      "Service catalogue with clear pricing language",
      "Local business structured data",
      "Enquiry form with spam protection",
      "Mobile-first responsive layout",
      "Accessible colour and type scale",
    ],
    results: [
      { label: "Lighthouse performance", value: "95+" },
      { label: "Layout shift", value: "~0" },
      { label: "Enquiries", value: "Tracked" },
    ],
    lessons: [
      "For local businesses, credibility is a design problem before it is a marketing problem.",
      "Performance budgets are easiest to hold when set before the first image lands.",
    ],
  },
  {
    slug: "kailora-labs",
    name: "Kailora Labs",
    category: "Company Website",
    tagline: "Brand identity and marketing site for a technology company.",
    year: "2025",
    image: kailora,
    featured: false,
    overview:
      "End-to-end brand and web work for Kailora Labs: identity system, product and service positioning, and a modern landing experience built on a reusable section library so the marketing team can compose new pages themselves.",
    problem:
      "The company had capability but no coherent story. Every deck and page described the business differently, and each new page meant new bespoke code.",
    goals: [
      "One identity system: type, colour, spacing, tone.",
      "A section library that composes into new pages without new components.",
      "Clear separation between product and service narratives.",
    ],
    architecture: [
      "Design tokens as the single source of truth for colour, type scale and spacing rhythm.",
      "Composable section primitives (hero, feature grid, proof, CTA) driven by content objects.",
      "Content-as-data so pages are configuration, not code.",
    ],
    challenges: [
      {
        title: "Consistency without rigidity",
        body: "Variants are defined at the token and component level, so pages can differ in emphasis while staying unmistakably one brand.",
      },
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Design tokens", "Framer Motion"],
    features: [
      "Identity and token system",
      "Composable section library",
      "Product and services pages",
      "Content-driven page assembly",
      "Motion used only for hierarchy",
    ],
    results: [
      { label: "New page build", value: "Config only" },
      { label: "Brand surfaces", value: "Unified" },
    ],
    lessons: [
      "A section library is the cheapest long-term gift you can give a marketing team.",
      "Tokens first; components second; pages last.",
    ],
  },
  {
    slug: "food-delivery",
    name: "Online Food Delivery",
    category: "Ordering Platform",
    tagline: "Restaurant ordering with live tracking, maps and payments.",
    year: "2023",
    image: food,
    featured: false,
    overview:
      "A full ordering platform: menu browsing, cart and checkout, payment handling, and an order lifecycle that customers can follow on a map from kitchen to doorstep.",
    problem:
      "Restaurant orders arrived by phone with no status visibility. Customers called back repeatedly, and staff had no queue they could work down.",
    goals: [
      "One canonical order state machine shared by customer and kitchen views.",
      "Live status without hammering the server.",
      "Payment flow that never leaves an order in an unknown state.",
    ],
    architecture: [
      "Explicit order state machine (placed → accepted → preparing → out for delivery → delivered) with guarded transitions.",
      "Node/Express API, MongoDB persistence, socket channel per order for status pushes.",
      "Payment intent recorded before confirmation, reconciled by webhook so failures are recoverable.",
      "Maps rendering for delivery route and ETA estimation.",
    ],
    challenges: [
      {
        title: "Payment and order state drift",
        body: "A failed callback used to leave paid orders unconfirmed. Recording intent before charge and reconciling via webhook made every order recoverable.",
      },
      {
        title: "Live tracking cost",
        body: "Polling every second was wasteful. Per-order socket channels with server-pushed transitions cut traffic sharply while feeling more immediate.",
      },
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Maps API", "Payments API"],
    features: [
      "Menu and cart with variants",
      "Guarded order state machine",
      "Real-time order tracking",
      "Map route and ETA",
      "Authentication and order history",
      "Webhook-reconciled payments",
    ],
    results: [
      { label: "Status requests", value: "Push, not poll" },
      { label: "Stuck orders", value: "Recoverable" },
      { label: "Order states", value: "5 guarded" },
    ],
    lessons: [
      "Write the state machine down before writing the endpoints.",
      "Money flows need reconciliation, not optimism.",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
