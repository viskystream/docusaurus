import type { Plugin } from '@docusaurus/types';

import { getDoc } from '../../handlers/markdoc';


export default function myCustomPlugin(context, options) {
  return {
    name: 'my-custom-plugin',
    loadContent() {
      const ret = getDoc();
      console.log(ret);
      return ret;
    },
    async contentLoaded({ content, actions }) {
      const { addRoute, createData } = actions;
      const contentPath = await createData(
        'myData.json',
        JSON.stringify(content)
      );
      addRoute({
        path: '/example',
        component: '@site/src/components/MyCustomPage',
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


