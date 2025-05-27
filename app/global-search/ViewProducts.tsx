"use client";
import { ProductsFull } from "@/types/products/prodyctType";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import Price from "@/ui/price";
import { useState } from "react";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import createPriceWithMarkup from "@/utils/prices/createPriceWithMarkup";
import ts_categoryFilter from "@/types/ts_categoryFilter";
import Link from "next/link";
import { CategoryFromDBInterface } from "@/types/categories/categories";
import Image from "next/image";
import getCostPriceNumFromObj from "@/app/category/[id]/viewProducts/getCostPriceNumFromObj";
import EditProduct from "@/app/category/[id]/editProduct/EditProduct";
import SaleForm from "@/app/category/[id]/viewProducts/SaleForm";
import SendProductToArchive from "@/app/category/[id]/viewProducts/SendProductToArchive";
import Filter from "./filter";

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
      <Filter searchParams={props.searchParams} />
      {(() => {
        if (!props.productsFull.length) return null;
        return (
          <div className={`my-2 ${props.productsFull.length}`}>
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? "Скрыть" : "Показать"} дополнительные поля
            </button>
          </div>
        );
      })()}

      {(() => {
        if (!props.productsFull.length) return null;
        // return <div className="mt-2">Воспользуйтесь поиском</div>;
        return (
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
              </tr>
            </thead>
            <tbody>
              {props.productsFull.map((product) => (
                <tr key={product.id}>
                  <td>
                    <Link href={`/products/view/${product.id}`}>
                      {product.id}
                    </Link>
                  </td>
                  <td>
                    {(() => {
                      const name = (() => {
                        if (!product.images.length) return null;
                        const mainImage = product.images.find(
                          (img) => img.isMain
                        );
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
                      <SaleForm
                        productFull={product}
                        shops={props.shops}
                        retailPrices={product.retailPrices.map(
                          (retailPriceObj) => {
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

                            return {
                              idShop: retailPriceObj.idShop,
                              sum: retailPrice,
                            };
                          }
                        )}
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
                </tr>
              ))}
            </tbody>
          </table>
        );
      })()}
    </>
  );
}
