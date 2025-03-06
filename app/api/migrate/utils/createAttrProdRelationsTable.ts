import dbWorker from "@/db/dbWorker2";

const { TABLE_PREFIX } = process.env;

export default async function createAttrProdRelationsTable() {
  await dbWorker(
    `
      CREATE TABLE ${TABLE_PREFIX}_attr_prod_relation (
        id int primary key AUTO_INCREMENT,
        created_date datetime default CURRENT_TIMESTAMP,
        created_by int not null,
        idAttributeValue int not null,
        idProduct int not null,
        foreign key (idAttributeValue) references ${TABLE_PREFIX}_attributes_values(id),
        foreign key (idProduct) references ${TABLE_PREFIX}_products(id)
      );
    `,
    []
  )
    .then((x: any) => { })
    .catch((z) => {
      console.error("err #doi3", z);
    });
}
