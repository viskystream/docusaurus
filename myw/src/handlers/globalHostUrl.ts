import config from 'config';
import type { RequestHandler } from 'express';

const getGlobalHostUrl: RequestHandler = (req, res) => {
    const data = {
        globalHostUrl: config.has('globalHostUrl') ? config.get('globalHostUrl') : '',
    };

    res.status(200).json(data);
};

export default { getGlobalHostUrl };
