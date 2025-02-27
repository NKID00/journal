import * as path from "node:path";
import { defineConfig } from "rspress/config";
import katex from "rspress-plugin-katex";
import { pluginLastUpdated } from "@rspress/plugin-last-updated";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "::nkid00::",
  markdown: {
    showLineNumbers: true,
  },
  globalStyles: path.join(__dirname, "styles/index.scss"),
  themeConfig: {
    lastUpdated: true,
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
  plugins: [katex(), pluginLastUpdated()],
});
