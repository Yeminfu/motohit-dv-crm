import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import { ProductsFull } from "@/types/products/prodyctType";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Attributes from "./fields/attributes/attributes";
import { CategoryFromDBInterface } from "@/types/categories/categories";
import Stock from "./fields/stock/stock";
import RetailPrices from "./fields/retailPrices/retailPrices";
import onSubmit from "./utils/onSubmit";
import Color from "./fields/color/color";
import ts_EDitProductFields from "./types/ts_EDitProductFields";
import CostPrice from "./fields/costPrice/costPrice";
import Categories from "./fields/categories/categories";
import Images from "./fields/Images/images";
import TextEditor from "#tools/text-editor/TextEditor.tsx";

export default function EditProductForm(props: {
  product: ProductsFull;
  priceTypes: PriceTypesFromDBInterface[];
  closeFn: any;
  shops: ShopFromDB[];
  categories: CategoryFromDBInterface[];
}) {
  const methods = useForm<ts_EDitProductFields>({
    defaultValues: {
      idProduct: props.product.id,
      name: props.product.name,
      color: props.product.color,
      code: props.product.code,
      description: props.product.description,
      purchase_price: String(props.product.purchase_price),
      cost_price: {
        type: String(props.product.idCostPriceType),
        value: String(props.product.costPriceValue),
      },
      note: String(props.product.note),
      idCategory: String(props.product.idCategory),
    },
  });

  const { register, handleSubmit, reset, watch, control, setValue, getValues } =
    methods;

  const { fields: retailPriceFields, append: appendRetailPrice }: any =
    useFieldArray<any>({
      control,
      name: "retail_price",
    });

  const { fields: stockFields, append: appendStock }: any = useFieldArray<any>({
    control,
    name: "stock",
  });

  useEffect(() => {
    props.shops.forEach((shop) => {
      const retailPriceObj = props.product.retailPrices.find(
        (retPriceCityItem) => retPriceCityItem.idShop === shop.id
      );
      appendRetailPrice({
        idRecord: retailPriceObj?.idRetailPrice,
        idShop: shop.id,
        idProduct: retailPriceObj?.idProduct,
        shopName: shop.shopName,
        idPriceType: retailPriceObj?.retailPriceType,
        priceValue: retailPriceObj?.retailPriceValue,
      });

      const stockObj = props.product.stock.find(
        (stockItem) => stockItem && stockItem.idShop === shop.id
      );

      appendStock({
        idShop: shop.id,
        shopName: shop.shopName,
        count: stockObj?.count,
        idRecord: stockObj?.id,
      });
    });
  }, []);

  const idCategory = watch("idCategory");

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(async (x) => {
            const { success, error } = await onSubmit(x);
            if (success) {
              toast.success("Товар создан");
              reset();
            } else {
              toast.error(error);
            }
          })}
        >
          <div className="row">
            <div className="col">
              <div className="mb-2">
                <div>
                  <b>Название товара</b>
                </div>
                <input
                  {...register("name", { required: true })}
                  placeholder=""
                  className="form-control"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-2">
                <div>
                  <b>Цвет</b>
                </div>
                <Color />
              </div>
            </div>
            <div className="col">
              <div className="mb-2">
                <div>
                  <b>Код товара</b>
                </div>
                <input
                  {...register("code", { required: true })}
                  className="form-control"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="mb-2">
            <b>Закупочная цена</b>
            <input
              {...register("purchase_price", {
                required: true,
                pattern: /^-?\d*(\.\d+)?$/i,
              })}
              className="form-control"
              autoComplete="off"
            />
          </div>

          <div className="mt-3">
            <h5>Себестоимость</h5>
            <CostPrice priceTypes={props.priceTypes} />
          </div>

          <div className="mt-3">
            <h5>Розн. цена</h5>
            <RetailPrices
              retailPriceFields={retailPriceFields}
              priceTypes={props.priceTypes}
            />
          </div>

          <div className="mt-3">
            <h5>Склад</h5>
            <Stock stockFields={stockFields} />
          </div>

          <div className="mt-3">
            <h5>Заметки</h5>
            <textarea
              {...register("note", { required: true })}
              className="form-control"
              autoComplete="off"
            />
          </div>

          <div className="mt-3">
            <h5>Категория</h5>
            <Categories categories={props.categories} />
          </div>

          <div className="mt-3">
            <h5>Атрибуты</h5>
            <Attributes
              idProduct={props.product.id}
              idCategory={Number(idCategory)}
            />
          </div>

          <div className="mt-3">
            <h5>Изображения</h5>
            <Images idProduct={props.product.id} />
          </div>

          <div className="mt-3">
            <h3>Описание</h3>

            <TextEditor
              description={getValues("description")}
              updateDescription={(html: string) => {
                setValue("description", html);
              }}
            />
          </div>

          <div className="mt-4">
            <div className="d-flex">
              <button className="btn btn-sm btn-primary">Сохранить</button>
              <div
                className="btn btn-sm btn-danger ms-2"
                onClick={() => {
                  reset();
                  props.closeFn(false);
                }}
              >
                отмена
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
