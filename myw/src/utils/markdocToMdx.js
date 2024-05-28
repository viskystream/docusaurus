// src/utils/markdocToMdx.js

import React from 'react';
import { Fence, Heading, Link } from '../components/CustomMarkdownComponents';

function transformNode(node) {
  if (!node) return null;

  switch (node.type) {
    case 'fence':
      return <Fence className={node.meta}>{node.content}</Fence>;
    case 'heading':
      return <Heading level={node.level}>{transformChildren(node.children)}</Heading>;
    case 'link':
      return <Link href={node.url}>{transformChildren(node.children)}</Link>;
    default:
      return transformChildren(node.children);
  }
}

function transformChildren(children) {
  return children.map(child => transformNode(child));
}

export function markdocToMdx(ast) {
  return transformNode(ast);
}