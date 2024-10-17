import dbWorker from "@/db/dbWorker";

const { TABLE_PREFIX } = process.env;

export default async function createStockTable() {
  await dbWorker(
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
    `, []
  );
  await dbWorker(
    `
      CREATE UNIQUE INDEX unique_pair ON ${TABLE_PREFIX}_stock(idProduct, idShop);
    `, []);
}
