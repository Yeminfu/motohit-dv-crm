const fs = require("fs");

const migrateSQL = fs.readFileSync(
  __dirname + "/migrate.sql",
  "utf-8",
  (err, data) => data
);
const createSys$classesClassSQL = fs.readFileSync(
  __dirname + "/createSys$classesClass/createSys$classesClass.sql",
  "utf-8",
  (err, data) => data
);

const sqlsQueue = [createSys$classesClassSQL, migrateSQL];
const bigSQL = sqlsQueue.join(";\n");
console.log(bigSQL);
