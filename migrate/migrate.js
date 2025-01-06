const fs = require("fs");

const sqlsQueue = ["createSys$classesClass", "createSys$configClass"];

let bigSQL = "";

for (let index = 0; index < sqlsQueue.length; index++) {
  const module = sqlsQueue[index];
  const sql = fs.readFileSync(
    __dirname + `/${module}/${module}.sql`,
    "utf-8",
    (err, data) => data
  );
  bigSQL += sql + "\n";
  // console.log({ module, sql });
}

console.log(bigSQL);
