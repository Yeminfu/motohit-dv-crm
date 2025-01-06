const fs = require("fs");

const migrateSQL = fs.readFileSync(
  __dirname + "/migrate.sql",
  "utf-8",
  (err, data) => data
);

const sqlsQueue = [migrateSQL];
const bigSQL = sqlsQueue.join(";\n");
console.log(bigSQL);
