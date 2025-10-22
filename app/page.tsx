'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Zap,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Palette,
  Rocket
} from 'lucide-react';

export default function Home() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white dark:bg-neutral-900 shadow-sm rounded-lg">
            <div className="px-6 py-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
                    Welcome back, {user.name}!
                  </h1>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                    You are successfully authenticated
                  </p>
                </div>
                <Button onClick={logout} variant="outline" className="transition-all duration-200">
                  Sign Out
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>User Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Name:</span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Email:</span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">User ID:</span>
                      <span className="font-mono text-sm">{user.id}</span>
                    </div>
                    {user.createdAt && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Member since:</span>
                        <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Your account is active! Explore the features:
                    </p>
                    <ul className="space-y-2">
                      {['Customize your profile', 'Explore available features', 'Connect with your team', 'Start your first project'].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <section className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/30 to-teal-300/20 dark:from-emerald-900/20 dark:to-teal-900/10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-200/30 to-amber-300/20 dark:from-orange-900/20 dark:to-amber-900/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-sm shadow-sm">
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent">
                Powered by Etlaq Studio
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              Your Modern App
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Everything you need to bring your ideas to life. Safe, stunning, and ready to use.
              Get started in minutes, no experience required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto transition-all duration-200 hover:scale-105 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 dark:shadow-emerald-500/10">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 border-neutral-300 dark:border-neutral-700">
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Badge variant="secondary" className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                Safe & Private
              </Badge>
              <Badge variant="secondary" className="px-3 py-1.5 bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/50">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                Beautiful Design
              </Badge>
              <Badge variant="secondary" className="px-3 py-1.5 bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border border-orange-200/50 dark:border-orange-800/50">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                Ready to Use
              </Badge>
              <Badge variant="secondary" className="px-3 py-1.5 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200/50 dark:border-cyan-800/50">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                Works Everywhere
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
              Why You'll Love It
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Designed to make your experience effortless, enjoyable, and worry-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-emerald-500 dark:border-t-emerald-400 bg-white dark:bg-neutral-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 flex items-center justify-center mb-4 shadow-sm">
                  <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl">Super Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Everything loads instantly with smooth, responsive interactions. No waiting, no frustration—just a great experience.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-teal-500 dark:border-t-teal-400 bg-white dark:bg-neutral-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/50 dark:to-teal-800/50 flex items-center justify-center mb-4 shadow-sm">
                  <Shield className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle className="text-xl">Safe & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Your information is protected with top-tier security. We keep your data safe, private, and under your control.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-orange-500 dark:border-t-orange-400 bg-white dark:bg-neutral-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/50 dark:to-orange-800/50 flex items-center justify-center mb-4 shadow-sm">
                  <Palette className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-xl">Looks Amazing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Clean, modern design that's easy on the eyes. Seamlessly switch between light and dark themes to match your style.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-cyan-500 dark:border-t-cyan-400 bg-white dark:bg-neutral-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/50 dark:to-cyan-800/50 flex items-center justify-center mb-4 shadow-sm">
                  <Rocket className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle className="text-xl">Grows With You</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Start small and expand as you need. We've built everything to handle your growth without missing a beat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        {/* Background decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="relative text-center space-y-4 p-6 rounded-2xl bg-white/50 dark:bg-neutral-800/30 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 items-center justify-center mb-4 shadow-lg shadow-emerald-500/25 dark:shadow-emerald-500/10">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-md">
                1
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                Sign Up
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Create your account in seconds. No credit card needed. Jump right in and start exploring.
              </p>
            </div>

            <div className="relative text-center space-y-4 p-6 rounded-2xl bg-white/50 dark:bg-neutral-800/30 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 items-center justify-center mb-4 shadow-lg shadow-orange-500/25 dark:shadow-orange-500/10">
                <Layers className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-md">
                2
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                Customize
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Personalize your experience with custom themes and settings. Make it yours with flexible options.
              </p>
            </div>

            <div className="relative text-center space-y-4 p-6 rounded-2xl bg-white/50 dark:bg-neutral-800/30 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 dark:from-cyan-600 dark:to-blue-600 items-center justify-center mb-4 shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/10">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-md">
                3
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                Launch
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Start using all the features right away. Everything is ready to go with no setup required.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900" />

        {/* Decorative patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-sm">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed drop-shadow-sm">
            Join users who are already enjoying a seamless, modern experience. Create your account today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto transition-all duration-200 hover:scale-105 bg-white text-emerald-600 hover:bg-neutral-50 shadow-xl hover:shadow-2xl"
              >
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto transition-all duration-200 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm shadow-lg"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 dark:text-neutral-500">
              <Sparkles className="h-4 w-4" />
              <span>Built using Etlaq Studio</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
