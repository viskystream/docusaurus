const fs = require('fs');
const path = require('path');
const Markdoc = require('@markdoc/markdoc');

module.exports = function (context, options) {
    return {
        name: 'docusaurus-plugin-markdoc',
        async loadContent() {
            const docsDir = path.resolve(__dirname, '../docs');
            const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.mdoc'));

            return files.map(file => {
                const filepath = path.join(docsDir, file);
                const source = fs.readFileSync(filepath, 'utf-8');
                const ast = Markdoc.parse(source);
                const content = Markdoc.transform(ast);

                return {
                    id: file.replace(/\.mdoc$/, ''),
                    title: content.attributes.title || 'Untitled',
                    content: Markdoc.renderers.html(content),
                };
            });
        },
        async contentLoaded({ content, actions }) {
            const { addRoute, createData } = actions;

            await Promise.all(content.map(async doc => {
                const docContentPath = await createData(
                    `${doc.id}.json`,
                    JSON.stringify(doc)
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
