import dbConnection from "@/db/connect";
const { TABLE_PREFIX } = process.env;

export default async function createStockTable() {
  const connection = await dbConnection();
  await connection.query("SET FOREIGN_KEY_CHECKS=0");
  await connection.query(`drop table if exists ${TABLE_PREFIX}_stock`);
  await connection
    .query(
      `
          CREATE TABLE ${TABLE_PREFIX}_stock (
              id int primary key AUTO_INCREMENT,
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              idProduct int not null,
              idShop int not null,
              count int unsigned not null,
              foreign key (idProduct) references ${TABLE_PREFIX}_products(id),
              foreign key (idShop) references ${TABLE_PREFIX}_shops(id)
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
