import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { createServerFn } from "@tanstack/react-start";
import { source } from "@/lib/source";
import browserCollections from "fumadocs-mdx:collections/browser";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import * as StepsComponents from "fumadocs-ui/components/steps";
import { InstallTabs } from "@/components/install-tabs";
import { docsOptions } from "@/lib/layout.shared";
import { useFumadocsLoader } from "fumadocs-core/source/client";

export const Route = createFileRoute("/docs/")({
  component: Page,
  loader: async () => {
    return await serverLoader();
  },
});

const serverLoader = createServerFn({ method: "GET" }).handler(async () => {
  // index.mdx maps to an empty slug array []
  const page = source.getPage([]);
  if (!page) throw notFound();

  return {
    path: page.path,
    pageTree: await source.serializePageTree(source.getPageTree()),
  };
});

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, frontmatter, default: MDX }) {
    return (
      <DocsPage toc={toc}>
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={{
              ...defaultMdxComponents,
              ...StepsComponents,
              ...TabsComponents,
              InstallTabs,
            }}
          />
        </DocsBody>
      </DocsPage>
    );
  },
});

function Page() {
  const data = Route.useLoaderData();
  const { pageTree } = useFumadocsLoader(data);
  const Content = clientLoader.getComponent(data.path);

  return (
    <DocsLayout {...docsOptions()} tree={pageTree}>
      <Content />
    </DocsLayout>
  );
}
