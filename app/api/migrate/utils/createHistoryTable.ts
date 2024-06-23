import dbConnection from "@/db/connect";

const { TABLE_PREFIX } = process.env;

export default async function createHistoryTable() {
  const connection = await dbConnection();
  await connection.query("SET FOREIGN_KEY_CHECKS=0");
  await connection.query(`drop table if exists ${TABLE_PREFIX}_history`);
  await connection
    .query(
      `
          CREATE TABLE ${TABLE_PREFIX}_history (
              id int primary key AUTO_INCREMENT,
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              data JSON not null,
              action varchar(250) not null,
              doneBy int not null,
              foreign key (doneBy) references ${TABLE_PREFIX}_users(id)
          );
      `
    )
    .then(([x]: any) => {
      console.log("createProductsImagesTable", x.serverStatus);
    })
    .catch((z) => {
      console.log("createProductsImagesTable", z);
    });
  await connection.query("SET FOREIGN_KEY_CHECKS=1");
  await connection.end();
}
