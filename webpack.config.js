module.exports = {
    output: {
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/env'],
                },
            },
        ],
    },
    mode: 'development',
};
