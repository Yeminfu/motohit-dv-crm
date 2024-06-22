import dbConnection from "@/db/connect";

const { TABLE_PREFIX } = process.env;

export default async function createCategoriesTable() {
  const connection = await dbConnection();
  await connection.query("SET FOREIGN_KEY_CHECKS=0");
  await connection.query(`drop table if exists ${TABLE_PREFIX}_categories`);
  await connection
    .query(
      `
          CREATE TABLE ${TABLE_PREFIX}_categories (
              id int primary key AUTO_INCREMENT,
              name varchar(250) not null unique,
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP
          );
      `
    )
    .then(([x]: any) => {
      console.log("createCategoriesTable", x.serverStatus);
    })
    .catch((z) => {
      console.log("createCategoriesTable", z);
    });
  await connection.query("SET FOREIGN_KEY_CHECKS=1");
  await connection.end();
}
