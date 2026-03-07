import { createFileRoute } from "@tanstack/react-router";
import StunkLanding from "@/components/stunk-landing";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <StunkLanding />;
}
