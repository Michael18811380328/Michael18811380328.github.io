var connection = require("./utils.js");

var modSql = "UPDATE websites SET name = ?,url = ? WHERE Id = ?";
var modSqlParams = ["菜鸟移动站", "https://m.runoob.com", 6];
//改
connection.query(modSql, modSqlParams, function (err, result) {
  if (err) {
    console.log("[UPDATE ERROR] - ", err.message);
    return;
  }
  console.log("--------------------------UPDATE----------------------------");
  console.log("UPDATE affectedRows", result.affectedRows);
  console.log(
    "-----------------------------------------------------------------\n\n",
  );
});

connection.end();
