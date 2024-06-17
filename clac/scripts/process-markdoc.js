// scripts/process-markdoc.js
const fs = require('fs');
const path = require('path');
const Markdoc = require('@markdoc/markdoc');
const markdocConfig = require('../markdoc.config.js'); // Your Markdoc config

const docsDir = path.resolve(__dirname, '../markdoc');
const outputDir = path.resolve(__dirname, '../src/markdoc-processed');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
    const filepath = path.join(docsDir, file);
    const source = fs.readFileSync(filepath, 'utf-8');
    const ast = Markdoc.parse(source);
    const content = Markdoc.transform(ast, markdocConfig);

    const outputFilePath = path.join(outputDir, file.replace(/\.md$/, '.json'));
    fs.writeFileSync(outputFilePath, JSON.stringify(content, null, 2));
});

console.log('Markdoc files processed successfully');
