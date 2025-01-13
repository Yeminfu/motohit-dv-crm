import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import tsAttributeWithValues from "@/types/attributes/ts_attributesWithValues";
import Color from "./fields/color";
import CostPrice from "./fields/costPrice/costPrice";
import RetailPrices from "./fields/retailPrices/retailPrices";
import Stock from "./fields/stock/stock";
import Attributes from "./fields/attributes/attributes";
import Images from "./fields/images/images";
import onSubmit from "./utils/onSubmit";
import TextEditor from "#tools/text-editor/TextEditor.tsx";

export default function CreateProductForm(props: {
  closeFn: any;
  idCategory: number;
  priceTypes: PriceTypesFromDBInterface[];
  shops: ShopFromDB[];
  attributesWithValues: tsAttributeWithValues[];
}) {
  const methods = useForm<any>({
    defaultValues: {
      idCategory: props.idCategory,
    },
  });

  const { register, handleSubmit, reset, control, setValue } = methods;

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
      appendRetailPrice({
        idShop: shop.id,
        shopName: shop.shopName,
        idPriceType: "",
        priceValue: "",
      });
      appendStock({
        idShop: shop.id,
        shopName: shop.shopName,
        count: "",
      });
    });
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(async (x) => {
            await onSubmit(x);
            // reset();
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

          {/*Закупочная цена*/}
          <div className="mb-2">
            <div>
              <b>Закупочная цена</b>
            </div>
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

          <div className="mb-2">
            <div>
              <b>Интернет цена</b>
            </div>
            <input
              {...register("internetPrice", {
                required: true,
                pattern: /^-?\d*(\.\d+)?$/i,
              })}
              className="form-control"
              autoComplete="off"
            />
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
            <h5>Атрибуты</h5>
            <Attributes idCategory={Number(props.idCategory)} />
          </div>

          <div className="mt-3">
            <h5>Изображения</h5>
            <Images />
          </div>

          <div className="mt-3">
            <h5>Описание товара</h5>
            <div>
              <TextEditor
                description={""}
                updateDescription={(html: string) => {
                  setValue("description", html);
                }}
              />
            </div>
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
