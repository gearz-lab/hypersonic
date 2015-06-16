import _ from 'lodash';
import webpack from 'webpack';
import yargs from 'yargs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    entry: {
        bundle: './src/client.js'
    },

    output: {
        filename: '[name].js',
        path: './dist/assets',
        publicPath: '/assets/'
    },

    externals: undefined,

    resolve: {
        extensions: ['', '.js', '.json']
    },

    module: {
        loaders: [
            {test: /\.js/, loader: 'babel?optional=es7.objectRestSpread!client', exclude: /node_modules/ },
            {test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.less$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            {test: /\.json$/, loader: 'json'},
            {test: /\.jpe?g$|\.gif$|\.png$/, loader: 'file?name=[name].[ext]'},
            {test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/, loader: 'file?name=[name].[ext]'}
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
};
