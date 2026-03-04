import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import type { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { Github, BookOpen } from "lucide-react";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-bold text-base tracking-tight">
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-md text-black text-xs font-black"
            style={{ backgroundColor: "var(--stunk-teal, #2af4c2)" }}
          >
            S
          </span>
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
        icon: <Github className="w-4 h-4" />,
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
