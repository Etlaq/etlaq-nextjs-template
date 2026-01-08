'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button, Card, Spinner } from '@heroui/react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ScrollReveal } from '@/components/ScrollReveal';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Rocket,
  Zap,
  Shield,
  Layers,
  Star,
  Sparkles,
  Globe,
  TrendingUp,
} from 'lucide-react';

export default function Home() {
  const { user, logout, loading } = useAuth();
  const { t, isArabic } = useLanguage();

  // Arrow icon based on language direction
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-background">
        {/* Theme & Language toggles */}
        <div className="fixed top-6 start-6 z-50 flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <div className="max-w-4xl mx-auto px-6 py-20">
          <ScrollReveal>
            <Card className="border border-border/50 bg-gradient-to-br from-card to-primary/5">
              <Card.Header>
                <Card.Title className="heading-display text-3xl">
                  {t('مرحباً بعودتك،', 'Welcome back,')} {user.name}
                </Card.Title>
                <Card.Description>{t('تم تسجيل دخولك بنجاح', 'You are authenticated')}</Card.Description>
              </Card.Header>
              <Card.Content className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t('البريد الإلكتروني', 'Email')}</span>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('المعرّف', 'ID')}</span>
                    <p className="font-mono text-xs">{user.id}</p>
                  </div>
                </div>
              </Card.Content>
              <Card.Footer>
                <Button onPress={logout} variant="secondary" className="hover:scale-105 transition-transform">
                  {t('تسجيل الخروج', 'Sign Out')}
                </Button>
              </Card.Footer>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Fixed Theme & Language Toggles */}
      <div className="fixed top-6 start-6 z-50 flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 animate-gradient-slow" />
        <div className="absolute inset-0 bg-grid-animated opacity-50" />

        {/* Morphing gradient blobs */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-gradient-to-r from-primary/30 to-primary/10 blur-[100px] animate-morph" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-gradient-to-l from-primary/20 to-transparent blur-[80px] animate-morph" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] animate-pulse" />

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full particle particle-1" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-primary/50 rounded-full particle particle-2" />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-primary/30 rounded-full particle particle-3" />
        <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-primary/40 rounded-full particle particle-4" />
        <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-primary/20 rounded-full particle particle-5" />

        {/* Twinkling stars */}
        <div className="absolute top-32 right-1/4 w-1 h-1 bg-primary rounded-full animate-twinkle" />
        <div className="absolute top-1/2 left-20 w-1 h-1 bg-primary/60 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 right-40 w-1 h-1 bg-primary/40 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />

        {/* Orbiting decorative rings */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-primary/10 rounded-full animate-spin-slow" />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-primary/5 rounded-full animate-spin-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-primary/5 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }} />

        {/* Container with vertical lines */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 container-lines">
          <div className="text-center space-y-8">
            {/* Badge */}
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm text-sm shadow-lg shadow-primary/5">
                <Rocket className="h-4 w-4 text-primary" />
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-medium">
                  {t('من إطلاق ستوديو', 'Powered by Etlaq Studio')}
                </span>
                <Sparkles className="h-3 w-3 text-primary/60" />
              </span>
            </ScrollReveal>

            {/* Main heading with glow */}
            <ScrollReveal delay={100} className="relative">
              {/* Animated glow behind text */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse" />
              <h1 className="relative heading-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
                <span className="text-foreground">{t('أطلق', 'Launch')}</span>
                <span className="heading-tall block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-text-gradient text-glow">
                  {t('رؤيتك', 'Your Vision')}
                </span>
                <span className="text-foreground">{t('للعالم', 'Today')}</span>
              </h1>
            </ScrollReveal>

            {/* Subheading */}
            <ScrollReveal delay={200}>
              <p className="max-w-xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
                {t('كل ما تحتاجه لتحويل أفكارك إلى واقع.', 'Everything you need to bring your ideas to life.')}
                <span className="text-foreground font-medium"> {t('ابدأ البناء في دقائق.', 'Start building in minutes.')}</span>
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={300} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/register" className="group">
                <div className="relative">
                  {/* Border beam container */}
                  <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-beam" />
                  <Button
                    size="lg"
                    variant="primary"
                    className="relative rounded-full px-10 py-6 bg-gradient-to-r from-primary via-primary/90 to-primary shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-100 overflow-hidden"
                  >
                    {/* Inner shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    <span className="relative z-10 flex items-center font-semibold text-base">
                      {t('ابدأ الآن', 'Get Started')}
                      <ArrowIcon className={`${isArabic ? 'me-2' : 'ms-2'} h-5 w-5 group-hover:${isArabic ? '-translate-x-1' : 'translate-x-1'} transition-transform`} />
                    </span>
                  </Button>
                </div>
              </Link>
              <Link href="/login" className="group">
                <div className="relative">
                  {/* Border beam container */}
                  <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-beam" />
                  <Button
                    size="lg"
                    variant="secondary"
                    className="relative rounded-full px-10 py-6 bg-background/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:scale-105 active:scale-100 overflow-hidden"
                  >
                    {/* Inner shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    <span className="relative z-10 flex items-center font-semibold text-base">
                      {t('تسجيل الدخول', 'Sign In')}
                    </span>
                  </Button>
                </div>
              </Link>
            </ScrollReveal>

            {/* Trust indicators */}
            <ScrollReveal delay={400} className="pt-12">
              <div className="flex flex-wrap justify-center gap-8 text-sm">
                {[
                  { icon: Check, textAr: 'مجاني للبدء', textEn: 'Free to start' },
                  { icon: Check, textAr: 'لا حاجة لبطاقة ائتمان', textEn: 'No credit card' },
                  { icon: Check, textAr: 'إلغاء في أي وقت', textEn: 'Cancel anytime' },
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{t(item.textAr, item.textEn)}</span>
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2 bg-background/50 backdrop-blur-sm">
            <div className="w-1.5 h-3 bg-gradient-to-b from-primary to-primary/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 border-t border-border/50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 container-lines">
          {/* Section header */}
          <div className="text-center mb-20">
            <ScrollReveal>
              <span className="number-detail inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t('٠١ / المميزات', '01 / Features')}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl mt-6">
                {t('لماذا', 'Why choose')} <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{t('تختارنا', 'us')}</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
                {t('مبني بأحدث التقنيات وأفضل الممارسات', 'Built with modern technologies and best practices')}
              </p>
            </ScrollReveal>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                titleAr: 'سرعة البرق',
                titleEn: 'Lightning Fast',
                descAr: 'محسّن للسرعة مع نشر حافة وتخزين مؤقت ذكي.',
                descEn: 'Optimized for speed with edge deployment and smart caching.',
                number: '01',
                gradient: 'from-yellow-500/20 to-orange-500/20',
              },
              {
                icon: Shield,
                titleAr: 'آمن افتراضياً',
                titleEn: 'Secure by Default',
                descAr: 'أمان على مستوى المؤسسات مع مصادقة JWT والتشفير.',
                descEn: 'Enterprise-grade security with JWT authentication and encryption.',
                number: '02',
                gradient: 'from-green-500/20 to-emerald-500/20',
              },
              {
                icon: Layers,
                titleAr: 'قابل للتوسع بلا حدود',
                titleEn: 'Infinitely Scalable',
                descAr: 'ينمو مع عملك من النموذج الأولي إلى الإنتاج.',
                descEn: 'Grows with your business from prototype to production.',
                number: '03',
                gradient: 'from-blue-500/20 to-cyan-500/20',
              },
            ].map((feature, index) => (
              <ScrollReveal
                key={feature.number}
                delay={index * 150}
                className="group"
              >
                <Card className="h-full border border-border/50 hover:border-primary/30 transition-all duration-500 card-hover-lift card-hover-glow bg-gradient-to-br from-card to-card/50 overflow-hidden relative">
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <Card.Header className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300 shadow-lg shadow-primary/10 group-hover:scale-110">
                        <feature.icon className="h-6 w-6 text-primary icon-pulse" />
                      </div>
                      <span className="number-detail px-2 py-1 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">{feature.number}</span>
                    </div>
                    <Card.Title className="text-xl group-hover:text-primary transition-colors">{t(feature.titleAr, feature.titleEn)}</Card.Title>
                  </Card.Header>
                  <Card.Content className="relative">
                    <p className="text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors">
                      {t(feature.descAr, feature.descEn)}
                    </p>
                  </Card.Content>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-t border-border/50 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '+10K', labelAr: 'مستخدم نشط', labelEn: 'Active Users', icon: Globe },
              { value: '99.9%', labelAr: 'وقت التشغيل', labelEn: 'Uptime', icon: TrendingUp },
              { value: '+50', labelAr: 'دولة', labelEn: 'Countries', icon: Rocket },
              { value: '4.9/5', labelAr: 'التقييم', labelEn: 'Rating', icon: Star },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-4">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="heading-display text-4xl sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-1">{t(stat.labelAr, stat.labelEn)}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-32 border-t border-border/50 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 container-lines">
          {/* Section header */}
          <div className="text-center mb-20">
            <ScrollReveal>
              <span className="number-detail inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t('٠٢ / العملية', '02 / Process')}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl mt-6">
                {t('كيف', 'How it')} <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{t('يعمل', 'works')}</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line with gradient */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary animate-pulse" style={{ clipPath: 'inset(0 50% 0 0)' }} />

            {[
              {
                step: '01',
                titleAr: 'سجّل',
                titleEn: 'Sign Up',
                descAr: 'أنشئ حسابك في ثوانٍ. لا حاجة لبطاقة ائتمان.',
                descEn: 'Create your account in seconds. No credit card required.',
                icon: Rocket,
              },
              {
                step: '02',
                titleAr: 'خصّص',
                titleEn: 'Configure',
                descAr: 'خصّص إعداداتك واربط خدماتك.',
                descEn: 'Customize your settings and connect your services.',
                icon: Layers,
              },
              {
                step: '03',
                titleAr: 'أطلق',
                titleEn: 'Launch',
                descAr: 'ابدأ العمل ونمّي أعمالك.',
                descEn: 'Go live and start growing your business.',
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <ScrollReveal
                key={item.step}
                delay={(index + 2) * 100}
                className="text-center group"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 mb-6 sonar group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-8 w-8 text-primary" />
                  <span className="absolute -top-2 -end-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-mono font-bold">
                    {item.step.slice(1)}
                  </span>
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{t(item.titleAr, item.titleEn)}</h3>
                <p className="text-muted-foreground">{t(item.descAr, item.descEn)}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-32 border-t border-border/50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute top-20 right-20 w-2 h-2 bg-primary/40 rounded-full animate-twinkle" />
        <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-primary/30 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 container-lines">
          {/* Section header */}
          <div className="text-center mb-20">
            <ScrollReveal>
              <span className="number-detail inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t('٠٣ / آراء العملاء', '03 / Testimonials')}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl mt-6">
                {t('محبوب من', 'Loved by')} <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{t('العملاء', 'Customers')}</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quoteAr: "غيّرت هذه المنصة طريقة بناء منتجاتنا. السرعة والموثوقية لا مثيل لها.",
                quoteEn: "This platform transformed how we build products. The speed and reliability are unmatched.",
                authorAr: "نورة القحطاني",
                authorEn: "Noura Al-Qahtani",
                roleAr: "مديرة التقنية، شركة التقنية السعودية",
                roleEn: "CTO, Saudi Tech Co.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
                verified: true,
              },
              {
                quoteAr: "أخيراً، حل يتوسع مع احتياجاتنا. تجربة المطور استثنائية.",
                quoteEn: "Finally, a solution that scales with our needs. The developer experience is phenomenal.",
                authorAr: "عبدالرحمن الشمري",
                authorEn: "Abdulrahman Al-Shammari",
                roleAr: "مطور رئيسي، نيوم تك",
                roleEn: "Lead Developer, NEOM Tech",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                verified: true,
              },
            ].map((testimonial, index) => (
              <ScrollReveal
                key={testimonial.authorEn}
                delay={(index + 2) * 100}
                className="group"
              >
                <Card className="h-full border border-border/50 hover:border-primary/30 transition-all duration-500 bg-gradient-to-br from-card to-card/50 relative overflow-hidden card-hover-lift">
                  {/* Decorative quote mark */}
                  <div className="absolute top-4 end-4 text-8xl font-serif text-primary/10 leading-none select-none group-hover:text-primary/20 transition-colors duration-500">&ldquo;</div>

                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <Card.Content className="pt-8 pb-6 relative">
                    {/* Star rating with animation */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-primary text-primary transition-transform duration-300"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                    <blockquote className="text-xl leading-relaxed mb-8 font-medium">
                      &ldquo;{t(testimonial.quoteAr, testimonial.quoteEn)}&rdquo;
                    </blockquote>

                    {/* Enhanced avatar section */}
                    <div className="flex items-center gap-4">
                      {/* Avatar with ring and glow */}
                      <div className="relative">
                        {/* Animated ring */}
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" style={{ animationDuration: '8s' }} />
                        {/* Inner ring */}
                        <div className="absolute -inset-0.5 rounded-full bg-background" />
                        {/* Avatar container */}
                        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 shadow-lg group-hover:shadow-primary/25">
                          <img
                            src={testimonial.avatar}
                            alt={t(testimonial.authorAr, testimonial.authorEn)}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        {/* Verified badge */}
                        {testimonial.verified && (
                          <div className="absolute -bottom-0.5 -end-0.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center ring-2 ring-background shadow-lg">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Author info */}
                      <div>
                        <p className="font-semibold group-hover:text-primary transition-colors duration-300">{t(testimonial.authorAr, testimonial.authorEn)}</p>
                        <p className="text-muted-foreground text-sm">{t(testimonial.roleAr, testimonial.roleEn)}</p>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 border-t border-border/50 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        <div className="absolute inset-0 bg-grid-animated opacity-10" />

        {/* Floating orbs */}
        <div className="absolute top-10 start-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 end-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 start-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />

        {/* Decorative elements */}
        <div className="absolute top-20 end-20 w-3 h-3 bg-white/30 rounded-full animate-twinkle" />
        <div className="absolute bottom-32 start-32 w-2 h-2 bg-white/20 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 end-1/3 w-1 h-1 bg-white/40 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-4xl mx-auto px-8 text-center">
          {/* Sparkle decoration */}
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-primary-foreground/90 text-sm mb-8">
              <Sparkles className="h-4 w-4 animate-pulse" />
              {t('ابدأ رحلتك اليوم', 'Start your journey today')}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-primary-foreground">
              {t('مستعد لبناء', 'Ready to build')}
              <span className="block heading-tall text-white/90">{t('شيء مذهل؟', 'something amazing?')}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t('انضم لآلاف الفرق الذين يثقون بنا لتشغيل أعمالهم.', 'Join thousands of teams who trust us to power their businesses.')}
              {' '}{t('ابدأ في دقائق مع خطتنا المجانية.', 'Get started in minutes with our free plan.')}
            </p>
          </ScrollReveal>

          {/* Email signup form */}
          <ScrollReveal delay={300} className="max-w-lg mx-auto mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl shadow-black/20">
              <input
                type="email"
                placeholder={t('أدخل بريدك الإلكتروني', 'Enter your email')}
                className="flex-1 min-w-0 w-full sm:w-auto h-12 px-4 rounded-xl bg-white/10 border border-white/10 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/20 transition-all"
              />
              <Button
                size="lg"
                className="group relative w-full sm:w-auto h-12 rounded-xl px-6 bg-background text-foreground overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100 transition-all duration-300 whitespace-nowrap shrink-0"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {t('ابدأ الآن', 'Get Started')}
                  <ArrowIcon className={`${isArabic ? 'me-2' : 'ms-2'} h-4 w-4 group-hover:${isArabic ? '-translate-x-1' : 'translate-x-1'} transition-transform`} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </ScrollReveal>

          {/* Alternative links */}
          <ScrollReveal delay={400}>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
              <Link href="/login" className="hover:text-primary-foreground transition-colors flex items-center gap-1 group">
                {t('لديك حساب بالفعل؟', 'Already have an account?')} <span className="underline group-hover:text-white transition-colors">{t('سجّل الدخول', 'Sign in')}</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Trust badges */}
          <ScrollReveal delay={500}>
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex flex-wrap justify-center items-center gap-8 text-primary-foreground/60 text-sm">
                <div className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors">
                  <Shield className="h-4 w-4" />
                  <span>{t('تشفير SSL 256-bit', '256-bit SSL')}</span>
                </div>
                <div className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors">
                  <Check className="h-4 w-4" />
                  <span>{t('متوافق مع GDPR', 'GDPR Compliant')}</span>
                </div>
                <div className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors">
                  <Zap className="h-4 w-4" />
                  <span>{t('99.9% وقت التشغيل', '99.9% Uptime')}</span>
                </div>
                <div className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors">
                  <Globe className="h-4 w-4" />
                  <span>{t('شبكة CDN عالمية', 'Global CDN')}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-border/50 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5" />
        <div className="absolute bottom-0 start-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-10 end-1/4 w-1 h-1 bg-primary/40 rounded-full animate-twinkle" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand - Enhanced Logo */}
            <Link href="/" className="group flex items-center gap-4">
              {/* Logo container with animated effects */}
              <div className="relative">
                {/* Outer glow ring on hover */}
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                {/* Animated border */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary via-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-beam" />
                {/* Logo background */}
                <div className="relative p-3 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
                  <Rocket className="h-6 w-6 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
                </div>
                {/* Sparkle decoration */}
                <div className="absolute -top-1 -end-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-twinkle transition-opacity" />
              </div>
              {/* Text */}
              <div>
                <span className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">{t('إطلاق ستوديو', 'Etlaq Studio')}</span>
                <p className="text-muted-foreground text-xs group-hover:text-muted-foreground/80 transition-colors">{t('نبني الأعمال الرقمية', 'Building digital businesses')}</p>
              </div>
            </Link>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              {[
                { ar: 'المميزات', en: 'Features' },
                { ar: 'الأسعار', en: 'Pricing' },
                { ar: 'عنّا', en: 'About' },
                { ar: 'تواصل معنا', en: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.en}
                  href="#"
                  className="relative hover:text-primary transition-colors group/link"
                >
                  {t(link.ar, link.en)}
                  <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {[Globe, Star, Zap].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="group/social relative p-2.5 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:border-primary/30 hover:scale-110 transition-all duration-300"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                  <Icon className="relative h-4 w-4 text-muted-foreground group-hover/social:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} {t('إطلاق ستوديو. جميع الحقوق محفوظة.', 'Etlaq Studio. All rights reserved.')}</span>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">{t('الخصوصية', 'Privacy')}</Link>
              <Link href="#" className="hover:text-primary transition-colors">{t('الشروط', 'Terms')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
