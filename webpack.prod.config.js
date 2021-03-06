var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.config.js');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


//清空基本配置的插件列表
webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/dist/',
        filename: '[name].[hash].js'
    },
    plugins: [
        new ExtractTextPlugin({
            // 提取css,并从命名为带有20位hash值的唯一文件
            filename: '[name].[hash].css',
            allChunks: true
        }),
        //定义当前node环境为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        //压缩js
//     new webpack.optimize.UglifyJsPlugin({
//         compress: {
//             warnings: false,
//         }
//     }),
		new VueLoaderPlugin(),
        //提取模板 并保存入口html文件
        new HtmlWebpackPlugin({
            filename: '../index_prod.html',
            template: './index.ejs',
            inject: false
        })
    ],
    optimization: {
		    minimizer: [
		      new UglifyJsPlugin({
			      	uglifyOptions: {
	                    compress: false
	                }
		      	})
		    ]
		}
		
})