# 第20课 实战Vue组件化开发

### 目标

实现类似 element.js 中 modal 组件的效果，基于 VUE

### 开发环境搭建

~~~bash
npm install @vue/cli -g
vue init vue-modal
~~~

具体的开发环境搭建参考VUE项目初始化过程

[https://github.com/Michael18811380328/HelloVUE/blob/master/vue-cli/vuecli%20%E4%BD%BF%E7%94%A8.md](https://github.com/Michael18811380328/HelloVUE/blob/master/vue-cli/vuecli 使用.md)

初始化完毕后，删除项目中的默认的VUE界面

App.vue 这是原始文件

~~~vue
<template>
	<div id="app"></div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  }
}
</script>
~~~

修改成下面的自定义文件

~~~vue
<template>
	<div id="app">
    <wy-test></wy-test>
  </div>
</template>

<script>
import WyTest from './Wytest';
export default {
  name: 'App',
  components: {
    WyTest
  }
}
</script>
~~~

Wytest.vue

~~~vue
<template>
	<div>
    <wy-dialog></wy-dialog>
  </div>
</template>

<script>
  import WyDialog from '../packages/WyDialog'
  export default {
    name: 'WyTest',
    components: {
      WyDialog
    }
  }
</script>
~~~

WyDialog.vue

~~~vue
<template>
	<div class="wy_dialog_wrapper">
    <div class="wy_dialog">
      <!-- head -->
      <div class="wy_dialog_header">
        <span class="wy_dialog_title">提示文字</span>
        <button class="wy_dialog_header_btn">
          <i class="wy-icon-close"></i>
  			</button>
  		</div>
      <!-- body -->
      <div class="wy-dialog-body">
        <span>这是内容</span>
  		</div>
      <!-- footer -->
      <div class="wy-dialog-footer">
        <button>取消</button>
        <button>确认</button>
  		</div>
  	</div>
  </div>
</template>
~~~

需要初始化

HTML CSS 已经有了不需要考虑

组件拆分

组件复用性-手动更改

调用者传递参数

测试

slot 插槽

给组件传递name 默认的参数 数据类型是字符串

main.js

~~~js
import Vue from 'vue';
import App from './App.vue';

Vue.config.prodectionTip = false;

new Vue({
  render: h => h(app)
}).$mount('#app')
~~~







### Wy-Dialog 组件的实现













看了25分钟，后面的基本是VUE的内容，看不懂

