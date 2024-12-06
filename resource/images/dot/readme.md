# 自动创建流程图使用说明

使用 graphviz 工具

官网链接：http://www.graphviz.org/about/

示例：http://www.graphviz.org/gallery/

### 环境创建

本地执行 `brew install graphviz` 安装软件（最好设置代理）

详细参考：https://www.cnblogs.com/taceywong/p/5439574.html

### 创建全部的流程图

更改脚本中的文件路径，运行 `node gererate.js`，即可生成目标路径下的全部流程图

### 简单配置

digraph 有向图，Hello->World 表示两个节点，通过一个路径链接

~~~js
digraph G {Hello->World}
~~~

### 复杂配置

graph 是普通的图

~~~js
graph ER {
  
  layout=neato
  // 这是图层的类型，可选的是下面的类型（其他的参数会报错）
  // circo dot fdp neato nop nop1 nop2 osage patchwork sfdp twopi

  // 设置节点属性和名称
  // 中括号内部是节点属性（样式，颜色）
  // 不同节点名称使用分号隔开
  node [shape=box]; course; institute; student;
	
  // 这个name是多个同名节点，name012对应内部ID识别
  node [shape=ellipse]; {
    node [label="name"] name0; name1; name2;
  }code; grade; number;
  
  node [shape=diamond, style=filled, color=red]; "C-I"; "S-C"; "S-I";
	
  // 下面是图的路径
  name0 -- course;
  code -- course;
  
  // 中括号中是路径的属性（标签和长度）
  course -- "C-I" [label="测试",len=2.00];
  "C-I" -- institute [label="测试2",len=2.00];
  institute -- name1;
  institute -- "S-I" [label="1",len=2.00];
  "S-I" -- student [label="n",len=2.00];
  student -- grade;
  student -- name2;
  student -- number;
  student -- "S-C" [label="m",len=2.00];
  "S-C" -- course [label="n",len=2.00];
	
  // 设置全局的标签和属性
  label = "\n\nEntity Relation Diagram\ndrawn by NEATO";
  fontsize=20;
}
~~~

### todo 创建更改后的流程图

如果是 git 仓库中，写一个脚本，然后执行 git diff 找到更改后的 dot 文件，执行编译

### Todo 图片导出

可以直接把图片统一放在某个 output 目录下
