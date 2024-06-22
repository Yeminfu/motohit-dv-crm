import dbConnection from "@/db/connect";

const { TABLE_PREFIX } = process.env;

export default async function createShopsTable() {
  const connection = await dbConnection();
  await connection.query("SET FOREIGN_KEY_CHECKS=0");
  await connection.query(`drop table if exists ${TABLE_PREFIX}_shops`);
  await connection
    .query(
      `
          CREATE TABLE ${TABLE_PREFIX}_shops (
              id int primary key AUTO_INCREMENT,
              shopName varchar(250) not null,
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `
    )
    .then(([x]: any) => {
      console.log("createShopsTable", x.serverStatus);
    })
    .catch((z) => {
      console.log("createUsersTable", z);
    });
  await connection.query(
    `insert into ${TABLE_PREFIX}_shops (shopName) values ('Биробиджан'), ('Хабаровск'), ('Благовещенск')`
  );
  await connection.query("SET FOREIGN_KEY_CHECKS=1");
  await connection.end();
}
