import { useEffect, useRef, useState } from "react";
import {
  CloudCog,
  GitBranch,
  Layers,
  RefreshCw,
  Terminal,
  History,
  Shield,
} from "lucide-react";

type TokenType =
  | "keyword"
  | "fn"
  | "string"
  | "number"
  | "comment"
  | "plain"
  | "operator"
  | "type";

interface Token {
  type: TokenType;
  text: string;
}

interface CodeScene {
  label: string;
  icon: React.ReactNode;
  tokens: Token[];
}

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword: "var(--stunk-teal-text)",
  fn: "#79c0ff",
  string: "#a5d6ff",
  number: "#f8c8a0",
  comment: "#6a7282",
  plain: "var(--fd-foreground)",
  operator: "#f8c8a0",
  type: "#e2a0ff",
};

const SCENES: CodeScene[] = [
  {
    label: "Declare State",
    icon: <Layers className="w-3.5 h-3.5" />,
    tokens: [
      { type: "comment", text: "// Atomic state — the core primitive\n" },
      { type: "keyword", text: "import" },
      { type: "plain", text: " { " },
      { type: "fn", text: "chunk" },
      { type: "plain", text: " } " },
      { type: "keyword", text: "from" },
      { type: "string", text: ' "stunk"' },
      { type: "plain", text: ";\n\n" },
      { type: "keyword", text: "const" },
      { type: "plain", text: " count = " },
      { type: "fn", text: "chunk" },
      { type: "plain", text: "(" },
      { type: "number", text: "0" },
      { type: "plain", text: ");\n" },
      { type: "keyword", text: "const" },
      { type: "plain", text: " user  = " },
      { type: "fn", text: "chunk" },
      { type: "plain", text: "({ name: " },
      { type: "string", text: '"Fola"' },
      { type: "plain", text: ", age: " },
      { type: "number", text: "25" },
      { type: "plain", text: " });\n\n" },
      { type: "comment", text: "// strict mode — throws on unknown keys\n" },
      { type: "keyword", text: "const" },
      { type: "plain", text: " config = " },
      { type: "fn", text: "chunk" },
      { type: "plain", text: "(\n  { theme: " },
      { type: "string", text: '"dark"' },
      { type: "plain", text: " },\n  { strict: " },
      { type: "keyword", text: "true" },
      { type: "plain", text: " }\n);" },
    ],
  },
  {
    label: "Get & Set",
    icon: <RefreshCw className="w-3.5 h-3.5" />,
    tokens: [
      { type: "comment", text: "// Read and update your chunks\n\n" },
      { type: "plain", text: "count." },
      { type: "fn", text: "get" },
      { type: "plain", text: "();" },
      { type: "comment", text: "           // → 0\n" },
      { type: "plain", text: "count." },
      { type: "fn", text: "set" },
      { type: "plain", text: "(" },
      { type: "number", text: "42" },
      { type: "plain", text: ");" },
      { type: "comment", text: "          // → 42\n" },
      { type: "plain", text: "count." },
      { type: "fn", text: "set" },
      { type: "plain", text: "(prev " },
      { type: "operator", text: "=>" },
      { type: "plain", text: " prev " },
      { type: "operator", text: "+" },
      { type: "plain", text: " " },
      { type: "number", text: "1" },
      { type: "plain", text: ");" },
      { type: "comment", text: "   // → 43\n" },
      { type: "plain", text: "count." },
      { type: "fn", text: "peek" },
      { type: "plain", text: "();" },
      { type: "comment", text: "          // no tracking\n\n" },
      { type: "plain", text: "count." },
      { type: "fn", text: "reset" },
      { type: "plain", text: "();" },
      { type: "comment", text: "         // → 0\n" },
      { type: "plain", text: "count." },
      { type: "fn", text: "destroy" },
      { type: "plain", text: "();" },
      { type: "comment", text: "        // cleanup" },
    ],
  },
  {
    label: "Computed",
    icon: <GitBranch className="w-3.5 h-3.5" />,
    tokens: [
      { type: "keyword", text: "import" },
      { type: "plain", text: " { " },
      { type: "fn", text: "chunk" },
      { type: "plain", text: ", " },
      { type: "fn", text: "computed" },
      { type: "plain", text: " } " },
      { type: "keyword", text: "from" },
      { type: "string", text: ' "stunk"' },
      { type: "plain", text: ";\n\n" },
      { type: "comment", text: "// auto-tracks dependencies via .get()\n" },
      { type: "keyword", text: "const" },
      { type: "plain", text: " price    = " },
      { type: "fn", text: "chunk" },
      { type: "plain", text: "(" },
      { type: "number", text: "100" },
      { type: "plain", text: ");\n" },
      { type: "keyword", text: "const" },
      { type: "plain", text: " quantity = " },
      { type: "fn", text: "chunk" },
      { type: "plain", text: "(" },
      { type: "number", text: "3" },
      { type: "plain", text: ");\n\n" },
      { type: "keyword", text: "const" },
      { type: "plain", text: " total = " },
      { type: "fn", text: "computed" },
      { type: "plain", text: "(() " },
      { type: "operator", text: "=>" },
      { type: "plain", text: "\n  price." },
      { type: "fn", text: "get" },
      { type: "plain", text: "() " },
      { type: "operator", text: "*" },
      { type: "plain", text: " quantity." },
      { type: "fn", text: "get" },
      { type: "plain", text: "()\n);\n\n" },
      { type: "plain", text: "total." },
      { type: "fn", text: "get" },
      { type: "plain", text: "();" },
      { type: "comment", text: "   // → 300\n" },
      { type: "plain", text: "price." },
      { type: "fn", text: "set" },
      { type: "plain", text: "(" },
      { type: "number", text: "200" },
      { type: "plain", text: ");\n" },
      { type: "plain", text: "total." },
      { type: "fn", text: "get" },
      { type: "plain", text: "();" },
      { type: "comment", text: "   // → 600" },
    ],
  },
  {
    label: "Async",
    icon: <CloudCog className="w-3.5 h-3.5" />,
    tokens: [
      { type: "keyword", text: "import" },
      { type: "plain", text: " { " },
      { type: "fn", text: "asyncChunk" },
      { type: "plain", text: " } " },
      { type: "keyword", text: "from" },
      { type: "string", text: ' "stunk/query"' },
      { type: "plain", text: ";\n\n" },
      { type: "keyword", text: "const" },
      { type: "plain", text: " users = " },
      { type: "fn", text: "asyncChunk" },
      { type: "plain", text: "(\n  " },
      { type: "keyword", text: "async" },
      { type: "plain", text: " ({ id }) " },
      { type: "operator", text: "=>" },
      { type: "plain", text: " " },
      { type: "fn", text: "fetchUser" },
      { type: "plain", text: "(id),\n  {\n    key: " },
      { type: "string", text: '"users"' },
      { type: "plain", text: ",\n    " },
      { type: "fn", text: "onSuccess" },
      { type: "plain", text: ": (data) " },
      { type: "operator", text: "=>" },
      { type: "plain", text: " " },
      { type: "fn", text: "toast" },
      { type: "plain", text: "(" },
      { type: "string", text: '"Loaded!"' },
      { type: "plain", text: "),\n    keepPreviousData: " },
      { type: "keyword", text: "true" },
      { type: "plain", text: ",\n  }\n);\n\n" },
      { type: "comment", text: "// { data, loading, error, reload }" },
    ],
  },
  {
    label: "History",
    icon: <History className="w-3.5 h-3.5" />,
    tokens: [
      { type: "keyword", text: "import" },
      { type: "plain", text: " { " },
      { type: "fn", text: "chunk" },
      { type: "plain", text: " } " },
      { type: "keyword", text: "from" },
      { type: "string", text: ' "stunk"' },
      { type: "plain", text: ";\n" },
      { type: "keyword", text: "import" },
      { type: "plain", text: " { " },
      { type: "fn", text: "history" },
      { type: "plain", text: " } " },
      { type: "keyword", text: "from" },
      { type: "string", text: ' "stunk/middleware"' },
      { type: "plain", text: ";\n\n" },
      { type: "keyword", text: "const" },
      { type: "plain", text: " base    = " },
      { type: "fn", text: "chunk" },
      { type: "plain", text: "(" },
      { type: "number", text: "0" },
      { type: "plain", text: ");\n" },
      { type: "keyword", text: "const" },
      { type: "plain", text: " counter = " },
      { type: "fn", text: "history" },
      { type: "plain", text: "(base);\n\n" },
      { type: "plain", text: "counter." },
      { type: "fn", text: "set" },
      { type: "plain", text: "(" },
      { type: "number", text: "1" },
      { type: "plain", text: "); \ncounter." },
      { type: "fn", text: "set" },
      { type: "plain", text: "(" },
      { type: "number", text: "2" },
      { type: "plain", text: ");\n" },
      { type: "plain", text: "counter." },
      { type: "fn", text: "undo" },
      { type: "plain", text: "();" },
      { type: "comment", text: "     // → 1\n" },
      { type: "plain", text: "counter." },
      { type: "fn", text: "redo" },
      { type: "plain", text: "();" },
      { type: "comment", text: "     // → 2\n" },
      { type: "plain", text: "counter." },
      { type: "fn", text: "reset" },
      { type: "plain", text: "();" },
      { type: "comment", text: "    // clears history\n" },
      { type: "plain", text: "counter." },
      { type: "fn", text: "canUndo" },
      { type: "plain", text: "();" },
      { type: "comment", text: " // → false" },
    ],
  },
  {
    label: "Persist",
    icon: <Shield className="w-3.5 h-3.5" />,
    tokens: [
      { type: "keyword", text: "import" },
      { type: "plain", text: " { " },
      { type: "fn", text: "chunk" },
      { type: "plain", text: " } " },
      { type: "keyword", text: "from" },
      { type: "string", text: ' "stunk"' },
      { type: "plain", text: ";\n" },
      { type: "keyword", text: "import" },
      { type: "plain", text: " { " },
      { type: "fn", text: "persist" },
      { type: "plain", text: " } " },
      { type: "keyword", text: "from" },
      { type: "string", text: ' "stunk/middleware"' },
      { type: "plain", text: ";\n\n" },
      { type: "keyword", text: "const" },
      { type: "plain", text: " theme = " },
      { type: "fn", text: "persist" },
      { type: "plain", text: "(\n  " },
      { type: "fn", text: "chunk" },
      { type: "plain", text: "({ mode: " },
      { type: "string", text: '"dark"' },
      { type: "plain", text: " }),\n  { key: " },
      { type: "string", text: '"theme"' },
      { type: "plain", text: " }\n);\n\n" },
      { type: "comment", text: "// loads from localStorage on init\n" },
      { type: "plain", text: "theme." },
      { type: "fn", text: "set" },
      { type: "plain", text: "({ mode: " },
      { type: "string", text: '"light"' },
      { type: "plain", text: " });" },
      { type: "comment", text: " // auto-saved\n" },
      { type: "plain", text: "theme." },
      { type: "fn", text: "clearStorage" },
      { type: "plain", text: "();" },
      { type: "comment", text: " // logout" },
    ],
  },
];

export default function TypewriterCode() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scene = SCENES[sceneIdx];
  const fullText = scene.tokens.map((t) => t.text).join("");

  useEffect(() => {
    if (phase === "typing") {
      if (visibleChars < fullText.length) {
        timeoutRef.current = setTimeout(
          () => setVisibleChars((v) => v + 1),
          18,
        );
      } else {
        timeoutRef.current = setTimeout(() => setPhase("pause"), 2200);
      }
    } else if (phase === "pause") {
      timeoutRef.current = setTimeout(() => setPhase("erasing"), 400);
    } else if (phase === "erasing") {
      if (visibleChars > 0) {
        timeoutRef.current = setTimeout(() => setVisibleChars((v) => v - 1), 6);
      } else {
        setSceneIdx((s) => (s + 1) % SCENES.length);
        setPhase("typing");
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phase, visibleChars, fullText.length]);

  const renderTokens = () => {
    let remaining = visibleChars;
    const output: React.ReactNode[] = [];

    for (let i = 0; i < scene.tokens.length; i++) {
      const token = scene.tokens[i];
      if (remaining <= 0) break;
      const slice = token.text.slice(0, remaining);
      remaining -= token.text.length;
      output.push(
        <span key={i} style={{ color: TOKEN_COLORS[token.type] }}>
          {slice}
        </span>,
      );
    }
    return output;
  };

  return (
    <div className="rounded-xl border border-fd-border bg-fd-card overflow-hidden shadow-2xl">
      <div className="flex flex-col border-b border-fd-border bg-fd-muted/40">
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <Terminal className="w-4 h-4 text-fd-muted-foreground" />
        </div>
        <div className="flex items-center gap-1 px-3 pb-2 flex-wrap mt-3">
          {SCENES.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setSceneIdx(i);
                setVisibleChars(0);
                setPhase("typing");
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                i === sceneIdx
                  ? "bg-(--stunk-teal-text)/15 text-(--stunk-teal-text) border border-(--stunk-teal-text)/30"
                  : "text-fd-muted-foreground hover:text-fd-foreground"
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 font-fira text-sm leading-relaxed min-h-55 relative">
        <pre className="whitespace-pre-wrap wrap-break-word">
          {renderTokens()}
          <span
            className="inline-block w-0.5 h-[1em] align-middle ml-px"
            style={{
              backgroundColor: "var(--stunk-teal-text)",
              animation: "blink 1s step-end infinite",
            }}
          />
        </pre>
      </div>
    </div>
  );
}
