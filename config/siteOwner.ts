// Central configuration for site owner branding & content.
// All components should import from here (directly or via helper hooks) instead of hard-coding personal info.

export interface OwnerSocial {
  platform: 'github' | 'linkedin' | 'x' | 'email' | 'website' | 'other';
  url: string;
  label?: string; // Custom display label if different from platform
  icon?: string; // Path to icon if not using a default mapping
}

export interface ExperienceEntry {
  period: string; // e.g. "Jun 2024 - Aug 2024"
  title: string; // Role, e.g. Operations Engineer
  company: string; // Company name
  location?: string; // City or remote
  body: string; // Localized long form paragraph(s) – markdown or plain text
  technologies?: string[];
}

export interface EducationEntry {
  period: string;
  title: string; // Degree / Program
  institution: string;
  location?: string;
  body?: string;
  highlights?: string[];
}

export interface LocalizedOwnerContent {
  locale: string; // 'en' or 'sv'
  profileHeading: string; // "PROFILE" / "PROFIL"
  profileBody: string; // Bio summary
  experienceHeading: string; // Heading label
  educationHeading: string; // Heading label
  skillsHeading: string; // Heading label
  workExperience: ExperienceEntry[];
  education: EducationEntry[];
  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    devops: string[];
    cloud: string[];
    os: string[];
  };
}

export interface CVConfig {
  file: string; // Path under /public e.g. '/cv/Malte_Mindedal_CV.pdf'
  updated: string; // ISO date string or month-year
  title?: string; // Display title if different
}

export interface AvatarConfig {
  src: string; // Primary image path
  alt: string; // Alt text for accessibility
  variants?: string[]; // Additional responsive/alternative images
}

export interface BrandingConfig {
  siteTitle: string; // Metadata title
  description: string; // Metadata description
  productName?: string; // Optional internal / fun OS name
}

export interface SiteOwnerConfig {
  fullName: string;
  firstName: string;
  lastName: string;
  username: string; // Used in virtual FS (/Users/{username}) & terminal prompt
  email: string;
  phone?: string;
  location?: string;
  socials: OwnerSocial[];
  avatar: AvatarConfig;
  cv: CVConfig;
  branding: BrandingConfig;
  locales: string[]; // Supported locales
  fallbackLocale: string; // Fallback if locale missing content
  localized: LocalizedOwnerContent[];
  projects?: ProjectEntry[]; // Optional structured project listing
}

export interface ProjectEntry {
  id: string; // unique key
  name: string;
  year: number;
  description: string; // Short description (fallback)
  localizedDescriptions?: Record<string, string>; // Localized descriptions
  stack?: string[];
  icon?: string; // icon path
  links?: { type: 'github' | 'demo' | 'docs' | 'website'; url: string }[];
  status?: 'completed' | 'in-progress' | 'concept'; // Project status
  featured?: boolean; // Highlight important projects
}

// User-provided data (initial import from CV). Content currently plain text – can later convert selected
// fields to markdown or rich text components.
export const siteOwner: SiteOwnerConfig = {
  fullName: 'Malte Mindedal',
  firstName: 'Malte',
  lastName: 'Mindedal',
  username: 'malte',
  email: 'malte.mindedal@gmail.com',
  phone: '072-312 68 13',
  location: 'Göteborg, Sverige',
  socials: [
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/malte-mindedal/',
      label: 'LinkedIn',
    },
    { platform: 'github', url: 'https://github.com/Tyrowin', label: 'GitHub' },
    { platform: 'x', url: 'https://x.com/Tyrowin', label: 'X / Twitter' },
    {
      platform: 'email',
      url: 'mailto:malte.mindedal@gmail.com',
      label: 'Email',
    },
  ],
  avatar: {
    src: '/images/me.jpg', // Placeholder – replace with new headshot path e.g. '/images/malte.jpg'
    alt: 'Portrait of Malte Mindedal',
  },
  cv: {
    file: '/cv/cv.pdf', // Updated canonical CV route
    updated: '2024-08-01',
    title: 'CV – Malte Mindedal',
  },
  branding: {
    siteTitle: 'Malte Mindedal - Fullstack Developer',
    description:
      'Portfolio of Malte Mindedal – Fullstack developer with a background in IoT, embedded systems, and cloud/backend engineering.',
    productName: 'M-OS',
  },
  locales: ['en', 'sv'],
  fallbackLocale: 'en',
  localized: [
    {
      locale: 'sv',
      profileHeading: 'PROFIL',
      profileBody:
        'Fullstack-utvecklare med bakgrund inom IoT och inbyggda system. Jag brinner för att bygga robusta lösningar från hårdvarunära datainsamling upp till skalbara backend- och webbgränssnitt. Jag gillar att optimera flöden, automatisera repetitiva moment och skriva kod som är lätt att underhålla och testa.',
      experienceHeading: 'ARBETSLIVSERFARENHET I URVAL',
      educationHeading: 'UTBILDNING',
      skillsHeading: 'KOMPETENSER',
      workExperience: [
        {
          period: 'Jun 2024 - Aug 2024',
          title: 'Driftingenjör',
          company: 'Stena Fastigheter AB',
          location: 'Göteborg',
          body: 'Analys och verifiering av IMD-teknik i hyres- och bostadsrätter. Besök hos hyresgäster för kontroll av IMD-teknik (vatten- och elmätare). Testning av funktionalitet, felsökning av IMD-utröstning. Konfigurering av M-bus gateways på plats tillsammans med entreprenörer.',
          technologies: ['IMD', 'M-bus'],
        },
        {
          period: 'Jan 2024 - May 2024',
          title: 'Back-End utvecklare LIA',
          company: 'Stena Fastigheter AB',
          location: 'Göteborg',
          body: 'Programmering mot API för automatisk hämtning av data. Användning av Azure cloud tjänster för databaslagring och API-nycklar. Avkodning av hexadecimala M-bus meddelanden. Hantering av dataflöden och format för compliance. Automation av provisionering av nya sensorer.',
          technologies: ['Azure', 'API', 'M-bus', 'Automation'],
        },
      ],
      education: [
        {
          period: 'Aug 2022 - Jun 2024',
          title: 'IoT Developer (Fullstack Focus)',
          institution: 'KYH',
          location: 'Göteborg',
          body: '2 års YH-utbildning fokuserad på utveckling och problemlösning inom inbyggda system och sensorer. Kurser i Python, C++ och SQL. Examensarbete: V2X – trafiksäkerhet och miljöfördelar i ITS.',
        },
        {
          period: 'Aug 2021 - May 2022',
          title: 'Tekniskt Basår',
          institution: 'Chalmers Tekniska Högskola',
          location: 'Göteborg',
          body: 'Förberedande teknisk utbildning i Matematik, Matlab, Fysik och Kemi. Avslutades i förtid.',
        },
        {
          period: 'Aug 2017 - May 2020',
          title: 'Gymnasieutbildning – Personbilstekniker',
          institution: 'Motorbranchens Tekniska Gymnasium',
          location: 'Göteborg',
          body: 'Yrkesexamen med högskolebehörighet. Fokus på elektrifiering och avancerad felsökning i moderna fordon.',
        },
      ],
      skills: {
        languages: ['Python', 'C++', 'TypeScript', 'HTML', 'CSS'],
        frameworks: ['React', 'Next.js', 'tRPC'],
        databases: ['PostgreSQL', 'MySQL', 'Convex', 'Redis'],
        devops: ['Git', 'GitHub', 'Docker'],
        cloud: ['Azure', 'AWS', 'Vercel'],
        os: ['Windows', 'Linux'],
      },
    },
    {
      locale: 'en',
      profileHeading: 'PROFILE',
      profileBody:
        'Fullstack developer with a background in IoT and embedded systems. I enjoy designing and building end-to-end solutions — from low-level sensor data ingestion up through scalable backend services and intuitive web interfaces. I focus on maintainable architecture, automation, and efficient developer workflows.',
      experienceHeading: 'WORK EXPERIENCE (SELECTED)',
      educationHeading: 'EDUCATION',
      skillsHeading: 'SKILLS',
      workExperience: [
        {
          period: 'Jun 2024 - Aug 2024',
          title: 'Operations Engineer',
          company: 'Stena Fastigheter AB',
          location: 'Gothenburg',
          body: 'Analysis and verification of IMD technology in rental and condominium apartments. Tenant visits for IMD (water & electricity meters) inspection. Functionality testing and troubleshooting. Configuration of on-site M-bus gateways with contractors.',
          technologies: ['IMD', 'M-bus'],
        },
        {
          period: 'Jan 2024 - May 2024',
          title: 'Back-End Developer (Internship)',
          company: 'Stena Fastigheter AB',
          location: 'Gothenburg',
          body: 'API programming for automated data retrieval. Use of Azure cloud services for database storage and API key handling. Decoding hexadecimal M-bus messages from specific water meters. Managing data flows and formats for system compliance. Automating provisioning of newly installed sensors for water, electricity and energy readings.',
          technologies: ['Azure', 'API', 'M-bus', 'Automation'],
        },
      ],
      education: [
        {
          period: 'Aug 2022 - Jun 2024',
          title: 'IoT Developer (Fullstack Focus)',
          institution: 'KYH',
          location: 'Gothenburg',
          body: '2-year higher vocational program focusing on embedded systems & sensors. Courses in Python, C++ and SQL. Thesis: V2X – traffic safety and environmental benefits in ITS.',
        },
        {
          period: 'Aug 2021 - May 2022',
          title: 'Technical Preparatory Year',
          institution: 'Chalmers University of Technology',
          location: 'Gothenburg',
          body: 'Preparatory technical education in Mathematics, Matlab programming, Physics and Chemistry. Completed early.',
        },
        {
          period: 'Aug 2017 - May 2020',
          title: 'Secondary Education – Passenger Car Technician',
          institution: 'Motorbranchens Tekniska Gymnasium',
          location: 'Gothenburg',
          body: 'Vocational degree with university entrance qualification. Focus on electrification and advanced troubleshooting in modern vehicles.',
        },
      ],
      skills: {
        languages: ['Python', 'C++', 'TypeScript', 'HTML', 'CSS'],
        frameworks: ['React', 'Next.js', 'tRPC'],
        databases: ['PostgreSQL', 'MySQL', 'Convex', 'Redis'],
        devops: ['Git', 'GitHub', 'Docker'],
        cloud: ['Azure', 'AWS', 'Vercel'],
        os: ['Windows', 'Linux'],
      },
    },
  ],
  projects: [
    {
      id: 'sensor-platform',
      name: 'IoT Sensor Data Platform',
      year: 2024,
      description:
        'Data ingestion & processing pipeline for M-Bus / sensor telemetry with automated provisioning and Azure-based storage & API layer.',
      localizedDescriptions: {
        en: 'Enterprise-grade IoT data platform for automated sensor telemetry ingestion, processing, and storage. Built with Azure cloud services, featuring M-Bus protocol decoding, automated device provisioning, and RESTful API endpoints for real-time data access. Handles thousands of daily sensor readings from water, electricity, and energy meters with high reliability and scalability.',
        sv: 'IoT-dataplattform i företagsklass för automatiserad sensortelemetri-insamling, bearbetning och lagring. Byggd med Azure-molntjänster med M-Bus-protokollavkodning, automatisk enhetsprovisionering och RESTful API-endpoints för realtidsdataåtkomst. Hanterar tusentals dagliga sensoravläsningar från vatten-, el- och energimätare med hög tillförlitlighet och skalbarhet.',
      },
      stack: ['Azure', 'Python', 'API', 'M-Bus', 'Automation'],
      icon: '/icons/project-portfolio-2021.png',
      links: [
        { type: 'github', url: 'https://github.com/Tyrowin/sensor-platform' },
      ],
      status: 'completed',
      featured: true,
    },
    {
      id: 'pyfetch',
      name: 'PyFetch HTTP Client',
      year: 2023,
      description:
        'Lightweight command-line interface and Python library for making HTTP requests with comprehensive features.',
      localizedDescriptions: {
        en: 'Lightweight HTTP client built in Python featuring both CLI and library interfaces. Supports all major HTTP methods (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS) with JSON data handling, customizable timeouts, automatic retries, and verbose debugging mode. Includes progress bars for large downloads, comprehensive error handling, and detailed response formatting. Built with focus on simplicity and developer experience.',
        sv: 'Lättviktig HTTP-klient byggd i Python med både CLI- och biblioteksgränssnitt. Stöder alla större HTTP-metoder (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS) med JSON-datahantering, anpassningsbara timeouts, automatiska återförsök och utförligt debug-läge. Inkluderar progress-staplar för stora nedladdningar, omfattande felhantering och detaljerad svarsformatering. Byggd med fokus på enkelhet och utvecklarupplevelse.',
      },
      stack: ['Python', 'CLI', 'HTTP', 'JSON'],
      icon: '/icons/project-pcparts.png',
      links: [{ type: 'github', url: 'https://github.com/Tyrowin/pyfetch' }],
      status: 'completed',
      featured: false,
    },
    {
      id: 'build-your-own-redis',
      name: 'Build Your Own Redis (C++)',
      year: 2025,
      description:
        'C++ implementation of a toy Redis clone handling basic commands like PING, SET and GET through Redis protocol.',
      localizedDescriptions: {
        en: 'Educational C++ project implementing a Redis clone from scratch as part of the CodeCrafters challenge. Features basic Redis commands (PING, SET, GET), event loop implementation, and Redis protocol parsing. Built to understand low-level network programming, memory management, and database internals. Demonstrates proficiency in C++ systems programming and understanding of key-value store architecture.',
        sv: 'Utbildningsprojekt i C++ som implementerar en Redis-klon från grunden som en del av CodeCrafters-utmaningen. Har grundläggande Redis-kommandon (PING, SET, GET), event loop-implementering och Redis-protokollparsning. Byggd för att förstå lågnivå-nätverksprogrammering, minneshantering och databasinterna. Visar färdigheter i C++ systemprogrammering och förståelse för nyckel-värde-lagringsarkitektur.',
      },
      stack: ['C++', 'Redis Protocol', 'Event Loops', 'Systems Programming'],
      icon: '/icons/skills/redis.svg',
      links: [
        {
          type: 'github',
          url: 'https://github.com/Tyrowin/codecrafters-redis-cpp',
        },
      ],
      status: 'completed',
      featured: false,
    },
    {
      id: 'portfolio-os',
      name: 'Desktop Portfolio (This site)',
      year: 2025,
      description:
        'Windowed desktop metaphor portfolio built with Next.js, virtual file system, terminal & multi-application architecture.',
      localizedDescriptions: {
        en: 'Interactive desktop-style portfolio website featuring a complete windowed operating system experience. Built with Next.js and TypeScript, includes a virtual file system, working terminal with custom shell commands, drag-and-drop functionality, and multiple applications. Features internationalization (Swedish/English), responsive design, and modern web technologies while maintaining the nostalgic feel of classic desktop environments.',
        sv: 'Interaktiv portfolio-webbplats i skrivbordsstil med en komplett fönsterbaserad operativsystemupplevelse. Byggd med Next.js och TypeScript, inkluderar ett virtuellt filsystem, fungerande terminal med anpassade shell-kommandon, drag-and-drop-funktionalitet och flera applikationer. Har internationalisering (svenska/engelska), responsiv design och moderna webbteknologier samtidigt som den behåller känslan av klassiska skrivbordsmiljöer.',
      },
      stack: ['Next.js', 'TypeScript', 'React', 'CSS3', 'HTML'],
      icon: '/icons/project-portfolio-2024.png',
      links: [
        { type: 'github', url: 'https://github.com/Tyrowin/portfolio' },
        { type: 'website', url: 'https://maltemindedal.dev' },
      ],
      status: 'completed',
      featured: true,
    },
    {
      id: 'v2x-thesis',
      name: 'V2X Traffic Safety Research',
      year: 2022,
      description:
        'Thesis project analyzing Vehicle-to-Everything communication benefits for traffic safety and environmental impact in Intelligent Transportation Systems.',
      localizedDescriptions: {
        en: 'Comprehensive research project examining V2X (Vehicle-to-Everything) communication technologies and their potential impact on traffic safety and environmental sustainability. The study analyzes current ITS (Intelligent Transportation Systems) implementations, evaluates communication protocols, and models potential improvements in accident prevention and emissions reduction through connected vehicle technologies.',
        sv: 'Omfattande forskningsprojekt som undersöker V2X-kommunikationsteknologier (Vehicle-to-Everything) och deras potentiella inverkan på trafiksäkerhet och miljöhållbarhet. Studien analyserar nuvarande ITS-implementationer (Intelligenta Transportsystem), utvärderar kommunikationsprotokoll och modellerar potentiella förbättringar inom olycksförebyggande och utsläppsminskning genom uppkopplade fordonsteknologier.',
      },
      stack: ['Research', 'ITS', 'V2X', 'Analysis'],
      icon: '/icons/project-j-script.png',
      status: 'completed',
      featured: false,
    },
  ],
};

export function getOwner(): SiteOwnerConfig {
  return siteOwner;
}

export function getOwnerContent(locale: string): LocalizedOwnerContent {
  const owner = getOwner();
  const content = owner.localized.find(l => l.locale === locale);
  if (content) {
    return content;
  }
  return (
    owner.localized.find(l => l.locale === owner.fallbackLocale) ??
    owner.localized[0]
  );
}

export function getSupportedLocales(): string[] {
  return getOwner().locales;
}
