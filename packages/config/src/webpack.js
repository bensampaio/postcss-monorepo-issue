const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const VENDOR_PATH_REGEX = /node_modules\/(?!(@test)\/)/;

module.exports = (entry) => [
    {
        devtool: 'eval',
        entry,
        mode: process.env.NODE_ENV,
        module: {
            rules: [
                {
                    exclude: VENDOR_PATH_REGEX,
                    loader: 'babel-loader',
                    options: {
                        // cacheDirectory: true,
                        overrides: [{
                            presets: [
                                ['@babel/preset-env', {
                                    corejs: 3,
                                    targets: [
                                        'last 2 versions',
                                        'not dead',
                                    ],
                                    useBuiltIns: 'usage',
                                }],
                            ],
                        }],
                        rootMode: 'upward',
                    },
                    test: /\.jsx?$/,
                    type: 'javascript/auto',
                },
                {
                    exclude: VENDOR_PATH_REGEX,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: true,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                modules: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        ['autoprefixer', {
                                            overrideBrowserslist: [
                                                'last 2 versions',
                                                'not dead',
                                            ],
                                        }],
                                    ],
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                    test: /\.scss$/,
                }
            ],
        },
        name: 'client',
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin(),
            ],
        },
        output: {
            chunkFilename: 'js/[name].[contenthash].js',
            filename: 'js/[name].[contenthash].js',
            path: path.join(process.cwd(), 'public', 'build'),
            publicPath: '/build/',
        },
        plugins: [
            new MiniCssExtractPlugin({
                chunkFilename: 'css/[id].[contenthash].css',
                filename: 'css/[name].[contenthash].css',
                ignoreOrder: true,
            }),
        ],
        target: 'web',
        watchOptions: {
            ignored: /node_modules/,
        },
    },
    {
        devtool: 'eval',
        entry,
        mode: process.env.NODE_ENV,
        module: {
            rules: [
                {
                    exclude: VENDOR_PATH_REGEX,
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        rootMode: 'upward',
                    },
                    test: /\.jsx?$/,
                    type: 'javascript/auto',
                },
                {
                    exclude: VENDOR_PATH_REGEX,
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    exportOnlyLocals: true,
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                    test: /\.scss$/,
                }
            ],
        },
        name: 'server',
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin(),
            ],
        },
        output: {
            chunkFilename: '[name].js',
            filename: '[name].js',
            libraryTarget: 'commonjs2',
            path: path.join(process.cwd(), 'server', 'build'),
            publicPath: '/build/',
        },
        target: 'node',
        watchOptions: {
            ignored: /node_modules/,
        },
    }
];
