# MUI使用教程

## 架构分析
技术栈架构图:
<img src="https://00feng00.github.io/img/mui-architecture.png">
项目架构分为三个部分：
1)客户端：H5/IOS/Android/小程序
2)服务端：JAVA数据交互层

具体分析：
H5的技术栈有好几种，这里个人推荐使用VUE，因为后面的更新迭代，我们可能会使用MUI最新的一套uni-app，它是基于Vue的，为了之后修改少部分的代码就可以更新迭代。

之所以现在还不使用这套uni-app，因为它目前发布了小程序丶APP，还没有发布H5版本的，后面会发布的。


（By the way 11月14日-16日于多伦多小右发表了名为 “ Vue 3.0 Updates ” 的主题演讲，概括起来就是more faster more easier）
Vue3.0特点：
1、更快
Virtual DOM 完全重写，mounting & patching 提速 100% ；
更多编译时（compile-time）提醒以减少 runtime 开销；
基于 Proxy 观察者机制以满足全语言覆盖及更好的性能；
放弃 Object.defineProperty ，使用更快的原生 Proxy ；
组件实例初始化速度提高 100％ ；
提速一倍/内存使用降低一半。
2、更小 
3、更易维护
4、更易于原生
5、让开发者更轻松

二丶使用MUI发布APP
我们使用H5+APP这套来开发，然后我们可以发布Android丶IOS的APP应用。
(MUI后面我们会讲很详细的)

三丶服务端
服务端我们使用JAVA，这里需要注意一点，后端开发人员要处理允许跨域调用，而且要允许option的访问，对option进行过滤。


## MUI简介
Mui追求性能体验，它是最接近原生APP体验的高性能前端框架。<br />
MUI的特点是：轻量、原生UI、流畅体验。<br />
<br />
## 体验
从上面的架构分析，我们可以很清晰的看到，我们是使用H5来开发的。
MUI UI 控件:
<img src="https://00feng00.github.io/img/mui-code-m.png"> 

UI 列表：
<img src="https://00feng00.github.io/img/mui-ui-01.png">
<img src="https://00feng00.github.io/img/mui-ui-02.png">
<img src="https://00feng00.github.io/img/mui-ui-03.png">
体验版：
可以体验我写出来的Demo,里面有一个调用生产的demo,调用用户登录查询接口。
后端开发人员需要注意一点：允许跨域调用，而且要允许option的访问，对option进行过滤。

## 注意事项
在讲解代码之前，我们要注意几个点：
1丶固定栏靠前
固定栏，就是带有.mui-bar属性的节点，都是基于fixed定位的元素；
常见组件包括：
顶部导航栏（.mui-bar-nav）、底部工具条(.mui-bar-footer)、底部选项卡（.mui-bar-tab）;
这些元素使用时需遵循一个规则：
放在.mui-content元素之前，即使是底部工具条和底部选项卡，也要放在.mui-content之前，否则固定栏会遮住部分主内容；

2丶一切内容都要包裹在mui-content中
除了固定栏之外，其它内容都要包裹在.mui-content中，否则就有可能被固定栏遮罩。
原因：固定栏基于Fixed定位，不受流式布局限制，普通内容依然会从top:0的位置开始布局，这样就会被固定栏遮罩。
mui为了解决这个问题，定义了如下css代码：
```css
    .mui-bar-nav ~ .mui-content {
        padding-top: 44px;
    }
    .mui-bar-footer ~ .mui-content {
        padding-bottom: 44px;
    }
    .mui-bar-tab ~ .mui-content {
        padding-bottom: 50px;
    }
```
当然拉，这个是H5开发，所以也可以自定义样式。everything is ok。

3丶始终为button按钮添加type属性
如果button按钮没有type属性，浏览器默认按照type=submit逻辑处理，这样若将没有type的button放在form表单中，点击按钮就会执行form表单提交，页面就会刷新，用户体验极差。

4丶页面初始化：必须执行mui.init方法
mui在页面初始化时，初始化了很多参数配置，比如：按键监听、手势监听等，因此mui页面都必须调用一次mui.init()方法；

5丶页面跳转：抛弃href跳转
建议使用mui.openWindow方法打开一个新的webview，mui会自动监听新页面的loaded事件，若加载完毕，再自动显示新页面；
有兴趣深入了解，拓展链接：
[hello mui中的无等待窗体切换是如何实现的](http://ask.dcloud.net.cn/article/106) 
[提示HTML5的性能体验系列之一 避免切页白屏](http://ask.dcloud.net.cn/article/25) 

6丶点击：忘记click
手机浏览器的click点击存在300毫秒延迟，mui为了解决这个问题，封装了tap事件，因此在任何点击的时候，请忘记click及onclick操作，统统使用如下代码：
```
    element.addEventListener('tap',function(){
        //点击响应逻辑
    });
```
这里讲解下，为什么click会有300ms：
双击缩放(double tap to zoom)
当用户一次点击屏幕之后，浏览器并不能立刻判断用户是要进行双击缩放，还是想要进行单击操作。因此，iOS Safari 就等待 300 毫秒，以判断用户是否再次点击了屏幕。
于是，300 毫秒延迟就这么诞生了。

最后有个点需要注意的：
mui为简化开发，将plusReady事件封装成了mui.plusReady()方法，凡涉及到HTML5+的api，建议都写在mui.plusReady方法中；
否则可能会报“plus is not defined”的错误；

## 安装开发工具
我发在群里的包就可以直接使用了，它运行时的占用内存比普元那套少了将近5倍。

## 正文
上面讲解了技术框架丶注意事项。下面我们开始进行详细的讲解。

## 使用webview
在邮我行发布项目，我们要基于H5来开发，所以使用webview。
Demo:

```html
    <div id="container" width="100%" height="100%" layout="VBox" hAlign="center" vAlign="middle" >
        <webview id="webview" width="100%" height="100%" />
    </div>
    $M.page.addEvent('onLoad', function(params){
	// 设置网络URL
	webview.setUrl("your url");
    });
    // 设置状态栏颜色
    Utils.setStatusBarStyle('default');
```
代码分析：
我们使用了webview组件，通过设置url,就可以访问我们的应用。
可以自行通过setStatusBarStyle设置状态栏的颜色,有两种模式default/light

## 答疑
看到上面的代码，可能有的同事可以会问，那在邮我行发布，我们使用H5开发，怎么调用手机里面的Api呢。下面举个例子：
html:
```html
    <div class="mui-page-content">
	<p id="scaleText">扫一扫后结果内容显示</p>
	<button id="onScale" onclick="getScaleData()" type="button" class="mui-btn mui-btn-green">扫一扫</button>
    </div>
```
js:
```js
    function getScaleData () {
	// 调用邮我行的提供的API扫一扫
	Emp.execute("Utils.startBarCodeScanner(function(val){webview.execute('setPhTML(\"'+val+'\")')})");
    }
    function setPhTML (val) {
      scaleText.innerHTML = val;
    }
```
代码分析：
在页面写了个按钮和一个显示扫一扫后的结果显示文本。
通过按钮调用邮我行提供的扫一扫API，然后在扫完后调用H5页面的方法，把值设置到H5页面用来显示文本的地方就可以了。

温馨提示：
上面的例子，我使用了onclick方法，调用事件，这里是给个反面的例子，尽量不要使用click,上面的注意事项也已经讲了。
所以我们的代码要这样写：
```js
document.getElementById('onScale').addEventListener('tap', function() {
    Emp.execute("Utils.startBarCodeScanner(function(val){webview.execute('setPhTML(\"'+val+'\")')})");
})
```

通过这种方式，如果在邮我行上发布的项目，要调用手机的API，我们就需要使用这种方式来实现。
如果是通过mui打包发行的我们直接使用mui提供的API就可以了，不需要调用邮我行的API。

## Mui API Reference
通过扫描上面的UI二维码，我们可以看到MUI的UI控件是很齐全的，基本市面上有的，它基本都有。
UI控件的使用，这里就不额外讲解了，把文档的Demo拉下来就能看到效果了。
Mui提供了以下调用手机API的接口，看图：

<img src="https://00feng00.github.io/img/mui-interface-01.png">
<img src="https://00feng00.github.io/img/mui-interface-02.png">
<img src="https://00feng00.github.io/img/mui-interface-03.png">
<img src="https://00feng00.github.io/img/mui-interface-04.png">


上面的接口参考，我们可以把例子拉下来就可以运行的拉，但是记得一点，这些接口要使用mui打包才能使用。
如果是在邮我行上发布的，我们还是得使用上面调用邮我行的例子。

## Mui 窗口管理
Mui 窗口管理包括5个部分，分别是：
1.页面初始化
2.创建子页面
3.打开新页面
4.关闭页面
5.预加载


从一个页面点击链接跳转到另一个页面,这是我们会经常使用到的。
mui的思路是：单webview只承载单个页面的dom，减少dom层级及页面大小；
页面切换使用原生动画，将最耗性能的部分交给原生实现.

这里我们讲一个例子，加深大家的理解：
html:
```
<li class="mui-table-view-cell" id="muiLocationDom">
    <a id="location" class="mui-navigate-right">页面跳转</a>
</li>
```
js:
```js
    document.getElementById('location').addEventListener('tap', function() {
	mui.openWindow({
	    url: 'mapLocation.html',
	    id: 'mapLocation.html',
	    extras:{
	      name:'mui'  //  自定义扩展参数，可以用来处理页面间传值
	    },
	    show: {
	      aniShow: 'pop-in'
	    },
	    waiting: {
              autoShow: false
	    }
	});
    })
```
## Mui 事件管理
事件管理有以下事件：
1.单击屏幕tap
2.双击屏幕doubletap
3.长按屏幕longtap
4.按住屏幕hold
5.离开屏幕release
6.向左滑动swipeleft
7.向右滑动swiperight
8.向上滑动swipeup
9.向下滑动swipedown
10.开始拖动dragstart
11.拖动中drag
12.拖动结束dragend

为了开发出更高性能的moble App，mui支持用户根据实际业务需求，通过mui.init方法中的gestureConfig参数，配置具体需要监听的手势事件。
```
mui.init({
  gestureConfig:{
   tap: true, //默认为true
   doubletap: true, //默认为false
   longtap: true, //默认为false
   swipe: true, //默认为true
   drag: true, //默认为true
   hold:false,//默认为false，不监听
   release:false//默认为false，不监听
  }
});
```
自定义事件<br />
添加自定义事件监听操作和标准js事件监听类似，可直接通过window对象添加，代码如下：
```
window.addEventListener('customEvent',function(event){
  //通过event.detail可获得传递过来的参数内容
  ....
});
```
通过mui.fire()方法可触发目标窗口的自定义事件。<br />
.fire( target , event , data ) <br />
参数说明：<br />
1)target<br />
Type: WebviewObject (需传值的目标webview)<br />
2)event<br />
Type: String 自定义事件名称<br />
3)data<br />
Type: JSON json格式的数据<br />
<br />
具体例子<br />
列表页面逻辑：<br />
```
//初始化预加载详情页面
mui.init({
  preloadPages:[{
    id:'detail.html',
    url:'detail.html'           
  }
  ]
});

var detailPage = null;
//添加列表项的点击事件
mui('.mui-content').on('tap', 'a', function(e) {
  var id = this.getAttribute('id');
  //获得详情页面
  if(!detailPage){
    detailPage = plus.webview.getWebviewById('detail.html');
  }
  //触发详情页面的newsId事件
  mui.fire(detailPage,'newsId',{
    id:id
  });
//打开详情页面          
  mui.openWindow({
    id:'detail.html'
  });
});  
```
<br />
详情页面逻辑:<br />
```
//添加newId自定义事件监听
window.addEventListener('newsId',function(event){
  //获得事件参数
  var id = event.detail.id;
  //根据id向服务器请求新闻详情
  .....
});
```

## Mui Ajax
mui框架基于htm5plus的XMLHttpRequest，封装了常用的Ajax函数，支持GET、POST请求方式，支持返回json、xml、html、text、script数据类型； 本着极简的设计原则，mui提供了mui.ajax方法，并在mui.ajax方法基础上，进一步简化出最常用的mui.get()、mui.getJSON()、mui.post()三个方法。<br />
我们以mui.ajax，讲解一个例子。<br />
html：<br />
```
<button type="button" class="mui-btn mui-btn-blue" id="getRole">调用接口按钮</button>
```
js:
```
document.getElementById('getRole').addEventListener('tap', function() {
    mui.ajax('your url',{
	data: {
	    username:"username",
	    sercet:"222",
	},
	dataType:'json',//服务器返回json格式数据
	type:'get',//HTTP请求类型
	headers:{'Content-Type':'application/jsonapplication/json;charset=UTF-8'},
	timeout:10000,//超时时间设置为10秒；
	success:function(data){
	    //服务器返回响应，根据响应结果，分析是否登录成功；
	    alert(data)
	},
	error:function(xhr,type,errorThrown){
	    //异常处理；
	    alert(JSON.stringify(type))
	}
    });
})
```
<br />
温馨提示：后端开发人员要处理允许跨域调用，而且要允许option的访问，对option进行过滤。

## 代码块--快捷开发
&nbs;mui为开发者提供了常用的代码块，我们只需要敲几个字母，就可以生成对应的代码块。
[代码块链接](http://dev.dcloud.net.cn/mui/snippet/) 

## 结语
&nbsp;文末，个人建议：减少css二次渲染，就是少用复杂的选择器，少用padding、margin这些会二次修正页面的css。
如果追求极致的话，那jquery、zepto这些框架也不要使用，手机上都是webkit引擎，直接写document的api操作dom即没有兼容问题又没有效率问题。

## 常用文档地址汇总
MUI是开源，它的社区是很活跃的，有问必答。我把常用的文档地址收集在这里，方便大家查找。
[原生UI](http://dev.dcloud.net.cn/mui/ui/) http://dev.dcloud.net.cn/mui/ui/
[窗口管理](http://dev.dcloud.net.cn/mui/window/) http://dev.dcloud.net.cn/mui/window/
[事件管理](http://dev.dcloud.net.cn/mui/event/) http://dev.dcloud.net.cn/mui/event/
[util](http://dev.dcloud.net.cn/mui/util/) http://dev.dcloud.net.cn/mui/util/
util说明： 
&nbsp;mui框架将很多功能配置都集中在mui.init方法中，要使用某项功能，只需要在mui.init方法中完成对应参数配置即可，
目前支持在mui.init方法中配置的功能包括：
&nbs;创建子页面、关闭页面、手势事件配置、预加载、下拉刷新、上拉加载、设置系统状态栏背景颜色。
[ajax](http://dev.dcloud.net.cn/mui/ajax/) http://dev.dcloud.net.cn/mui/ajax/
[下拉刷新](dev.dcloud.net.cn/mui/pulldown/) dev.dcloud.net.cn/mui/pulldown/
[上拉加载](http://dev.dcloud.net.cn/mui/pullup/) http://dev.dcloud.net.cn/mui/pullup/
[快捷代码块](http://dev.dcloud.net.cn/mui/snippet/) http://dev.dcloud.net.cn/mui/snippet/
[修改mui默认的图标](http://ask.dcloud.net.cn/article/128) http://ask.dcloud.net.cn/article/128
自定义mui控件样式 
样式代码覆盖，覆盖mui默认的。
需要注意一点：
    sass文件开源，自己修改sass并编译也可以；但是如果mui升级了，需要自己手动升级 （一般不建议改这里）。
[页面间传值](http://ask.dcloud.net.cn/article/63) http://ask.dcloud.net.cn/article/63
[自定义事件](http://dev.dcloud.net.cn/mui/event/#customevent) http://dev.dcloud.net.cn/mui/event/#customevent
[5 + APP API Reference](http://www.html5plus.org/doc/h5p.html) http://www.html5plus.org/doc/h5p.html

