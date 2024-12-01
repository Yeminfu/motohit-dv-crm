import dbWorker from "@/db/dbWorker";

const { TABLE_PREFIX } = process.env;

export default async function createProductsTable() {
  await dbWorker(
    `
      CREATE TABLE ${TABLE_PREFIX}_products (
        id int primary key AUTO_INCREMENT,
        name varchar(250) not null unique comment "Название товара",
        description LONGTEXT comment "Описание" ,
        slug varchar(250) not null unique,
        idCategory int not null comment "id категории",
        purchase_price int comment "Закупочная цена",
        idCostPriceType int,
        costPriceValue float,
        color varchar(100) comment "Цвет заголовка",
        code varchar(500) comment "Код товара",
        note varchar(3072) comment "Заметки",
        isArchived boolean default 0 comment "Удален",
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP comment "Когда создан",
        foreign key (idCategory) references ${TABLE_PREFIX}_categories(id),
        foreign key (idCostPriceType) references ${TABLE_PREFIX}_price_types(id)
      );
    `,
    []
  )
    .then((x: any) => {})
    .catch((z) => {
      console.error("createProductsTable", z);
    });
}
