const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
let {blue,red,gold} = require('@ant-design/colors');


module.exports = {
    entry: {
        index: './src/index.tsx',
    },
    output: {
        filename: 'bundle.js',      // 打包后的文件名称
        path: path.resolve('dist')  // 打包后的目录，必须是绝对路径
    },
    devServer: {
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true,              // 开启热更新
        overlay: true,          // 浏览器页面上显示错误
        historyApiFallback: true
    }, 
    module: {
        rules: [
            {
                test: /\.less$/,     // 解析less
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader', {
                        loader: 'less-loader',
                        options: {
                          modifyVars: {
                            '@layout-body-background': '#171717',
                            '@background-color-base': '#262626',
                            '@body-background': '#404041',
                            '@layout-sider-background': '#171F22',
                            '@component-background': '#171F22',
                            '@layout-header-background': '#171F22',
                            '@menu-dark-submenu-bg': '#171F22',
                            '@input-bg': '#313133',
                            '@btn-default-bg': '#262626',
                            '@border-color-base': 'rgba(255, 255, 255, 0.25)',
                            '@border-color-split': '#363636',
                            '@heading-color': '#E3E3E3',
                            '@text-color': '#E3E3E3',
                            '@text-color-secondary': 'fade(#fff, 65%)',
                            '@table-selected-row-bg': '#3a3a3a',
                            '@table-expanded-row-bg': '#3b3b3b',
                            '@table-header-bg': '#3a3a3b',
                            '@table-row-hover-bg': '#3a3a3b',
                            '@layout-trigger-color': 'fade(#fff, 80%)',
                            '@layout-trigger-background': '#313232',
                            '@alert-message-color': 'fade(#000, 67%)',
                            '@item-hover-bg': `fade(${blue[5]}, 20%)`,
                            '@item-active-bg': `fade(${blue[5]}, 40%)`,
                            '@disabled-color': 'rgba(255, 255, 255, 0.25)',
                            '@tag-default-bg': '#262628',
                            '@popover-bg': '#262629',
                            '@wait-icon-color': 'fade(#fff, 64%)',
                            '@background-color-light': `fade(${blue[5]}, 40%)`,
                            '@collapse-header-bg': '#262629',
                            '@info-color': '#313133',
                            '@primary-color': '#0A53B0',
                            '@highlight-color': red[7],
                            '@warning-color': gold[9],
                          },
                          javascriptEnabled: true,
                        },
                    }] // 从右向左解析
                }),
            },
            {
                test: /\.scss$/,     // 解析scss
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader', 'sass-loader'] // 从右向左解析
                })
            },
            {
                test: /\.css$/,     // 解析css
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/'   // 图片打包后存放的目录
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            },
            // {
            //     test: /\.ts(x?)$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: 'ts-loader'
            //         },
            //         {
            //             loader: 'babel-loader'
            //         },
            //     ],
            //     include: /src/
            // },
            // {
            //     test: /\.js(x?)$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: 'babel-loader'
            //         },
            //     ],
            //     include: /src/
            // },
            {
                test: /\.(jsx|tsx|js|ts)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    compilerOptions: {
                        module: 'esnext'
                    }
                },
                exclude: /node_modules/
            }
            
        ]
    },
    plugins: [
       //"transform-runtime",
       new CleanWebpackPlugin(),
       new HtmlWebpackPlugin({
            title: 'index',
            template: './src/index.html',
            hash: true,
        }),
        new ExtractTextWebpackPlugin('css/style.css') 
    ],
    resolve: {
        // 别名
        alias: {
          pages:path.join(__dirname,'src/pages'),
          utils:path.join(__dirname,'src/utils'),
        },
        // 省略后缀
        extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less', '.ts', '.tsx']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                // utils: {
                //     // 抽离自己写的公共代码，utils里面是一个公共类库
                //     chunks: 'initial',
                //     name: 'utils',  //  任意命名
                //     minSize: 0    // 只要超出0字节就生成一个新包
                // }
            }
        }
    },
}
