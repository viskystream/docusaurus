export default function myPlugin(context, options) {
    // ...
    return {
      name: 'my-plugin',
      async loadContent() {
        console.log('Hello World plugin wow!');
      },
      async contentLoaded({content, actions}) {
        console.log(content);
        // ...
      },
      /* other lifecycle API */
    };
};