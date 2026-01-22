'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Card, TextField, Label, Input, Alert, Form } from '@heroui/react';
import { ArrowRight, ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { translations, isArabic } = useLanguage();
  const t = translations.auth;
  const common = translations.common;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || t.loginFailed);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 px-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-xl">
          <Card.Header className="text-center pb-6">
            <Card.Title className="text-2xl">{t.welcomeBack}</Card.Title>
            <Card.Description className="mt-2">{t.signInDesc}</Card.Description>
          </Card.Header>

          <Card.Content>
            {error && (
              <Alert status="danger" className="mb-6">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>{error}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <TextField
                  name="email"
                  type="email"
                  isRequired
                  value={email}
                  onChange={setEmail}
                >
                  <Label>{common.email}</Label>
                  <Input placeholder={t.enterEmail} />
                </TextField>

                <TextField
                  name="password"
                  type="password"
                  isRequired
                  value={password}
                  onChange={setPassword}
                >
                  <Label>{common.password}</Label>
                  <Input placeholder={t.enterPassword} />
                </TextField>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isDisabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin me-2" />
                      {t.signingIn}
                    </>
                  ) : (
                    <>
                      {common.signIn}
                      <ArrowIcon className="h-4 w-4 ms-2" />
                    </>
                  )}
                </Button>
              </div>
            </Form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t.noAccount} </span>
              <Link href="/register" className="text-primary hover:underline font-medium">
                {common.signUp}
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                {t.backToHome}
              </Link>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
