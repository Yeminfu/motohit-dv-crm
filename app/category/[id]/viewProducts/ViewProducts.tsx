"use client";
import { ProductsFull } from "@/types/products/prodyctType";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import Price from "@/ui/price";
// import Image from "next/image";
import { useState } from "react";
import getCostPriceNumFromObj from "./getCostPriceNumFromObj";
// import getRetailPriceNumFromObj from "./getRetailPriceNumFromObj";
import EditProduct from "../editProduct/EditProduct";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import SaleForm from "./SaleForm";
// import generatePriceByTypes from "@/utils/prices/createPriceWithMarkup";
import createPriceWithMarkup from "@/utils/prices/createPriceWithMarkup";
import Filter from "../filter";
import ts_categoryFilter from "@/types/ts_categoryFilter";
// import Modal from "@/utils/modal/modal";
import SendProductToArchive from "./SendProductToArchive";
import Link from "next/link";
import { CategoryFromDBInterface } from "@/types/categories/categories";
import Image from "next/image";
import UpdateIndexNumber from "./components/updateIndexNumber/updateIndexNumber";
// import tsAttributeWithValues from "@/types/attributes/ts_attributesWithValues";

export default function ViewProducts(props: {
  productsFull: ProductsFull[];
  shops: ShopFromDB[];
  priceTypes: PriceTypesFromDBInterface[];
  searchParams: ts_categoryFilter;
  categories: CategoryFromDBInterface[];
  canEditStock: boolean
}) {
  const [viewAll, setViewAll] = useState(false);
  return (
    <>
      <div className="my-2">
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => setViewAll(!viewAll)}
        >
          {viewAll ? "Скрыть" : "Показать"} дополнительные поля
        </button>
      </div>

      <Filter searchParams={props.searchParams} />
      <table className="table table-bordered table-striped">
        <thead
          style={{
            background: "#eee",
            position: "sticky" /* Делаем заголовки липкими */,
            top: 0 /* Устанавливаем верхнюю границу */,
            backgroundColor: "white" /* Фон заголовка */,
            zIndex: 1 /* Убедитесь, что заголовок выше других элементов */,
          }}
        >
          <tr>
            <th>ID</th>
            <th>Фото</th>
            <th>Наименование</th>
            <th>Заметки</th>
            <th>Код</th>
            <th>Интернет цена</th>
            {props.shops.map((shop) => (
              <th key={shop.id + "a"} className="text-nowrap">
                Р.Ц. {shop.shopName}
              </th>
            ))}
            {props.shops.map((shop) => (
              <th key={shop.id + "b"} className="text-nowrap">
                {" "}
                К - во {shop.shopName}
              </th>
            ))}
            {viewAll && (
              <>
                <th className="text-nowrap">Закуп. цена</th>
                <th className="text-nowrap">Себестоимость</th>
              </>
            )}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.productsFull.map((product, indexFromProductsList) => (
            <tr key={product.id}>
              <td>
                <Link href={`/products/view/${product.id}`}>{product.id}</Link>{" "}
              </td>
              <td>
                {(() => {
                  // https://мотохит-дв.рф/images/20230901_170628-rotated.jpg
                  const name = (() => {
                    if (!product.images.length) return null;
                    const mainImage = product.images.find((img) => img.isMain);
                    if (!mainImage) return product.images[0].name;
                    return mainImage.name;
                  })();

                  if (!name) return null;

                  const url = "https://мотохит-дв.рф/images/" + name;

                  return (
                    <>
                      <div
                        style={{
                          width: "100px",
                          // height: "100px",
                        }}
                      >
                        <Image
                          loader={() => url}
                          src={url}
                          alt=""
                          width={0}
                          height={0}
                          style={{
                            width: "auto",
                            height: "auto",
                            marginBottom: 5,
                          }}
                        />
                      </div>
                    </>
                  );
                })()}
              </td>
              <td>
                <span style={{ color: product.color }}>{product.name}</span>
              </td>
              <td>{product.note}</td>
              <td>{product.code}</td>
              <td>{product.internetPrice}</td>
              <>
                {product.retailPrices.map((retailPriceObj, i) => {
                  const costPrice = createPriceWithMarkup(
                    product.purchase_price,
                    retailPriceObj.idCostPriceType,
                    retailPriceObj.costPriceValue
                  );
                  const retailPrice = createPriceWithMarkup(
                    costPrice,
                    retailPriceObj.retailPriceType,
                    retailPriceObj.retailPriceValue
                  );
                  return (
                    <td key={i}>
                      <Price value={retailPrice} />
                    </td>
                  );
                })}
              </>
              <>
                {product.stock.map((stockObj, i) => {
                  return <td key={i}>{stockObj ? stockObj.count : 0}</td>;
                })}
              </>
              {viewAll && (
                <>
                  <td>
                    <Price value={product.purchase_price} />
                  </td>
                  <td>
                    {(() => {
                      const value = getCostPriceNumFromObj(
                        product.purchase_price,
                        {
                          type: product.idCostPriceType,
                          value: product.costPriceValue,
                        }
                      );
                      return <Price value={value} />;
                    })()}
                  </td>
                </>
              )}
              <td style={{ whiteSpace: "nowrap" }}>
                <div className="d-flex">
                  {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
                  <SaleForm
                    productFull={product}
                    shops={props.shops}
                    retailPrices={product.retailPrices.map((retailPriceObj) => {
                      const costPrice = createPriceWithMarkup(
                        product.purchase_price,
                        retailPriceObj.idCostPriceType,
                        retailPriceObj.costPriceValue
                      );
                      const retailPrice = createPriceWithMarkup(
                        costPrice,
                        retailPriceObj.retailPriceType,
                        retailPriceObj.retailPriceValue
                      );
                      // const retailPriceValue = getRetailPriceNumFromObj(
                      //     product.purchase_price,
                      //     retailPriceObj, {
                      //     type: product.idCostPriceType,
                      //     value: product.costPriceValue
                      // });

                      return {
                        idShop: retailPriceObj.idShop,
                        sum: retailPrice,
                      };

                      // return <td key={retailPriceObj.id}>
                      //     <Price value={retailPriceValue} />
                      // </td>
                    })}
                  />
                  <EditProduct
                    product={product}
                    priceTypes={props.priceTypes}
                    shops={props.shops}
                    categories={props.categories}
                    canEditStock={props.canEditStock}
                  />
                  <SendProductToArchive
                    idProduct={product.id}
                    productName={product.name}
                  />
                </div>
              </td>
              <td>
                <UpdateIndexNumber
                  idProduct={product.id}
                  indexNumber={product.indexNumber}
                  prevProduct={props.productsFull[indexFromProductsList - 1]}
                  nextProduct={props.productsFull[indexFromProductsList + 1]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
