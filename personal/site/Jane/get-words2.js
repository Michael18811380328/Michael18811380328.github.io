var fs = require('fs');

// 这个最后可以放在 leetcode algre 工具函数部分
// 辅助函数：读取本地文件（如果是网页，直接使用爬虫获取）
function getFile(filePath, dictPath) {
  fs.readFile(filePath, (err, file1) => {
    if (err) console.log(err);
    fs.readFile(dictPath, (err, file2) => {
      // data is array buffer, so use toString to transfer to string，get sequence
      writeFile(getFrequence(file1.toString(), file2.toString()));
    });
  });
}

// 辅助函数：把高频词结果写入文件中
function writeFile(str) {
  fs.writeFile('./result.md', str, function(err){ 
    if (err) {
      console.log('write file error');
    } else {
      console.log('write file success');
    }
  });
}

// 获取高频词
function getFrequence(str, dictStr) {
  // 删除特殊符号（只保留字母数字）可能有回车或者其他特殊字符（换行，未来处理）
  str = str.replace(/[^A-Za-z0-9\s]/ig, '').replace(/[\n+]/ig, '');

  // 获取字典(这部分简单单词需要去掉)
  let dict = {};
  dictStr = dictStr.replace(/[^A-Za-z0-9\s]/ig, ' ').replace(/[\n+]/ig, ' ');
  dictStr.split(' ').forEach(item => {
    dict[item] = true;
  });

  // 转换成数组
  var arr = str.split(' ').filter(item => {
    // 去掉长度小于4的简单单词
    if (item.length < 4) {
      return false;
    } 
    // 去掉数字
    if (!isNaN(parseInt(item, 10))) {
      return false;
    }
    if (dict[item]) {
      return false;
    }
    return true;
  });


  var obj = {};
  arr.forEach((item) => {
    let key = item.toLowerCase();
    if (!obj[key]) {
      obj[key] = 1;
    } else {
      obj[key] = obj[key] + 1;
    }
  });

  // 获取出现次数最多的几个情况
  var arr2 = [];
  for (let key in obj) {
    let times = obj[key];
    // 这个参数可以调整（现在统计出现次数超过10次的单词）
    // 这里写到前面的常量中，配置明显
    if (times > 2 && times < 500) {
      arr2.push({ times, key });
    }
  }
  arr2.sort((a, b) => a.times > b.times ? -1 : 1);

  var arr3 = [];
  arr2.forEach(item => {
    arr3.push(item.key);
    // arr3.push(item.times); 
    // 统计次数需要这个代码，如果仅仅是背单词就不需要这个代码
    arr3.push('\n');
  });
  return arr3.join(' ');
}

// 现在只支持一个文件，未来最好遍历一下，支持目录
var filePath = './react-to-test.md';
var dictPath = './dict.md';

getFile(filePath, dictPath);
