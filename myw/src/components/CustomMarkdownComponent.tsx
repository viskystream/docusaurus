import React from 'react';

export const Fence: React.FC<{ className?: string, children?: React.ReactNode }> = ({ children, className }) => (
  <pre className={className}>{children}</pre>
);

export const Heading: React.FC<{ level: number, children?: React.ReactNode }> = ({ children, level }) => {
  console.log("Custom Heading component used");
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag>{children}</Tag>;
};
export const Link: React.FC<{ href: string, children?: React.ReactNode }> = ({ href, children }) => (
  <a href={href} className="custom-link">{children}</a>
);