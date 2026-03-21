"use client";
import { Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-6">
        {/* Glowing teal number */}
        <div className="relative mb-6">
          <h1
            className="text-[10rem] font-bold leading-none select-none"
            style={{
              color: "var(--stunk-teal-text)",
              textShadow:
                "0 0 80px rgba(42,244,194,0.3), 0 0 160px rgba(42,244,194,0.1)",
            }}
          >
            404
          </h1>
          {/* Pulse ring behind the number */}
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-10 -z-10"
            style={{ background: "var(--stunk-teal)" }}
          />
        </div>

        {/* chunk(notFound) code aesthetic */}
        <div
          className="font-mono text-sm px-4 py-2 rounded-lg border mb-6"
          style={{
            borderColor: "rgba(42,244,194,0.2)",
            backgroundColor: "rgba(42,244,194,0.05)",
            color: "var(--stunk-teal-text)",
          }}
        >
          chunk(<span className="text-fd-foreground">"page"</span>).get(){" "}
          <span className="text-fd-muted-foreground">// → null</span>
        </div>

        <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
        <p className="text-fd-muted-foreground max-w-sm mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-black transition-all hover:brightness-110 active:scale-95"
          style={{ backgroundColor: "var(--stunk-teal)" }}
        >
          Back to Home
        </Link>
      </div>
    </HomeLayout>
  );
}
