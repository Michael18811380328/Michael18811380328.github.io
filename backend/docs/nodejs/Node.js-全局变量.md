# Node.js v12.14.0 文档

- [返回文档首页](http://nodejs.cn/api/) 
- [搜索](http://nodejs.cn/search)

------

## 目录

- [global（全局变量）](http://nodejs.cn/api/globals.html#globals_global_objects)
  - [Buffer 类](http://nodejs.cn/api/globals.html#globals_class_buffer)
  - [__dirname](http://nodejs.cn/api/globals.html#globals_dirname)
  - [__filename](http://nodejs.cn/api/globals.html#globals_filename)
  - [clearImmediate(immediateObject)](http://nodejs.cn/api/globals.html#globals_clearimmediate_immediateobject)
  - [clearInterval(intervalObject)](http://nodejs.cn/api/globals.html#globals_clearinterval_intervalobject)
  - [clearTimeout(timeoutObject)](http://nodejs.cn/api/globals.html#globals_cleartimeout_timeoutobject)
  - [console](http://nodejs.cn/api/globals.html#globals_console)
  - [exports](http://nodejs.cn/api/globals.html#globals_exports)
  - [global](http://nodejs.cn/api/globals.html#globals_global)
  - [module](http://nodejs.cn/api/globals.html#globals_module)
  - [process](http://nodejs.cn/api/globals.html#globals_process)
  - [queueMicrotask(callback)](http://nodejs.cn/api/globals.html#globals_queuemicrotask_callback)
  - [require()](http://nodejs.cn/api/globals.html#globals_require)
  - [setImmediate(callback[, ...args\])](http://nodejs.cn/api/globals.html#globals_setimmediate_callback_args)
  - [setInterval(callback, delay[, ...args\])](http://nodejs.cn/api/globals.html#globals_setinterval_callback_delay_args)
  - [setTimeout(callback, delay[, ...args\])](http://nodejs.cn/api/globals.html#globals_settimeout_callback_delay_args)
  - [TextDecoder](http://nodejs.cn/api/globals.html#globals_textdecoder)
  - [TextEncoder](http://nodejs.cn/api/globals.html#globals_textencoder)
  - [URL](http://nodejs.cn/api/globals.html#globals_url)
  - [URLSearchParams](http://nodejs.cn/api/globals.html#globals_urlsearchparams)
  - [WebAssembly](http://nodejs.cn/api/globals.html#globals_webassembly)

# global（全局变量）[#](http://nodejs.cn/api/globals.html#globals_global_objects)

[中英对照](http://nodejs.cn/api/globals/global_objects.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/global_objects.md)

所有模块都提供这些对象。 以下变量虽然看起来是全局的，但其实并不是。 它们仅存在于模块范围内，请参阅[模块系统文档](http://nodejs.cn/s/TQHXpm)：

- [`__dirname`](http://nodejs.cn/s/etUQhi)
- [`__filename`](http://nodejs.cn/s/RH6qCV)
- [`exports`](http://nodejs.cn/s/JzVhDV)
- [`module`](http://nodejs.cn/s/2UCVu5)
- [`require()`](http://nodejs.cn/s/bVPMwV)

此处列出的对象特定于 Node.js。 有些[内置对象](http://nodejs.cn/s/GMhHSn)是 JavaScript 语言本身的一部分，它们也是全局可访问的。

## Buffer 类[#](http://nodejs.cn/api/globals.html#globals_class_buffer)

[中英对照](http://nodejs.cn/api/globals/class_buffer.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/class_buffer.md)

新增于: v0.1.103

- [](http://nodejs.cn/s/ceTQa6)

用于处理二进制数据。请参阅 [Buffer 文档](http://nodejs.cn/s/FP4oTy)。

## __dirname[#](http://nodejs.cn/api/globals.html#globals_dirname)

[中英对照](http://nodejs.cn/api/globals/dirname.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/dirname.md)

此变量虽然看似全局的，但实际上不是。 请参阅 [`__dirname`](http://nodejs.cn/s/etUQhi) 文档。

## __filename[#](http://nodejs.cn/api/globals.html#globals_filename)

[中英对照](http://nodejs.cn/api/globals/filename.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/filename.md)

此变量虽然看似全局的，但实际上不是。 请参阅 [`__filename`](http://nodejs.cn/s/RH6qCV) 文档。

## clearImmediate(immediateObject)[#](http://nodejs.cn/api/globals.html#globals_clearimmediate_immediateobject)

[中英对照](http://nodejs.cn/api/globals/clearimmediate_immediateobject.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/clearimmediate_immediateobject.md)

新增于: v0.9.1

[`clearImmediate`](http://nodejs.cn/s/tn26EY) 在[定时器](http://nodejs.cn/s/k2urEG)章节中描述。

## clearInterval(intervalObject)[#](http://nodejs.cn/api/globals.html#globals_clearinterval_intervalobject)

[中英对照](http://nodejs.cn/api/globals/clearinterval_intervalobject.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/clearinterval_intervalobject.md)

新增于: v0.0.1

[`clearInterval`](http://nodejs.cn/s/zRW98q) 在[定时器](http://nodejs.cn/s/k2urEG)章节中描述。

## clearTimeout(timeoutObject)[#](http://nodejs.cn/api/globals.html#globals_cleartimeout_timeoutobject)

[中英对照](http://nodejs.cn/api/globals/cleartimeout_timeoutobject.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/cleartimeout_timeoutobject.md)

新增于: v0.0.1

[`clearTimeout`](http://nodejs.cn/s/L4L2Xr) 在[定时器](http://nodejs.cn/s/k2urEG)章节中描述。

## console[#](http://nodejs.cn/api/globals.html#globals_console)

[中英对照](http://nodejs.cn/api/globals/console.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/console.md)

新增于: v0.1.100

- [](http://nodejs.cn/s/jzn6Ao)

用于打印到 `stdout` 和 `stderr`。 请参阅 [`console`](http://nodejs.cn/s/zVV7Qk) 文档。

## exports[#](http://nodejs.cn/api/globals.html#globals_exports)

[中英对照](http://nodejs.cn/api/globals/exports.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/exports.md)

此变量虽然看似全局的，但实际上不是。 请参阅 [`exports`](http://nodejs.cn/s/JzVhDV) 文档。

## global[#](http://nodejs.cn/api/globals.html#globals_global)

[中英对照](http://nodejs.cn/api/globals/global.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/global.md)

新增于: v0.1.27

- [](http://nodejs.cn/s/jzn6Ao) 全局的命名空间对象。

在浏览器中，顶层作用域是全局作用域。 这意味着在浏览器中 `var something` 将定义一个新的全局变量。 在 Node.js 中，这是不同的。 顶层作用域不是全局作用域，Node.js 模块中的 `var something` 的作用域只在该模块内。

## module[#](http://nodejs.cn/api/globals.html#globals_module)

[中英对照](http://nodejs.cn/api/globals/module.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/module.md)

此变量虽然看似全局的，但实际上不是。 请参阅 [`module`](http://nodejs.cn/s/2UCVu5) 文档。

## process[#](http://nodejs.cn/api/globals.html#globals_process)

[中英对照](http://nodejs.cn/api/globals/process.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/process.md)

新增于: v0.1.7

- [](http://nodejs.cn/s/jzn6Ao)

进程对象。 请参阅 [`process`](http://nodejs.cn/s/tCza6h) 文档。

## queueMicrotask(callback)[#](http://nodejs.cn/api/globals.html#globals_queuemicrotask_callback)

[中英对照](http://nodejs.cn/api/globals/queuemicrotask_callback.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/queuemicrotask_callback.md)

新增于: v11.0.0

- `callback` [](http://nodejs.cn/s/ceTQa6) 要排队的函数。

`queueMicrotask()` 方法将微任务排队以调用 `callback`。 如果 `callback` 抛出异常，则将会触发 [`process` 对象](http://nodejs.cn/s/tCza6h) 的 `'uncaughtException'` 事件。

微任务队列由 V8 管理，可以与 [`process.nextTick()`](http://nodejs.cn/s/j4g1bA) 队列（由 Node.js 管理）类似的方式使用。 始终在 Node.js 事件循环的每个回合中的微任务队列之前处理 `process.nextTick()` 队列。

```js
// `queueMicrotask()` 用于确保 'load' 事件始终异步地触发，且因此保持一致。 
// 在这里使用 `process.nextTick()` 会导致 'load' 事件总是在任何其他 promise 任务之前触发。

DataHandler.prototype.load = async function load(key) {
  const hit = this._cache.get(url);
  if (hit !== undefined) {
    queueMicrotask(() => {
      this.emit('load', hit);
    });
    return;
  }

  const data = await fetchData(key);
  this._cache.set(url, data);
  this.emit('load', data);
};
```

## require()[#](http://nodejs.cn/api/globals.html#globals_require)

[中英对照](http://nodejs.cn/api/globals/require.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/require.md)

此变量虽然看似全局的，但实际上不是。 请参阅 [`require()`](http://nodejs.cn/s/bVPMwV) 文档。

## setImmediate(callback[, ...args])[#](http://nodejs.cn/api/globals.html#globals_setimmediate_callback_args)

[中英对照](http://nodejs.cn/api/globals/setimmediate_callback_args.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/setimmediate_callback_args.md)

新增于: v0.9.1

[`setImmediate`](http://nodejs.cn/s/Cjc23N) 在[定时器](http://nodejs.cn/s/k2urEG)章节中描述。

## setInterval(callback, delay[, ...args])[#](http://nodejs.cn/api/globals.html#globals_setinterval_callback_delay_args)

[中英对照](http://nodejs.cn/api/globals/setinterval_callback_delay_args.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/setinterval_callback_delay_args.md)

新增于: v0.0.1

[`setInterval`](http://nodejs.cn/s/hWCq4X) 在[定时器](http://nodejs.cn/s/k2urEG)章节中描述。

## setTimeout(callback, delay[, ...args])[#](http://nodejs.cn/api/globals.html#globals_settimeout_callback_delay_args)

[中英对照](http://nodejs.cn/api/globals/settimeout_callback_delay_args.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/settimeout_callback_delay_args.md)

新增于: v0.0.1

[`setTimeout`](http://nodejs.cn/s/UxXb1y) 在[定时器](http://nodejs.cn/s/k2urEG)章节中描述。

## TextDecoder[#](http://nodejs.cn/api/globals.html#globals_textdecoder)

[中英对照](http://nodejs.cn/api/globals/textdecoder.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/textdecoder.md)

新增于: v11.0.0

WHATWG `TextDecoder` 类。 参阅 [`TextDecoder`](http://nodejs.cn/s/FW9UBM) 文档。

## TextEncoder[#](http://nodejs.cn/api/globals.html#globals_textencoder)

[中英对照](http://nodejs.cn/api/globals/textencoder.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/textencoder.md)

新增于: v11.0.0

WHATWG `TextEncoder` 类。 参阅 [`TextEncoder`](http://nodejs.cn/s/CLExhL) 文档。

## URL[#](http://nodejs.cn/api/globals.html#globals_url)

[中英对照](http://nodejs.cn/api/globals/url.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/url.md)

新增于: v10.0.0

WHATWG `URL` 类。 请参阅 [`URL`](http://nodejs.cn/s/vzpPx2) 文档。

## URLSearchParams[#](http://nodejs.cn/api/globals.html#globals_urlsearchparams)

[中英对照](http://nodejs.cn/api/globals/urlsearchparams.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/urlsearchparams.md)

新增于: v10.0.0

WHATWG `URLSearchParams` 类。 请参阅 [`URLSearchParams`](http://nodejs.cn/s/AUtfEw) 文档。

## WebAssembly[#](http://nodejs.cn/api/globals.html#globals_webassembly)

[中英对照](http://nodejs.cn/api/globals/webassembly.html)[提交修改](https://github.com/nodejscn/node-api-cn/edit/master/globals/webassembly.md)

新增于: v8.0.0

- [](http://nodejs.cn/s/jzn6Ao)

作为所有 W3C [WebAssembly](http://nodejs.cn/s/cEivN6) 相关功能的命名空间的对象。 有关使用和兼容性，请参阅 [Mozilla 开发者网站](http://nodejs.cn/s/g23oec)。