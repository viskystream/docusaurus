const path = require('path');
import { themes as prismThemes } from 'prism-react-renderer';
// const pRR = require('prism-react-renderer');

console.log("Docusaurus config loaded");

module.exports = {
  title: 'My Site',
  url: 'https://yoursite.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'your-org',
  projectName: 'your-project',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/your-org/your-project/edit/main/website/',
          exclude: [
            '**/markdoc/**', // Ignore all files in the markdoc directory
            '**/*.markdoc.md', // Ignore all files with the .markdoc.md extension
          ],
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/your-org/your-project/edit/main/website/blog/',
        },
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      },
    ],
  ],
  plugins: [
    path.resolve(__dirname, 'plugins/markdoc-plugin.js'),
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
};
