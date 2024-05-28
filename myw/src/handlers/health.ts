import type { RequestHandler } from 'express';

const ping: RequestHandler = (req, res) => {
    res.status(200).send('pong');
};

export default { ping };
