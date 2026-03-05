import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import type { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { BookOpen } from "lucide-react";

import stunkLogo from "@/assets/stunk-logo.png";
import { RiGithubLine } from "react-icons/ri";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-bold text-base tracking-tight">
          <img src={stunkLogo} alt="Stunk" className="w-6 h-6" />
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
    ],
    githubUrl: "https://github.com/I-am-abdulazeez/stunk",
  };
}

export function docsOptions(): Omit<DocsLayoutProps, "children" | "tree"> {
  return {
    ...baseOptions(),
    sidebar: {
      banner: (
        <a
          href="/docs/getting-started/changelog"
          className="flex items-center justify-between rounded-lg border px-3 py-2 text-xs transition-colors hover:bg-fd-accent"
          style={{
            borderColor: "rgba(42,244,194,0.2)",
            backgroundColor: "rgba(42,244,194,0.05)",
          }}
        >
          <span className="text-fd-muted-foreground">Latest release</span>
          <span
            className="font-semibold"
            style={{ color: "var(--stunk-teal-text)" }}
          >
            v2.8.1
          </span>
        </a>
      ),
    },
  };
}
