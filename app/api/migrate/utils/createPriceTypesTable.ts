import dbWorker from "@/db/dbWorker";

const { TABLE_PREFIX } = process.env;

export default async function createRetailPriceTypesTable() {
  await dbWorker(
    `
      CREATE TABLE ${TABLE_PREFIX}_price_types (
        id int primary key AUTO_INCREMENT,
        priceType varchar(250) not null unique
      )
  `, []
  )
    .then((x: any) => {
      console.log("createSalesTable", x.serverStatus);
    })
    .catch((z) => {
      console.log("err #vdf8", z);
    });
  await dbWorker(`
    insert into ${TABLE_PREFIX}_price_types
    (
      priceType
    )
    values 
      ('Фиксированный'),
      ('Ручной'),
      ('Процент')
  `, [])
}
