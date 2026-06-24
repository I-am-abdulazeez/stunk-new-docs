import { SiNpm, SiPnpm, SiYarn, SiBun } from "react-icons/si";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "fumadocs-ui/components/tabs";

const PACKAGE_MANAGERS = [
  {
    value: "npm",
    label: "npm",
    icon: SiNpm,
    command: "npm install stunk",
  },
  {
    value: "pnpm",
    label: "pnpm",
    icon: SiPnpm,
    command: "pnpm add stunk",
  },
  {
    value: "yarn",
    label: "yarn",
    icon: SiYarn,
    command: "yarn add stunk",
  },
  {
    value: "bun",
    label: "bun",
    icon: SiBun,
    command: "bun add stunk",
  },
];

export function InstallTabs() {
  return (
    <Tabs defaultValue="npm">
      <TabsList>
        {PACKAGE_MANAGERS.map(({ value, label, icon: Icon }) => (
          <TabsTrigger key={value} value={value}>
            <Icon className="w-4 h-4 mr-1.5" />
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {PACKAGE_MANAGERS.map(({ value, command }) => (
        <TabsContent key={value} value={value}>
          <pre className="font-fira">
            <code>{command}</code>
          </pre>
        </TabsContent>
      ))}
    </Tabs>
  );
}
