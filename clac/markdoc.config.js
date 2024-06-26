// const React = require('react');
// const Note = require('./src/components/Note').default;

// const components = {
//     Note,
// };

const tags = {
    note: {
        render: 'Note',
        attributes: {},
    },
    tabs: {
        render: 'Tabs',
    },
    'tab-header': {
        render: 'TabHeader',
        attributes: {
            spacing: { type: String },
            className: { type: String },
        },
    },
    'tab-header-item': {
        render: 'TabHeaderItem',
        attributes: {
            disabled: { type: Boolean },
            className: { type: String },
        },
    },
    'tab-panel': {
        render: 'TabPanel',
        attributes: {
            className: { type: String },
        },
    },
    'tab-panel-item': {
        render: 'TabPanelItem',
        attributes: {
            className: { type: String },
        },
    },
    image: {
        render: 'Image',
        attributes: {
            src: { type: String },
            alt: { type: String },
        },
    },
    fence: {
        render: 'Fence',
        attributes: {
            language: {
                type: String,
            },
        },
    }
};

module.exports = {
    // components,
    tags,
};
