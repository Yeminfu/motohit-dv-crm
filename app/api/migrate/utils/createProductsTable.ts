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
              name varchar(250) not null unique comment "Название товара",
              slug varchar(250) not null unique,
              idCategory int not null comment "id категории",
              purchase_price int comment "Закупочная цена",
              idCostPriceType int,
              costPriceValue float,
              color varchar(100) comment "Цвет заголовка",
              code varchar(500) comment "Код товара",
              note varchar(5000) comment "Заметки",
              isArchived boolean default 0 comment "Удален",
              created_date DATETIME DEFAULT CURRENT_TIMESTAMP comment "Когда создан",
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
