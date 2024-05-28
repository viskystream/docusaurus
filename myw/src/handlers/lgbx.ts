
import config from 'config';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { log } from '../../log';

function getLGBXHost() {
    let host = 'http://lgbx-broker:8201';
    if (config.has('lgbxHost')) {
        host = config.get('lgbxHost');
    }
    return host;
}

function createProxy(proxyPath: string) {
    return createProxyMiddleware({
        target: getLGBXHost(),
        changeOrigin: true,
        pathRewrite(path) {
            return path.replace(proxyPath, '');
        },
        onError: (err, req, res) => {
            log.error('Proxy onError', err);
            res.writeHead(500, {
                'Content-Type': 'text/plain',
            });
            res.end('Something went wrong. Error with LGBX proxy.');
        },
        onProxyReq: fixRequestBody,
    });
}

export default {
    createProxy,
};
