var connection = require("./utils.js");

var delSql = "DELETE FROM websites where id=6";
//删
connection.query(delSql, function (err, result) {
  if (err) {
    console.log("[DELETE ERROR] - ", err.message);
    return;
  }
  console.log("--------------------------DELETE----------------------------");
  console.log("DELETE affectedRows", result.affectedRows);
  console.log(
    "-----------------------------------------------------------------\n\n",
  );
});

connection.end();
