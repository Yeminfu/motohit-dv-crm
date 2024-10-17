import dbWorker from "@/db/dbWorker";

const { TABLE_PREFIX } = process.env;

export default async function createHistoryTable() {
  await dbWorker(
    `
      CREATE TABLE ${TABLE_PREFIX}_history (
        id int primary key AUTO_INCREMENT,
        created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        data JSON not null,
        action varchar(250) not null,
        doneBy int not null,
        foreign key (doneBy) references ${TABLE_PREFIX}_users(id)
      );
    `, []
  )
    .then((x: any) => {
      console.log("createProductsImagesTable", x.serverStatus);
    })
    .catch((z) => {
      console.log("createProductsImagesTable", z);
    });
}
