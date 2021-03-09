# 课时13 使用VUE创建组件

讲师：谭金龙

### 环境搭建

VUE 组件传值+插槽

VUE-cli 脚手架的安装

Vue-cli3 下面的UI框架设计（最新的版本4.2）23版本区别较大

elementUI

package.json 生成，安装下面的依赖

~~~
@vue-cli
~~~



### 开发组件

先删除界面VUE一定定义的东西

Packages/button/src/button.vue

~~~vue
<template>
	<div id='app'>
    <h1>UI</h1>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      
    }
  }
</script>
<style lang='sass'>
</style>
~~~

### 打包上传到npm

现在比较卡，所以暂时不学。把旧的内容先学会。这一个课时主要用VUE

