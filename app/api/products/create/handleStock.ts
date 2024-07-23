import dbConnection from "@/db/connect";
import { ProductOnCreate } from "@/types/products/prodyctType";

export default async function handleStock(stock: ProductOnCreate["stock"], idProduct: number) {
    const connection = await dbConnection();

    for (let index = 0; index < stock.length; index++) {
        const stockObj = stock[index];
        const { idShop, shopName, count } = stockObj;
        await connection.query(
            `insert into ${process.env.TABLE_PREFIX}_stock (idShop, count, idProduct) values (?, ?, ?)`,
            [idShop, count, idProduct]
        );
    }

    await connection.end();
}
