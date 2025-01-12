import { ProductFromDB } from "@/types/products/prodyctType";

export default async function updateProductMainData(
  connection: any,
  productData: ProductFromDB,
  idProduct: number
) {
  const res = await connection.query(`call editProduct(?,?,?,?,?,?,?,?,?)`, [
    idProduct,
    productData.name,
    productData.note,
    productData.idCostPriceType,
    productData.idCategory,
    productData.costPriceValue,
    productData.purchase_price,
    productData.color,
    productData.code,
  ]);
  return res;
}
