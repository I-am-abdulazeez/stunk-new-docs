"use client";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import type { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { BookOpen, ChevronDown, Tag } from "lucide-react";
import { useState } from "react";

import stunkLogo from "@/assets/logo.svg";
import { RiGithubLine } from "react-icons/ri";

function VersionDropdown() {
  const [open, setOpen] = useState(false);

  const versions = [
    { label: "v3 (current)", href: "https://stunk.dev", badge: "latest" },
    { label: "v2", href: "https://v2.stunk.dev", badge: null },
  ];

  return (
    <div className="relative">
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full mt-1.5 z-50 min-w-40 rounded-lg border bg-fd-card p-1 shadow-lg"
            style={{ borderColor: "rgba(42,244,194,0.15)" }}
          >
            {versions.map((v) => (
              <a
                key={v.href}
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-xs transition-colors hover:bg-fd-accent"
              >
                <span className="font-medium text-fd-foreground">
                  {v.label}
                </span>
                {v.badge && (
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                    style={{
                      backgroundColor: "rgba(42,244,194,0.12)",
                      color: "var(--stunk-teal-text)",
                    }}
                  >
                    {v.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-bold text-base tracking-tight">
          <img src={stunkLogo} alt="Stunk" className="w-4 h-4" />
          Stunk
        </span>
      ),
      url: "/",
    },
    links: [
      {
        text: "Docs",
        url: "/docs",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        text: "GitHub",
        url: "https://github.com/I-am-abdulazeez/stunk",
        external: true,
        icon: <RiGithubLine className="w-4 h-4" />,
      },
      {
        type: "custom",
        children: <VersionDropdown />,
      },
    ],
    githubUrl: "https://github.com/I-am-abdulazeez/stunk",
  };
}

export function docsOptions(): Omit<DocsLayoutProps, "children" | "tree"> {
  return {
    ...baseOptions(),
    sidebar: {
      banner: (
        <div className="space-y-2">
          <a
            href="/docs/getting-started/changelog"
            className="flex items-center justify-between rounded-lg border px-3 py-2.5 text-xs transition-all hover:bg-fd-accent"
            style={{
              borderColor: "rgba(42,244,194,0.2)",
              backgroundColor: "rgba(42,244,194,0.04)",
            }}
          >
            <div className="flex items-center gap-2">
              <Tag
                className="w-3 h-3 shrink-0"
                style={{ color: "var(--stunk-teal-text)" }}
              />
              <span className="text-fd-muted-foreground">Latest release</span>
            </div>
            <span
              className="font-semibold tabular-nums"
              style={{ color: "var(--stunk-teal-text)" }}
            >
              {__APP_VERSION__}
            </span>
          </a>

          <a
            href="https://v2.stunk.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border px-3 py-2 text-xs transition-all hover:bg-fd-accent"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <span className="text-fd-muted-foreground">v2 docs</span>
            <span className="text-fd-muted-foreground/60 font-mono text-base leading-none">
              ↗
            </span>
          </a>
        </div>
      ),
    },
  };
}
