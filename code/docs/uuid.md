# UUID库介绍和使用

## UUID介绍

UUID是Universally Unique Identifier的缩写，它是在一定的范围内唯一的机器生成的标识符，使用[RFC规范](http://www.ietf.org/rfc/rfc4122.txt)。

### 结构

UUID 是一个128bit的数字，也可以表现为32个16进制的字符，中间用”-”分割

3F2504E0-4F89-11D3-9A0C-0305E82C3301

其中的字母是16进制表示，大小写无关。

\- 时间戳＋UUID版本号，分三段占16个字符(60bit+4bit)，
\- Clock Sequence号与保留字段，占4个字符(13bit＋3bit)，
\- 节点标识占12个字符(48bit)，

### 特点


- **由算法机器生成**：规范定义了包括网卡MAC地址、时间戳、名字空间（Namespace）、随机或伪随机数、时序等元素，以及从这些元素生成UUID的算法。UUID的复杂特性在保证了其唯一性的同时，意味着只能由计算机生成。

- **非人工指定，非人工识别**：UUID是不能人工指定的，UUID的复杂性决定了“一般人“不能直接从一个UUID知道哪个对象和它关联。

- **重复的可能性极小**：UUID的生成规范定义的算法主要目的就是要保证其唯一性。但这个唯一性是有限的，只在特定的范围内才能得到保证，这和UUID的类型有关（参见UUID的版本）。

## UUID.js 库使用

### 概要

```bash
<!-- HTML5 -->
<script src="src/uuid.js"></script>
<script> var uuid = UUID.generate(); </script> 

// Node.js
let UUID = require("uuidjs");
let uuid = UUID.generate();

// TypeScript
import UUID from 'uuidjs';
let str: string = UUID.generate();
let obj: UUID = UUID.genV4();

# Command-line 
npx uuidjs
```

### 特点

- 支持版本1（基于时间的UUID）版本4（基于随机数的UUID）
- 并提供了一个面向对象的界面，可以生成多种格式的UUID
- 使用密码安全的伪随机数生成器(如果可用)，否则使用Math.randow()生成随机数
- 附加额外的随机值来补偿 JS 的时间戳分辨率低于版本1 uuid所需的时间戳
- 包含很多测试案例（包括格式检查和统计测试）确保高质量的代码
- 兼容性：支持早期浏览器和现代浏览器，同样支持服务器环境，与ES3版本可以兼容。

### 安装

直接下载 uuid.js 文件或者使用 `npm install uuidjs` 进行安装；

在HTML中直接引入 `src/uuid.js`.

```html
<script src="src/uuid.js"></script>
```

在 JS 文件（ES6）可以引入  `uuidjs`.

```js
const UUID = require("uuidjs");
```

### 使用

`UUID.generate()` 函数返回一个版本4的十六进制的字符串

```js
console.log(UUID.generate());   // fa84cf42-ffdf-4975-b42b-31ab5fb983eb
```

`UUID.genV4()`, `UUID.genV1()`, 和 `UUID.parse()` 返回一个 UUID 对象，具有多种字段（fields）和方法

```js
// Create a version 4 (random number-based) UUID object(创建版本4的UUID对象)
var objV4 = UUID.genV4();
 
// Create a version 1 (time-based) UUID object(创建版本1的UUID对象)
var objV1 = UUID.genV1();
 
// Create a UUID object from a hexadecimal string (从一个十六进制字符串中创建一个UUID对象)
var uuid = UUID.parse("a0e0f130-8c21-11df-92d9-95795a3bcd40");
 
// Get string representations of a UUID object
console.log(uuid.toString());   // "a0e0f130-8c21-11df-92d9-95795a3bcd40"
console.log(uuid.hexString);    // "a0e0f130-8c21-11df-92d9-95795a3bcd40"
console.log(uuid.hexNoDelim);   // "a0e0f1308c2111df92d995795a3bcd40"
console.log(uuid.bitString);    // "101000001110000 ... 1100110101000000"
console.log(uuid.urn);          // "urn:uuid:a0e0f130-8c21-11df-92d9-95795a3bcd40"
 
// Compare UUID objects
console.log(objV4.equals(objV1));   // false
 
// Get UUID version numbers
console.log(objV4.version); // 4
console.log(objV1.version); // 1
 
// Get internal field values in 3 different forms via 2 different accessors
console.log(uuid.intFields.timeLow);                // 2699096368
console.log(uuid.bitFields.timeMid);                // "1000110000100001"
console.log(uuid.hexFields.timeHiAndVersion);       // "11df"
console.log(uuid.intFields.clockSeqHiAndReserved);  // 146
console.log(uuid.bitFields.clockSeqLow);            // "11011001"
console.log(uuid.hexFields.node);                   // "95795a3bcd40"
 
console.log(uuid.intFields[0]);                     // 2699096368
console.log(uuid.bitFields[1]);                     // "1000110000100001"
console.log(uuid.hexFields[2]);                     // "11df"
console.log(uuid.intFields[3]);                     // 146
console.log(uuid.bitFields[4]);                     // "11011001"
console.log(uuid.hexFields[5]);                     // "95795a3bcd40"
```

UUID.js 支持所谓的 noConflict 模式来处理名称空间冲突。

```js
// Avoid namespace conflicts with other libraries
var arbitraryVarName = UUID;
UUID = UUID.overwrittenUUID;                // Restore the original value
console.log(arbitraryVarName.generate());   // "cb9a0283-a44c-4e7a-a5b0-9cd2876e952b"
```
