import dbConnection from "@/db/connect"
import dbWorker from "@/db/dbWorker"

export default async function Attributes() {
    return <>Attributes</>
}

async function getAllAttributes() {
    dbWorker(
        `
        select 123
        `,
        []
    ).then(x => console.log('xxx', x))
    // const connection 

    // const connection = await dbConnection();
    // const categories: ts_categoryType[] = await connection.query(`select id, category_name from ${process.env.TABLE_PREFIX}_categories`).then(([x]: any) => x);
    // await connection.end();
    // return categories;

    // dbConnection.promise()
}