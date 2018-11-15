// require('./ignore.js')();
require('ignore-styles');
require('@babel/register')({
    ignore: [/\/(build|node_modules)\//],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        'syntax-dynamic-import',
        'dynamic-import-node',
        'react-loadable/babel',
        'transform-class-properties'
    ]
});

require('module-alias/register')
require("babel-polyfill");

require('./app')