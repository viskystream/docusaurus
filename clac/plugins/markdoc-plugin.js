// plugins/markdoc-plugin.js
const path = require('path');
const fs = require('fs');

module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin-markdoc',
    async loadContent() {
      const outputDir = path.resolve(__dirname, '../src/markdoc-processed');
      const files = fs.readdirSync(outputDir).filter(file => file.endsWith('.json'));

      const contents = files.map(file => {
        const filepath = path.join(outputDir, file);
        const content = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        return {
          id: file.replace(/\.json$/, ''),
          content,
        };
      });

      return contents;
    },
    async contentLoaded({ content, actions }) {
      const { addRoute, createData } = actions;

      await Promise.all(content.map(async doc => {
        const docContentPath = await createData(
          `${doc.id}.json`,
          JSON.stringify(doc.content)
        );

        addRoute({
          path: `/docs/${doc.id}`,
          component: '@site/src/components/MarkdocPage',
          exact: true,
          modules: {
            doc: docContentPath,
          },
        });
      }));
    },
  };
};
