"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["5739"],{3301:function(e,s,c){c.r(s),c.d(s,{default:function(){return i}});var d=c(6469),n=c(8809);function r(e){let s=Object.assign({h1:"h1",a:"a",p:"p",code:"code",h2:"h2",pre:"pre",ul:"ul",li:"li"},(0,n.ah)(),e.components);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(s.h1,{id:"使用-mkdocs-在-github-上快速部署文章",children:["使用 Mkdocs 在 Github 上快速部署文章",(0,d.jsx)(s.a,{className:"header-anchor","aria-hidden":"true",href:"#使用-mkdocs-在-github-上快速部署文章",children:"#"})]}),"\n",(0,d.jsx)(s.p,{children:"统计信息：字数 2581  阅读6分钟"}),"\n",(0,d.jsx)(s.p,{children:"2021-11-03"}),"\n",(0,d.jsx)(s.p,{children:"以考代练：如何安装；如何初始化；如何增加超链接；（如何部署到github）"}),"\n",(0,d.jsx)(s.p,{children:"博客较短；仅供参考"}),"\n",(0,d.jsxs)(s.p,{children:["为项目编写文档，找到了一款叫 ",(0,d.jsx)(s.code,{children:"MkDocs"})," 的工具。"]}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.code,{children:"MkDocs"})," 架构简单，工具可以自动创建一个配置文件 ",(0,d.jsx)(s.code,{children:"mkdocs.yml"}),"，以及 ",(0,d.jsx)(s.code,{children:"docs"})," 文件夹，通过简单的配置，在 ",(0,d.jsx)(s.code,{children:"docs"})," 文件夹上添加 ",(0,d.jsx)(s.code,{children:"markdown"})," 文件作为页面。完成后工具自带部署到 Github 上的功能，通过简单的设置，就可以轻松使用 GitPage 展示项目文档。\n具体细节可以参考 MkDocs 官网文档："]}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://markdown-docs-zh.readthedocs.io/zh_CN/latest/",target:"_blank",rel:"noopener noreferrer",children:"MkDocs 中文官网"})}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://www.mkdocs.org/",target:"_blank",rel:"noopener noreferrer",children:"MkDocs 英文官网"})}),"\n",(0,d.jsxs)(s.h2,{id:"mkdocs-安装",children:["MkDocs 安装",(0,d.jsx)(s.a,{className:"header-anchor","aria-hidden":"true",href:"#mkdocs-安装",children:"#"})]}),"\n",(0,d.jsxs)(s.p,{children:["使用 ",(0,d.jsx)(s.code,{children:"pip"})," 安装 mkdocs。"]}),"\n",(0,d.jsx)(s.pre,{children:(0,d.jsx)(s.code,{className:"language-shell",children:"pip install mkdocs\n"})}),"\n",(0,d.jsxs)(s.p,{children:["安装完成后，可以检查以下 ",(0,d.jsx)(s.code,{children:"MkDocs"})," 是否能正确安装"]}),"\n",(0,d.jsx)(s.pre,{children:(0,d.jsx)(s.code,{className:"language-shell",children:"mkdocs --version\n>> mkdocs, version 1.2.2 \n# 2021年11月 1.2.2 版本\n"})}),"\n",(0,d.jsx)(s.p,{children:"能看到版本号正常显示，即表示 MkDocs 工具以被正常安装完成。"}),"\n",(0,d.jsxs)(s.h2,{id:"创建文档项目",children:["创建文档项目",(0,d.jsx)(s.a,{className:"header-anchor","aria-hidden":"true",href:"#创建文档项目",children:"#"})]}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.code,{children:"MkDocs"})," 提供了 ",(0,d.jsx)(s.code,{children:"mkdocs new <project name>"})," 命令创建文档项目。然而，在一般情况下，我们都是先在 GitHub 上创建了一个已有的项目，然后再为其添加相应的文档。这里有两个方法可以参考："]}),"\n",(0,d.jsxs)(s.ul,{children:["\n",(0,d.jsxs)(s.li,{children:["使用 ",(0,d.jsx)(s.code,{children:"mkdocs new <project>"})," 来创建一个新文档项目，然后将其中的 ",(0,d.jsx)(s.code,{children:"docs"})," 文件夹以及 ",(0,d.jsx)(s.code,{children:"mkdocs.yml"})," 配置文件复制到项目根目录下。"]}),"\n",(0,d.jsxs)(s.li,{children:["直接创建一个 ",(0,d.jsx)(s.code,{children:"mkdocs.yml"})," 和 ",(0,d.jsx)(s.code,{children:"docs"})," 文件夹与项目根目录下。\n接下来，我们可以在 ",(0,d.jsx)(s.code,{children:"docs"})," 目录下创建一个 ",(0,d.jsx)(s.code,{children:"index.md"})," 文件，然后向其中添加一些内容，尝试运行一下看看文档项目是否能正常运行，具体方法如下："]}),"\n"]}),"\n",(0,d.jsx)(s.pre,{children:(0,d.jsx)(s.code,{className:"language-shell",children:"mkdocs serve\n"})}),"\n",(0,d.jsxs)(s.p,{children:["等待工具运行，然后默认地址是 ",(0,d.jsx)(s.code,{children:"http://127.0.0.1:8000"})," 我们通过浏览器打开，查看页面是否能正常显示。"]}),"\n",(0,d.jsxs)(s.h2,{id:"超链接",children:["超链接",(0,d.jsx)(s.a,{className:"header-anchor","aria-hidden":"true",href:"#超链接",children:"#"})]}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.code,{children:"mkdocs"})," 的链接非常简单，直接使用 MarkDown 语法的连接即可，连接路径使用项目相对路径即可。\n如果是图片，可以在 ",(0,d.jsx)(s.code,{children:"docs"})," 文件夹向创建一个 ",(0,d.jsx)(s.code,{children:"images"})," 的文件夹，引用的使用可以使用方法:"]}),"\n",(0,d.jsx)(s.pre,{children:(0,d.jsx)(s.code,{className:"language-markdown",children:"![image](./images/image.jpg)\n"})}),"\n",(0,d.jsxs)(s.h2,{id:"部署到-github",children:["部署到 Github",(0,d.jsx)(s.a,{className:"header-anchor","aria-hidden":"true",href:"#部署到-github",children:"#"})]}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.code,{children:"MkDocs"})," 部署到 Github 也非常简单，使用命令 ",(0,d.jsx)(s.code,{children:"mkdocs gh-deploy"})," ，工具就会自动将相应内容推送到项目的 ",(0,d.jsx)(s.code,{children:"gh-pages"})," 分支上，然后只需要在 Github 项目设置中选择好对应 GitPage 的分支，然后通过 ",(0,d.jsx)(s.code,{children:"https://<user-name>.github.io/<project-name>"})," 访问即可。"]})]})}function h(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:s}=Object.assign({},(0,n.ah)(),e.components);return s?(0,d.jsx)(s,{...e,children:(0,d.jsx)(r,{...e})}):r(e)}let i=h;h.__RSPRESS_PAGE_META={},h.__RSPRESS_PAGE_META["mkdocs%2FMkdocs-github-blog.md"]={toc:[{text:"MkDocs 安装",id:"mkdocs-安装",depth:2},{text:"创建文档项目",id:"创建文档项目",depth:2},{text:"超链接",id:"超链接",depth:2},{text:"部署到 Github",id:"部署到-github",depth:2}],title:"使用 Mkdocs 在 Github 上快速部署文章",frontmatter:{}}}}]);