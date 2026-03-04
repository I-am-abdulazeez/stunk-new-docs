import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import StunkLanding from "@/components/stunk-landing";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <StunkLanding />;
}
