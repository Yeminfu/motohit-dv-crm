import dbConnection from "@/db/connect";
const { TABLE_PREFIX } = process.env;

export default async function createRetailPricesTable() {
  const connection = await dbConnection();
  await connection.query("SET FOREIGN_KEY_CHECKS=0");
  await connection.query(`drop table if exists ${TABLE_PREFIX}_retail_prices`);
  await connection
    .query(
      `
          CREATE TABLE ${TABLE_PREFIX}_retail_prices (
              id int primary key AUTO_INCREMENT,
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              idPriceType int not null,
              priceValue int not null,
              idProduct int not null,
              idShop int not null,
              foreign key (idPriceType) references ${TABLE_PREFIX}_price_types(id),
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
