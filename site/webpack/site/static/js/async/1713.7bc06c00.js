"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["1713"],{5466:function(e,n,r){r.r(n),r.d(n,{default:function(){return i}});var s=r(6469),c=r(8809);function a(e){let n=Object.assign({h1:"h1",a:"a",p:"p",code:"code",h2:"h2",h3:"h3",pre:"pre",blockquote:"blockquote",ul:"ul",li:"li"},(0,c.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.h1,{id:"create-react-app入门教程",children:["create-react-app入门教程",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#create-react-app入门教程",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"统计信息：字数 3959  阅读8分钟"}),"\n",(0,s.jsx)(n.p,{children:"create time 2019-01-01"}),"\n",(0,s.jsx)(n.p,{children:"last modify time 2024-04-12"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Create React App"}),"是官方出的一个构建",(0,s.jsx)(n.code,{children:"React"}),"单页面应用的脚手架工具。它本身集成了",(0,s.jsx)(n.code,{children:"Webpack"}),"，并配置了一系列内置的",(0,s.jsx)(n.code,{children:"loader"}),"和默认的npm的脚本，可以很轻松的实现零配置就可以快速开发React的应用。"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://facebook.github.io/create-react-app/docs/documentation-intro",target:"_blank",rel:"noopener noreferrer",children:"官网文档"})}),"\n",(0,s.jsxs)(n.h2,{id:"quick-start",children:["Quick Start",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#quick-start",children:"#"})]}),"\n",(0,s.jsxs)(n.h3,{id:"全局安装",children:["全局安装",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#全局安装",children:"#"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"# 全局安装\nnpm install -g create-react-app\n\n# 构建一个my-app的项目\nnpx create-react-app my-app\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"公共目录",children:["公共目录",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#公共目录",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"公共目录里面的内容不会被webpack进行处理，仅仅会拷贝到最终生成的项目的根目录下。"}),"\n",(0,s.jsxs)(n.h3,{id:"html模板修改",children:["HTML模板修改",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#html模板修改",children:"#"})]}),"\n",(0,s.jsxs)(n.p,{children:["在",(0,s.jsx)(n.code,{children:"public"}),"目录中有个",(0,s.jsx)(n.code,{children:"index.html"}),"是单页面应用的基本模板，所有react生成的代码都会注入到此HTML中。所以此处可以添加一些cdn脚本或者全局的html。"]}),"\n",(0,s.jsxs)(n.h3,{id:"添加全局的资源图片字体svg视频等",children:["添加全局的资源（图片、字体、svg、视频等）",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#添加全局的资源图片字体svg视频等",children:"#"})]}),"\n",(0,s.jsxs)(n.p,{children:["在公共目录下，你可以放字体文件、图片、svg等文件，访问这些文件最好添加 ",(0,s.jsx)(n.code,{children:"%PUBLIC_URL%"}),"作为根目录。"]}),"\n",(0,s.jsxs)(n.h2,{id:"环境变量",children:["环境变量",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#环境变量",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"巧妙的使用环境变量可以帮我们在项目中区分开生产环境还是编译环境，从而执行不同的代码。"}),"\n",(0,s.jsxs)(n.h3,{id:"添加自定义环境变量文件env",children:["添加自定义环境变量文件",(0,s.jsx)(n.code,{children:".env"}),(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#添加自定义环境变量文件env",children:"#"})]}),"\n",(0,s.jsxs)(n.p,{children:["项目根目录下创建",(0,s.jsx)(n.code,{children:".env"}),"文件，文件内部添加 ",(0,s.jsx)(n.code,{children:"key=value"}),"的配置可以直接应用于项目的编译中。"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"REACT_APP_NOT_SECRET_CODE=abcdef\n"})}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:["Note: 如果创建自定义的环境变量必须以",(0,s.jsx)(n.code,{children:"REACT_APP_"}),"开头."]}),"\n"]}),"\n",(0,s.jsxs)(n.h3,{id:"在项目中使用环境变量",children:["在项目中使用环境变量",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#在项目中使用环境变量",children:"#"})]}),"\n",(0,s.jsxs)(n.p,{children:["在项目中可以直接用",(0,s.jsx)(n.code,{children:"process.env.XXX"}),"访问我们的自定义的环境变量。比如："]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"js中使用"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'render() {\n  return (\n    <div>\n      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>\n      <form>\n        <input type="hidden" defaultValue={process.env.REACT_APP_NOT_SECRET_CODE} />\n      </form>\n    </div>\n  );\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"再比如：判断是否是生产环境"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"if (process.env.NODE_ENV !== 'production') {\n  analytics.disable();\n}\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"配合typescript",children:["配合TypeScript",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#配合typescript",children:"#"})]}),"\n",(0,s.jsxs)(n.p,{children:["第一种方式：创建项目的时候直接配置好",(0,s.jsx)(n.code,{children:"TypeScript"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"npx create-react-app my-app --typescript\n"})}),"\n",(0,s.jsxs)(n.p,{children:["第二种方式：为现有的React项目添加",(0,s.jsx)(n.code,{children:"TypeScript"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"npm install --save typescript @types/node @types/react @types/react-dom @types/jest\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"配置代理",children:["配置代理",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#配置代理",children:"#"})]}),"\n",(0,s.jsxs)(n.h3,{id:"packagejson配置代理",children:[(0,s.jsx)(n.code,{children:"package.json"}),"配置代理",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#packagejson配置代理",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"配置简单代理，直接在package.json文件中添加proxy节点即可："}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  ...\n  "proxy": "http://localhost:4000",\n  ...\n}\n'})}),"\n",(0,s.jsxs)(n.h3,{id:"自定义配置代理",children:["自定义配置代理",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#自定义配置代理",children:"#"})]}),"\n",(0,s.jsxs)(n.p,{children:["第一步：安装 ",(0,s.jsx)(n.code,{children:"http-proxy-middleware"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"$ npm install http-proxy-middleware --save\n"})}),"\n",(0,s.jsxs)(n.p,{children:["第二步：创建： ",(0,s.jsx)(n.code,{children:"src/setupProxy.js"})," 添加如下内容:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"const proxy = require('http-proxy-middleware');\nmodule.exports = function(app) {\n  app.use(proxy('/api', { target: 'http://localhost:5000/' }));\n};\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"https托管静态站",children:["HTTPS托管静态站",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#https托管静态站",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"有时候需要用HTTPS进行调试相关结构，所以需要把静态站也做成HTTPS的，那么以下配置："}),"\n",(0,s.jsxs)(n.p,{children:["配置",(0,s.jsx)(n.code,{children:"HTTPS"}),"的环境变量为",(0,s.jsx)(n.code,{children:"true"}),"然后再用",(0,s.jsx)(n.code,{children:"npm start"}),"启动",(0,s.jsx)(n.code,{children:"dev server"}),"就是HTTPS的了。"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"HTTPS=true npm start\n"})}),"\n",(0,s.jsx)(n.p,{children:"浏览器可能有安全警告，不用管，直接测试，enjoy it！"}),"\n",(0,s.jsxs)(n.h2,{id:"分析包结构的大小",children:["分析包结构的大小",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#分析包结构的大小",children:"#"})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Source map explorer"}),"可以帮助我们分析代码最终打包的",(0,s.jsx)(n.code,{children:"bundles"}),"的代码来自哪里"]}),"\n",(0,s.jsx)(n.p,{children:"安装："}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"npm install --save source-map-explorer\n"})}),"\n",(0,s.jsxs)(n.p,{children:["添加分析脚本到",(0,s.jsx)(n.code,{children:"package.json"}),"的",(0,s.jsx)(n.code,{children:"scripts"}),"中："]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-diff",children:'   "scripts": {\n+    "analyze": "source-map-explorer build/static/js/main.*",\n     "start": "react-scripts start",\n     "build": "react-scripts build",\n     "test": "react-scripts test",\n'})}),"\n",(0,s.jsx)(n.p,{children:"那么就可以运行以下命令进行分析最终打包的情况了："}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"npm run build\nnpm run analyze\n"})}),"\n",(0,s.jsx)(n.p,{children:"说明：此时 webpack 需要开启 sourcemap 配置才能正常使用。如果没有开启 sourcemap 则无法分析。"})]})}function d(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:n}=Object.assign({},(0,c.ah)(),e.components);return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}let i=d;d.__RSPRESS_PAGE_META={},d.__RSPRESS_PAGE_META["webpack%2F02-create-react-app%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B.md"]={toc:[{text:"Quick Start",id:"quick-start",depth:2},{text:"全局安装",id:"全局安装",depth:3},{text:"公共目录",id:"公共目录",depth:2},{text:"HTML模板修改",id:"html模板修改",depth:3},{text:"添加全局的资源（图片、字体、svg、视频等）",id:"添加全局的资源图片字体svg视频等",depth:3},{text:"环境变量",id:"环境变量",depth:2},{text:"添加自定义环境变量文件`.env`",id:"添加自定义环境变量文件env",depth:3},{text:"在项目中使用环境变量",id:"在项目中使用环境变量",depth:3},{text:"配合TypeScript",id:"配合typescript",depth:2},{text:"配置代理",id:"配置代理",depth:2},{text:"`package.json`配置代理",id:"packagejson配置代理",depth:3},{text:"自定义配置代理",id:"自定义配置代理",depth:3},{text:"HTTPS托管静态站",id:"https托管静态站",depth:2},{text:"分析包结构的大小",id:"分析包结构的大小",depth:2}],title:"create-react-app入门教程",frontmatter:{}}}}]);