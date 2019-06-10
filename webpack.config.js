const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const assetsSubDirectory = 'static'

const resolve = (_path) => {
    return path.resolve(__dirname, _path)
}
const assetsPath = (_path) => {
    return path.join(assetsSubDirectory, _path)
}

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    return {
        entry: {
            app: './src/index.js'
        },
        output:{
            filename: '[name].js',
            filename: assetsPath('js/[name].[hash].js'),
            chunkFilename: assetsPath('js/[id].[chunkhash].js')
        },
        devServer:{
            clientLogLevel: 'warning',
            hot: true,
            // quiet: true,
        },
        devtool: 'inline-source-map',
        module: {
            rules:[
                {
                    test: /\.scss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }                    
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      name: assetsPath('img/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: assetsPath('media/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: assetsPath('fonts/[name].[hash:7].[ext]')
                    }
                }
            ]
        },
        optimization: {
            minimizer: [ 
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: 'index.html',
                minify:{
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
            }),
            
            new CopyWebpackPlugin([
                {
                    from: resolve('./static'), 
                    to: resolve('./dist/static'),
                    ignore: ['.*']
                }
            ]),
            new MiniCssExtractPlugin({
                filename: assetsPath('./css/[name].[hash].css'),
                chunkFilename: assetsPath('./css/[name].[hash].css')
            }),
            new webpack.HotModuleReplacementPlugin({
               
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        ]
    }
}