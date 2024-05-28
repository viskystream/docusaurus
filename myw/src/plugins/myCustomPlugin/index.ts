import type { Plugin } from '@docusaurus/types';
import { Fence, Heading } from '../../components/CustomMarkdownComponent';

const components = {
  pre: Fence,
  h1: Heading,
};

export default function myCustomPlugin(context, options) {
  return {
    name: 'my-custom-plugin',
    loadContent() {
      console.log('Loading content');
    },
    contentLoaded({ content, actions }) {
      actions.setGlobalData({
        mdxComponents: components
      });
    },
  };
}


