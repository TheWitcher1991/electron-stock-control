'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PATHS = {
    src: path.join(__dirname, './src'),
    build: path.join(__dirname, '/build')
}

const mode = process.env.NODE_ENV || 'node'
const target = process.env.NODE_ENV === 'production' ? 'browserslist' : 'web'

module.exports = {
    entry: [
        `${PATHS.src}/scss/index.scss`
    ],
    output: {
        path: path.join(__dirname, './build/static'),
        filename: 'script.bundle.js',
    },
    devtool: 'source-map',
    mode,
    target,
    node: {
        global: true,
        __filename: true,
        __dirname: true
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.scss'],
        fallback: {
            fs: false,
            os: false,
            path: false
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.bundle.css'
        })
    ]
}
