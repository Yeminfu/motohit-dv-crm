import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import { ProductFromDB, ProductsFull } from "@/types/products/prodyctType";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import { useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import Attributes from "./fields/attributes/attributes";
import { CategoryFromDBInterface } from "@/types/categories/categories";

interface ts_EDitProductFields {
  idProduct: number;
  name: string;
  color: string;
  code: string;
  purchase_price: string;
  cost_price: {
    value: string;
    type: string;
  };
  retail_price: any;
  stock: any;
  note: string;
  idCategory: string;
  attributes: {
    idAttribute: string;
    idAttributeValue: string;
  }[]; //string[];
}

export default function EditProductForm(props: {
  product: ProductsFull;
  priceTypes: PriceTypesFromDBInterface[];
  closeFn: any;
  shops: ShopFromDB[];
  categories: CategoryFromDBInterface[];
}) {
  // console.log('props EditProductForm', props);

  const methods = useForm<ts_EDitProductFields>({
    defaultValues: {
      idProduct: props.product.id,
      name: props.product.name,
      color: props.product.color,
      code: props.product.code,
      purchase_price: String(props.product.purchase_price),
      cost_price: {
        type: String(props.product.idCostPriceType),
        value: String(props.product.costPriceValue),
      },
      // "stock": { "khv": "123", "bir": "321" },
      attributes: [
        // ,
      ],
      // items: [
      //   {
      //     data: "item1",
      //   },
      //   // "item2",
      // ], // Дефолтное значение - массив
      note: String(props.product.note),
      idCategory: String(props.product.idCategory),
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    getValues,
    formState: { errors },
  } = methods;

  const { fields: retailPriceFields, append: appendRetailPrice }: any =
    useFieldArray<any>({
      control,
      name: "retail_price",
    });

  const { fields: stockFields, append: appendStock }: any = useFieldArray<any>({
    control,
    name: "stock",
  });

  // const { fields: attributesFields, append: appendAttribute, remove } = useFieldArray({ control, name: "attributes" });

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

  const [previewImages, setPreviewImages] = useState([]);

  // const handleImageChange = async (e: any) => {
  //   const files = e.target.files;

  //   const newImages: any = [];
  //   for (let i = 0; i < files.length; i++) {
  //     const imageBase64 = await new Promise((r) => {
  //       const file = files[i];
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const previewImage = reader.result;
  //         r(previewImage);
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //     newImages.push(imageBase64);
  //   }
  //   setPreviewImages(newImages);
  // };

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
          {/* <div
            className="btn btn-dark"
            onClick={() => {
              console.log(getValues("items"));
            }}
          >
            btn
          </div> */}

          {[{ attributeId: 1, attributeValueId: 2 }].map((attribute) => {
            return <></>;
          })}

          {/* <Controller
            name="attributes"
            control={control}
            render={({ field }) => (
              <div>
                {field.value
                  //@ts-ignore
                  .map((item, index) => (
                    <div key={index}>
                      <input
                        {...field}
                        value={item}
                        onChange={(e) => {
                          const newItems = [...field.value];
                          newItems[index] = e.target.value;
                          field.onChange(newItems);
                        }}
                      />
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() => field.onChange([...field.value, ""])}
                >
                  Добавить элемент
                </button>
              </div>
            )}
          /> */}
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
                <select
                  {...register("color", { required: true })}
                  className="form-select"
                  autoComplete="off"
                >
                  <option value="">Цвет</option>
                  <option value="black" style={{ color: "black" }}>
                    Черный
                  </option>
                  <option value="green" style={{ color: "green" }}>
                    Зеленый
                  </option>
                  <option value="red" style={{ color: "red" }}>
                    Красный
                  </option>
                  <option value="blue" style={{ color: "blue" }}>
                    Синий
                  </option>
                  <option value="brown" style={{ color: "brown" }}>
                    Коричневый
                  </option>
                  <option value="orange" style={{ color: "orange" }}>
                    Рыжий
                  </option>
                </select>
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
            <div className="row">
              <div className="col-6">
                <div>
                  <b>Тип</b>
                </div>
                <select
                  {...register("cost_price.type", { required: true })}
                  className="form-select"
                  autoComplete="off"
                >
                  <option value="">-</option>
                  {props.priceTypes.map((priceType) => (
                    <option value={priceType.id} key={priceType.id}>
                      {priceType.priceType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <div>
                  <b>Значение</b>
                </div>
                <input
                  {...register("cost_price.value", {
                    required: true,
                    pattern: /^-?\d*(\.\d+)?$/i,
                  })}
                  className="form-control"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h5>Розн. цена</h5>
            <>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>Тип р.ц.</th>
                    <th>Значение р.ц.</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {retailPriceFields.map((shop: any, index: number) => {
                      //@ts-ignore
                      return (
                        <tr key={index}>
                          <td>{retailPriceFields[index].shopName}</td>
                          <td>
                            <select
                              {...(() => {
                                return register(
                                  //@ts-ignore
                                  `retail_price[${index}].idPriceType`,
                                  {
                                    required: true,
                                  }
                                );
                              })()}
                              className="form-select"
                              autoComplete="off"
                            >
                              <option value="">-</option>
                              {props.priceTypes.map((priceType) => (
                                <option value={priceType.id} key={priceType.id}>
                                  {priceType.priceType}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input
                              {...(() => {
                                return register(
                                  //@ts-ignore
                                  `retail_price[${index}].priceValue`,
                                  {
                                    required: true,
                                    pattern: /^-?\d*(\.\d+)?$/i,
                                  }
                                );
                              })()}
                              className="form-control"
                              autoComplete="off"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </>
                </tbody>
              </table>
            </>
          </div>
          <div className="mt-3">
            <h5>Склад</h5>
            <>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>К-во на складе</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {stockFields.map((shop: any, index: any) => {
                      return (
                        <tr key={stockFields[index].id}>
                          <td>{stockFields[index].shopName}</td>
                          <td>
                            <input
                              {...(() => {
                                //@ts-ignore
                                return register(`stock[${index}].count`, {
                                  required: true,
                                });
                              })()}
                              className="form-control"
                              autoComplete="off"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </>
                </tbody>
              </table>
            </>
          </div>

          <div>
            <h5>Заметки</h5>
          </div>
          <div>
            <textarea
              {...register("note", { required: true })}
              className="form-control"
              autoComplete="off"
            />
          </div>

          <div>
            <h5>Категория</h5>
          </div>
          <div>
            <select
              {...register("idCategory", { required: true })}
              className="form-select"
              autoComplete="off"
            >
              <option value="">-</option>
              {props.categories.map((category) => (
                <option value={String(category.id)} key={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h5>Атрибуты</h5>
          </div>
          <div>
            <Attributes
              idProduct={props.product.id}
              idCategory={Number(idCategory)}
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

async function onSubmit(data: any): Promise<any> {
  const formData = new FormData();

  const mainProductFields: ProductFromDB = {
    id: data.idProduct,
    name: data.name,
    note: data.note,
    idCategory: data.idCategory,
    purchase_price: data.purchase_price,
    idCostPriceType: data.cost_price.type,
    costPriceValue: data.cost_price.value,
    color: data.color,
    code: data.code,
    isArchived: true,
  };
  formData.append("mainProductFields", JSON.stringify(mainProductFields));

  const retail_price = data.retail_price.map((priceObj: any) => ({
    ...priceObj,
    id: priceObj.idInDB,
  }));
  formData.append("retail_price", JSON.stringify(retail_price));

  const stock = data.stock.map((stockObj: any) => ({
    ...stockObj,
    id: stockObj.idInDB,
  }));
  formData.append("stock", JSON.stringify(stock));

  const createRes = await fetch("/api/products/edit/" + data.idProduct, {
    method: "POST",
    body: formData,
  }).then((x) => x.json());

  if (createRes.success) {
    toast.success("Данные товара изменены");
  } else {
    toast.error("Ошибка #94j \n" + JSON.stringify(createRes.errors, null, 2));
  }
}
