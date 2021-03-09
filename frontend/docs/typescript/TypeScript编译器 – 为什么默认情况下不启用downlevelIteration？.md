# TypeScript编译器 – 为什么默认情况下不启用downlevelIteration？

时间 2019-07-07

标签 [typescript](http://www.voidcn.com/tag/typescript)

当像ES5一样使用扩展运算符…将Iterator转换为数组时,它会显示使用-downlevelIteration编译器选项的错误.一旦它开启,传播操作符似乎只是完美无瑕地工作.我想知道为什么需要指定这个？



除了从tslib添加更多生成的代码之外,启用它时是否有任何缺点/限制？

默认情况下,在[TypeScript Playground](javascript:void())扩展运算符中未启用-downlevelIteration无法进行全面测试.

另一个例子：动态创建N的数组(例如3)：



```
[...Array(3).keys()]  // output: [0, 1, 2]
```

VS代码中显示错误：
[![enter image description here](http://img.voidcn.com/vcimg/static/loading.png)](javascript:void())

来自tsc的错误消息：



> Type ‘IterableIterator’ is not an array type or a string type. Use compiler option ‘–downlevelIteration’ to allow iterating of iterators.

[Edit and view the code and error in TypeScript Playground](javascript:void())

在阅读了 [release notes](javascript:void())和文章 [TypeScript 2.3: Downlevel Iteration for ES3/ES5](javascript:void())之后,我相信这个问题的答案是downlevelIteration被禁用,因为你需要决定(通过配置)你希望TypeScript如何处理兼容性代码的编译(以支持旧版本的Javascript).



正如本文中更冗长的解释所表明的那样,您必须决定是否希望TypeScript内联必要的辅助函数(简单,但可能导致更大的生产包大小),或者如果您希望将TypeScript配置为使用[`tslib`](javascript:void())作为依赖项,然后调用其外部方法.

我强烈建议您阅读[TypeScript 2.3: Downlevel Iteration for ES3/ES5](javascript:void())以获得更深入的了解……并且可能是您初始问题的替代解决方案.

至于为什么downlevelIteration不是TypeScript Playground中的一个选项,我不确定. Playground是开源的,所以你绝对可以创建一个提交拉取请求……这样做可能会得到比这个更好的答案！