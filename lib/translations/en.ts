// English translations
import type { TranslationKeys } from './ar';

export const en = {
  // Common
  common: {
    getStarted: 'Get Started',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    signUp: 'Sign up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    id: 'ID',
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
  },

  // Hero Section
  hero: {
    badge: 'Powered by Etlaq Studio',
    title1: 'Launch',
    title2: 'Your Vision',
    title3: 'Today',
    subtitle: 'Everything you need to bring your ideas to life.',
    subtitleHighlight: 'Start building in minutes.',
  },

  // Trust Indicators
  trust: {
    freeToStart: 'Free to start',
    noCreditCard: 'No credit card',
    cancelAnytime: 'Cancel anytime',
    ssl: '256-bit SSL',
    gdpr: 'GDPR Compliant',
    uptime: '99.9% Uptime',
    cdn: 'Global CDN',
    secure: 'Secure',
    fast: 'Fast',
    free: 'Free',
  },

  // Features Section
  features: {
    sectionNumber: '01 / Features',
    title: 'Why choose',
    titleHighlight: 'us',
    subtitle: 'Built with modern technologies and best practices',
    lightning: {
      title: 'Lightning Fast',
      desc: 'Optimized for speed with edge deployment and smart caching.',
    },
    secure: {
      title: 'Secure by Default',
      desc: 'Enterprise-grade security with JWT authentication and encryption.',
    },
    scalable: {
      title: 'Infinitely Scalable',
      desc: 'Grows with your business from prototype to production.',
    },
  },

  // Stats Section
  stats: {
    activeUsers: 'Active Users',
    uptime: 'Uptime',
    countries: 'Countries',
    rating: 'Rating',
  },

  // Process Section
  process: {
    sectionNumber: '02 / Process',
    title: 'How it',
    titleHighlight: 'works',
    step1: {
      title: 'Sign Up',
      desc: 'Create your account in seconds. No credit card required.',
    },
    step2: {
      title: 'Configure',
      desc: 'Customize your settings and connect your services.',
    },
    step3: {
      title: 'Launch',
      desc: 'Go live and start growing your business.',
    },
  },

  // Testimonials Section
  testimonials: {
    sectionNumber: '03 / Testimonials',
    title: 'Loved by',
    titleHighlight: 'Customers',
  },

  // CTA Section
  cta: {
    badge: 'Start your journey today',
    title: 'Ready to build',
    titleHighlight: 'something amazing?',
    subtitle: 'Join thousands of teams who trust us to power their businesses.',
    subtitleExtra: 'Get started in minutes with our free plan.',
    emailPlaceholder: 'Enter your email',
    alreadyHaveAccount: 'Already have an account?',
  },

  // Footer
  footer: {
    brand: 'Etlaq Studio',
    tagline: 'Building digital businesses',
    features: 'Features',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: 'Etlaq Studio. All rights reserved.',
  },

  // Auth Pages
  auth: {
    welcomeBack: 'Welcome back,',
    authenticated: 'You are authenticated',
    joinUs: 'Join us',
    createAccount: 'Create Account',
    createAccountDesc: 'Enter your information to get started',
    creatingAccount: 'Creating account...',
    signingIn: 'Signing in...',
    signInDesc: 'Enter your credentials to access your account',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    backToHome: 'Back to home',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    enterFullName: 'Enter your full name',
    confirmYourPassword: 'Confirm your password',
    passwordMismatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 6 characters long',
    registrationFailed: 'Registration failed',
    loginFailed: 'Login failed',
    unexpectedError: 'An unexpected error occurred',
    quickAccess: 'Quick Access',
  },
} as const satisfies TranslationKeys;
