---
layout: post
title:  "Editor.js"
date:   2019-04-11 17:59:11 +0800
categories: jekyll update
---

# Editor.js

Editor.js 是一个在线富文本编辑器 官网链接：https://editorjs.io/

## Editor.js 快速入门

1. 导入编辑器库 Install Editor.js 
2. 编辑器初始化 Configure and initialise the Editor
3. 安装工具 Install and Tools 
4. 配置工具 connect tools

### 引入

安装分为三种，Node， CDN（链接 https://www.jsdelivr.com/package/npm/@editorjs/editorjs），本地文件安装。这里只介绍 node 环境。

~~~bash
npm i @editorjs/editorjs --save-dev
~~~

~~~js
import EditorJS from '@editorjs/editorjs';
~~~

### 初始化配置

初始化时，可以不用包含任何参数

~~~js
import EditorJS from '@editorjs/editorjs';
const editor = new EditorJS();
~~~

下面是增加配置的代码-IE浏览器需要兼容

~~~js
import EditorJS from '@editorjs/editorjs';
const editor = new EditorJs('codex-editor');
~~~

~~~js
import EditorJS from '@editorjs/editorjs';   
const editor = new EditorJs({   
  holderId: 'codex-editor' 
});
~~~

详细的配置文件在后文介绍。

### 安装工具

每一个块级节点是一个插件。初始化时我们仅提供段落块级节点。你可以在这里使用其他的块级节点。点击不同的块级节点可以获取具体的安装指导。

1. [Header](https://github.com/editor-js/header)
2. [Link embeds](https://github.com/editor-js/link)
3. [Raw HTML blocks](https://github.com/editor-js/raw)
4. [Simple Image](https://github.com/editor-js/simple-image) (without backend requirement)
5. [Image](https://github.com/editor-js/image)
6. [Checklist](https://github.com/editor-js/checklist)
7. [List](https://github.com/editor-js/list)
8. [Embeds](https://github.com/editor-js/embed)
9. [Quote](https://github.com/editor-js/quote)

And some [others](https://github.com/editor-js).

安装工具后，你需要通过配置对象，将编辑器和块级节点连接。

### 配置工具

先看一下开始的最简单的配置
~~~js
import EditorJs from '@editorjs/editorjs';   
const editor = new EditorJs({    
  holderId: 'codex-editor',  
})
~~~

然后，增加一些工具配置。可以添加 `tools`对象。

~~~js
import EditorJs from '@editorjs/editorjs';  
import Header from '@editorjs/header';  
import List from '@editorjs/list';   
const editor = new EditorJs({    
  /**     * Id of Element that should contain the Editor     */    
  holderId: 'codex-editor',       
/**     
  * Available Tools list.     
  * Pass Tool's class or Settings object for each Tool you want to use     */
  tools: {
    header: Header,
    list: List
  },  
});
~~~

上面的例子中，我们使用了没有选项的工具（只有工具名称，header list）。



当然，这些工具可以增加选项。我们可以给这些工具增加特定的选项（下面的class inlineToolbar，设定了行内是否显示工具栏，显示哪些工具栏，工具的类名等）。

~~~js
import EditorJs from '@editorjs/editorjs';  
import Header from '@editorjs/header';  
import List from '@editorjs/list';   
const editor = new EditorJs({    
  /**     * Id of Element that should contain the Editor     */    
  holderId: 'codex-editor',     
  /**     * Available Tools list.     * Pass Tool's class or Settings object for each Tool you want to use     */    
  tools: {      
    header: {       
      class: Header,        
      inlineToolbar: ['link']      
    },      
    list: {        
      class: List,        
      inlineToolbar: true      
    }    
  },  
})
~~~

那么，基本的 Editor 就搭建好了。

### 注意事项

Editor.js 是原生 JS， 和 React 框架并不通用。