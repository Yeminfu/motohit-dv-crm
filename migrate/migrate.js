const fs = require("fs");

const sqlsQueue = [
  "createSys$classesClass",
  "createSys$configClass",
  "createSys$proceduresClass",
  "createSys$functionsClass",
  "createUsersClass",
];

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

const calls = sqlsQueue.map((module) => `call ${module}(1);`);

bigSQL += calls.join("\n");

console.log(bigSQL);
