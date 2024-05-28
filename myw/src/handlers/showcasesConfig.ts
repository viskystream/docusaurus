import config from 'config';
import type { RequestHandler } from 'express';

const getShowcasesConfig: RequestHandler = (req, res) => {
    const data = {
        sportsUrl: config.get('sportsUrl') || '',
    };

    res.status(200).json(data);
};

export default { getShowcasesConfig };
