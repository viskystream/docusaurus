import config from 'config';
import type { RequestHandler } from 'express';

const getGlobalHostUrl: RequestHandler = (req, res) => {
    const data = {
        globalHostUrl: config.has('globalHostUrl') ? config.get('globalHostUrl') : '',
    };

    res.status(200).json(data);
};

const getPublicConfig: RequestHandler = (req, res) => {
    const data: Record<string, unknown> = config.get('public') || {};
    const companyName = config.get('companyName');
    res.status(200).json({ ...data, companyName });
};

export default { getGlobalHostUrl, getPublicConfig };
