const fs = require("fs");

const migrate = fs.readFileSync(
  __dirname + "/migrate.sql",
  "utf-8",
  (err, data) => data
);

const createSys$classesClass = fs.readFileSync(
  __dirname + "/createSys$classesClass/createSys$classesClass.sql",
  "utf-8",
  (err, data) => data
);

const createSys$configClass = fs.readFileSync(
  __dirname + "/createSys$configClass/createSys$configClass.sql",
  "utf-8",
  (err, data) => data
);

const sqlsQueue = [createSys$classesClass, createSys$configClass, migrate];
const bigSQL = sqlsQueue.join(";\n");
console.log(bigSQL);
