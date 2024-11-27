import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'nkid00::journal',
  markdown: {
    showLineNumbers: true,
  },
  builderConfig: {
    output: {
      assetPrefix: "/journal-static/"
    }
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/NKID00',
      },
    ],
  },
});
