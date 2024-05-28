const path = require('path');

module.exports = function webpackPlugin(context, options) {
    return {
        name: 'custom-webpack-alias-plugin',
        configureWebpack(config, isServer, utils) {
            return {
                resolve: {
                    alias: {
                        '@components': path.resolve(__dirname, '../../components'),
                    },
                },
            };
        },
    };
};
