import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string; // Changed to string for slug
  title: string;
  description: string;
  longDescription: string; // Added for detail page
  icon: LucideIcon;
  gradient: string;
  videoUrl: string; // Added for hero video
  features: string[];
  featured?: boolean;
  techStack: string[];
}

export enum ProjectCategory {
  ALL = 'All',
  WEB = 'Web',
  DESIGN = 'Design',
  AI = 'AI'
}

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
}

export enum BillingCycle {
  MONTHLY = 'Monthly Retainer',
  ONE_TIME = 'One-Time Project'
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}