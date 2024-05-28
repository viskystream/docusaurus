import config from 'config';
import { Schema, Tag } from '@markdoc/markdoc';

const companyName = config.get<string>('companyName');

const schema: Schema = {
    render: 'CompanyName',
    attributes: {
        variant: { type: String },
    },
    transform(node, mdConfig) {
        const attributes = node.transformAttributes(mdConfig);
        return new Tag('CompanyName', attributes, [companyName]);
    },
};

export default schema;
