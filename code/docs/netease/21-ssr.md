# 21-SSR 做么做

### SSR 是什么

SSR：首屏服务端渲染-server side render

SEO原理：使用爬虫爬取HTML中的关键字和主要标题

面试：你的某个项目中有什么亮点？为了SEO优化和加快首屏优化速度，进行了SSR渲染；

SSR：服务器端解析执行JS（开启一个Node服务，执行请求，生产HTML，把处理好的页面发送给浏览器）；减少浏览器的卡顿（服务器压力增加了）；客户看到的效果很舒服；

好处：减轻浏览器工作压力（只实现UI层，内存少）；实现首屏优化（首页全部的渲染在浏览器）（原来请求很多文件3MB，现在只请求300KB）；利于SEO（SEO爬虫主要获取HTML，传统的界面是JS生成的，所以很多信息无法获取）

坏处：传统界面类似于原生的界面跳转，SSR后每次进入一个新页面需要重新请求刷新。

VUE根据生命周期函数拆分服务器端的JS和浏览器的JS部分（不需要自己写）

传统架构：完全浏览器渲染（服务器端存放静态资源，index.html, app.bundle.js，app.bundle.css 浏览器请求后渲染界面）类似于原生APP的使用体验。

把CLI改造成SSR

### SSR组成部分

app.js 分成两部分：code(store + router + component) => server entey + client entry  => webpack build => server bundle.js + client.bundle.js => server render + client render

每一次访问需要新建一个VUE实例（对于界面频繁跳转的情况不适合）

服务器端会执行 beforeCreate create 两个生命周期函数（钩子）

### 核心库

vue + vue-server-renderer

### 自己动手搭建SSR

不管是服务器端的JS代码，还是浏览器端的JS代码，都按照生产环境进行打包。只不多打包的入口是不同。

需要把 webpack.prod.conf.js 复制过来，然后修改一下。

可以把压缩部分的代码注释掉

Webpack 打包时，会把注释删除，但是服务端NodeJS运行是需要一段注释作为插入点（类似Django中的插入点），所以需要把webpack配置中的minify删除。

webpack支持模板引擎，所以可以在HTML中写模板引擎字符串。

server.js

~~~js
const express = require('express');
const fs = require('fs');
const Vue = require('vue');

// 开启express服务
const server = express();

// 这是关键：后端使用renderer把VUE渲染成HTML
const renderer = require('vue-server-renderer').createRenderer();

function createApp(url) {
  if (url === '/') {
    url = '/index';
  }
  return new Vue({
    // 从文件中读取模板
    template: fs.readFileSync('template' + url + '.html', 'utf-8')
  });
}

server.get('*' , (req, res) => {
  var app = createApp(req.url);
  // 把VUE项目转换成HTML
  renderer.renderToString(app).then(html => {
    // 把转换后的结果放在浏览器界面上
    res.end(html);
  });
});

server.listen(7000);
~~~

test.js

~~~js
const Vue = require('vue');
const app = new Vue({
  template: `<div>Hello World <span>{{num}}</span></div>`,
  data: {
    num: 123
  }
});
~~~

index.html

~~~html
<body>
  <div id="app"></div>
  <!-- build files will be auto injected -->
</body>
~~~

index.ssr.html

~~~html
<body>
  <!-- 这是模板插入的入口，下面的注释不能删除 -->
	<!--vue-ssr-outlet-->
  <script src=""></script>
</body>
~~~

/src/router/index.js

~~~js
import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
      }
    ]
  })
}
~~~

/src/main.js

~~~js
import Vue from 'vue';
import App from './App';
// import router from './router';
import { createRouter } from './router';

Vue.config.productionTip = false;

// 对外暴露一个函数
export fucntion createApp() {
  const app = new Vue({
    router,
    render: h => h(App)
  })
  return { app, router }
}

// 下面的注释掉
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
~~~

App.vue

~~~vue
<template>
	<div id="app">
    <img src='./logo.png'/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style></style>
~~~

Client.js

~~~js
import { createApp } from './main';
const { app, router } = createApp();
router.onReady(() => {
  app.$mount('#app');
});
~~~

Server.js

~~~js
import { createApp } from './main';
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();
    // 先设置路由router的位置
    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      resolve(app);
    }, reject);
  })
}
~~~

webpack.bundleserver.js

webpack.bundleclient.js

这两个文件和生产环境下面的webpack配置基本相同，需要做一些修改

下面是client配置部分

webpack.buldle-client.js

~~~js
'use strict'
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('./config.js');
const merge = require('webpack-merge');
// plugins: copy-webpack-plugin html-webpack-plugin 
// extract-text-webpack-plugin optimize-css-assets-webpack-plugin
// uglifyjs-webpack-plugin
const VueSSRClientPlugin = require('');

const env = require('../config/prod.env');

const webpackConfig = merge(baseWebpackConfiging, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    })
  },
  // add entry
  entry: {
    app: './src/client.js'
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.buildassetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new VueSSRClientPlugin(),
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
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
    }),
    // 很多的插件为了压缩打包，测试时可以注释这些插件
  ],
});

~~~

webpack.bundleserver.js

~~~js
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

// 其他配置相同，需要设置不同的入口函数
export default {
  entry: {
    app: './src/serve.js'
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new VueSSRServerPlugin(),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 中间的其他插件省略
    // compress extracted CSS we are using this plugin so that possible duplicated CSS from different components can be deputed. 
    //  压缩提取的CSS，确保来源于不同组件的CSS文件被压缩
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap ? { date: true, map: {inline: false}} : {safe: true}
    }),
    // generate dist index.html with correct asset hash for caching
    new HtmlWebpackPlugin({
      // filename: config.build.index,
      filename: 'index.ssr.html',
      template: 'index.ssr.html',
      inject: true,
      files: {
        js: 'app.js'
      },
      // 下面的压缩（在测试时可以删除）
      //minify: {
      //  removeComments: true,
      //  collapseWhitespace: true,
      //  removeAttributeQuotes: true,
      //},
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope histing
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
}
~~~


webpackbase.config.js

~~~js
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
    	'vue$': 'vue/dist/vue.esm.js',
    	'@': resolve('src'),
  	}
  }
}
~~~

package.json

~~~json
{
  "scripts": {
    "start": "npm run dev",
    "build": "node build/build.js",
    "build:client": "webpack --config build/webpack.buildclient.js",
    "build:server": "webpack --config build/webpack.buildserver.js",
  }
}
~~~

server.js

~~~js
const express = require('express');
const server = express();
const { createBundleRenderer } = require('vue-server-renderer');
const path = require('path');
const fs = require('fs');
const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssrs-servers-bundle.json'));
const sclientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
  renInNewContext: false,
  template: template,
  clientManifest: clientManifest
});
server.uses(expresss.statics(path.resolve(__dirname, '../dists')));
server.get('*', (req, res) => {
  const contexts = {url: req.url};
  const ssrStream = renderer.renderToStream(context);
  let buffers = [];
  ssrStream.on('error', (error) => {console.log(error);});
  ssrStream.on('data', (data) => {bufffer.push(data);});
  ssrStream.on('end', () => {
    res.end(Buffer.concat(buffers));
  });
});
server.listen(3000);
~~~

serve.js

~~~js
import { createApp } from './main';
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();
    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      resolve(app);
    });
  }, reject);
}
~~~

~~~bash
node ./server/server.js
~~~

### VUE 中使用 Nuxt 框架实现SSR

其他参考文献：https://www.jianshu.com/p/10b6074d772
