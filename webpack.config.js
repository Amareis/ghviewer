webpack = require('webpack')
path = require('path')
HtmlWebpackPlugin = require('html-webpack-plugin')
CleanWebpackPlugin = require('clean-webpack-plugin')
CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: {
        'ghviewer': './src/index.js',
        //'ghviewer.min': './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin({include: /\.min\.js$/}),
        new HtmlWebpackPlugin({template: 'src/index.ejs'}),
        new CopyWebpackPlugin([{from: 'src/styles', to: 'styles'}, {from: 'src/fonts', to: 'fonts'}])
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};