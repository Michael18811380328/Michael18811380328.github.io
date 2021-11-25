var fs = require('fs');

// 辅助函数：读取本地文件（如果是网页，直接使用爬虫获取）
function getFile(filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      // data is array buffer, so use toString to transfer to string
      var str = data.toString();
      // get sequence
      var res = getFrequence(str);
      // write into file
      writeFile(res);
    }
  });
}

// 辅助函数：把高频词结果写入文件中
function writeFile(str) {
  fs.writeFile('./result.txt', str, function(err){ 
    if (err) {
      console.log('write file error');
    } else {
      console.log('write file success');
    }
  });
}

// 获取高频词
function getFrequence(str) {
  // 删除特殊符号（只保留字母数字）
  str = str.replace(/[^A-Za-z0-9\s]/ig, '').replace(/[\n+]/ig, '');
  // 转换成数组
  var arr = str.split(' ');
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
    if (times > 10) {
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

// 这里写入读取文件的相对路径（）
var filePath = './leanpub-auto-the-road-to-ecmascript-6.md';

getFile(filePath);
