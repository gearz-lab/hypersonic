import webpack from 'webpack';

export default {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/client.js'
    ],

    output: {
        filename: 'bundle.js',
        path: './dist/assets',
        publicPath: 'http://localhost:8080/assets/'
    },

    externals: undefined,

    resolve: {
        extensions: ['', '.js', '.json']
    },

    module: {
        loaders: [
            {test: /\.js/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            {test: /\.css/, loader: 'style-loader!css-loader'},
            {test: /\.less$/, loader:  'style!css!less'},
            {test: /\.json$/, loader: 'json'},
            {test: /\.jpe?g$|\.gif$|\.png$/, loader: 'file?name=[name].[ext]'},
            {test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/, loader: 'file?name=[name].[ext]'}
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': "'development'"
            }
        })
    ],

    // the configuration above does not apply to the webpack-dev-server...
    // webpack-dev-server is configured below
    devServer: {
        contentBase: "./dist",
        hot: true,
        noInfo: true,
        headers: { 'Access-Control-Allow-Origin': '*' }
    }
};
