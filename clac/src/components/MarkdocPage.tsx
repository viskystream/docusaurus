import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

const MarkdocPage = ({ doc }) => {
  const { siteConfig } = useDocusaurusContext();
  console.log("doc", doc);
  const { content } = doc;

  return (
    <Layout
      title={doc.title}
      description={doc.description || 'Description will go into a meta tag in <head />'}
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <article>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarkdocPage;
