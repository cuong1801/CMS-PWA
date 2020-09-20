// development config
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const commonConfig = require('./common')
const Dotenv = require('dotenv-webpack')

module.exports = merge(commonConfig, {
    output: {
        publicPath: '/',
    },
    mode: 'development',
    entry: [
        'react-hot-loader/patch', // activate HMR for React
        'webpack-dev-server/client?http://localhost:3005', // bundle the client for webpack-dev-server and connect to the provided endpoint
        'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
        './index.tsx', // the entry point of our app
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', { loader: 'css-loader' }],
            },
            {
                test: /\.(scss|sass)$/,
                loaders: ['style-loader', { loader: 'css-loader' }, 'sass-loader'],
            },
        ],
    },
    devServer: {
        hot: true, // enable HMR on the server
        historyApiFallback: true,
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new Dotenv(),
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    ],
})
