// 脚本类型：nodeJS
// 脚本作用：把英文单词的文档和翻译的文档，拼接成一个新的文档（背单词）
var fs = require('fs');

// 辅助函数：读取两个文件
function combineText(en_path, zh_path) {
  // 未来使用 readFileASync 异步实现，避免层级回调 
  fs.readFile(en_path, (err1, data1) => {
    if (err1) {
      console.log(err1);
    }
    if (data1) {
      fs.readFile(zh_path, (err2, data2) => {
        if (err2) {
          console.log(err2);
        }
        if (data2) {
          // data is array buffer, so use toString to transfer to string
          var str1 = data1.toString();
          var str2 = data2.toString();
          var res = combine(str1, str2);
          // write into file
          writeFile(res);
        }
      });
    }
  });
}

// 辅助函数：写入文件
function writeFile(str) {
  fs.writeFile('./output.md', str, function(err){ 
    if (err) {
      console.log('write file error');
    } else {
      console.log('write file success');
    }
  });
}

// 拼接两个字符串（英语单词和中文翻译）
function combine(str1, str2) {
  const arr1 = str1.split('\n');
  const arr2 = str2.split('\n');

  // 删除特殊符号（只保留字母数字）
  // 可能有回车或者其他特殊字符（换行，未来处理）
  // str = str.replace(/[^A-Za-z0-9\s]/ig, '').replace(/[\n+]/ig, '');
  // // 转换成数组
  // var arr = str.split(' ');
  var arr3 = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] && arr2[i]) {
      arr3[i] = arr1[i] + ' ' + arr2[i] + '\n';
    }
  }
  return arr3.join(' ');
}

var en_path = './result.md';
// 中文翻译现在手动执行，未来可以看一下是否有谷歌翻译的外部API，实现全自动化
// 翻译每次不超过5000字符，实际上可能显示不完全
// 所以这里控制一下导出的数量
var zh_path = './result_zh.md';

// 现在基本正常
combineText(en_path, zh_path);
