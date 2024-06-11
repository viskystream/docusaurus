// src/components/ASTRenderer.jsx

import React from 'react';
import DocsDocument from './DocsDocument';

// Helper components for different node types
const Heading = ({ level, children }) => {
  const Tag = `h${level}`;
  return <Tag>{children}</Tag>;
};

const Paragraph = ({ children }) => <p>{children}</p>;
const List = ({ items }) => <ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul>;
const Link = ({ href, children }) => <a href={href}>{children}</a>;

// Main AST Renderer component
function ASTRenderer({ node }) {
  if (!node) return null;

  // Function to recursively render AST nodes
  const renderNode = (node) => {
    switch (node.type) {
      case 'heading':
        return <Heading level={node.level}>{node.children.map(renderNode)}</Heading>;
      case 'paragraph':
        return <Paragraph>{node.children.map(renderNode)}</Paragraph>;
      case 'list':
        return <List items={node.children.map(renderNode)} />;
      case 'link':
        return <Link href={node.href}>{node.children.map(renderNode)}</Link>;
      case 'document':
        return <div>{node.children.map(renderNode)}</div>;
      default:
        return <div>Unsupported node type: {node.type}</div>;
    }
  };

  return (
    <div>
      {/* Use DocsDocument for specific parts of the AST, e.g., the introduction */}
      {node.type === 'document' && node.meta && node.meta.part === 'introduction' && (
        <DocsDocument astNode={node} />
      )}

      {/* General rendering for other parts */}
      {renderNode(node)}
    </div>
  );
}

export default ASTRenderer;