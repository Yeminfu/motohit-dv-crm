import dbWorker from "@/db/dbWorker";

const { TABLE_PREFIX } = process.env;

export default async function createProductsImagesTable() {
  await dbWorker("SET FOREIGN_KEY_CHECKS=0", []);
  await dbWorker(
    `drop table if exists ${TABLE_PREFIX}_products_images`, []
  );
  await dbWorker(
    `
          CREATE TABLE ${TABLE_PREFIX}_products_images (
              id int primary key AUTO_INCREMENT,
              name varchar(250) not null unique,
              idProduct int not null,
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              isMain tinyint(1),
              foreign key (idProduct) references ${TABLE_PREFIX}_products(id)
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