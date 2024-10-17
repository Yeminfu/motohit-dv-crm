import dbWorker from "@/db/dbWorker";
import { ProductOnCreate } from "@/types/products/prodyctType";

export default async function handleStock(stock: ProductOnCreate["stock"], idProduct: number) {
    for (let index = 0; index < stock.length; index++) {
        const stockObj = stock[index];
        const { idShop, shopName, count } = stockObj;
        await dbWorker(
            `insert into ${process.env.TABLE_PREFIX}_stock (idShop, count, idProduct) values (?, ?, ?)`,
            [idShop, count, idProduct]
        );
    }
}
