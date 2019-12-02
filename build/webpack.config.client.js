// webpack是帮忙打包前端资源的，前端资源有很多不同的类型，包括css，js，image等

const path = require('path');

// 使用html-webpack-plugin
const HTMLPlugin = require('html-webpack-plugin');

// 引入webpack
const webpack = require('webpack');

// 引入css单独打包库
const ExtractPlugin = require('extract-text-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 引入 merge 包
const merge = require('webpack-merge');

// 引入base config
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
    new webpack.DefinePlugin({
        //在这里定义，我们在代码里面都可以引用到了，方便书写代码的时候判断环境
        'process.env': {
            // 这里的引号一定需要，不然调用process.env.NODE_ENV = develop; develop变量是没有定义的。
            NODE_ENV: isDev ? '"development"' : '"prouction"'
        }
    }),
    new HTMLPlugin(),
    // Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
    new VueLoaderPlugin()
];

const devServer = {
    port: 8000,
    // 使用0.0.0.0在本机可以使用127.0.0.1访问，也可以使用本机ip进行访问，这样别人在自己的电脑上也可以访问了
    host: '0.0.0.0',
    overlay: {
        // 将编译的错误都显示在网页上
        errors: true,
    },
    // 热更新，不增加时，修改代码，页面会刷新，开启hot可以实现只更新修改的组件不刷新页面
    // 使用这个需要增加两个plugin，HotModuleReplacementPlugin 和 NoEmitOnErrorsPlugin
    hot: true
    // 单页应用做很多前端路由，页面进来的地址默认不一定是index.html，这个配置可以把一些webpack devserver本身不理解，没有映射的地址，都映射到入口index.html上
    // historyFallback: {}
    // 在启动devserver的时候，自动打开浏览器
    // open: true
};

let config;

if(isDev) {
    config = merge(baseConfig, {
        //帮助在页面调试代码，默认浏览器打开都是编译之后的代码，不方便调试
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.styl(us)?$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            // postcss处理时是需要一个sourceMap的，这样写是让postcss可以使用其他的loader已经产生的sourceMap，从而加快编译速度
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        devServer: devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    });
} else {
    config = merge(baseConfig,{
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vender: ['vue'],
        },
        output: {
            filename: '[name].[chunkHash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.styl(us)?$/,
                    use: ExtractPlugin.extract({
                        fallback: 'style-loader',
                        use:[
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                // postcss处理时是需要一个sourceMap的，这样写是让postcss可以使用其他的loader已经产生的sourceMap，从而加快编译速度
                                options: {
                                    sourceMap: true,
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[md5:contentHash:hex:8].css')
        ]),
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2, maxInitialRequests: 5,
                        minSize: 0
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    }
                }
            },
            runtimeChunk: true
        }
    });
}

module.exports = config;
