/**
 * @file Desciption: webpack config file
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/5/31
 */
const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: resolve(__dirname, '.'),
    entry: {
        // activate HMR for React
        A: 'react-hot-loader/patch',

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        C: 'webpack/hot/only-dev-server',

        // the entry point of our app
        index: './assets/index.js',
        connections: './assets/connections.js',
        notebook: './assets/notebook.jsx',
        vendors: ['react', 'react-dom']

    },
    output: {
        // filename: 'bundle.js',
        filename: '[name].js',

        path: resolve(__dirname, 'dist'),

        // necessary for HMR to know where to load the hot update chunks
        publicPath: '/'
    },
    externals: {
        jquery: 'jQuery'
    },
    devtool: 'inline-source-map',
    devServer: {
        // enable HMR on the server
        hot: true,

        // match the output path
        contentBase: resolve(__dirname, 'dist'),

        // match the output `publicPath`
        publicPath: '/',
        port: 8082,
        // proxy: {
        //     '/': 'http://localhost:8080/'
        // }
        proxy: {
            '/api': {
                target: 'http://localhost:8080/',
                pathRewrite: {'^/api': '/api/'},
                changeOrigin: true
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {test: /\.(jpg|png|gif)$/, use: 'url-loader?limit=25000&name=image/[hash].[ext]'},
            {test: /\.woff[2]?$/, use: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[hash].[ext]'},
            {test: /\.ttf$/, use: 'url-loader?limit=10000&name=fonts/[hash].[ext]'},
            {test: /\.eot$/, use: 'url-loader?limit=10000&name=fonts/[hash].[ext]'},
            {test: /\.svg$/, use: 'url-loader?limit=10000&name=fonts/[hash].[ext]'},
            // load html
            {test: /\.html$/, use: 'html-loader'},
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    plugins: [

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/index.html',
            inject: 'body',
            hash: true,
            chunks: ['vendors', 'index'],
            // min html
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'connections.html',
            template: 'assets/connections.html',
            inject: 'body',
            hash: true,
            chunks: ['vendors', 'connections'],
            // min html
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'notebook.html',
            template: 'assets/notebook.html',
            inject: 'body',
            hash: true,
            chunks: ['vendors', 'notebook'],
            // min html
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),

        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // Specify the common bundle's name.
            name: 'vendors'
        })
    ],
};