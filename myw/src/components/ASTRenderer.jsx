// src/components/ASTRenderer.jsx

import React from 'react';

function ASTRenderer({ node }) {
  if (!node) return null;

  // Helper function to determine if a node is inline
  const isInline = (nodeType) => {
    return ['text', 'inline', 'em', 'strong', 'code', 'link', 'softbreak'].includes(nodeType);
  };

  // Handle different node types
  switch (node.type) {
    case 'document':
    case 'tag':
      return (
        <div>
          {node.children.map((child, index) => (
            <ASTRenderer key={index} node={child} />
          ))}
        </div>
      );
    case 'paragraph':
      return (
        <React.Fragment>
          {node.children.map((child, index) => (
            isInline(child.type) ? (
              <ASTRenderer key={index} node={child} />
            ) : (
              // Wrap non-inline elements in React.Fragment and render outside of <p>
              <React.Fragment key={index}>
                <div>
                  <ASTRenderer node={child} />
                </div>
              </React.Fragment>
            )
          ))}
        </React.Fragment>
      );
    case 'text':
      return <span>{node.attributes.content}</span>;
    case 'inline':
      return <span>{node.children.map((child, index) => <ASTRenderer key={index} node={child} />)}</span>;
    case 'heading':
      const Tag = `h${node.attributes.level || 1}`;
      return <Tag>{node.children.map((child, index) => <ASTRenderer key={index} node={child} />)}</Tag>;
    case 'list':
      return (
        <ul>
          {node.children.map((child, index) => (
            <ASTRenderer key={index} node={child} />
          ))}
        </ul>
      );
    case 'strong':
      return <strong>{node.children.map((child, index) => <ASTRenderer key={index} node={child} />)}</strong>;
    case 'item':
      return (
        <li>
          {node.children.map((child, index) => (
            <ASTRenderer key={index} node={child} />
          ))}
        </li>
      );
    case 'em':
      return <em>{node.children.map((child, index) => <ASTRenderer key={index} node={child} />)}</em>;
    case 'code':
      return <code>{node.attributes.content}</code>;
    case 'fence':
      return <pre><code>{node.attributes.content}</code></pre>;
    case 'link':
      return <a href={node.attributes.href}>{node.children.map((child, index) => <ASTRenderer key={index} node={child} />)}</a>;
    case 'softbreak':
      return <br />;
    default:
      return <div>Unsupported node type: {node.type}</div>;
  }
}

export default ASTRenderer;