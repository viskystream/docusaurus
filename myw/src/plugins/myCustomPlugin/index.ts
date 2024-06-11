import type { Plugin } from '@docusaurus/types';

import { getDoc, transformData } from '../../handlers/markdoc';


export default function myCustomPlugin(context, options) {
  return {
    name: 'my-custom-plugin',
    async loadContent() {
      const ret = await getDoc();
      console.log('loadContent');
      console.log(JSON.stringify(ret));
      return ret;
    },
    async contentLoaded({ content, actions }) {
      const { addRoute, createData } = actions;
      const contentPath = await createData(
        'myData.json',
        JSON.stringify(content.ast)
      );
      addRoute({
        path: '/example',
        component: '@site/src/components/MyCustomPage',
       // component: '@site/src/components/DocDocument',
        exact: true,
        //source: contentPath,
        modules: {
          customData: contentPath,
        },
      });
      // actions.setGlobalData({
      //     content
      // });
    },
  };
}


