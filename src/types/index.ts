export interface Stat {
  value: string;
  label: string;
  icon: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface PersonalInfo {
  name: string;
  titles: string[];
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  regions: string;
  stats: Stat[];
  socialLinks: SocialLink[];
  cvUrl: string;
  avatar: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyColor: string;
  period: string;
  current: boolean;
  flag: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  university: string;
}

export interface Skill {
  name: string;
  percentage?: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  accentColor: string;
  skills: Skill[];
}

export interface TechTag {
  name: string;
  primary: boolean;
}

export interface DashboardScreenshot {
  src: string;
  title: string;
  caption: string;
  alt: string;
}

export interface Project {
  color: string;
  problem: string;
  solutionApproach: string[];
  findings: string[];
  recommendation: string;
  limitation: string;
  implementation: string;
  dataNote: string;
  datasetUrl: string;
  screenshots: DashboardScreenshot[];
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  flag: string;
  stack: string[];
  caseStudy: string;
  highlights: string[];
  imageUrl?: string;
  /** Real app screenshots (e.g. from the App Store / Play Store listing). When present, the card shows them directly and the modal renders a scrollable gallery. */
  images?: string[];
  /** Up to 3 raw device screenshots to render inside the fanned phone mockup on the card. When set, the card uses the PhoneShowcase with real screens instead of the generic content. */
  phoneScreenshots?: string[];
  /** App icon shown in the modal header for projects with real screenshots. */
  iconUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  liveUrl?: string;
}

export type ProjectCategory =
  | 'All'
  | 'Health'
  | 'Food & Delivery'
  | 'Social'
  | 'Fitness'
  | 'Finance'
  | 'Emergency'
  | 'Marketplace'
  | 'Lifestyle'
  | 'E-Commerce'
  | 'Education'
  | 'Water Utility'
  | 'Aviation'
  | 'Security'
  | 'Services'
  | 'Logistics'
  | 'Productivity'
  | 'Music'
  | 'Utility';

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
