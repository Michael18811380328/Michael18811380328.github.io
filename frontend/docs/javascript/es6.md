 ES6 新特性对比

1. 定义变量
   let const ：let 将变量的作用域限制在块级作用域中（for循环，if循环等块级作用域等）const声明一个常量
2. 模板字符串

es6中使用反引号和模板字符串将变量放在字符串中，不需要字符串拼接。

    $("#nav").append('this is a '+ obj.name );
    $("#nav-bar").append(`there are ${ obj.number } books.`);

1. 函数扩展

函数参数默认值-箭头函数（this的变化）

    //传统写法
    function() show(a,b){
    	b = b || 8;
    	return a + b;
    }
    console.log(show(5));//13
    
    //ES6
    function add(a,b=8){
    	return a + b;
    }

//进一步简化

var show = (a, b=7) => {

	return a + b;

}

1. 对象扩展

对象简写，Object.keys() 和Object.assigns()

    var a = 10;
    var obj ={
    	a:5,
    	func:function(){
    		console.log(this.a);
    	},
    	test:function(){
    		setTimeout(function(){
    			//console.log(this);
    			//var that = this;
    			//在es5中使用that = this 保存当前指针
    			console.log(this);
    			//window 这部分在1ms之后执行，this指针指向window，不是obj
    			this.func();
    		},1);
    	},
    	test2:function(){
    		setTimeout(() => {
    			this.func();
    		},1);
    		//使用箭头函数可以将属性绑定到实例对象上（React中使用箭头函数绑定this）
    		//小结：在ES6中，尽量使用箭头函数
    	}
    }
    
    //对象的简化写法
    var c = 5;
    var obj2 = {
    	c,
    	// b:function(){
    	// 	 console.log(this.c);
    	// }
    	b(){
    		console.log(this.c);
    	}
    }
    console.log(obj2); //5 
    obj2.b(); //obj
    
    console.log(Object.keys(obj));
    //获取对象中的key值
    
    Object.assign(obj2,obj);
    console.log(obj2);
    //将obj的属性方法加入obj2中，不改变obj。
    

Object.defineProperty 对象的扩展

    Object.defineProperty(data,'b',{
    	value:5,
    	//b的属性值5
    	writable:false,
    	//属性只读
    	configurable:true,
    	// 其他属性是否可变（总开关，false关）
    	enumberable:true,
    	//是否正在for-in中遍历出来，或者爱Object.keys中列举出来
    	set(newValue){
    		console.log('setValue');
    		b = newValue;
    	},
    	get(){
    		console.log('getValue');
    		return b;
    	}
    });
    
    data.b = 10;
    console.log(data.b); //5
    
    

1. class类

使用class创建类（代替构造函数）

constructor构造函数

es6的继承==>静态方法

    
    

1. 解构赋值

数组、对象、字符串解构：当新建的变量是对象中的属性，并且变量名和属性名一致，不需要使用点语法进行调用。直接使用解构赋值（deconstructing assignment）语法可以定义多个变量。

    //1.对象解构赋值
    var body = request.body;
    var userName = body.userName;
    var password = body.password;
    
    //ES6
    let { userName, password } = request.body;
    
    //2.数组解构赋值
    let [col1, col2] = $('#column');

7.Promise

    //ES5
    setTimeout(function(){
        console.log('promise');
    });
    
    //ES6
    let wait = new Promise(function(resolve,reject){
        setTimeout(resolve,1000);s
    }).then(() => {
        console.log('promise');
    });
    
    //还不是很懂
    let wait100 = () => new Promise((resolve,reject) => {
        setTimeout(resolve,1000);
    });
    wait100().then(() => {
        console.log("promise");
        return wait100();
    }).then(() => {
        console.log("hi Seafile");
    });

8. class 类

    //创建一个类
    class Seafile {
        constructor(opt,data){
            this.name = 'Seafile';
            this.url = 'docs.seafile.com';
            this.data = data;
            this.options = opt;
        }
        getName(){
            console.log(`Class name: ${this.name}`);
        }
    }
    //继承
    class SeafileAPI extends Seafile {
        constructor(opt,data){
            //调用父级构造函数super()方法
            super({private:true},[1,2,3]);
            this.name = 'SeafileAPI';
            this.url += '/API/';
        }
    }

9.Modules

    //ES5 module.js
    module.exports ={
        port:8080,
        getPing:function(){
            //
        }
    }
    var service = require('module.js');
    console.log(service.port);

ES6中，导出有三种：命名导出（named exports）、默认导出(default exports)、前两种结合导出

其他：通过babel将ES6转化为ES5代码（React中引入）

    //命名导出：任何函数或者变量，加上export既可以导出，另一个文件引用
    export const sqrt = Math.sqrt;
    export function square(x){
        return x * x;
    }
    export function add(a, b){
        return a + b;
    }
    //引用方法1
    import { square, add } from 'lib';
    console(square(2));
    console.log(add(1,2));
    
    //引用方法2：
    import * as lib from 'lib';
    import * as lib from './lib';//第一种不行试试第二种
    add = lib.add;
    square = lib.square;
    //编译工具：babel或者browserify
    
    
    //默认导出——指定一个变量作为默认值导出(默认就是文件名)
    /*------hello.js-------*/
    export default function(a,b){
        return a + b;
    }
    
    import hello from 'hello';
    let c = hello(1,2);

说明：ES6中支持静态导入和导出，在编译时就能确定导出导入的文件。如果运行时才能确定的导入导出是不可以的（例如，在if条件不同时，导入不同的内容，是不可以的。），这样做有助于提高程序运行速度。

10 ES6 in Node.js

在nodeJS中，可以使用babel模块或者构建工具编译代码

    npm install --save-dev babel-core

    require('babel-core').transform(ES5Code,options);

 
