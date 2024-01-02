// 第三版，针对谷歌浏览器每次下载个数不超过10个，改成间隔下载

const table = window.app.state.value.tables[0];

const options = table.columns[3].data.options;
const IdNameMap = {};
options.forEach(option => {
  IdNameMap[option.id] = option.name;
});

let result = {};
for (let key in IdNameMap) {
  result[IdNameMap[key]] = [];
}

function getResuleFromTable() {
  table.rows.forEach(currentRow => {
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

this.timerArr = [];

function sleep() {
  return new Promise((resolve) => {
    let timer = setTimeout(resolve, 300);
    this.timerArr.push(timer);
  });
}

async function downLoadResult(fileName, resultStr) {
  await sleep();
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

getResuleFromTable();

for (let name in result) {
  if (result[name].length > 0) {
    await downLoadResult(name, result[name].join(' '));
  }
}

