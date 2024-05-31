import { Client } from '@elastic/elasticsearch';
import config from 'config';

const client = new Client({
    node: config.get('elastic.endpoint'),
    auth: {
        username: config.get('elasticUsername'),
        password: config.get('elasticPassword'),
    },
});

export default client;
