import type { TechId } from "@/lib/tech";
import { img } from "./images";

/**
 * To add a project: add one object to `projects` below. Set `featured: true`
 * (and give it a `caseStudy`) for it to get a full row and its own page;
 * otherwise it appears in "More projects". Every optional field (cover,
 * gallery, links, caseStudy) can simply be left out.
 */

export interface Shot { src: string; alt: string; caption: string }
export interface Block { title: string; body: string }

export interface CaseStudy {
  overview: string[];
  purpose?: string;
  /** Used for professional work, to say what my part was. */
  role?: string;
  features: string[];
  implementation: Block[];
  decisions?: Block[];
  challenges?: Block[];
  /** A short callout, e.g. why a project has no live demo link. */
  notice?: Block;
  next?: string;
}

export type ProjectKind = "personal" | "professional" | "hackathon" | "prototype";

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  /** Plain-language status, shown on the card and the case study. */
  status: string;
  summary: string;
  tech: TechId[];
  featured: boolean;
  /** For professional work: who it was done for. */
  client?: string;
  links: { code?: string; live?: string; docs?: string };
  cover?: Shot;
  gallery?: Shot[];
  caseStudy?: CaseStudy;
  /** Small honest caveat shown on compact cards, e.g. "uses mock data". */
  note?: string;
}

export const kindLabel: Record<ProjectKind, string> = {
  personal: "Personal project",
  professional: "Professional work",
  hackathon: "Hackathon project",
  prototype: "Academic prototype",
};

const storeGallery: Shot[] = [
  {
    src: img.storeStats,
    alt: "Store Manager statistics page with revenue, users, orders and conversion cards, a revenue versus orders line chart and a top categories donut chart.",
    caption: "Statistics: key metrics, a revenue-versus-orders chart and a category breakdown, built from sample FakeStoreAPI data.",
  },
  {
    src: img.storeProducts,
    alt: "Store Manager products table with search, category and status filters, SKU, price, stock status and pagination.",
    caption: "Products: searchable, filterable table with SKU, category, price, status and pagination.",
  },
  {
    src: img.storeAddProduct,
    alt: "Add New Product modal with product name, SKU, price, category and image upload fields.",
    caption: "Add Product modal: validated form with a generated SKU and image upload.",
  },
  {
    src: img.storeDeleteProduct,
    alt: "Delete Product confirmation dialog naming the product being removed.",
    caption: "Delete confirmation: destructive actions ask before they run.",
  },
  {
    src: img.storeUsers,
    alt: "Store Manager users page with summary cards, role filter, search and a paginated user table.",
    caption: "Users: summary counts, search, role filter and a paginated table.",
  },
  {
    src: img.storeSuspendUser,
    alt: "Suspend Account dialog with a reason field and a notify-user toggle.",
    caption: "Suspend account dialog with a reason and a notify toggle.",
  },
  {
    src: img.storeOrders,
    alt: "Orders and Carts page with KPI cards, tabs for All Orders, Pending Carts and Returns, filters and an orders table.",
    caption: "Orders & Carts: KPI cards, tabs, status and date filters, and CSV export.",
  },
  {
    src: img.storeCreateOrder,
    alt: "Create New Order modal with customer, items, quantity, payment status and shipping status.",
    caption: "Create Order modal: customer, line items, and payment and shipping status.",
  },
  {
    src: img.storeSearch,
    alt: "Global search dropdown grouping results into transactions, users and products.",
    caption: "Global search from the header, grouped into transactions, users and products.",
  },
];

export const projects: Project[] = [
  {
    slug: "store-manager-dashboard",
    title: "Store Manager Dashboard",
    kind: "personal",
    status: "Frontend complete · custom backend planned",
    summary:
      "Built a responsive e-commerce management dashboard using React and TypeScript, integrating FakeStoreAPI to manage product and user data through interactive interfaces.",
    tech: ["react", "typescript", "tailwind", "zustand", "indexedDb", "tanstackQuery", "recharts", "reactHookForm", "zod"],
    featured: true,
    links: { code: "https://github.com/Praise-Tech-Dev/Store_Manager_Dashboard" },
    cover: storeGallery[0],
    gallery: storeGallery,
    caseStudy: {
      overview: [
        "An admin-style dashboard for managing an online store's products, users, orders and carts, with analytics and CSV exports.",
        "It is a completed frontend project. Data comes from FakeStoreAPI; there is no custom backend yet.",
      ],
      purpose:
        "A frontend project exploring how a multi-page admin interface is structured: tables with search, filtering and pagination, validated forms in reusable modals, charts, exports, and shared state.",
      features: [
        "Product and user management",
        "Create, update and delete operations using reusable modals and validated forms",
        "Product listings with global search, filtering and pagination",
        "Order and cart management views, including tabs for pending carts and returns",
        "Analytics and data visualisations, with a last-30-days filter",
        "CSV exports for users, products and orders",
        "Duplicate checks: SKU uniqueness for products and email uniqueness for users, plus handling for suspending your own account",
      ],
      implementation: [
        { title: "Server state", body: "TanStack Query handles requests to FakeStoreAPI, caching and refetching." },
        { title: "Client state and persistence", body: "Zustand holds shared client state. It is persisted to IndexedDB, so changes made in the interface survive a page reload." },
        { title: "Forms and validation", body: "React Hook Form with Zod schemas drives the create and edit modals, so validation rules live next to the data shape they describe." },
        { title: "Charts and statistics", body: "Recharts renders the visualisations. The statistics are calculated on the client from the available cart, product and user data; they are sample figures, not real business analytics." },
        { title: "Interface", body: "React Router for pages, Tailwind CSS for styling, and Vite as the build tool." },
      ],
      decisions: [
        {
          title: "Local persistence for writes",
          body: "FakeStoreAPI accepts create, update and delete requests but does not actually store them. To make the interface behave like a working admin tool, changes are kept locally with Zustand and IndexedDB. They are not stored on FakeStoreAPI itself.",
        },
      ],
      challenges: [
        {
          title: "Authentication and demo access",
          body: "Sign-in depends on FakeStoreAPI's sample users, which makes the deployed app a poor fit for a public demo. Rather than link a login screen, this page walks through the interface with screenshots.",
        },
      ],
      notice: {
        title: "Why there is no live demo link",
        body: "The deployed app signs in against FakeStoreAPI's sample users, so a visitor would land on a login they cannot use. The gallery shows the real interface instead, and the source is on GitHub.",
      },
      next: "A custom backend is planned so that data, authentication and permissions are real rather than simulated. It has not been built yet.",
    },
  },
  {
    slug: "nomnom-recipe-explorer",
    title: "NomNom Recipe Explorer",
    kind: "personal",
    status: "Core app complete · home page unfinished",
    summary:
      "Built a recipe discovery application with API integration, allowing users to browse, search, filter, sort and explore recipes through a responsive interface.",
    tech: ["react", "javascript", "tanstackQuery", "tanstackStore", "tailwind"],
    featured: true,
    links: {
      code: "https://github.com/Praise-Tech-Dev/NOMNOM-RECIPE-EXPLORER",
      live: "https://nomnom-recipe-explorer.vercel.app/",
    },
    cover: {
      src: img.nomnomRecipes,
      alt: "NomNom recipe list with search, tag, meal type and sort controls, a recently viewed row and a grid of recipe cards.",
      caption: "Recipe list with search, filters, sorting, view toggle and pagination.",
    },
    gallery: [
      {
        src: img.nomnomRecipes,
        alt: "NomNom recipe list with search, tag, meal type and sort controls, a recently viewed row and a grid of recipe cards.",
        caption: "Recipe list: recently viewed row, search, filters, sorting, grid or compact view, and pagination.",
      },
      {
        src: img.nomnomDetail,
        alt: "NomNom recipe detail page with an ingredient checklist, instructions, tags and related recipes.",
        caption: "Recipe detail: ingredient checklist, instructions, tags and related recipes.",
      },
    ],
    caseStudy: {
      overview: [
        "A frontend application for exploring recipes: search, filter, sort, save and revisit them.",
        "It is a frontend engineering project built on a public sample API (DummyJSON), not a commercial recipe platform.",
      ],
      purpose:
        "A project for practising the parts of a data-driven frontend that are easy to get subtly wrong: separating server state from client state, keeping search and filters in the URL, and keeping a list fast as it is searched and paged.",
      features: [
        "400ms debounced search",
        "Filtering by tag and meal type; sorting by name, cooking time or rating, ascending or descending",
        "Pagination, with search, filter and sort state synchronised to the URL",
        "Recipe detail pages with an ingredient checklist and preparation steps",
        "Hover prefetching of recipe details",
        "Saved recipes, a saved-recipes drawer and a recently viewed list",
        "Grid and compact views",
        "Add Recipe modal with form validation, dynamic ingredient and instruction fields, and searchable tags",
        "Vitest tests",
      ],
      implementation: [
        { title: "Server state", body: "TanStack Query handles API data, caching, pagination and query keys." },
        { title: "Client state", body: "TanStack Store holds saved recipe IDs, recently viewed IDs and drawer state." },
        { title: "URL as state", body: "Search, filter and sort values live in the URL, so a filtered view can be reloaded or shared." },
        { title: "Structure", body: "A feature-first folder layout, with React Router, Tailwind CSS and Vite, and the DummyJSON API through the Fetch API." },
      ],
      decisions: [
        { title: "Debounce before fetching", body: "Search waits 400ms after the last keystroke before it updates, which avoids a request per character." },
        { title: "Prefetch on hover", body: "Hovering a recipe starts loading its details, so opening it feels faster." },
        { title: "Two kinds of state, two tools", body: "Data that comes from the server and data that only exists in the browser are managed separately." },
      ],
      challenges: [
        {
          title: "What the project is good evidence of",
          body: "Server versus client state, API consumption, caching and query keys, URL state, debounced search, pagination, prefetching, form validation, feature-first organisation and frontend testing.",
        },
      ],
      next: "The home page is unfinished and is not a current priority; the recipe exploration experience is the focus of the project.",
    },
  },
  {
    slug: "shedahouse-website",
    title: "ShedaHouse Website",
    kind: "professional",
    client: "ShedaHouse",
    status: "Delivered during internship · Jan – Mar 2026",
    summary:
      "Developed frontend interfaces for the ShedaHouse company website, presenting its services, agency, academy, community and creative offerings.",
    tech: ["react", "tailwind", "vite"],
    featured: true,
    links: { live: "https://sheda-house.netlify.app/" },
    cover: {
      src: img.shedaHero,
      alt: "ShedaHouse website home page with the headline 'The Best Creative Community in Ibadan' above a group photo.",
      caption: "Home page: hero, calls to action and community photo.",
    },
    gallery: [
      {
        src: img.shedaHero,
        alt: "ShedaHouse website home page with the headline 'The Best Creative Community in Ibadan' above a group photo.",
        caption: "Home page: hero, calls to action and community photo.",
      },
      {
        src: img.shedaOfferings,
        alt: "ShedaHouse 'What we do' section presenting the academy offering with previous and next controls.",
        caption: "'What we do': the academy offering, with controls to move through the offerings.",
      },
    ],
    caseStudy: {
      overview: [
        "The public website for ShedaHouse, a creative hub in Ibadan, built during my frontend internship there.",
      ],
      role: "Frontend Developer Intern. I translated company requirements into the website's responsive React interface. This is company work, not a personal demo.",
      features: [
        "Company information and services",
        "Agency and academy offerings",
        "Applications, programmes and courses",
        "Team information and customer reviews",
        "Contact functionality",
        "Responsive page layouts",
      ],
      implementation: [
        { title: "Stack", body: "React, Tailwind CSS and Vite." },
        { title: "Focus", body: "Responsive layout, clear presentation of services and initiatives, and a consistent interface across pages and screen sizes." },
      ],
    },
  },
  {
    slug: "goodfood-analytics-dashboard",
    title: "GoodFood Analytics Dashboard",
    kind: "personal",
    status: "Completed · uses mock data",
    summary:
      "A food-ordering analytics dashboard demonstrating frontend data visualisation: revenue, order times, ratings, most-ordered items and order trends.",
    tech: ["react", "typescript", "tailwind", "recharts"],
    featured: false,
    note: "All figures are mock data; there is no backend.",
    links: {
      code: "https://github.com/Praise-Tech-Dev/Good_Food_Dashboard",
      live: "https://good-food-dashboard-three.vercel.app/",
    },
    cover: {
      src: img.goodfood,
      alt: "GoodFood dashboard with a revenue bar chart, an order time donut, rating bubbles, a most-ordered list and an orders line chart.",
      caption: "Dashboard overview.",
    },
  },
  {
    slug: "agricare-backend",
    title: "Agricare Backend",
    kind: "hackathon",
    status: "Hackathon project",
    summary:
      "Developed a Django REST API for a WhatsApp-based poultry health assistant, implementing webhook processing, AI-service integration, database-backed workflows and automated health-case handling.",
    tech: ["python", "drf", "sqlite", "whatsapp"],
    featured: false,
    links: {
      code: "https://github.com/Praise-Tech-Dev/agricare-backend",
      docs: "https://agricare-backend-9ino.onrender.com/swagger/",
    },
    cover: {
      src: img.agricare,
      alt: "Agricare backend Swagger UI listing the API endpoints.",
      caption: "Swagger API documentation.",
    },
  },
  {
    slug: "sheda-academy",
    title: "Sheda Academy",
    kind: "professional",
    client: "ShedaHouse",
    status: "Delivered during internship · Jan – Mar 2026",
    summary:
      "Built frontend experiences for the ShedaHouse academy platform, presenting training programmes and educational opportunities with a focus on responsive design, navigation and a consistent interface.",
    tech: ["react", "typescript", "tailwind", "vite", "reactRouter"],
    featured: false,
    links: { live: "https://academy.shedahouse.com/" },
    cover: {
      src: img.shedaAcademy,
      alt: "Sheda Academy website home page.",
      caption: "Sheda Academy home page.",
    },
  },
  {
    slug: "autosecure",
    title: "AutoSecure",
    kind: "prototype",
    status: "Prototype · academic group research project",
    summary:
      "A computer-vision prototype that explores detecting situations such as loitering, theft and restricted-area breaches.",
    tech: ["python", "yolo"],
    featured: false,
    note: "A research prototype, not a production security product.",
    links: { code: "https://github.com/Praise-Tech-Dev/AutoSecure" },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug && p.caseStudy);
