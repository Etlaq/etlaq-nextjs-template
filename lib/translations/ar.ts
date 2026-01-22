// Arabic translations - Saudi Arabic (ar-SA)
export const ar = {
  // Common
  common: {
    getStarted: 'ابدأ الآن',
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    signUp: 'سجّل الآن',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    fullName: 'الاسم الكامل',
    id: 'المعرّف',
    loading: 'جارٍ التحميل...',
    error: 'حدث خطأ',
    retry: 'إعادة المحاولة',
  },

  // Hero Section
  hero: {
    badge: 'من إطلاق ستوديو',
    title1: 'أطلق',
    title2: 'رؤيتك',
    title3: 'للعالم',
    subtitle: 'كل ما تحتاجه لتحويل أفكارك إلى واقع.',
    subtitleHighlight: 'ابدأ البناء في دقائق.',
  },

  // Trust Indicators
  trust: {
    freeToStart: 'مجاني للبدء',
    noCreditCard: 'لا حاجة لبطاقة ائتمان',
    cancelAnytime: 'إلغاء في أي وقت',
    ssl: 'تشفير SSL 256-bit',
    gdpr: 'متوافق مع GDPR',
    uptime: '99.9% وقت التشغيل',
    cdn: 'شبكة CDN عالمية',
    secure: 'آمن ومشفر',
    fast: 'سريع',
    free: 'مجاني',
  },

  // Features Section
  features: {
    sectionNumber: '٠١ / المميزات',
    title: 'لماذا',
    titleHighlight: 'تختارنا',
    subtitle: 'مبني بأحدث التقنيات وأفضل الممارسات',
    lightning: {
      title: 'سرعة البرق',
      desc: 'محسّن للسرعة مع نشر حافة وتخزين مؤقت ذكي.',
    },
    secure: {
      title: 'آمن افتراضياً',
      desc: 'أمان على مستوى المؤسسات مع مصادقة JWT والتشفير.',
    },
    scalable: {
      title: 'قابل للتوسع بلا حدود',
      desc: 'ينمو مع عملك من النموذج الأولي إلى الإنتاج.',
    },
  },

  // Stats Section
  stats: {
    activeUsers: 'مستخدم نشط',
    uptime: 'وقت التشغيل',
    countries: 'دولة',
    rating: 'التقييم',
  },

  // Process Section
  process: {
    sectionNumber: '٠٢ / العملية',
    title: 'كيف',
    titleHighlight: 'يعمل',
    step1: {
      title: 'سجّل',
      desc: 'أنشئ حسابك في ثوانٍ. لا حاجة لبطاقة ائتمان.',
    },
    step2: {
      title: 'خصّص',
      desc: 'خصّص إعداداتك واربط خدماتك.',
    },
    step3: {
      title: 'أطلق',
      desc: 'ابدأ العمل ونمّي أعمالك.',
    },
  },

  // Testimonials Section
  testimonials: {
    sectionNumber: '٠٣ / آراء العملاء',
    title: 'محبوب من',
    titleHighlight: 'العملاء',
  },

  // CTA Section
  cta: {
    badge: 'ابدأ رحلتك اليوم',
    title: 'مستعد لبناء',
    titleHighlight: 'شيء مذهل؟',
    subtitle: 'انضم لآلاف الفرق الذين يثقون بنا لتشغيل أعمالهم.',
    subtitleExtra: 'ابدأ في دقائق مع خطتنا المجانية.',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
  },

  // Footer
  footer: {
    brand: 'إطلاق ستوديو',
    tagline: 'نبني الأعمال الرقمية',
    features: 'المميزات',
    pricing: 'الأسعار',
    about: 'عنّا',
    contact: 'تواصل معنا',
    privacy: 'الخصوصية',
    terms: 'الشروط',
    copyright: 'إطلاق ستوديو. جميع الحقوق محفوظة.',
  },

  // Auth Pages
  auth: {
    welcomeBack: 'مرحباً بعودتك،',
    authenticated: 'تم تسجيل دخولك بنجاح',
    joinUs: 'انضم إلينا',
    createAccount: 'إنشاء حساب',
    createAccountDesc: 'أدخل معلوماتك للبدء',
    creatingAccount: 'جارٍ إنشاء الحساب...',
    signingIn: 'جارٍ تسجيل الدخول...',
    signInDesc: 'أدخل بياناتك للوصول إلى حسابك',
    noAccount: 'ليس لديك حساب؟',
    hasAccount: 'لديك حساب بالفعل؟',
    backToHome: 'العودة للرئيسية',
    enterEmail: 'أدخل بريدك الإلكتروني',
    enterPassword: 'أدخل كلمة المرور',
    enterFullName: 'أدخل اسمك الكامل',
    confirmYourPassword: 'أكّد كلمة المرور',
    passwordMismatch: 'كلمات المرور غير متطابقة',
    passwordTooShort: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
    registrationFailed: 'فشل إنشاء الحساب',
    loginFailed: 'فشل تسجيل الدخول',
    unexpectedError: 'حدث خطأ غير متوقع',
    quickAccess: 'دخول سريع',
  },
} as const;

// Helper type to convert literal types to string
type DeepString<T> = {
  [K in keyof T]: T[K] extends object ? DeepString<T[K]> : string;
};

export type TranslationKeys = DeepString<typeof ar>;
