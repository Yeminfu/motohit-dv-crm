import dbWorker from "@/db/dbWorker";

const { TABLE_PREFIX } = process.env;

export default async function createRetailPricesTable() {
  await dbWorker("SET FOREIGN_KEY_CHECKS=0", []);
  await dbWorker(`drop table if exists ${TABLE_PREFIX}_retail_prices`, []);
  await dbWorker(
    `
          CREATE TABLE ${TABLE_PREFIX}_retail_prices (
              id int primary key AUTO_INCREMENT,
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              idPriceType int not null,
              priceValue float not null,
              idProduct int not null,
              idShop int not null,
              foreign key (idPriceType) references ${TABLE_PREFIX}_price_types(id),
              foreign key (idProduct) references ${TABLE_PREFIX}_products(id),
              foreign key (idShop) references ${TABLE_PREFIX}_shops(id)
          );
      `, []
  )
    .then(([x]: any) => {
      console.log("createProductsImagesTable", x.serverStatus);
    })
    .catch((z) => {
      console.log("createProductsImagesTable", z);
    });
  await dbWorker("SET FOREIGN_KEY_CHECKS=1", []);
}
