// shared config (dev and prod)
const { resolve } = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    context: resolve(__dirname, '../../src'),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            [
                                'import',
                                {
                                    libraryName: 'antd',
                                    libraryDirectory: 'lib', // lib works better than es
                                    style: false // used when importing less or modifying theme variables
                                },
                                'antd'
                            ],
                            [
                                // only need if also using ant-design icons
                                'import',
                                {
                                    // this was the best combination
                                    libraryName: '@ant-design/icons',
                                    libraryDirectory: '',
                                    camel2DashComponentName: false
                                },
                                '@ant-design/icons'
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'awesome-typescript-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]']
            },
            {
                test: /\.(ico)$/i,
                loaders: ['file-loader?name=[name].[ext]']
            }
        ]
    },
    plugins: [new CheckerPlugin(), new HtmlWebpackPlugin({ template: 'index.html' })],
    performance: {
        hints: false
    }
}
