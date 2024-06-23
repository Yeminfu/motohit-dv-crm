import dbConnection from "@/db/connect";
const { TABLE_PREFIX } = process.env;

export default async function createRetailPriceTypesTable() {
  const connection = await dbConnection();
  await connection.query("SET FOREIGN_KEY_CHECKS=0");
  await connection.query(`drop table if exists ${TABLE_PREFIX}_price_types`);
  await connection
    .query(
      `
          CREATE TABLE ${TABLE_PREFIX}_price_types (
              id int primary key AUTO_INCREMENT,
              priceType varchar(250) not null unique
          );
      `
    )
    .then(([x]: any) => {
      console.log("createSalesTable", x.serverStatus);
    })
    .catch((z) => {
      console.log("err #vdf8", z);
    });
  await connection.query("SET FOREIGN_KEY_CHECKS=1");
  await connection.query(
    `insert into ${TABLE_PREFIX}_price_types (priceType) values ('фиксированный'), ('ручной'), ('процент')`
  );
  await connection.end();
}
