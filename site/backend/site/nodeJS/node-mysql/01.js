// 注意：node不能识别 es6 的导入导出，所以需要使用 ES5 的方式
// export default connection;
// import connection from './utils.js';

// npm install mysql

var connection = require("./utils.js");

connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});

connection.query("SELECT * FROM websites", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results);
  console.log("The solution is: ", fields);
});
