var connection = require("./utils.js");

var sql = "SELECT * FROM websites";
//查
connection.query(sql, function (err, result) {
  if (err) {
    console.log("[SELECT ERROR] - ", err.message);
    return;
  }

  console.log("--------------------------SELECT----------------------------");
  console.log(result);
  console.log(
    "------------------------------------------------------------\n\n",
  );
});

connection.end();
