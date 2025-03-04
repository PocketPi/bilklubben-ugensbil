module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 6,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `vendor.${packageName.replace('@', '')}`;
                    }
                }
            }
        }
    }
};