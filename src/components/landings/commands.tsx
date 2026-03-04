import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

export default function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText("npm install stunk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      className="inline-flex items-center gap-3 rounded-lg border border-fd-border bg-fd-card px-4 py-2.5 font-mono text-sm cursor-pointer hover:border-(--stunk-teal)/40 transition-colors group"
      onClick={copy}
    >
      <span className="text-(--stunk-teal)">$</span>
      <span className="text-fd-muted-foreground">npm install</span>
      <span className="text-fd-foreground font-semibold">stunk</span>
      <span className="ml-1 text-fd-muted-foreground group-hover:text-(--stunk-teal) transition-colors">
        {copied ? (
          <CheckCheck className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </span>
    </div>
  );
}
