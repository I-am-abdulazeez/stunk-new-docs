import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import appCss from "@/styles/app.css?url";
import { RootProvider } from "fumadocs-ui/provider/tanstack";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Stunk - Atomic State Management" },
      { rel: "canonical", href: "https://stunk.dev" },
      {
        name: "description",
        content:
          "A lightweight, framework-agnostic state management library built on atomic chunk principles. Zero dependencies, 3.32kB gzipped.",
      },
      // Open Graph
      { property: "og:title", content: "Stunk — Atomic State Management" },
      {
        property: "og:description",
        content:
          "A lightweight, framework-agnostic state management library built on atomic chunk principles.",
      },
      { property: "og:image", content: "https://stunk.dev/og-image.png" },
      { property: "og:url", content: "https://stunk.dev" },
      { property: "og:type", content: "website" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Stunk — Atomic State Management" },
      {
        name: "twitter:description",
        content:
          "A lightweight, framework-agnostic state management library built on atomic chunk principles.",
      },
      { name: "twitter:image", content: "https://stunk.dev/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
