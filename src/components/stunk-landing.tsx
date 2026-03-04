import React from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import {
  Zap,
  RefreshCw,
  Atom,
  Filter,
  CloudCog,
  Puzzle,
  Clock,
  Shield,
  ArrowRight,
  Github,
  Terminal,
  Check,
  Code2,
} from "lucide-react";
import {
  RiReactjsFill,
  RiVuejsFill,
  RiAngularjsFill,
  RiJavascriptFill,
} from "react-icons/ri";
import { SiSvelte, SiSolid } from "react-icons/si";

function CodeSection() {
  const creatingChunksCode = `import { chunk } from "stunk";

// A number chunk
const count = chunk(0);

// A string chunk
const name = chunk("Abdulzeez");

// An object chunk
const user = chunk({
  name: "Fola",
  age: 25
});`;

  const workingWithChunksCode = `// Get the current value
console.log(count.get()); // 0

// Set a new value
count.set(10);

// Update based on current value
count.set(prev => prev + 1);

// Reset to initial value
count.reset();

// Destroy the chunk
count.destroy();`;

  return (
    <div className="container max-w-6xl mx-auto px-6 pb-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Start</h2>
        <p className="text-lg text-fd-muted-foreground">
          Create, get, and set chunks in seconds
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-fd-border bg-fd-card overflow-hidden">
          <div className="border-b border-fd-border bg-fd-muted/50 px-6 py-3">
            <span className="text-sm text-fd-muted-foreground font-medium">
              Creating Chunks
            </span>
          </div>
          <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
            <code>{creatingChunksCode}</code>
          </pre>
        </div>

        <div className="rounded-xl border border-fd-border bg-fd-card overflow-hidden">
          <div className="border-b border-fd-border bg-fd-muted/50 px-6 py-3">
            <span className="text-sm text-fd-muted-foreground font-medium">
              Working with Chunks
            </span>
          </div>
          <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
            <code>{workingWithChunksCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function StunkLanding() {
  const frameworks = [
    { name: "React", icon: RiReactjsFill, status: "ready" },
    { name: "Vue", icon: RiVuejsFill, status: "wip" },
    { name: "Svelte", icon: SiSvelte, status: "soon" },
    { name: "Angular", icon: RiAngularjsFill, status: "soon" },
    { name: "Solid", icon: SiSolid, status: "soon" },
    { name: "JavaScript", icon: RiJavascriptFill, status: "ready" },
  ];

  return (
    <HomeLayout
      nav={{
        title: "Stunk",
        url: "/",
      }}
      links={[
        { text: "Documentation", url: "/docs" },
        {
          text: "GitHub",
          url: "https://github.com/yourusername/stunk",
          external: true,
        },
      ]}
    >
      <div className="min-h-screen">
        {/* Hero with Animated Background */}
        <div className="relative">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(128, 128, 128, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* State Flow Visualization - Central state feeding components */}
            <svg
              className="absolute inset-0 w-full h-full opacity-15"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Central State Node (top) */}
              <circle cx="600" cy="150" r="8" fill="#2af4c2" opacity="0.4">
                <animate
                  attributeName="r"
                  values="8;12;8"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0.5;0.3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Connection lines from central state to components */}

              {/* Line to bottom-left component */}
              <line
                x1="600"
                y1="150"
                x2="300"
                y2="400"
                stroke="#2af4c2"
                strokeWidth="2"
                opacity="0"
                strokeDasharray="5 5"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.3;0"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="20"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Line to bottom-center-left */}
              <line
                x1="600"
                y1="150"
                x2="450"
                y2="420"
                stroke="#20dcad"
                strokeWidth="2"
                opacity="0"
                strokeDasharray="5 5"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.3;0"
                  dur="2s"
                  begin="0.3s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="20"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Line to bottom-center */}
              <line
                x1="600"
                y1="150"
                x2="600"
                y2="450"
                stroke="#2af4c2"
                strokeWidth="2"
                opacity="0"
                strokeDasharray="5 5"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.3;0"
                  dur="2s"
                  begin="0.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="20"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Line to bottom-center-right */}
              <line
                x1="600"
                y1="150"
                x2="750"
                y2="420"
                stroke="#20dcad"
                strokeWidth="2"
                opacity="0"
                strokeDasharray="5 5"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.3;0"
                  dur="2s"
                  begin="0.9s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="20"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Line to bottom-right component */}
              <line
                x1="600"
                y1="150"
                x2="900"
                y2="400"
                stroke="#2af4c2"
                strokeWidth="2"
                opacity="0"
                strokeDasharray="5 5"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.3;0"
                  dur="2s"
                  begin="1.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="20"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Component Nodes (bottom) */}

              {/* Bottom-left component */}
              <circle cx="300" cy="400" r="6" fill="#2af4c2" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.2;0.4;0.2"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Bottom-center-left component */}
              <circle cx="450" cy="420" r="6" fill="#20dcad" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.2;0.4;0.2"
                  dur="2s"
                  begin="0.3s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Bottom-center component */}
              <circle cx="600" cy="450" r="6" fill="#2af4c2" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.2;0.4;0.2"
                  dur="2s"
                  begin="0.6s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Bottom-center-right component */}
              <circle cx="750" cy="420" r="6" fill="#20dcad" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.2;0.4;0.2"
                  dur="2s"
                  begin="0.9s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Bottom-right component */}
              <circle cx="900" cy="400" r="6" fill="#2af4c2" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.2;0.4;0.2"
                  dur="2s"
                  begin="1.2s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Pulse rings from central state */}
              <circle
                cx="600"
                cy="150"
                r="15"
                fill="none"
                stroke="#2af4c2"
                strokeWidth="2"
                opacity="0"
              >
                <animate
                  attributeName="r"
                  values="15;40;60"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0.1;0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>

            {/* Strong fade overlay for text clarity */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 800px 600px at center, transparent 0%, var(--fd-background) 50%, var(--fd-background) 100%)",
              }}
            />
          </div>

          {/* Hero Content */}
          <div className="relative container max-w-5xl mx-auto px-6 pt-32 pb-20 text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm mb-8"
              style={{
                borderColor: "rgba(42, 244, 194, 0.2)",
                backgroundColor: "rgba(42, 244, 194, 0.05)",
              }}
            >
              <span className="text-[#2af4c2]">
                ✨ State management, reimagined
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
              Stunk
            </h1>

            <p className="text-xl md:text-2xl text-fd-muted-foreground max-w-3xl mx-auto mb-4">
              A lightweight, reactive state management library for
              TypeScript/JavaScript applications
            </p>

            <p className="text-lg text-fd-muted-foreground/80 mb-12 max-w-2xl mx-auto">
              Built on atomic principles with fine-grained reactivity. No
              boilerplate, just pure state management.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="/docs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-[#2af4c2] text-black hover:bg-[#20dcad] transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#example"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-fd-border hover:border-[#2af4c2] font-semibold transition-colors"
              >
                <Code2 className="w-4 h-4" />
                View Example
              </a>
            </div>

            <div className="max-w-md mx-auto">
              <div className="rounded-lg border border-fd-border bg-fd-card p-4 font-mono text-sm flex items-center justify-between">
                <span className="text-fd-muted-foreground">npm install</span>
                <span className="text-[#2af4c2] font-semibold">stunk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Section */}
        <CodeSection />

        {/* Features */}
        <div className="border-t border-fd-border bg-fd-secondary/30">
          <div className="container max-w-6xl mx-auto px-6 py-32">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Stunk?
              </h2>
              <p className="text-xl text-fd-muted-foreground max-w-2xl mx-auto">
                Everything you need for state management, nothing you don't
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-xl border border-fd-border bg-fd-card p-8 hover:border-[#2af4c2]/50 transition-colors h-full flex flex-col">
                <div className="inline-flex p-3 rounded-lg bg-[#2af4c2]/10 border border-[#2af4c2]/20 mb-4 w-fit">
                  <Zap className="w-6 h-6 text-[#2af4c2]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Lightweight & Fast
                </h3>
                <p className="text-fd-muted-foreground leading-relaxed flex-1">
                  Zero dependencies with minimal overhead. Built for performance
                  from the ground up.
                </p>
              </div>

              <div className="rounded-xl border border-fd-border bg-fd-card p-8 hover:border-[#2af4c2]/50 transition-colors h-full flex flex-col">
                <div className="inline-flex p-3 rounded-lg bg-[#2af4c2]/10 border border-[#2af4c2]/20 mb-4 w-fit">
                  <RefreshCw className="w-6 h-6 text-[#2af4c2]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Fine-Grained Reactivity
                </h3>
                <p className="text-fd-muted-foreground leading-relaxed flex-1">
                  Only affected components update. Subscribe to exactly what you
                  need.
                </p>
              </div>

              <div className="rounded-xl border border-fd-border bg-fd-card p-8 hover:border-[#2af4c2]/50 transition-colors h-full flex flex-col">
                <div className="inline-flex p-3 rounded-lg bg-[#2af4c2]/10 border border-[#2af4c2]/20 mb-4 w-fit">
                  <Atom className="w-6 h-6 text-[#2af4c2]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Atomic Chunks</h3>
                <p className="text-fd-muted-foreground leading-relaxed flex-1">
                  Break state into manageable pieces. Compose complex state from
                  simple atoms.
                </p>
              </div>

              <div className="rounded-xl border border-fd-border bg-fd-card p-8 hover:border-[#2af4c2]/50 transition-colors h-full flex flex-col">
                <div className="inline-flex p-3 rounded-lg bg-[#2af4c2]/10 border border-[#2af4c2]/20 mb-4 w-fit">
                  <Shield className="w-6 h-6 text-[#2af4c2]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">TypeScript First</h3>
                <p className="text-fd-muted-foreground leading-relaxed flex-1">
                  Full type inference out of the box. Catch errors before
                  runtime.
                </p>
              </div>

              <div className="rounded-xl border border-fd-border bg-fd-card p-8 hover:border-[#2af4c2]/50 transition-colors h-full flex flex-col">
                <div className="inline-flex p-3 rounded-lg bg-[#2af4c2]/10 border border-[#2af4c2]/20 mb-4 w-fit">
                  <CloudCog className="w-6 h-6 text-[#2af4c2]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Async Support</h3>
                <p className="text-fd-muted-foreground leading-relaxed flex-1">
                  Built-in loading and error states. Handle async operations
                  seamlessly.
                </p>
              </div>

              <div className="rounded-xl border border-fd-border bg-fd-card p-8 hover:border-[#2af4c2]/50 transition-colors h-full flex flex-col">
                <div className="inline-flex p-3 rounded-lg bg-[#2af4c2]/10 border border-[#2af4c2]/20 mb-4 w-fit">
                  <Puzzle className="w-6 h-6 text-[#2af4c2]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Framework Agnostic
                </h3>
                <p className="text-fd-muted-foreground leading-relaxed flex-1">
                  Works with React, Vue, Svelte, or vanilla JavaScript
                  seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Framework Support */}
        <div className="border-t border-fd-border">
          <div className="container max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-fd-muted-foreground uppercase tracking-wider mb-2">
                Works With Your Stack
              </p>
              <p className="text-fd-muted-foreground">
                Framework agnostic design with official integrations
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {frameworks.map((framework) => {
                const Icon = framework.icon;
                const isReady = framework.status === "ready";
                const isWIP = framework.status === "wip";

                return (
                  <div
                    key={framework.name}
                    className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-colors ${
                      isReady
                        ? "border-[#2af4c2]/30 bg-[#2af4c2]/5"
                        : "border-fd-border bg-fd-card"
                    } ${framework.status === "soon" ? "opacity-60" : ""}`}
                  >
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Icon
                        className={`w-10 h-10 ${
                          isReady
                            ? "text-[#2af4c2]"
                            : "text-fd-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="text-center">
                      <p
                        className={`font-semibold text-sm ${
                          isReady
                            ? "text-[#2af4c2]"
                            : framework.status === "soon"
                            ? "text-fd-muted-foreground"
                            : ""
                        }`}
                      >
                        {framework.name}
                      </p>
                      {isReady && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#2af4c2] mt-1">
                          <Check className="w-3 h-3" />
                          Ready
                        </span>
                      )}
                      {isWIP && (
                        <span className="inline-flex items-center gap-1 text-xs text-fd-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          WIP
                        </span>
                      )}
                      {framework.status === "soon" && (
                        <span className="text-xs text-fd-muted-foreground mt-1">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-fd-border">
          <div className="container max-w-4xl mx-auto px-6 py-32 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to simplify your state?
            </h2>
            <p className="text-xl text-fd-muted-foreground mb-12 max-w-2xl mx-auto">
              Get started with Stunk in minutes and experience truly reactive
              state management
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/docs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold bg-[#2af4c2] text-black hover:bg-[#20dcad] transition-colors"
              >
                Read Documentation
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="https://github.com/yourusername/stunk"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border border-fd-border hover:bg-fd-accent transition-colors"
              >
                <Github className="w-5 h-5" />
                View Examples
              </a>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
