import { NextRequest, NextResponse } from "next/server";
import searchProducts from "./utils/searchProducts";
import { ts_searchParamsProducts } from "./types/ts_searchParamsProducts";

export async function POST(request: NextRequest) {
  const searchParams: ts_searchParamsProducts = await request.json();

  const valuesStrings = [`1 = 1`];
  const valuesParametersArr = [];

  if (searchParams.idCategory) {
    valuesStrings.push(`P.idCategory = ?`);
    valuesParametersArr.push(searchParams.idCategory);
  }

  if (searchParams.isArchived) {
    valuesStrings.push(`P.isArchived = ?`);
    valuesParametersArr.push(Number(searchParams.isArchived));
  }

  if (searchParams.name) {
    valuesStrings.push(`(P.name like ?) or (P.code = ?)`);
    valuesParametersArr.push(`%${searchParams.name}%`);
    valuesParametersArr.push(searchParams.name);
  }

  const products = await searchProducts({
    table: `${process.env.TABLE_PREFIX}_products as P`,
    columns: ['P.id', 'P.name', 'P.slug',],
    where: valuesStrings.join('\n and '),
    params: valuesParametersArr,
  });

  return NextResponse.json(products);
} 