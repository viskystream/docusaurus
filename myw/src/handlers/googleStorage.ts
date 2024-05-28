
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { log } from '../../log';

function createProxy(proxyPath: string) {
    const baseUrl = 'https://storage.googleapis.com';
    const bucket = proxyPath.split('/').pop();
    const target = bucket ? `${baseUrl}/${bucket}` : baseUrl;
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite(path) {
            return path.replace(proxyPath, '');
        },
        onError: (err, req, res) => {
            log.error('Proxy onError', err);
            res.writeHead(500, {
                'Content-Type': 'text/plain',
            });
            res.end('Something went wrong. Error with google storage proxy.');
        },
        onProxyReq: fixRequestBody,
    });
}

export default {
    createProxy,
};
