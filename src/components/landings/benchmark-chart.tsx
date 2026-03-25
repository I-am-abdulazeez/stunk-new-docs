import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChevronRight } from "lucide-react";

type BenchmarkKey = "write" | "batch" | "derived" | "read";

interface LibResult {
  name: string;
  value: number;
  note?: string;
}

interface Benchmark {
  label: string;
  unit: string;
  description: string;
  footnote: string;
  data: LibResult[];
}

const BENCHMARKS: Record<BenchmarkKey, Benchmark> = {
  write: {
    label: "State Write",
    unit: "M ops/sec",
    description: "set() / setState() — single value update with subscribers",
    footnote:
      "Higher is better. Stunk is 2nd — 38% faster than Zustand. Stunk's set() handles middleware, shape validation, and subscriber notification. TanStack uses a signals architecture.",
    data: [
      { name: "TanStack", value: 10.0 },
      { name: "Stunk", value: 9.6 },
      { name: "Zustand", value: 7.0 },
      { name: "Valtio", value: 1.3 },
      { name: "Jotai", value: 0.6 },
      { name: "Redux", value: 0.1 },
    ],
  },
  batch: {
    label: "Batch Updates",
    unit: "ops/sec",
    description: "1000 × 3 updates batched — consistency matters here",
    footnote:
      "Higher ops/sec is better. Stunk and TanStack use native batch(). Zustand has no vanilla batch — each setState() notifies immediately. Stunk's p99 latency (0.8ms) is 2× more consistent than TanStack (1.6ms) and Zustand (1.7ms) under load.",
    data: [
      { name: "TanStack", value: 11436 },
      { name: "Zustand", value: 8359, note: "no batch API" },
      { name: "Stunk", value: 6639 },
      { name: "Valtio", value: 542 },
      { name: "Jotai", value: 143, note: "no batch API" },
      { name: "Redux", value: 99 },
    ],
  },
  derived: {
    label: "Derived State",
    unit: "M ops/sec",
    description: "Write + propagate to subscriber — eager mode",
    footnote:
      "Stunk select() uses a manual selector — the same pattern as Zustand. It wins outright. Stunk computed() uses auto dependency tracking (no selectors to write) at a ~35% cost vs select(). Both are shown for an honest comparison.",
    data: [
      { name: "Stunk select()", value: 6.9 },
      { name: "Zustand", value: 5.5 },
      { name: "TanStack", value: 4.2 },
      { name: "Stunk computed()", value: 3.6 },
      { name: "Valtio", value: 1.3 },
      { name: "Jotai", value: 0.2 },
      { name: "Redux", value: 0.08 },
    ],
  },
  read: {
    label: "State Read",
    unit: "M ops/sec",
    description: "get() / getState() — raw value access",
    footnote:
      "All libraries except Jotai perform within the same tier (~10M ops/sec). Run-to-run variance exceeds inter-library differences — ranking is not meaningful here. Stunk peek() skips dependency tracking overhead; get() includes it for reactive computed support.",
    data: [
      { name: "Stunk peek()", value: 10.3 },
      { name: "Stunk get()", value: 10.3 },
      { name: "Zustand", value: 10.2 },
      { name: "TanStack", value: 10.2 },
      { name: "Valtio", value: 9.9 },
      { name: "Redux", value: 9.8 },
      { name: "Jotai", value: 4.0 },
    ],
  },
};

const TABS: { key: BenchmarkKey; label: string }[] = [
  { key: "write", label: "Write" },
  { key: "batch", label: "Batch" },
  { key: "derived", label: "Derived" },
  { key: "read", label: "Read" },
];

function isStunk(name: string) {
  return name.toLowerCase().startsWith("stunk");
}

function formatValue(value: number, unit: string) {
  if (unit === "ops/sec") {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value.toString();
  }
  // M ops/sec
  if (value < 1) return value.toFixed(2);
  return value.toFixed(1);
}

const CustomTooltip = ({
  active,
  payload,
  unit,
}: {
  active?: boolean;
  payload?: any[];
  unit: string;
}) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const name = item.payload.name as string;
  const value = item.value as number;
  return (
    <div
      className="rounded-lg border px-3 py-2 text-xs shadow-md"
      style={{
        backgroundColor: "var(--fd-card)",
        borderColor: "rgba(42,244,194,0.3)",
        color: "var(--fd-foreground)",
      }}
    >
      <div
        className="font-semibold mb-0.5"
        style={{ color: "var(--stunk-teal-text)" }}
      >
        {name}
      </div>
      <div style={{ color: "var(--fd-muted-foreground)" }}>
        {unit === "ops/sec"
          ? `${value.toLocaleString()} ops/sec`
          : `${formatValue(value, unit)} ${unit}`}
      </div>
    </div>
  );
};

export default function BenchmarkChart() {
  const [active, setActive] = useState<BenchmarkKey>("write");
  const bench = BENCHMARKS[active];
  const sorted = [...bench.data].sort((a, b) => b.value - a.value);

  return (
    <section className="py-20 px-4 border-b border-fd-border">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--stunk-teal-text)" }}
          >
            Performance
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built to be fast
          </h2>
          <p
            className="max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: "var(--fd-muted-foreground)" }}
          >
            Benchmarked against Zustand, Jotai, Valtio, Redux Toolkit, and
            TanStack Store using{" "}
            <a
              href="https://github.com/tinylibs/tinybench"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-opacity hover:opacity-70"
              style={{ color: "var(--stunk-teal-text)" }}
            >
              tinybench
            </a>{" "}
            on Node.js v22.
          </p>
        </div>

        {/* Tab bar */}
        <div
          className="flex gap-1 rounded-lg p-1 mb-8 mx-auto w-fit"
          style={{
            backgroundColor: "rgba(42,244,194,0.05)",
            border: "1px solid rgba(42,244,194,0.15)",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
              style={
                active === tab.key
                  ? { backgroundColor: "var(--stunk-teal)", color: "#0a0a0a" }
                  : { color: "var(--fd-muted-foreground)" }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chart card */}
        <div
          className="rounded-xl border p-6"
          style={{
            backgroundColor: "var(--fd-card)",
            borderColor: "var(--fd-border)",
          }}
        >
          {/* Chart label + description */}
          <div className="mb-4 flex flex-wrap items-baseline gap-2">
            <span className="text-sm font-semibold">{bench.label}</span>
            <span
              className="text-xs"
              style={{ color: "var(--fd-muted-foreground)" }}
            >
              {bench.description}
            </span>
          </div>

          {/* Bar chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sorted}
                layout="vertical"
                margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
                barCategoryGap="28%"
              >
                <XAxis
                  type="number"
                  tickFormatter={(v) => formatValue(v, bench.unit)}
                  tick={{ fontSize: 11, fill: "var(--fd-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={108}
                  tick={({ x, y, payload }) => {
                    const name = payload.value as string;
                    const stunk = isStunk(name);
                    return (
                      <text
                        x={x - 4}
                        y={y}
                        dy={4}
                        textAnchor="end"
                        fontSize={11}
                        fontWeight={stunk ? 700 : 400}
                        fill={
                          stunk
                            ? "var(--stunk-teal-text)"
                            : "var(--fd-muted-foreground)"
                        }
                      >
                        {name}
                      </text>
                    );
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={<CustomTooltip unit={bench.unit} />}
                  cursor={{ fill: "rgba(42,244,194,0.04)" }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={20}>
                  {sorted.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={
                        isStunk(entry.name)
                          ? "var(--stunk-teal)"
                          : "rgba(120,120,140,0.2)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Notes for libraries missing native features */}
          {sorted.some((d) => d.note) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {sorted
                .filter((d) => d.note)
                .map((d) => (
                  <span
                    key={d.name}
                    className="text-xs px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: "rgba(120,120,140,0.25)",
                      color: "var(--fd-muted-foreground)",
                    }}
                  >
                    {d.name} — {d.note}
                  </span>
                ))}
            </div>
          )}

          {/* Footnote */}
          <p
            className="text-xs mt-4 leading-relaxed border-t pt-3"
            style={{
              color: "var(--fd-muted-foreground)",
              borderColor: "var(--fd-border)",
            }}
          >
            {bench.footnote}
          </p>
        </div>

        {/* Source link */}
        <div className="text-center mt-5">
          <a
            href="https://github.com/I-am-abdulazeez/stunk/tree/main/benchmarks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--stunk-teal-text)" }}
          >
            View benchmark source on GitHub
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
