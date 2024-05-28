import config from 'config';
import { Schema, Tag } from '@markdoc/markdoc';

const companyEmail = config.get<string>('companyEmail');

const schema: Schema = {
    render: 'CompanyEmail',
    attributes: {
        variant: { type: String },
    },
    transform(node, mdConfig) {
        const attributes = node.transformAttributes(mdConfig);
        return new Tag('CompanyEmail', attributes, [companyEmail]);
    },
};

export default schema;
