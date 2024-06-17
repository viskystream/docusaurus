import React, { useEffect, useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Markdoc from '@markdoc/markdoc';
import Note from './Note';
import {
  TabHeader, TabHeaderItem, TabPanel, TabPanelItem, Tabs
} from './Tabs';


const components = {
  Note,
  Tabs,
  TabHeader,
  TabHeaderItem,
  TabPanel,
  TabPanelItem,
}

const MarkdocPage = ({ doc }) => {
  console.log("MarkdocPage doc", doc);

  const render = useMemo(() => Markdoc.renderers.react(doc, React, { components }), [doc]);

  return (
    <Layout title="Markdoc Page" description="Rendering Markdoc content">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <article>{render}</article>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarkdocPage;
