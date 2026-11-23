/** Everything that identifies the site owner lives here, in one place. */
export const site = {
  name: "Praise Adeogun",
  title: "Frontend-Focused Software Engineer",
  intro:
    "I build responsive, pixel-perfect web applications using React, TypeScript and modern web technologies. I enjoy solving complex problems, writing clean and maintainable code, and creating intuitive experiences that make applications easier to use.",
  about: [
    "I'm a Computer Science student at the University of Ibadan and a frontend-focused software engineer who enjoys building functional, responsive web applications.",
    "Through my software engineering internship at Crop2Cash, I've gained experience working with frontend applications, API integration, dashboard interfaces and data presentation. Previously, at ShedaHouse, I contributed to the development of a company website and an academy platform, strengthening my experience with React and modern frontend development.",
    "I enjoy understanding how applications work beyond the interface, from managing application state to integrating APIs and structuring maintainable code. I'm currently expanding my backend engineering skills with Python and Django as I work towards becoming a well-rounded software engineer.",
  ],
  location: "Ibadan, Nigeria",
  email: "spraiseadeogun2@gmail.com",
  phone: "+234 916 178 4554",
  phoneHref: "tel:+2349161784554",
  github: "https://github.com/Praise-Tech-Dev",
  linkedin: "https://www.linkedin.com/in/praise-adeogun-a008b72a6/",
  /**
   * RESUME: to update it, replace public/resume/Praise-Adeogun-Resume.pdf
   * (keep the file name) and redeploy. Or set VITE_RESUME_URL to an external link.
   */
  resumeUrl: import.meta.env.VITE_RESUME_URL || "/resume/Praise-Adeogun-Resume.pdf",
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];

/** The five technologies in the slim strip under the hero. */
export const heroStack = ["react", "typescript", "tailwind", "python", "django"] as const;
