# Use compiler option '--downlevelIteration' to allow iterating of iterators 报错解决

最近在一个项目中使用 TS 做单元测试，界面报错如下：





## 报错分析

具体报错信息如下：Set<number> 不是数组或者字符串类型，不能使用扩展运算符。

error TS2569: Type 'Set<number>' is not an array type or a string type. Use compiler option '--downlevelIteration' to allow iterating of iterators.

    7   let newArr:number[] = [...new Set(nums)].sort((a, b) => a - b);

百度后，其他网友也报类似的错误，Map 或者 Set 不能直接使用扩展运算符

TS2569: Type 'Map' is not an array type or a string type. Use compiler. option '- downlevellteration' to allow iterating of iterators.



## 解决方案1

按照官方提示，设置 '--downlevelIteration' 是 true，允许以“ ES5”或“ ES3”为目标时，在“ for-of”，传播、解构中为可迭代项提供支持。

把 tsconfig.json 配置文件修改一下即可

~~~json
{
  "compilerOptions": {
    /* Basic Options */
     "downlevelIteration": true,
/* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
}
~~~

## 解决方案2

配置 dom.iterable 和 downlevelIteration 就可以正常运行

tsconfig.json

```javascript
{
    /*当目标是ES5或ES3的时候提供对for-of、扩展运算符和解构赋值中对于迭代器的完整支持*/
    "downlevelIteration": true,
	  "lib": [
      "dom",
      "es5",
      "es6",
      "es7",
      "dom.iterable"
    ]
}
```

- 设置 target=es6 的时候，就能正常执行。原因：

注意：如果未指定--lib，则会注入默认的库列表。注入的默认库是： ► For --target ES5: DOM,ES5,ScriptHost ► For --target ES6: DOM,ES6,DOM.Iterable,ScriptHost









https://stackoverflow.com/questions/62437679/typescript-use-compiler-option-downleveliteration-to-allow-iterating-of-iter

http://www.voidcn.com/article/p-bccbaiiq-bym.html

https://cloud.tencent.com/developer/article/1593335