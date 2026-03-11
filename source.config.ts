import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { rehypeCode, } from 'fumadocs-core/mdx-plugins';

export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    rehypePlugins: [
      [rehypeCode, {
        themes: {
          light: 'rose-pine-dawn',
          dark: 'rose-pine',
        }
      },]
    ]
  }
});
