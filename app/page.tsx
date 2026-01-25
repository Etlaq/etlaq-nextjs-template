'use client';

import { Button, Card } from '@heroui/react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Rocket, ArrowRight, Check } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed top-6 start-6 z-50 flex items-center gap-2">
        <ThemeToggle />
      </div>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="absolute inset-0 bg-grid-animated opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center space-y-8">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/10 text-sm">
                <Rocket className="h-4 w-4 text-primary" />
                <span>Powered by Etlaq Studio</span>
              </span>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
                <span className="text-foreground">Launch</span>
                <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  Your Vision
                </span>
                <span className="text-foreground">Today</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="max-w-xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Everything you need to bring your ideas to life.
                <span className="text-foreground font-medium"> Start building in minutes.</span>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button size="lg" variant="primary" className="rounded-full px-10 py-6">
                <span className="flex items-center font-semibold text-base">
                  Get Started
                  <ArrowRight className="ms-2 h-5 w-5" />
                </span>
              </Button>
              <Button size="lg" variant="bordered" className="rounded-full px-10 py-6">
                Learn More
              </Button>
            </ScrollReveal>

            <ScrollReveal delay={400} className="pt-12">
              <div className="flex flex-wrap justify-center gap-8 text-sm">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                  <Check className="h-4 w-4 text-primary" />
                  Free to start
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                  <Check className="h-4 w-4 text-primary" />
                  No credit card
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-gradient-to-b from-primary to-primary/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      <section id="features" className="relative py-32 border-t border-border/50">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <ScrollReveal>
              <h2 className="text-4xl sm:text-5xl md:text-6xl mt-6">
                Why choose <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">us</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
                Built with modern technologies and best practices
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Fast Performance', desc: 'Optimized for speed with modern tooling' },
              { title: 'Secure by Default', desc: 'Built-in security best practices' },
              { title: 'Easy to Scale', desc: 'Grow from prototype to production' },
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 150} className="group">
                <Card className="h-full p-6">
                  <h3 className="text-xl mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative py-12 border-t border-border/50">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary shadow-lg">
                <Rocket className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-semibold">Etlaq Studio</span>
                <p className="text-muted-foreground text-xs">Building digital businesses</p>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Etlaq Studio. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
