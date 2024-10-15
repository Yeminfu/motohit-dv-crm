import dbConnection from "@/db/connect";

const { TABLE_PREFIX } = process.env;

export default async function createAttrProdRelationsTable() {
    const connection = await dbConnection();
    await connection.query("SET FOREIGN_KEY_CHECKS=0");
    await connection.query(`drop table if exists ${TABLE_PREFIX}_attr_prod_relation`);
    await connection
        .query(
            `
            CREATE TABLE ${TABLE_PREFIX}_attr_prod_relation (
                id int primary key AUTO_INCREMENT,
                created_date datetime default CURRENT_TIMESTAMP,
                created_by int not null,
                idAttributeValue int not null,
                idProduct int not null,
                foreign key (idAttributeValue) references ${TABLE_PREFIX}_attr_prod_relation(id),
                foreign key (idProduct) references ${TABLE_PREFIX}_products(id)
            );
        `
        )
        .then(([x]: any) => {
            // console.log(`${TABLE_PREFIX}_categories`, x);
        })
        .catch((z) => {
            console.log("err #doi3", z);
        });
    await connection.query("SET FOREIGN_KEY_CHECKS=1");
    await connection.end();
}
