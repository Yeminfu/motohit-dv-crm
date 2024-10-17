import dbWorker from "@/db/dbWorker";

const { TABLE_PREFIX } = process.env;

export default async function createRetailPriceTypesTable() {
  await dbWorker("SET FOREIGN_KEY_CHECKS=0", []);
  await dbWorker(`drop table if exists ${TABLE_PREFIX}_price_types`, []);
  await dbWorker(
    `
          CREATE TABLE ${TABLE_PREFIX}_price_types (
              id int primary key AUTO_INCREMENT,
              priceType varchar(250) not null unique
          );
      `, []
  )
    .then(([x]: any) => {
      console.log("createSalesTable", x.serverStatus);
    })
    .catch((z) => {
      console.log("err #vdf8", z);
    });
  await dbWorker("SET FOREIGN_KEY_CHECKS=1", []);
  await dbWorker(
    `insert into ${TABLE_PREFIX}_price_types (priceType) values ('фиксированный'), ('ручной'), ('процент')`, []
  );
}
