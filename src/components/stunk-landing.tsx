"use client";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import {
  Zap,
  RefreshCw,
  Atom,
  CloudCog,
  Puzzle,
  Clock,
  Shield,
  ArrowRight,
  Check,
  Layers,
  Cpu,
  Timer,
  Sparkles,
  ChevronRight,
  Package,
} from "lucide-react";
import {
  RiReactjsFill,
  RiVuejsFill,
  RiAngularjsFill,
  RiJavascriptFill,
  RiGithubLine,
} from "react-icons/ri";
import { SiSvelte, SiSolid } from "react-icons/si";
import InstallCommand from "./landings/commands";
import TypewriterCode from "./landings/typewriter";
import AnimatedStateFlow from "./landings/state-flow";

import stunkLogo from "@/assets/stunk-logo.png";

const FEATURES = [
  {
    icon: Zap,
    title: "Lightweight & Fast",
    desc: "Zero dependencies with minimal overhead. Built for performance from the ground up.",
  },
  {
    icon: RefreshCw,
    title: "Fine-Grained Reactivity",
    desc: "Only affected components update. Subscribe to exactly what you need, nothing more.",
  },
  {
    icon: Atom,
    title: "Atomic Chunks",
    desc: "Break state into manageable pieces. Compose complex state from simple, isolated atoms.",
  },
  {
    icon: Shield,
    title: "TypeScript First",
    desc: "Full type inference out of the box. Catch errors at compile time, not in production.",
  },
  {
    icon: CloudCog,
    title: "Async Support",
    desc: "Built-in loading and error states for async operations. No extra setup needed.",
  },
  {
    icon: Puzzle,
    title: "Framework Agnostic",
    desc: "Works with React, Vue, Svelte, Angular, Solid, or plain JavaScript seamlessly.",
  },
  {
    icon: Layers,
    title: "Batch Updates",
    desc: "Group multiple state mutations into a single render cycle for optimal performance.",
  },
  {
    icon: Timer,
    title: "Time Travel",
    desc: "Undo and redo state changes. Built-in history management with zero overhead.",
  },
  {
    icon: Cpu,
    title: "Middleware",
    desc: "Extend functionality with custom middleware. Logging, persistence — plug anything in.",
  },
];

const FRAMEWORKS = [
  { name: "React", icon: RiReactjsFill, status: "ready" as const },
  { name: "Vue", icon: RiVuejsFill, status: "wip" as const },
  { name: "Svelte", icon: SiSvelte, status: "soon" as const },
  { name: "Angular", icon: RiAngularjsFill, status: "soon" as const },
  { name: "Solid", icon: SiSolid, status: "soon" as const },
  { name: "JavaScript", icon: RiJavascriptFill, status: "ready" as const },
];

export default function StunkLanding() {
  return (
    <HomeLayout
      nav={{
        title: (
          <span className="flex items-center gap-2 font-bold">
            <img
              src={stunkLogo}
              alt="Stunk"
              className="w-6 h-6 object-contain"
            />
            Stunk
          </span>
        ),
        url: "/",
        transparentMode: "always",
        enableHoverToOpen: false,
        enabled: true,
      }}
      links={[
        { text: "Documentation", url: "/docs" },
        {
          text: "GitHub",
          url: "https://github.com/I-am-abdulazeez/stunk",
          external: true,
        },
      ]}
    >
      <div className="min-h-screen">
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(42,244,194,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(42,244,194,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(42,244,194,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Animated state-flow SVG */}
          <AnimatedStateFlow />

          {/* Fade overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 900px 700px at center, transparent 20%, var(--fd-background) 70%)",
            }}
          />

          <div className="relative container max-w-6xl mx-auto px-6 pt-28 pb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="animate-float-up stagger-1 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold mb-6"
                  style={{
                    borderColor: "rgba(42,244,194,0.25)",
                    backgroundColor: "rgba(42,244,194,0.06)",
                    color: "var(--stunk-teal-text)",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  State management, reimagined
                </div>

                <h1 className="animate-float-up stagger-2 text-7xl md:text-8xl font-bold tracking-tight mb-5 leading-none">
                  Stunk
                </h1>

                <p className="animate-float-up stagger-3 text-xl text-fd-muted-foreground mb-3 leading-relaxed max-w-lg">
                  A lightweight, reactive state management library built on
                  atomic principles.
                </p>

                <p className="animate-float-up stagger-3 text-base text-fd-muted-foreground/70 mb-8 max-w-md leading-relaxed">
                  Break state into independent{" "}
                  <strong className="text-fd-foreground font-semibold">
                    chunks
                  </strong>
                  . Subscribe to exactly what matters. No boilerplate, no magic
                  — just pure reactivity.
                </p>

                <div className="animate-float-up stagger-4 flex flex-wrap gap-3 mb-8">
                  <a
                    href="/docs"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-black transition-all hover:brightness-110 active:scale-95"
                    style={{ backgroundColor: "var(--stunk-teal)" }}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/I-am-abdulazeez/stunk"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border border-fd-border hover:border-(--stunk-teal-text)/40 transition-all"
                  >
                    <RiGithubLine className="w-4 h-4" />
                    GitHub
                    <ChevronRight className="w-3.5 h-3.5 text-fd-muted-foreground" />
                  </a>
                </div>

                <div className="animate-float-up stagger-5">
                  <InstallCommand />
                </div>
              </div>

              {/* Right — animated code */}
              <div className="animate-float-up stagger-3 lg:block">
                <TypewriterCode />
              </div>
            </div>
          </div>
        </section>

        {/*  Stats strip ─ */}
        <div className="border-y border-fd-border bg-fd-muted/20">
          <div className="container max-w-5xl mx-auto px-6 py-6">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
              {[
                { label: "Bundle Size", value: "3.32kB", sub: "gzipped" },
                { label: "Dependencies", value: "0", sub: "zero deps" },
                { label: "GitHub Stars", value: "159+", sub: "and growing" },
                { label: "Frameworks", value: "6", sub: "integrations" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "var(--stunk-teal-text)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-fd-foreground">
                    {stat.label}
                  </div>
                  <div className="text-xs text-fd-muted-foreground">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*  Features ─ */}
        <section className="border-b border-fd-border">
          <div className="container max-w-6xl mx-auto px-6 py-28">
            <div className="text-center mb-16">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--stunk-teal-text)" }}
              >
                Why Stunk
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything you need.
                <br />
                <span className="text-fd-muted-foreground font-normal">
                  Nothing you don't.
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group rounded-xl border border-fd-border bg-fd-card p-6 hover:border-(--stunk-teal-text)/40 transition-all duration-300 hover:bg-[rgba(42,244,194,0.02)]"
                >
                  <div
                    className="inline-flex p-2.5 rounded-lg mb-4 border transition-colors group-hover:border-(--stunk-teal-text)/40"
                    style={{
                      backgroundColor: "rgba(42,244,194,0.07)",
                      borderColor: "rgba(42,244,194,0.15)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "var(--stunk-teal-text)" }}
                    />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{title}</h3>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*  Framework support ─ */}
        <section className="border-b border-fd-border bg-fd-secondary/20">
          <div className="container max-w-4xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground mb-2">
                Works With Your Stack
              </p>
              <h2 className="text-2xl font-bold">Framework Agnostic</h2>
              <p className="text-fd-muted-foreground mt-2 text-sm">
                Official integrations with first-class support
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {FRAMEWORKS.map(({ name, icon: Icon, status }) => (
                <div
                  key={name}
                  className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all ${
                    status === "ready"
                      ? "border-(--stunk-teal-text)/25 bg-[rgba(42,244,194,0.04)]"
                      : "border-fd-border bg-fd-card"
                  } ${status === "soon" ? "opacity-50" : ""}`}
                >
                  <Icon
                    className="w-9 h-9"
                    style={{
                      color:
                        status === "ready"
                          ? "var(--stunk-teal-text)"
                          : "var(--fd-muted-foreground)",
                    }}
                  />
                  <span
                    className={`text-xs font-semibold ${
                      status === "ready" ? "" : "text-fd-muted-foreground"
                    }`}
                    style={
                      status === "ready"
                        ? { color: "var(--stunk-teal-text)" }
                        : {}
                    }
                  >
                    {name}
                  </span>
                  {status === "ready" && (
                    <span
                      className="flex items-center gap-1 text-[10px] font-medium"
                      style={{ color: "var(--stunk-teal-text)" }}
                    >
                      <Check className="w-3 h-3" /> Ready
                    </span>
                  )}
                  {status === "wip" && (
                    <span className="flex items-center gap-1 text-[10px] text-fd-muted-foreground">
                      <Clock className="w-3 h-3" /> WIP
                    </span>
                  )}
                  {status === "soon" && (
                    <span className="text-[10px] text-fd-muted-foreground">
                      Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*  CTA ─ */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(42,244,194,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative container max-w-3xl mx-auto px-6 py-32 text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-6"
              style={{
                borderColor: "rgba(42,244,194,0.2)",
                backgroundColor: "rgba(42,244,194,0.05)",
                color: "var(--stunk-teal-text)",
              }}
            >
              <Package className="w-3.5 h-3.5" />
              Open Source · MIT License
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Ready to simplify
              <br />
              your state?
            </h2>
            <p className="text-lg text-fd-muted-foreground mb-10 max-w-xl mx-auto">
              Join developers already using Stunk to write cleaner, faster, more
              reactive apps.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/docs"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-black transition-all hover:brightness-110 active:scale-95"
                style={{ backgroundColor: "var(--stunk-teal)" }}
              >
                Read Documentation
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/I-am-abdulazeez/stunk"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-semibold border border-fd-border hover:bg-fd-accent transition-all"
              >
                <RiGithubLine className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}
