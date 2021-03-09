# React 各种bug

### BUG1

```
Module Error (from ./node_modules/af-webpack/node_modules/eslint-loader/index.js):

Line 43:5:  Expected an assignment or function call and instead saw an expression  no-unused-expressions

Search for the keywords to learn more about each error.
```

我这边查出来的错误代码是：

```
    cardGrid.push(fieldGridStr),cardGrid.push(valueGridStr2);
```

中间间隔是个逗号，改成分号就可以。

```
cardGrid.push(fieldGridStr);
cardGrid.push(valueGridStr2);
```

### BUG2

```
Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

这个错误从网上搜索说是因为你导出的类或者函数在导入的时候方式不正确造成的，而我今天造成这个错误的原因是：

```js
static propTypes = {
  noDataImgShow:PropTypes.boolean.isRequired
}
```

我写的`PropTypes.boolean`基本类型引用错误了，造成的。记得`PropTypes`的基本类型有：

```
 optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
```

不要写错了。
[prop-types](https://links.jianshu.com/go?to=%5Bhttp%3A%2F%2Fnpm.taobao.org%2Fpackage%2Fprop-types%5D(http%3A%2F%2Fnpm.taobao.org%2Fpackage%2Fprop-types))

### BUG3

```
Creating an optimized production build...
Failed to compile.

Module parse failed: C:\Users\玉丽\AppData\Roaming\npm\node_modules\roadhog\node_modules\babel-loader\lib\index.js!C:\Users\玉丽\Desktop\company_work\vitark-web-ui\src\common\router.js Unexpected token (70:15)
```

解决办法：

```
 npm install @babel/core @babel/preset-env
```



### BUG4

```
Build failed: The 'decorators' plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean. If you are migrating from Babylon/Babel 6 or want to use the old decorators proposal, you should use the 'decorators-legacy' plugin instead of 'decorators'.
```

[https://github.com/ant-design/ant-design-pro/issues/2043](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fant-design%2Fant-design-pro%2Fissues%2F2043)

安装制定版本的`roadhog`

```
npm install --save 2.5.0-beta.1
```



### BUG5

```
Module build failed: ReferenceError: Unknown plugin "transform-runtime" specified in "base" at 2, attempted to resolve relative to "C:\\Users\\玉丽\\Desktop\\company_work\\vitark-web-ui\\src"
```

安装依赖：

```
 npm install --save babel-plugin-transform-runtime
```



### BUG6

```
Module build failed: ReferenceError: Unknown plugin "transform-class-properties" specified in "base" at 4, attempted to resolve relative to "C:\\Users\\玉丽\\Desktop\\company_work\\vitark-web-ui\\src"
```

需要安装依赖：

```
npm install 
babel-plugin-transform-class-properties
babel-plugin-transform-decorators-legacy
babel-plugin-transform-export-extensions
babel-plugin-transform-object-rest-spread
babel-preset-env
--save-dev
```



### BUG7

```
Module not found:Error:Can't resolve '@babel/runtime/helpers/esm/extends'
```

这个错误坑的地方在哪里呢？是它的这个方法只有过去的`npm`包里可以找到，如果你用

```
npm install @babel/runtime --save
yarn add @babel/runtime
```

来安装，安装的是最新的包，然后新的包里面并没有这个它要找的方法，所以仍然会报错，这个时候你就会想，我已经安装了，为什么还找不到。

思路来了：**如果你安装了包了，然后还是说找不到包里的方法的话，就说明你需要降级，安装它之前的包**

```
npm i @babel/runtime@7.0.0-beta.55 --save
```

我觉的这条思路可以应对所有找不到包内部方法的问题。



### BUG8

```
Failed to minify the bundle. Error: 0.0f3f4c41.async.js from UglifyJs
```

通常 webpack 在构建时，是不会让 node_modules 下的文件走 babel tranpile 的，一是会慢很多，二是 babel@6 时编译编译过的代码会不安全（据说 babel@7 下没问题了），所以业界有个潜在的约定，**npm 包发布前需要先用 babel 转出一份 es5 的代码**。

但是有些 npm 包不遵守这个约定，没有转成 es5 就发上去，比如 [query-string@6](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fsindresorhus%2Fquery-string%2Fblob%2F597f14a%2Findex.js%23L8%3A31)。然后压缩工具 uglify 又只支持 es5 的语法，遇到 `const`、`let`、`()=>` 类似的语法，就抛错了。

原文看这里的[async.js from UglifyJs](https://links.jianshu.com/go?to=%5Bhttps%3A%2F%2Fgithub.com%2Fsorrycc%2Fblog%2Fissues%2F68%5D(https%3A%2F%2Fgithub.com%2Fsorrycc%2Fblog%2Fissues%2F68))



### BUG

```
super expression must either bu null or a function not undefined
```

错误代码：

```
import React from 'react-native';
```

引用了错误的引用：
正确的写法是

```
import React, { Component } from 'react';
```

### BUG android 端

```
React-native Android: Error calling AppRegistry.runApplication
```

解决办法：

```
adb reverse tcp:8081 tcp:8081
```

然后重新reload

[stackoverflow](https://links.jianshu.com/go?to=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F43776638%2Freact-native-android-error-calling-appregistry-runapplication)这个问题的地址！

### BUG

```
The development server returned response error code:500
```

这个是引入的本地文件找不到，在下面的错误里就可以看到

### BUG

```
Unable to open a realm at path ',management'.Please use a path where your
app has read-write permissions
```

### BUG

```
Module AppRegistry is not a registered callable module (calling runApplicati
```

由于是发生在IOS端，网上找到的方法通通都是android的，切换了project就好了，在xcode里!!!

### BUG

```
Migration is required due to the following errors
```

这个发生的情况是android上面的app是很久之前的代码，好久没有更新了，然后点击reload就会爆出这个错误，解决办法就是删掉重新安装，就可以了！！

### BUG

This error can also happen due to a require() error during initialization or failure to call AppRegistry.registerComponent.

```
2017-09-19 16:01:20.557 [fatal][tid:com.facebook.react.ExceptionsManagerQueue] Unhandled JS Exception: Application ReactP has not been registered.

Hint: This error often happens when you're running the packager (local dev server) from a wrong folder. For example you have multiple apps and the packager is still running for the app you were working on before.
If this is the case, simply kill the old packager instance (e.g. close the packager terminal window) and start the packager in the correct app folder (e.g. cd into app folder and run 'npm start').

This error can also happen due to a require() error during initialization or failure to call AppRegistry.registerComponent.
```

这个错误有两种情况，第一种:

```
 Application ReactP has not been registered.
```

就是在你其实注册App的地方，你写错了，比如：

```
AppRegistry.registerComponent('AppleReactNative', () => App)
```

至

```
AppRegistry.registerComponent('applereactnative', () => App)
```

第二种情况就是它的最后一句话。

```
This error can also happen due to a require() error during initialization or failure to call AppRegistry.registerComponent.
```

比如：

```
export const  ColorConfig = {

    minorColor:ColorConfig.minorColor,                 //提示性文字，正文
}
```

你引用了一个错误的引用，自己引自己
又或者是：

```
export  const SizeConfig = {
    circleTextSize:38,
    remindTitleSize:20,                    //提示文字 大号
    navigationSize:18,                    //顶部导航栏，栏目名称
    contentSize:17,                       //主要文字/标题                    contentColor
    nameFontSize:16,
    minorSize:14,                         //次要文字/正文                    assistColor
    smallerSize:12,                       //文字提示
    assistSize:11,                        //辅助文字/日期/时间/底部导航        assistColor
    buttonSize:16                         //按钮文字

}

export const  ColorConfig = {
    white:'#ffffff',                      //按钮文字
    assistColor:'#c1c1c1',                //失效，辅助文字
    minorColor:ColorConfig.minorColor,                 //提示性文字，正文
    contentColor:'#5e5e5e',               //标题，重要文字
    remindColor:'#ee5765',                //重要提醒文字
    connectColor:'#3eabf5',               //链接文字    按钮背景颜色
    buttonBackgroundColor:'#3eabf5',      //按钮背景颜色
    backgroundColor:'#f1f1f1',            //背景颜色
    lineColor:'#e8e8e8',                  //线的颜色
    headerTextColor:'#5c5c5c',            //CTGroupInfo

}


global.SizeConfig = SizeConfig;
global.ColorConfig = ColorConfig;
```

写了一个全局的变量，然后准备在其他的地方使用，

```
headerImage:{
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:ColorConfig.lineColor,

},
```

直接就会报上面的错误，原因是文件没有引入，你需要在其他的地方引入一下就可以了

```
import {SizeConfig} from './SizeAndColorConfig'; //引入是为了编译入系统，不要删除这行
```

参考文章：[Failure to call AppRegistry.registerComponent
](https://links.jianshu.com/go?to=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F35449248%2Ffailure-to-call-appregistry-registercomponent)

### BUG

```
doctor_third.bundle.js:55 Uncaught TypeError: Cannot read property 'call' of undefined
    at __webpack_require__ (doctor_third.bundle.js:55)
    at Object.<anonymous> (zrk_doctor_doctor_root.bundle.js:22679)
    at __webpack_require__ (doctor_third.bundle.js:55)
    at webpackJsonpCallback (doctor_third.bundle.js:26)
    at zrk_doctor_doctor_root.bundle.js:1
__webpack_require__ @ doctor_third.bundle.js:55
(anonymous) @ zrk_doctor_doctor_root.bundle.js:22679
__webpack_require__ @ doctor_third.bundle.js:55
webpackJsonpCallback @ doctor_third.bundle.js:26
(anonymous) @ zrk_doctor_doctor_root.bundle.js:1
```

造成的原因和上面的错误完全没有关系，是因为`/public/index.html`下面`js`文件的引用不对。

```
<script type="text/javascript">
    document.write("<script language='javascript' src='"+getStaticFileHost()+"/static/js/jquery-2.1.4.min.js'><\/script>");
    document.write("<script language='javascript' src='"+getStaticFileHost()+"/static/js/mobiscroll.custom-3.0.0-beta2.min.js'><\/script>");
    document.write("<script language='javascript' src='"+getStaticFileHost()+"/static/js/jweixin-1.2.0.js'><\/script>");
    document.write("<script language='javascript' src='"+getStaticFileHost()+"/static/js/react/zrk_doctor_commons.bundle.js'><\/script>");
    document.write("<script language='javascript' src='"+getStaticFileHost()+"/static/js/react/zrk_doctor_doctor_root.bundle.js'><\/script>");
</script>
```

下次再碰到这个问题，直接过来检查一下。

### BUG

```
doctor.js?26ed:60 Uncaught ReferenceError: regeneratorRuntime is not defined
    at doctor.js?26ed:60
    at Object.<anonymous> (zrk_doctor_doctor_root.bundle.js:9522)
    at Object.exports.__esModule (zrk_doctor_doctor_root.bundle.js:9652)
    at __webpack_require__ (bootstrap 7befce6a489d409de85e:693)
    at fn (bootstrap 7befce6a489d409de85e:114)
    at Object.defineProperty.value (DoctorContainer.js:4)
    at __webpack_require__ (bootstrap 7befce6a489d409de85e:693)
    at fn (bootstrap 7befce6a489d409de85e:114)
    at Object.<anonymous> (root.js:19)
    at __webpack_require__ (bootstrap 7befce6a489d409de85e:693)
```

出错的地方在`docotr.js`文件下

```
//体格数据
export async function get_growth(patient_id) {
    return request(config.user_api_ip, '/patient/growth/list', {patient_id}, "GET", true);
}

export async function post_growth(patient_plan_id, period_id, timestamp, height, weight, hc) {
    return request(config.user_api_ip, '/patient/growth?patient_id='+global.patient_id, {patient_plan_id, period_id, timestamp, height, weight, hc}, "POST");
}

export async function get_birth(patient_id) {
    return request(config.user_api_ip, '/patient/birth', {patient_id}, "GET", true);
}
```

把`async`去掉就可以了！

### BUG

```
Uncaught (in promise) Error: Objects are not valid as a React child (found: object with keys {status}). If you meant to render a collection of children, use an array instead or wrap the object using createFragment(object) from the React add-ons.
    at invariant (invariant.js:44)
    at traverseAllChildrenImpl (traverseAllChildren.js:144)
    at traverseAllChildren (traverseAllChildren.js:172)
    at Object.instantiateChildren (ReactChildReconciler.js:70)
    at ReactDOMComponent._reconcilerInstantiateChildren (ReactMultiChild.js:187)
    at ReactDOMComponent.mountChildren (ReactMultiChild.js:226)
    at ReactDOMComponent._createInitialChildren (ReactDOMComponent.js:697)
    at ReactDOMComponent.mountComponent (ReactDOMComponent.js:516)
    at Object.mountComponent (ReactReconciler.js:46)
    at ReactDOMComponent.mountChildren (ReactMultiChild.js:238)
```

解决办法：

```
https://stackoverflow.com/questions/34919111/how-to-debug-this-error-uncaught-in-promise-error-objects-are-not-valid-as-a
```

### BUG

如果一个包安装了很多次还是会出现不能加载的resolve的bug，有可能会是需要安装制定版本的包 下面是npm 的常用命令

```
npm install <name>安装nodejs的依赖包
例如npm install express 就会默认安装express的最新版本，也可以通过在后面加版本号的方式安装指定版本，如npm install express@3.0.6
npm install <name> -g  将包安装到全局环境中
但是代码中，直接通过require()的方式是没有办法调用全局安装的包的。全局的安装是供命令行使用的，就好像全局安装了vmarket后，就可以在命令行中直接运行vm命令
npm install <name> --save  安装的同时，将信息写入package.json中
项目路径中如果有package.json文件时，直接使用npm install方法就可以根据dependencies配置安装所有的依赖包
这样代码提交到github时，就不用提交node_modules这个文件夹了。
npm init  会引导你创建一个package.json文件，包括名称、版本、作者这些信息等
npm remove <name>移除
npm update <name>更新
npm ls 列出当前安装的了所有包
npm root 查看当前包的安装路径
npm root -g  查看全局的包的安装路径
npm help  帮助，如果要单独查看install命令的帮助，可以使用的npm help install
```

### BUG

Babel 6 regeneratorRuntime is not defined

解决办法：

首先babel基础包(不安装额外东西)并不是支持完整的es6语言，加上浏览器也不是支持所有的es6语言，如果你写的es6语言刚好撞上这样的情况了.

```
那么就需要babel的拓展包(Polyfill),网址链接描述

这是一个补完babel支持es6的拓展包，配置步骤为3个
1.打开命令行键入 npm install --save-dev babel-polyfill 安装polyfill
2.在webpack.config.js中最上面写上var babelpolyfill = require("babel-polyfill");
3.在自己的项目js文件中最开头写上import "babel-polyfill";
```

上面是网上的解决版本。
链接:
[ES6 写法报错regeneratorRuntime is not defined](https://links.jianshu.com/go?to=https%3A%2F%2Fsegmentfault.com%2Fq%2F1010000006801859)
扩展:
[StackOverFlow Babel 6 regeneratorRuntime is not defined](https://links.jianshu.com/go?to=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F33527653%2Fbabel-6-regeneratorruntime-is-not-defined)
我这边的解决办法

```
        recordPatientBitrth: ["regenerator-runtime/runtime", path.join(PATHS.entry, 'RecordPatientBirth.js')],
```

在入口的地方添加regenerator-runtime/runtime以申明！

### BUG

Cannot read property 'split' of undefine

这个问题你应该调用调用的split是否为空，空的话就会报错，就像下面的例子，item.body为空就会报这个错，恩，低级错误。

```
let arr = item.body.splic(',');
```

### BUG

```
rror: Couldn't find preset "env" relative to directory "/Users/name/plugin/7ada6103-7315-4c24-93f3-4a3a6a0fa7ee"
    at /Users/name/project/node_modules/babel-core/lib/transformation/file/options/option-manager.js:293:19
    at Array.map (native)
    at OptionManager.resolvePresets (/Users/name/project/node_modules/babel-core/lib/transformation/file/options/option-manager.js:275:20)
    at OptionManager.mergePresets (/Users/name/project/node_modules/babel-core/lib/transformation/file/options/option-manager.js:264:10)
    at OptionManager.mergeOptions (/Users/name/project/node_modules/babel-core/lib/transformation/file/options/option-manager.js:249:14)
    at OptionManager.init (/Users/name/project/node_modules/babel-core/lib/transformation/file/options/option-manager.js:368:12)
    at File.initOptions (/Users/name/project/node_modules/babel-core/lib/transformation/file/index.js:216:65)
    at new File (/Users/name/project/node_modules/babel-core/lib/transformation/file/index.js:139:24)
    at Pipeline.transform (/Users/name/project/node_modules/babel-core/lib/transformation/pipeline.js:46:16)
    at BabelCompiler.compileSync (/Users/name/project/node_modules/electron-compilers/lib/js/babel.js:76:26)
```

解决方案[：stackOverFlow](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel-preset-env%2Fissues%2F186)

### BUG

VM20008:7 Warning: setState(...): Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.

这个错误的出现往往都是直接浏览器直接卡爆了，出现问题的原因其实非常简单。

你在render方法里面进行了state的操作，造成的结果就是一直在不断的render，值得卡爆！

还有一个错误也是描述这个的。

```
ReactDebugTool.js:173 Uncaught (in promise) RangeError: Maximum call stack size exceeded
   at resumeCurrentLifeCycleTimer (ReactDebugTool.js:173)
   at ReactReconcileTransaction.onEndFlush (ReactDebugTool.js:280)
   at ReactReconcileTransaction.closeAll (Transaction.js:206)
   at ReactReconcileTransaction.perform (Transaction.js:153)
   at ReactUpdatesFlushTransaction.perform (Transaction.js:140)
   at ReactUpdatesFlushTransaction.perform (ReactUpdates.js:89)
   at flushBatchedUpdates (ReactUpdates.js:172)
   at ReactUpdatesFlushTransaction.close (ReactUpdates.js:47)
   at ReactUpdatesFlushTransaction.closeAll (Transaction.js:206)
   at ReactUpdatesFlushTransaction.perform (Transaction.js:153)
```

下面是错误代码：

```
<Modal
       visible={this.state.visible}
       onClose={this.onClickCloseImage()}
       transparent
       className = 'doctor_show_layout'
       <div className="doctor_show_layout">
           <img src={default_avatar}/>
      </div>
</Modal>
```

比如你在一个Modal里直接调用方法`onClose={this.onClickCloseImage()}`,然后在这个方法里还修改了`state`:

```
onClickCloseImage(){
    this.setState({
      visible: false
    });
  }
```

接着就是爆炸了。解决的办法很简单。

```
onClose={this.onClickCloseImage.bind(this)}
```

改调用为绑定，或者如果你在构造函数`constructor`里进行了绑定

```
this.onClickCloseImage = this.onClickCloseImage.bind(this)
```

那下面调用的地方就改成传函数名.

```
<Modal
       visible={this.state.visible}
       onClose={this.onClickCloseImage}
       transparent
       className = 'doctor_show_layout'>
       <div className="doctor_show_layout">
             <img src={default_avatar}/>
       </div>
</Modal>
```

### BUG

Warning: Each child in an array or iterator should have a unique "key" prop.

```
warning.js:33 Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `OrderTypeContainer`. See https://fb.me/react-warning-keys for more information.
    in ul (created by OrderTypeContainer)
    in OrderTypeContainer (created by RouterContext)
    in RouterContext (created by Router)
    in Router
```

这个`BUG`或者说是警告的信息可以直接在它给出的连接地址里找到问题的答案，这里我也列举一下为什么我们要给遍历的元素添加一个`key`的键。是因为：
**键可帮助React识别哪些项目已更改，添加或删除，**所以需要。

解决办法：你可以用你数据的`id`来设置

```
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

如果没有的话，你也可以设置`map`的。

```
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

但是如果你有操作项目顺序的需求，就不推荐这种做法了。这可能会对性能产生负面影响，并可能导致组件状态问题。

#### 如果需要通过键来提取组件的话。

不推荐的

```
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

推荐的写法：

```
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

这个key值必须在`list`中，必须是唯一的。同时要记住，如果你本来就想要这个值，那么你必须用另外的一个明确的值来传递，而不能获取这个`key`.

### 使用SCSS造成样式冲突的问题

非常抱歉，我并没有找到一个好的办法，我的做法是每一个SCSS文件都使用它独有的开头来做标记。

```
@import "../../../../static/css/commons/base_layout";
.header_container {
  @extend .base_column;
  background-color: $buttonColor;
}
//-----------------------header------------------
.header_container_v1 {
  @extend .base_column;
  background-color: $buttonColor;
}

...
```

比如这个`header.scss`的文件，我们可以用`header`来开头，原则就是你的这个命名名称是独一无二的就可以，大家有好的办法记得分享给我，谢谢！

[access] This app has crashed because it attempted to access privacy-sensitive data without a usage description. The app's Info.plist must contain an NSCameraUsageDescription key with a string value explaining to the user how the app uses this data.

Message from debugger: Terminated due to signal 9

解决办法：搜索`NSCameraUsageDescription`,然后配置一下：
例如：

[xcode8 iOS10上关于NSPhotoLibraryUsageDescription NSCameraUsageDescription 等问题](https://www.jianshu.com/p/78411e82e8fd)
OK...



Requiring unknown module "1360".If you are sure the module is there, try restarting Metro Bundler. You may also want to run `yarn`, or `npm install` (depending on your environment).

这个错误特别邪门，是因为我们复制的图片出的问题还是怎么的，如果出现这个问题，你可以通过禁止导入那个图片来排除，然后重新试几次

### TypeError

undefined is not a function (evaluating '_iterator[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](https://www.jianshu.com/p/28534cc5b757)')

出现这个问题是因为`react native`不支持遍历的问题，例如下面的代码：

```
for (let [index, data] of current_month_data.entries()) {
            for (let value of data) {
                if ( value.day === this.props.day &&
                    value.month === this.props.month ) {
                    return index;
                }
            }
        }
```

你需要把它改成传统的`for`循环就好了：

```
for(let i = 0;i<current_month_data.length;i++){
            let value = current_month_data[i];
            if(value.day === this.props.day && value.month === this.props.month){
                return i;
            }
        }
```

### 错误 

ReactNative: Exception in native call com.facebook.react.uimanager.IllegalViewOperationException: Unexpected view type nested under text node: class com.facebook.react.uimanager.LayoutShadowNode

完整错误是这样的：

```
07-03 22:47:55.157 31157-3931/com.zrk_user_client E/unknown:ReactNative: Exception in native call
                                                                         com.facebook.react.uimanager.IllegalViewOperationException: Unexpected view type nested under text node: class com.facebook.react.uimanager.LayoutShadowNode
                                                                             at com.facebook.react.views.text.ReactBaseTextShadowNode.buildSpannedFromShadowNode(ReactBaseTextShadowNode.java:107)
                                                                             at com.facebook.react.views.text.ReactBaseTextShadowNode.spannedFromShadowNode(ReactBaseTextShadowNode.java:182)
                                                                             at com.facebook.react.views.text.ReactTextShadowNode.onBeforeLayout(ReactTextShadowNode.java:176)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:933)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.notifyOnBeforeLayoutRecursive(UIImplementation.java:931)
                                                                             at com.facebook.react.uimanager.UIImplementation.updateViewHierarchy(UIImplementation.java:689)
                                                                             at com.facebook.react.uimanager.UIImplementation.dispatchViewUpdates(UIImplementation.java:654)
                                                                             at com.facebook.react.uimanager.UIManagerModule.updateRootLayoutSpecs(UIManagerModule.java:754)
                                                                             at com.facebook.react.ReactRootView$1.runGuarded(ReactRootView.java:396)
                                                                             at com.facebook.react.bridge.GuardedRunnable.run(GuardedRunnable.java:21)
                                                                             at android.os.Handler.handleCallback(Handler.java:751)
                                                                             at android.os.Handler.dispatchMessage(Handler.java:95)
                                                                             at com.facebook.react.bridge.queue.MessageQueueThreadHandler.dispatchMessage(MessageQueueThreadHandler.java:29)
                                                                             at android.os.Looper.loop(Looper.java:154)
                                                                             at com.facebook.react.bridge.queue.MessageQueueThreadImpl$3.run(MessageQueueThreadImpl.java:192)
                                                                             at java.lang.Thread.run(Thread.java:761)
```

这个bug真的很懵逼，定位不到在哪里，所以这里提供一个思路，那就是注释代码，注释你`render`里的代码，哪行错误找哪里。而造成上面错误的原因是因为：

```
//星期标题
    _renderWeekHeader() {
        return (
            <Text ref="header"
                  style={styles.calendar_header_row}>
                {
                   //.....
                }
            </Text>
        );
    }
```

我把View这里替换成了Text。

07-04 00:28:15.008 31157-6351/com.zrk_user_client E/unknown:ReactNative: Exception in native call java.lang.RuntimeException: Cannot add a child that doesn't have a YogaNode to a parent without a measure function! (Trying to add a 'RCTRawText

这个错误高级了，你猜是啥不？
因为你在布局里添加了注释代码

```
<View>
   //TODO 缺一个Modal
</View>
```

### Error: Command failed: yarn add react-native --exact 初始化错误

解决方案：

```
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
```

如果不行，我们可以在init的时候制定版本号，就像这样：

```
react-native init demo --verbose --version 0.38.0
```



Realm数据库IOS端下载不下来，xcode一直在build

解决方案，手动下载，然后复制进去。

### 'config.h' file not found



![img](https://upload-images.jianshu.io/upload_images/788601-7b6437f795690fd6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

QQ20180718-180605.png

解决办法：

```
cd node_modules/react-native/third-party/glog-0.3.4
../../scripts/ios-configure-glog.sh
```

跑上面的命令。

### Error

JSON value '<null>' of type NSNull cannot be converted to NSString

[google搜索出来的答案](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact-native%2Fissues%2F11140)

话说现在百度真是越来越堕落了，简直不能忍啊。

出这个问题是我们不能把值`null`转为`string`,所以报错了，处理也非常简单，只需要判断是否为空，就可以搞定，我们
经常发生这个错误的地方就是:

```
 <Image style={styles.image_style} source={{uri:avatar}}></Image>
```

如果这个值是`null`,那么就会报这个错误。
这里也分享给大家一个我们用的工具，可以用来判断是否为空：

```
/**
 * 判断是否为空
 */
export default class StringUtils {

    isEmpty(str) {
        let flag = false;
        if (!str || str && this.isNull(str) || !this.removeAllSpaces(str)) {
            flag = true;
        }
        return flag;
    }

    //判断是否有空
    isNull(str) {
        if (str === "") return true;
        let regu = "^[ ]+$";
        let re = new RegExp(regu);
        return re.test(str);
    }

    //获取中文状态下获取后两位否则前两位
    getNameSubstr(str) {
        if (str) {

            if (!this.isChinese(str)) {
                if (str.length >= 2) {
                    return str.substr(str.length - 2, 2)
                } else {
                    return str.substr(str.length - 1, 1)
                }
            } else {
                if (str.length >= 2) {
                    return str.substr(0, 2)
                } else {
                    return str.substr(0, 1)
                }
            }
        } else {
            return '';
        }
    }

    //判断是否中文和英文
    isChinese(str) {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
            return false;
        }
        return true;
    }

    /***
     * 去除所有空格
     * @param str
     * @returns {string}
     */
    removeAllSpaces(str) {
        try {
            return str.replace(/\s+/g, "")
        } catch (e) {
            return ''
        }
    }

    /***
     * 去除两头空格
     * @param str
     * @returns {string}
     */
    removeBothSpaces(str) {
        try {
            return str.replace(/^\s+|\s+$/g, "")
        } catch (e) {
            return ''
        }
    }
}

global.StringUtils = new StringUtils();
```
