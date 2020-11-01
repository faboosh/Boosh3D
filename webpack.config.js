
const path = require('path');
module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            { 
                test: /\.obj$/, 
                loader: 'raw-loader' 
            },
            { 
                test: /\.glsl$/, 
                loader: 'raw-loader' 
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};