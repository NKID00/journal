import type { RspressPlugin } from '@rspress/shared';
import { stripIndent } from 'common-tags';
import { open, readdir } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

export function pluginJournalIndexPage(options: { journalDir: string, routePath: string }): RspressPlugin {
  return {
    name: 'plugin-journal-index-page',
    async addPages(config) {
      let content: string = stripIndent`
        ---
        title: Index
        sidebar: false
        outline: false
        ---

        import { LinkCard } from '@theme';
      ` + '\n\n';
      let journals = [];
      const files = await readdir(options.journalDir, { withFileTypes: true });
      for (const file of files) {
        const extensionRe = /(?:\.mdx?|\.tsx)$/;
        if (file.isFile() && extensionRe.test(file.name)) {
          const handle = await open(join(options.journalDir, file.name));
          const data = await handle.readFile({ encoding: 'utf-8' });
          const titleMatch = /title:\s*(.*)/.exec(data);
          const lastUpdatedMatch = /date:\s*(.*)/.exec(data);
          await handle.close();

          let title = JSON.stringify(file.name);
          if (titleMatch) {
            try {
              title = JSON.stringify(JSON.parse(titleMatch[1]));
            } catch (SyntaxError) {
              title = JSON.stringify(titleMatch[1]);
            }
          }

          const dateMatch = /^(\d\d\d\d-\d\d-\d\d)-/.exec(file.name);
          const date = new Date(dateMatch![1]);

          let lastUpdatedTime = "";
          if (lastUpdatedMatch) {
            lastUpdatedTime = new Date(lastUpdatedMatch[1]).toISOString().slice(0, 10);
          }

          const path = join(options.routePath, file.name.replace(extensionRe, ''));

          journals.push({ path, title, date, lastUpdatedTime })
        }
      }
      journals.sort((a, b) => b.date.valueOf() - a.date.valueOf());
      for (const journal of journals) {
        let description = journal.date.toISOString().slice(0, 10);
        if (journal.lastUpdatedTime) {
          description += ` (updated: ${journal.lastUpdatedTime})`;
        }
        content += stripIndent`
            <LinkCard
              href="${journal.path}"
              title=${journal.title}
              description="${description}"
            />
            <br />
          ` + '\n';
      }
      console.log(content);
      return [
        {
          routePath: join(options.routePath, 'index.html'),
          content,
        }
      ]
    },
  };
}
