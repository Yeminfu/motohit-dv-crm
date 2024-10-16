import dbConnection from "@/db/connect";

const { TABLE_PREFIX } = process.env;

export default async function createProductsTable() {
  const connection = await dbConnection();
  await connection.query("SET FOREIGN_KEY_CHECKS=0");
  await connection.query(`drop table if exists ${TABLE_PREFIX}_products`);
  await connection
    .query(
      `
          CREATE TABLE ${TABLE_PREFIX}_products (
              id int primary key AUTO_INCREMENT,
              name varchar(250) not null unique,
              idCategory int not null,
              purchase_price int,
              idCostPriceType int,
              costPriceValue float,
              color varchar(100),
              code varchar(500),
              note varchar(5000),
              isArchived boolean default 0,
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
              foreign key (idCategory) references ${TABLE_PREFIX}_categories(id),
              foreign key (idCostPriceType) references ${TABLE_PREFIX}_price_types(id)
          );
      `
    )
    .then(([x]: any) => {
      console.log("createProductsTable", x.serverStatus);
    })
    .catch((z) => {
      console.log("createProductsTable", z);
    });
  await connection.query("SET FOREIGN_KEY_CHECKS=1");
  await connection.end();
}
