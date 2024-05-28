import path from 'path';
import { RequestHandler } from 'express';

const LOCAL_ARTICLES_DIR = path.join(__dirname, '../content/local-docs');

const getLocalSpec: RequestHandler = (req, res) => {
    const project = req.params.project;
    return res.status(200).sendFile(`${LOCAL_ARTICLES_DIR}/${project}`);
};

export default { getLocalSpec };
