import { NextResponse } from "next/server";
import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";
import StockFromDBType from "@/types/products/stockFromDB";
import updateProductMainData from "./utils/updateProductMainData";
import editProductAttributes from "./utils/editProductAttributes/editProductAttributes";
import editRetailPrices from "./utils/editRetailPrices/editRetailPrices";
import editStock from "./utils/editStock";
import { ts_imageFromDB } from "#types/products/ts_imageFromDB.ts";
import editOldImages from "./utils/editOldImages/editOldImages";
import createNewImages from "./utils/createNewImages/createNewImages";
import dbConnection from "#db/connect.ts";
import getUserByToken from "#utils/users/getUserByToken.ts";

export async function POST(request: any, params: { params: { id: any } }) {
  const session = Date.now();

  const data: any = await request.formData();

  const mainProductFields = JSON.parse(data.get("mainProductFields"));

  const connection = await dbConnection();


  const { cookies } = request;
  const authToken = String(cookies.get("auth")?.value);
  if (!authToken) {
    return NextResponse.json({
      error: "#mf84j"
    })
  }

  const user = await getUserByToken(authToken);
  if (!user) {
    return NextResponse.json({
      error: "#fl5m38"
    })
  }


  try {
    await connection.beginTransaction();

    await updateProductMainData(
      connection,
      mainProductFields,
      Number(params.params.id)
    );

    const retail_price: RetailPriceFromDB[] = JSON.parse(
      data.get("retail_price")
    );
    await editRetailPrices(connection, retail_price);

    const stock: StockFromDBType[] = JSON.parse(data.get("stock"));
    await editStock({
      connection,
      stock,
      session,
      idProduct: params.params.id,
      updatedBy: user.id
    });

    const attributes = JSON.parse(data.get("attributes"));
    await editProductAttributes(connection, mainProductFields.id, attributes);

    const oldImages: ts_imageFromDB[] = JSON.parse(data.get("oldImages"));
    await editOldImages(
      connection,
      params.params.id,
      oldImages
    );

    const newImages = data.getAll("newImages");
    await createNewImages(connection, Number(params.params.id), newImages);
    await connection.commit();
    return NextResponse.json({ result: true })

  } catch (error) {
    console.error("fatal error #mfn5c", error);

    await connection.end()
    return NextResponse.json({ error: error });
  }
}
