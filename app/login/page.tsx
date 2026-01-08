'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button, Card, TextField, Alert, Label, Input } from '@heroui/react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Rocket, ArrowRight, ArrowLeft, Sparkles, Shield, Zap } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login, user } = useAuth();
    const { t, isArabic } = useLanguage();
    const router = useRouter();

    // Arrow icon based on language direction
    const ArrowIcon = isArabic ? ArrowRight : ArrowLeft;

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                router.push('/');
            } else {
                setError(result.error || t('فشل تسجيل الدخول', 'Login failed'));
            }
        } catch {
            setError(t('حدث خطأ غير متوقع', 'An unexpected error occurred'));
        } finally {
            setIsLoading(false);
        }
    };

    if (user) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated gradient mesh background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 animate-gradient-slow" />
            <div className="absolute inset-0 bg-grid-animated opacity-30" />

            {/* Morphing gradient blobs */}
            <div className="absolute top-1/4 -start-32 w-[400px] h-[400px] bg-gradient-to-r from-primary/20 to-primary/5 blur-[100px] animate-morph" />
            <div className="absolute bottom-1/4 -end-32 w-[350px] h-[350px] bg-gradient-to-l from-primary/15 to-transparent blur-[80px] animate-morph" style={{ animationDelay: '2s' }} />

            {/* Floating particles */}
            <div className="absolute top-20 start-20 w-2 h-2 bg-primary rounded-full particle particle-1" />
            <div className="absolute top-40 end-32 w-3 h-3 bg-primary/50 rounded-full particle particle-2" />
            <div className="absolute bottom-40 start-1/4 w-2 h-2 bg-primary/30 rounded-full particle particle-3" />

            {/* Twinkling stars */}
            <div className="absolute top-32 end-1/4 w-1 h-1 bg-primary rounded-full animate-twinkle" />
            <div className="absolute top-1/2 start-20 w-1 h-1 bg-primary/60 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/4 end-40 w-1 h-1 bg-primary/40 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />

            {/* Orbiting decorative rings */}
            <div className="absolute top-1/3 end-1/4 w-32 h-32 border border-primary/10 rounded-full animate-spin-slow" />
            <div className="absolute bottom-1/3 start-1/4 w-24 h-24 border border-primary/5 rounded-full animate-spin-reverse" />

            {/* Theme & Language toggles */}
            <div className="fixed top-6 start-6 z-50 flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo with glow effect */}
                <div className="flex justify-center mb-8">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="relative">
                            {/* Outer glow */}
                            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                            {/* Logo background */}
                            <div className="relative p-3 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
                                <Rocket className="h-6 w-6 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                        </div>
                        <span className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300">{t('إطلاق', 'Etlaq')}</span>
                    </Link>
                </div>

                {/* Main Card */}
                <Card className="border border-border/50 bg-card/90 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden">
                    {/* Decorative top gradient */}
                    <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                    <Card.Header className="space-y-2 text-center pt-8 pb-4">
                        <div className="flex justify-center mb-2">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm">
                                <Sparkles className="h-3.5 w-3.5 text-primary" />
                                <span className="text-muted-foreground">{t('مرحباً بعودتك', 'Welcome back')}</span>
                            </span>
                        </div>
                        <Card.Title className="heading-display text-3xl">{t('تسجيل الدخول', 'Sign In')}</Card.Title>
                        <Card.Description className="text-muted-foreground">
                            {t('أدخل بياناتك للوصول إلى حسابك', 'Enter your credentials to access your account')}
                        </Card.Description>
                    </Card.Header>

                    <form onSubmit={handleSubmit}>
                        <Card.Content className="space-y-5 px-8">
                            {error && (
                                <Alert status="danger">
                                    <Alert.Indicator />
                                    <Alert.Content>
                                        <Alert.Description>{error}</Alert.Description>
                                    </Alert.Content>
                                </Alert>
                            )}
                            <TextField
                                name="email"
                                type="email"
                                value={email}
                                onChange={setEmail}
                                isRequired
                                isDisabled={isLoading}
                            >
                                <Label className="text-sm font-medium">{t('البريد الإلكتروني', 'Email')}</Label>
                                <Input
                                    placeholder={t('أدخل بريدك الإلكتروني', 'Enter your email')}
                                    className="h-12 rounded-xl"
                                />
                            </TextField>
                            <TextField
                                name="password"
                                type="password"
                                value={password}
                                onChange={setPassword}
                                isRequired
                                isDisabled={isLoading}
                            >
                                <Label className="text-sm font-medium">{t('كلمة المرور', 'Password')}</Label>
                                <Input
                                    placeholder={t('أدخل كلمة المرور', 'Enter your password')}
                                    className="h-12 rounded-xl"
                                />
                            </TextField>
                        </Card.Content>

                        <Card.Footer className="flex flex-col space-y-5 px-8 pb-8 pt-4">
                            <div className="relative group w-full">
                                {/* Border beam container */}
                                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-beam" />
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="relative w-full h-12 rounded-xl bg-gradient-to-r from-primary via-primary/90 to-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-100 transition-all duration-300 overflow-hidden text-base font-semibold"
                                    isDisabled={isLoading}
                                >
                                    {/* Inner shine effect */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                                    <span className="relative z-10">
                                        {isLoading ? t('جارٍ تسجيل الدخول...', 'Signing in...') : t('تسجيل الدخول', 'Sign in')}
                                    </span>
                                </Button>
                            </div>

                            <div className="text-center text-sm text-muted-foreground">
                                {t('ليس لديك حساب؟', "Don't have an account?")}{' '}
                                <Link href="/register" className="text-primary hover:text-primary/80 font-semibold transition-colors hover:underline">
                                    {t('سجّل الآن', 'Sign up')}
                                </Link>
                            </div>
                        </Card.Footer>
                    </form>
                </Card>

                {/* Trust indicators */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/50 border border-border/30">
                        <Shield className="h-3.5 w-3.5 text-primary/60" />
                        <span>{t('آمن ومشفر', 'Secure & Encrypted')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/50 border border-border/30">
                        <Zap className="h-3.5 w-3.5 text-primary/60" />
                        <span>{t('دخول سريع', 'Quick Access')}</span>
                    </div>
                </div>

                {/* Back to home */}
                <div className="mt-6 text-center">
                    <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                        <ArrowIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        {t('العودة للرئيسية', 'Back to home')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
