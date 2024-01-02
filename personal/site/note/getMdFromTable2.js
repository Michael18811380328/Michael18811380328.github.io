// 第二版，按照不同分类，生成不同的笔记

const table = window.app.state.value.tables[0];

// 获取分类依据
const options = table.columns[3].data.options;
const IdNameMap = {};
options.forEach(option => {
  IdNameMap[option.id] = option.name;
});

let result = {};
for (let key in IdNameMap) {
  result[IdNameMap[key]] = [];
}

// 把表格数据转换成 markdown 字符串
function getResuleFromTable() {
  table.rows.forEach(currentRow => {
    // 有序号，有标签的题目，写入笔记中
    if (currentRow && currentRow['0000'] && currentRow['jR0Y']) {
      const detail = currentRow['unlw']?.text || '';
      const title = currentRow['wvVY'] || '';
      const sequnece = currentRow['0000'] || '';
      const tagName = IdNameMap[currentRow['jR0Y']];
      let item = `
## ${sequnece} ${title}
\n
${detail}
  `;
      result[tagName].push(item);
    }
  });
}

// 导出字符串到本地文件中, https://www.jb51.net/javascript/2885132ih.htm
function downLoadResult(fileName, resultStr) {
  const blob = new Blob([resultStr], {
    type: "text/plain;charset=utf-8"
  });
  const objectURL = URL.createObjectURL(blob);
  const aTag = document.createElement('a');
  aTag.href = objectURL;
  aTag.download = fileName + "-笔记.md";
  aTag.click();
  URL.revokeObjectURL(objectURL);
}

// 执行函数
getResuleFromTable();

// 写入不同的笔记中
for (let name in result) {
  if (result[name].length > 0) {
    downLoadResult(name, result[name].join(' '));
  }
}
