import dbConnection from "@/db/connect";

const { TABLE_PREFIX } = process.env;

export default async function createProductsImagesTable() {
    const connection = await dbConnection();
    await connection.query("SET FOREIGN_KEY_CHECKS=0");
    await connection.query(
      `drop table if exists ${TABLE_PREFIX}_products_images`
    );
    await connection
      .query(
        `
          CREATE TABLE ${TABLE_PREFIX}_products_images (
              id int primary key AUTO_INCREMENT,
              name varchar(250) not null unique,
              idProduct int not null,
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              foreign key (idProduct) references ${TABLE_PREFIX}_products(id)
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