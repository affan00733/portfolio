export type Role = 'aiml' | 'diffusion' | 'datasci' | 'dataeng' | 'sde';

export const ROLE_META: Record<Role, { label: string; short: string; color: string }> = {
  aiml: { label: 'AI / ML Engineering', short: 'AI/ML', color: '#22D3EE' },
  diffusion: { label: 'Computer Vision & Diffusion', short: 'CV / Diffusion', color: '#A78BFA' },
  datasci: { label: 'Data Science & Analytics', short: 'Data Sci', color: '#34D399' },
  dataeng: { label: 'Data Engineering & MLOps', short: 'Data Eng', color: '#FBBF24' },
  sde: { label: 'Software Engineering', short: 'SDE', color: '#FB7185' },
};

export const ROLE_ORDER: Role[] = ['aiml', 'diffusion', 'datasci', 'dataeng', 'sde'];

export interface Profile {
  name: string;
  shortName: string;
  tagline: string;
  subtitleMetrics: string[];
  bio: string[];
  email: string;
  phone: string;
  location: string;
  linkedin: { label: string; url: string };
  github: { label: string; url: string };
  scholar?: { label: string; url: string };
  /** Public 1-page AI/ML résumé (served from /public/resumes/). */
  resumePath: string;
  /** Full academic CV (multi-page) — for academic recruiters and depth review. */
  cvPath: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  gpa?: string;
  highlights: string[];
  advisor?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  roles: Role[];
  earlier?: boolean;
  badge?: string;
}

export type PublicationVenue =
  | { kind: 'conference'; venue: string; year: number; status?: string }
  | { kind: 'journal'; venue: string; year: number }
  | { kind: 'preprint'; venue: string; year: number }
  | { kind: 'in-prep'; venue: string; year: number };

export interface PublicationEntry {
  id: string;
  title: string;
  authors: string;
  venue: PublicationVenue;
  summary: string;
  award?: string;
  link?: { label: string; url: string };
  highlight?: boolean;
  leadAuthor?: boolean;
}

export interface ProjectEntry {
  id: string;
  title: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
  roles: Role[];
  link?: { label: string; url: string };
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  label: string;
  items: string[];
}

export interface MarqueeSkill {
  name: string;
  iconKey?: string;
}

export interface AwardEntry {
  id: string;
  title: string;
  detail?: string;
  year?: string;
  group: 'research' | 'industry' | 'hackathon-win' | 'hackathon-finalist' | 'community';
}

export interface WhatIDoCard {
  id: string;
  role: Role;
  title: string;
  description: string;
  examples: string[];
}

export interface ResumeVariant {
  id: string;
  label: string;
  description: string;
  file: string;
  primaryRole: Role | 'all';
}
