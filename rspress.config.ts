import * as path from "node:path";
import { defineConfig } from "rspress/config";
import katex from "rspress-plugin-katex";
import { pluginJournalIndexPage } from "rspress-plugin-journal-index-page";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "::nkid00::",
  markdown: {
    showLineNumbers: true,
  },
  route: {
    cleanUrls: true,
  },
  globalStyles: path.join(__dirname, "styles/index.scss"),
  themeConfig: {
    lastUpdated: false,
    searchPlaceholderText: "Search",
    hideNavbar: "auto",
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/NKID00",
      },
    ],
  },
  mediumZoom: {
    selector: "",
  },
  plugins: [katex(), pluginJournalIndexPage({ journalDir: path.join(__dirname, 'docs/j'), routePath: '/j' })],
});
