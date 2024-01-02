// 同步表格和本地笔记（第一版）

// 把表格数据转换成 markdown 字符串
function getResuleFromTable() {
  const table = window.app.state.value.tables[0];
  let result = [];
  table.rows.forEach(currentRow => {
    if (currentRow && currentRow['0000']) {
      const detail = currentRow['unlw']?.text || '';
      const title = currentRow['wvVY'] || '';
      const sequnece = currentRow['0000'] || '';
      let item = `
## ${sequnece} ${title}
\n
${detail}
  `;
      result.push(item);
    }
  });
  return result.join(' ');
}

// 导出字符串到本地文件中, https://www.jb51.net/javascript/2885132ih.htm
function downLoadResult(resultStr) {
  const blob = new Blob([resultStr], {
    type: "text/plain;charset=utf-8"
  });
  const objectURL = URL.createObjectURL(blob);
  const aTag = document.createElement('a');
  aTag.href = objectURL;
  aTag.download = "全部笔记.md";
  aTag.click();
  URL.revokeObjectURL(objectURL);
}

downLoadResult(getResuleFromTable());
