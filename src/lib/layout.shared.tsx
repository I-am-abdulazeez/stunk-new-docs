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
        <div
          className="rounded-lg border px-3 py-2.5 text-xs leading-relaxed"
          style={{
            borderColor: "rgba(42,244,194,0.2)",
            backgroundColor: "rgba(42,244,194,0.05)",
            color: "var(--fd-muted-foreground)",
          }}
        >
          <span
            className="font-semibold block mb-0.5"
            style={{ color: "var(--stunk-teal, #2af4c2)" }}
          >
            Stunk v2.8.1
          </span>
          Framework-agnostic atomic state management.
        </div>
      ),
    },
  };
}
