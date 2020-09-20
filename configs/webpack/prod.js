// production config
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

const commonConfig = require('./common')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: './index.tsx',
    output: {
        filename: 'js/[name].[contenthash:8].min.js',
        path: resolve(__dirname, '../../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(scss|sass)$/,
                loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                // chunk all antd/ant-design modules into a named module
                antd: {
                    test(module) {
                        return (
                            module.resource &&
                            (module.resource.includes('antd') || module.resource.includes('ant-design'))
                        )
                    },
                    name: 'antd',
                    chunks: 'all',
                    reuseExistingChunk: true
                },
                // chunk all non antd/ant-design modules into vendors
                vendors: {
                    reuseExistingChunk: true,
                    test(module, chunks) {
                        // https://github.com/ant-design/babel-plugin-import#note
                        return (
                            module.resource &&
                            module.resource.includes('node_modules') &&
                            !module.resource.includes('antd') &&
                            !module.resource.includes('ant-design')
                        )
                    }
                }
                // vendor: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name(module) {
                //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                //         return `npm.${packageName.replace('@', '')}`
                //     }
                // }
            }
        }
    },
    plugins: [
        new Dotenv(),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' }),
        new OptimizeCSSAssetsPlugin()
    ]
})
