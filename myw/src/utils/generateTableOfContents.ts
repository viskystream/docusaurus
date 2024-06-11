import { RenderableTreeNode, Tag } from '@markdoc/markdoc';

export interface TableOfContentsSection {
  id?: string
	title?: string
  tagName?: string
  top: number
  el?: Element
  highlighted?: boolean
}

export type TableOfContents = TableOfContentsSection[]

const generateTableOfContents = (nodes: RenderableTreeNode[]) => {
  const sections = [] as TableOfContents;

  if (!nodes) {
    return sections;
  }

  nodes.forEach((node) => {
    const tag = (node as Tag);

    if (/^h[23]$/.test(tag?.name)) {
      const title = tag?.children?.reduce<string>((accumulator, currentValue) => {
        if (typeof currentValue === 'string') {
          return `${accumulator}${currentValue}`;
        }

        // edge case where there's a code tag ot italics inside the header
        // for example, there's a doc with a header: ### 7. Fill in `playerReducer`
        if (currentValue?.children?.length === 1 && typeof currentValue?.children?.[0] === 'string') {
          return `${accumulator}${currentValue?.children?.[0]}`;
        }

        return accumulator;
      }, '');

      if (title) {
        sections.push({
          ...tag.attributes,
          tagName: tag.name,
          title,
          top: 0,
        });
      }
    }

    sections.push(...generateTableOfContents(tag?.children ?? []));
  });

  return sections;
};

export default generateTableOfContents;
