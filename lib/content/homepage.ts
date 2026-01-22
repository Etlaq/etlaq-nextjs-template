// Homepage content data - separated from UI logic for maintainability
import { Zap, Shield, Layers, Globe, TrendingUp, Rocket, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Feature cards data
export interface Feature {
  id: string;
  icon: LucideIcon;
  number: string;
  gradient: string;
  translationKey: 'lightning' | 'secure' | 'scalable';
}

export const features: Feature[] = [
  {
    id: 'lightning',
    icon: Zap,
    number: '01',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    translationKey: 'lightning',
  },
  {
    id: 'secure',
    icon: Shield,
    number: '02',
    gradient: 'from-green-500/20 to-emerald-500/20',
    translationKey: 'secure',
  },
  {
    id: 'scalable',
    icon: Layers,
    number: '03',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    translationKey: 'scalable',
  },
];

// Stats data
export interface Stat {
  id: string;
  value: string;
  icon: LucideIcon;
  translationKey: 'activeUsers' | 'uptime' | 'countries' | 'rating';
}

export const stats: Stat[] = [
  { id: 'users', value: '+10K', icon: Globe, translationKey: 'activeUsers' },
  { id: 'uptime', value: '99.9%', icon: TrendingUp, translationKey: 'uptime' },
  { id: 'countries', value: '+50', icon: Rocket, translationKey: 'countries' },
  { id: 'rating', value: '4.9/5', icon: Star, translationKey: 'rating' },
];

// Process steps data
export interface ProcessStep {
  id: string;
  step: string;
  icon: LucideIcon;
  translationKey: 'step1' | 'step2' | 'step3';
}

export const processSteps: ProcessStep[] = [
  { id: 'signup', step: '01', icon: Rocket, translationKey: 'step1' },
  { id: 'configure', step: '02', icon: Layers, translationKey: 'step2' },
  { id: 'launch', step: '03', icon: TrendingUp, translationKey: 'step3' },
];

// Testimonials data
export interface Testimonial {
  id: string;
  quoteAr: string;
  quoteEn: string;
  authorAr: string;
  authorEn: string;
  roleAr: string;
  roleEn: string;
  rating: number;
  avatar: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 'noura',
    quoteAr: 'غيّرت هذه المنصة طريقة بناء منتجاتنا. السرعة والموثوقية لا مثيل لها.',
    quoteEn: 'This platform transformed how we build products. The speed and reliability are unmatched.',
    authorAr: 'نورة القحطاني',
    authorEn: 'Noura Al-Qahtani',
    roleAr: 'مديرة التقنية، شركة التقنية السعودية',
    roleEn: 'CTO, Saudi Tech Co.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    verified: true,
  },
  {
    id: 'abdulrahman',
    quoteAr: 'أخيراً، حل يتوسع مع احتياجاتنا. تجربة المطور استثنائية.',
    quoteEn: 'Finally, a solution that scales with our needs. The developer experience is phenomenal.',
    authorAr: 'عبدالرحمن الشمري',
    authorEn: 'Abdulrahman Al-Shammari',
    roleAr: 'مطور رئيسي، نيوم تك',
    roleEn: 'Lead Developer, NEOM Tech',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    verified: true,
  },
];

// Footer links
export interface FooterLink {
  id: string;
  translationKey: 'features' | 'pricing' | 'about' | 'contact';
  href: string;
}

export const footerLinks: FooterLink[] = [
  { id: 'features', translationKey: 'features', href: '#' },
  { id: 'pricing', translationKey: 'pricing', href: '#' },
  { id: 'about', translationKey: 'about', href: '#' },
  { id: 'contact', translationKey: 'contact', href: '#' },
];

// Trust indicators for hero
export interface TrustIndicator {
  id: string;
  translationKey: 'freeToStart' | 'noCreditCard' | 'cancelAnytime';
}

export const trustIndicators: TrustIndicator[] = [
  { id: 'free', translationKey: 'freeToStart' },
  { id: 'nocard', translationKey: 'noCreditCard' },
  { id: 'cancel', translationKey: 'cancelAnytime' },
];

// Trust badges for CTA section
export interface TrustBadge {
  id: string;
  icon: LucideIcon;
  translationKey: 'ssl' | 'gdpr' | 'uptime' | 'cdn';
}

export const trustBadges: TrustBadge[] = [
  { id: 'ssl', icon: Shield, translationKey: 'ssl' },
  { id: 'gdpr', icon: Zap, translationKey: 'gdpr' },
  { id: 'uptime', icon: Zap, translationKey: 'uptime' },
  { id: 'cdn', icon: Globe, translationKey: 'cdn' },
];
