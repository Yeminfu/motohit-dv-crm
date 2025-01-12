import slugify from "slugify";

export default async function createProductMainData(
  connection: any,
  productData: any
): Promise<any> {
  const res = await connection.query(
    `
    call createProduct(?, ?, ?, ?, ?, ?, ?, ?, ?, @idProduct);
    select @idProduct as idProduct;
  `,
    [
      productData.idCategory,
      productData.name,
      slugify(productData.name.trim()),
      productData.note,
      productData.idCostPriceType,
      productData.costPriceValue,
      productData.purchase_price,
      productData.code,
      productData.color,
    ]
  )
    .then((x: any) => x[0][1][0].idProduct);
  return res;
}
