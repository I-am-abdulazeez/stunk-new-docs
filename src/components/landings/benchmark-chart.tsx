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

// Brand colors per library — used consistently across all charts
const LIB_COLORS: Record<string, string> = {
  Stunk: "#2af4c2",
  "Stunk (1 chunk)": "#2af4c2",
  "Stunk (3 chunks)": "#1bc9a0",
  "Stunk select()": "#2af4c2",
  "Stunk computed()": "#1bc9a0",
  "Stunk peek()": "#2af4c2",
  "Stunk get()": "#1bc9a0",
  Zustand: "#ff6b35",
  "Zustand (1 object)": "#ff6b35",
  TanStack: "#3b82f6",
  "TanStack (3 stores)": "#3b82f6",
  Jotai: "#a78bfa",
  Valtio: "#f59e0b",
  Redux: "#ef4444",
};

function getColor(name: string): string {
  return LIB_COLORS[name] ?? "#6b7280";
}

function isStunk(name: string) {
  return name.toLowerCase().startsWith("stunk");
}

function formatValue(value: number, unit: string) {
  if (unit === "ops/sec") {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value.toString();
  }
  if (value < 1) return value.toFixed(2);
  return value.toFixed(1);
}

const BENCHMARKS: Record<BenchmarkKey, Benchmark> = {
  write: {
    label: "State Write",
    unit: "M ops/sec",
    description: "set() / setState() — single value update with subscribers",
    footnote:
      "Stunk wins — 38% faster than Zustand. Both Stunk and TanStack use signal-based architectures. TanStack's marginal difference comes from a leaner pipeline with no middleware or shape validation layer.",
    data: [
      { name: "Stunk", value: 10.2 },
      { name: "TanStack", value: 9.9 },
      { name: "Zustand", value: 7.4 },
      { name: "Valtio", value: 1.3 },
      { name: "Jotai", value: 0.6 },
      { name: "Redux", value: 0.1 },
    ],
  },
  batch: {
    label: "Batch Updates",
    unit: "ops/sec",
    description: "1000 updates batched — one notification per iteration",
    footnote:
      "Two Stunk entries for fairness: '1 chunk' matches Zustand's single-object pattern; '3 chunks' is Stunk's real atomic use case. Zustand has no vanilla batch API — setState() on one object is inherently atomic. TanStack's batch uses an async scheduler giving it lower overhead in tight loops; in real apps the gap is negligible.",
    data: [
      { name: "TanStack (3 stores)", value: 11342 },
      { name: "Stunk (1 chunk)", value: 9555 },
      { name: "Zustand (1 object)", value: 9304, note: "no batch API" },
      { name: "Stunk (3 chunks)", value: 8471 },
      { name: "Valtio", value: 578 },
      { name: "Jotai", value: 206, note: "no batch API" },
      { name: "Redux", value: 106 },
    ],
  },
  derived: {
    label: "Derived State",
    unit: "M ops/sec",
    description: "Write + propagate to subscriber — eager mode",
    footnote:
      "Stunk select() wins — uses a manual selector, same pattern as Zustand. Stunk computed() uses auto dependency tracking (no selectors to write) at a ~46% cost vs select(). Both shown for an honest comparison.",
    data: [
      { name: "Stunk select()", value: 7.3 },
      { name: "TanStack", value: 4.7 },
      { name: "Zustand", value: 4.6 },
      { name: "Stunk computed()", value: 3.9 },
      { name: "Valtio", value: 1.3 },
      { name: "Jotai", value: 0.21 },
      { name: "Redux", value: 0.097 },
    ],
  },
  read: {
    label: "State Read",
    unit: "M ops/sec",
    description: "get() / getState() — raw value access",
    footnote:
      "All libraries except Jotai perform within the same tier (~10M ops/sec). Run-to-run variance exceeds inter-library differences — ranking is not meaningful here. Stunk peek() skips dependency tracking overhead; get() includes it for reactive computed support.",
    data: [
      { name: "Stunk peek()", value: 10.4 },
      { name: "Zustand", value: 10.3 },
      { name: "Stunk get()", value: 10.2 },
      { name: "Redux", value: 10.2 },
      { name: "TanStack", value: 9.7 },
      { name: "Valtio", value: 9.6 },
      { name: "Jotai", value: 3.4 },
    ],
  },
};

const TABS: { key: BenchmarkKey; label: string }[] = [
  { key: "write", label: "Write" },
  { key: "batch", label: "Batch" },
  { key: "derived", label: "Derived" },
  { key: "read", label: "Read" },
];

// Legend dot
function LibDot({ name }: { name: string }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ backgroundColor: getColor(name) }}
    />
  );
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
  const note = item.payload.note as string | undefined;
  const rawValue = item.value;
  const value = typeof rawValue === "number" ? rawValue : Number(rawValue);
  const color = getColor(name);

  return (
    <div
      className="rounded-lg border px-3.5 py-2.5 text-xs shadow-lg min-w-35"
      style={{
        backgroundColor: "var(--fd-background, #1a1a1a)",
        borderColor: color + "66",
        color: "var(--fd-foreground, #f4f4f5)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex items-center gap-2 font-semibold mb-1.5">
        <LibDot name={name} />
        <span>{name}</span>
      </div>
      <div className="text-base font-bold tabular-nums" style={{ color }}>
        {unit === "ops/sec"
          ? `${value.toLocaleString()}`
          : `${formatValue(value, unit)}`}
        <span
          className="text-xs font-normal ml-1"
          style={{ color: "var(--fd-muted-foreground)" }}
        >
          {unit}
        </span>
      </div>
      {note && (
        <div
          className="mt-1.5 text-[10px]"
          style={{ color: "var(--fd-muted-foreground)" }}
        >
          {note}
        </div>
      )}
    </div>
  );
};

// Custom Y-axis tick with colored dot
// Recharts may pass x/y as string or number — accept both and convert
const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  if (x == null || y == null || !payload) return null;
  const nx = typeof x === "string" ? parseFloat(x) : (x as number);
  const ny = typeof y === "string" ? parseFloat(y) : (y as number);
  const name = payload.value as string;
  const color = getColor(name);
  const stunk = isStunk(name);
  const GAP = 8;
  const DOT = 6;

  return (
    <g>
      <circle
        cx={nx - GAP - DOT}
        cy={ny}
        r={DOT / 2}
        fill={color}
        opacity={isStunk(name) ? 1 : 0.8}
      />
      <text
        x={nx - GAP - DOT * 2 - 2}
        y={ny}
        dy={4}
        textAnchor="end"
        fontSize={11}
        fontWeight={stunk ? 700 : 400}
        fill={stunk ? color : "#9ca3af"}
      >
        {name}
      </text>
    </g>
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
          <div className="mb-6 flex flex-wrap items-baseline gap-2">
            <span className="text-sm font-semibold">{bench.label}</span>
            <span
              className="text-xs"
              style={{ color: "var(--fd-muted-foreground)" }}
            >
              {bench.description}
            </span>
          </div>

          {/* Bar chart — fixed height container prevents the recharts 0-size warning */}
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart
                data={sorted}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 160, bottom: 0 }}
                barCategoryGap="30%"
              >
                <XAxis
                  type="number"
                  tickFormatter={(v) => formatValue(v as number, bench.unit)}
                  tick={{
                    fontSize: 11,
                    fill: "#9ca3af",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={1}
                  tick={(props) => <CustomYAxisTick {...props} />}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={<CustomTooltip unit={bench.unit} />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="value" radius={[0, 5, 5, 0]} maxBarSize={22}>
                  {sorted.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={getColor(entry.name)}
                      opacity={isStunk(entry.name) ? 1 : 0.65}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Notes for libraries missing native features */}
          {sorted.some((d) => d.note) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {sorted
                .filter((d) => d.note)
                .map((d) => (
                  <span
                    key={d.name}
                    className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: "rgba(120,120,140,0.2)",
                      color: "var(--fd-muted-foreground)",
                    }}
                  >
                    <LibDot name={d.name} />
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

        {/* Legend row */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-5">
          {Object.entries(LIB_COLORS)
            .filter(
              ([name]) =>
                !name.includes("(") &&
                ![
                  "Stunk peek()",
                  "Stunk get()",
                  "Stunk select()",
                  "Stunk computed()",
                ].includes(name),
            )
            .map(([name, color]) => (
              <div key={name} className="flex items-center gap-1.5">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--fd-muted-foreground)" }}
                >
                  {name}
                </span>
              </div>
            ))}
        </div>

        {/* Source link */}
        <div className="text-center mt-4">
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
