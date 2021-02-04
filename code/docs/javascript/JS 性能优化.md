### JS 性能问题

1、当浏览器遇到<script>标签时，当前 HTML 页面无从获知 JavaScript 是否会向<p> 标签添加内容，或引入其他元素，或甚至移除该标签。因此，这时浏览器会停止处理页面，先执行 JavaScript代码，然后再继续解析和渲染页面。同样的情况也发生在使用 src 属性加载 JavaScript的过程中，浏览器必须先花时间下载外链文件中的代码，然后解析并执行它。在这个过程中，页面渲染和用户交互完全被阻塞了。

2、**对象属性和数组元素的速度都比变量慢**。
代码执行过程中，主要的数据访问具有四种类型：数值、变量 < 对象的属性、数组元素。如果多次引用一个数组元素或者对象属性，可以定义一个变量来提高性能(除FF浏览器，会自动优化数组)；减少任何不必要的state/属性/变量。

3、避免全局查找
可以将**全局对象的属性(window等)存放在局部变量中**。访问局部变量的速度比全局变量更快；

4、避免with语句

5、脚本放在html代码后面；JS执行从上到下；如果一段JS代码引入外部链接，那么会先下载JS文件后执行，期间其他的代码阻塞；(其他的css、image下载暂停)。所以优先把script部分放在界面底部。

6、==优化循环的性能==：循环过程中，次数不确定，需要消耗较多性能；在循环体内减少变量数量等。

~~~js
for (let i = 0; i < 10; i++) {
  // 这样，每次循环会创建变量、判断变量、变量增加
}

如果使用
let a = 10;
do {
  //这里需要创建一次变量
} while (a--);
~~~

7、最小化访问nodeList对象
`document.getElementByTagName("img");`
获取 tagName、childrenNode/attributes/ 等会得到 NodeList 对象，减少这样的使用；

8、避免使用循环引用：
一个DOM元素具有一个属性(方法)，这个方法继续操作这个DOM元素，这样会造成内存泄漏(直到浏览器关闭界面)。

9、字符串连接：
如果存在多个字符串链接，使用 += 不利于性能（string += a; string += b;）。
可以使用 string += a + b + c; 的方式
可以使用数组暂时存储字符串，使用array.join('');进行链接字符串；

10、instanceof 和 typeof 对比
typeof 判断一个数据是什么数据类型；
instanceof 判断一个对象是否在另一个对象的原型链上；

11、JS 字典
https://www.jianshu.com/p/eece86baec10


onload 用于监测用户的浏览器版本和信息；
onload and onundoad 用于处理 cookies；

addEventListener 可以向一个对象添加多个同类型的事件句柄(两个onClick事件)，不会覆盖已有的事件(同一个事件触发多个函数)；

~~~js
window.addEventListener("resize", function() {
  document.getElementByID("demo").innerHTML = 'resizing';
});
addEventListener(event, function, useCapture);
~~~

第三个参数：true-false 选择事件冒泡还是事件捕获(默认是 false 事件冒泡)
事件冒泡：一个事件发生，首先触发内部元素的事件回调函数（内部span）；
事件捕获：一个事件发生，首先触发外部元素的事件回调函数（外部div）；
~~~html
<div>
	<span></span>  
</div>
~~~
早期ie浏览器具有兼容性问题；

API
exec();
exec() 方法用于检索字符串中的正则表达式的匹配。

重要事项：如果在一个字符串中完成了一次模式匹配之后要开始检索新的字符串，就必须手动地把 lastIndex 属性重置为 0。

提示：请注意，无论 RegExpObject 是否是全局模式，exec() 都会把完整的细节添加到它返回的数组中。这就是 exec() 与 String.match() 的不同之处，后者在全局模式下返回的信息要少得多。因此我们可以这么说，在循环中反复地调用 exec() 方法是唯一一种获得全局模式的完整模式匹配信息的方法。

~~~js
var str = "Visit W3School"; 
var patt = new RegExp("W3School","g");
var result = patt.exec(str);
console.log(result);
console.log(patt);
~~~

使用构造函数创建数组时，如果传入的参数是一个数值，就创建这个长度的数组(数组是空的)；使用对象字面量创建数组，如果传入一个数值，数组的第一个元素就是这个数值。
let array1 = new Array(5);
let array2 = [5];