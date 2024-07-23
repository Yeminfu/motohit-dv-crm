import dbConnection from "@/db/connect";
import { ProductOnCreate } from "@/types/products/prodyctType";

export default async function handleRetailPrices(
    retailPrices: ProductOnCreate["retail_price"],
    idProduct: number
) {
    const connection = await dbConnection();

    for (let index = 0; index < retailPrices.length; index++) {
        const priceObj = retailPrices[index];
        const { idShop, idPriceType, priceValue } = priceObj;
        await connection.query(
            `insert into ${process.env.TABLE_PREFIX}_retail_prices (idPriceType, priceValue, idProduct, idShop) values (?, ?, ?, ?)`,
            [idPriceType, priceValue, idProduct, idShop]
        );
    }

    await connection.end();
}
