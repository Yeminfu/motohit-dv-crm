const fs = require("fs");

const procedures = [
  "createSys$classesClass",
  "createSys$dataTypesClass",
  "createSys$fieldsClass",
  "createSys$configClass",
  "createSys$proceduresClass",
  "createSys$functionsClass",
  "createSys$viewsClass",
  "createUsersClass",
  "createTokensClass",
  "createTodoTasksClass",
];

const scalarFunctions = ["checkColumnIsExists"];

let bigSQL = "";

for (let index = 0; index < procedures.length; index++) {
  const module = procedures[index];
  const sql = fs.readFileSync(
    __dirname + `/${module}/${module}.sql`,
    "utf-8",
    (err, data) => data
  );
  bigSQL += sql + "\n";
  // console.log({ module, sql });
}

// checkColumnIsExists
for (let index = 0; index < scalarFunctions.length; index++) {
  const module = scalarFunctions[index];
  const sql = fs.readFileSync(
    __dirname + `/${module}/${module}.sql`,
    "utf-8",
    (err, data) => data
  );
  bigSQL += sql + "\n";
}

const calls = procedures.map(
  (module) => `call ${module}(1);
drop procedure if exists ${module};`
);

bigSQL += calls.join("\n");

console.log(bigSQL);
