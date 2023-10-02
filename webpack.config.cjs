const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: './src/scene/scrip.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'test.js',
    },
};