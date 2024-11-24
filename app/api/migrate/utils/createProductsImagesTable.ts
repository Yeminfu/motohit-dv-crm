import dbWorker from "@/db/dbWorker";

const { TABLE_PREFIX } = process.env;

export default async function createProductsImagesTable() {
  await dbWorker(
    `
      CREATE TABLE ${TABLE_PREFIX}_products_images (
        id int primary key AUTO_INCREMENT,
        name varchar(250) not null unique,
        idProduct int not null,
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        isMain tinyint(1) default 0,
        foreign key (idProduct) references ${TABLE_PREFIX}_products(id)
      );
    `,
    []
  )
    .then((x: any) => {})
    .catch((z) => {
      console.error("createProductsImagesTable", z);
    });
}
