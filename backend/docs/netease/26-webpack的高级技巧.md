# 26-webpack不简单-为你揭秘webpack的高级技巧

26课时与7课时基本重复，所以简单记录不同点。

Webpack 不同等级的使用者：

初级：可以通过CLI搭建基本的webpack并打包项目

中级：可以更改一部分配置文件（loader plugin）

高级：使用webpack解决项目的问题

## 环境和目录

- 开发环境（dev）webpack.dev.conf.js
- 测试环境（test）Test.js 打包测试文件，而不是打包业务代码
- 生产环境（prod）

对应不同的配置文件

基本配置文件：webpack.base.conf.js (主要是loaders) vue-loader, babel-loader, url-loader(handle image file jpg), url-loader(handle meida file mp4)

在不同环境中，把基本配置和特定环境的配置项目 merge 成一个配置文件。

例如：生产环境下执行下面的操作

~~~bash
node build.js
~~~

JS内部使用 webpack.base.conf.js and webpack.prod.conf.js 合并文件，从 config 中拿出  index.js and pro.env 中的环境变量，然后进行生产环境下面的打包。

~~~js
const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf.js');

const spinner = ora('building starting');
spinner.start();

// delete dist dir
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) {
        throw err;
    }
    // start webpack 
    webpack(webpackConfig, (err, stats) => {
        spinner.stop();
        if (err) {
            throw err;
        }
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // ts-loader set it true
            chunks: false,
            chunkModules: false
        }) + '\n\n');
        if (stats.hasErrors()) {
            console.log(chalk.red('build with error.\n'));
            process.exit(1);
        }
        console.log(chalk.cyan('build complete.\n'));
    });
});
~~~


## 常用 loader 和 plugin

- webpack.DefinePlugin 在打包阶段定义全局变量
- webpack.HashedMouduleIdsPlugin 保持 module.id 稳定，第三方库避免重复打包
- webpack.NoEmitOnErrorsPlugin 屏蔽打包时的错误，浏览器可以显示界面
- webpack.ProvidePlugin 提供库
- copy-webpack-plugin 帮助手动拷贝内容（未打包的字体图标或者图片）

这些在前面的课程中介绍过，这里简单说一下第一个

~~~js
plugins: [
    new webpack.DefinePlugin({
        'process.env': env
    }),
    new UglifyJsPlugin({
        uglifyOptions: {
            compress: {
                warnings: false
            }
        },
        sourceMap: config.build.productionSourceMap,
        parallel: true
    }),
]
~~~

插件都放在 plugins 数组中，创建一个插件的实例
