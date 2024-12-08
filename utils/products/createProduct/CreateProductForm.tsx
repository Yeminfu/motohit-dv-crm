import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import tsAttributeWithValues from "@/types/attributes/ts_attributesWithValues";
import { ProductOnCreate } from "@/types/products/prodyctType";
import Color from "./components/color";
import CostPrice from "./components/costPrice/costPrice";
import RetailPrices from "./components/retailPrices/retailPrices";
import Stock from "./components/stock/stock";
import Attributes from "./components/attributes/attributes";

export default function CreateProductForm(props: {
  closeFn: any;
  idCategory: number;
  priceTypes: PriceTypesFromDBInterface[];
  shops: ShopFromDB[];
  attributesWithValues: tsAttributeWithValues[];
}) {
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   control,
  //   formState: { errors },
  // } = useForm<any>({
  //   defaultValues: {
  //     // "name": "Лодка 1" + Date.now(),
  //     // "color": "black",
  //     // "code": "№выаь",
  //     // "purchase_price": "123",
  //     // "cost_price": { "type": "3", "value": "123" },
  //     // "stock": { "khv": "123", "bir": "321" },
  //     // "note": "здравствуйте",
  //     idCategory: props.idCategory,
  //   },
  // });

  const methods = useForm<any>({
    defaultValues: {
      idCategory: props.idCategory,
    },
  });

  const { register, handleSubmit, reset, control } = methods;

  const { fields: retailPriceFields, append: appendRetailPrice }: any =
    useFieldArray<any>({
      control,
      name: "retail_price",
    });

  const { fields: stockFields, append: appendStock }: any = useFieldArray<any>({
    control,
    name: "stock",
  });
  // const { fields: stockFields, append: appendStock }: any = useFieldArray<any>({
  //   control,
  //   name: "stock",
  // });

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

  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = async (e: any) => {
    const files = e.target.files;

    const newImages: any = [];
    for (let i = 0; i < files.length; i++) {
      const imageBase64 = await new Promise((r) => {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          const previewImage = reader.result;
          r(previewImage);
        };
        reader.readAsDataURL(file);
      });
      newImages.push(imageBase64);
    }
    setPreviewImages(newImages);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(async (x) => {
            const { success, error } = await onSubmit(x);
            if (success) {
              toast.success("Товар создан");
              reset();
              setPreviewImages([]);
            } else {
              toast.error(error);
            }
          })}
        >
          {/* <pre>{JSON.stringify(props.attributesWithValues, null, 2)}</pre> */}
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

          <div>
            <h5>Атрибуты</h5>
          </div>
          <div>
            <Attributes
              // idProduct={props.product.id}
              idCategory={Number(props.idCategory)}
            />
            {/* <table className="table table-bordered">
              <tbody>
                {props.attributesWithValues.map((attribute, i) => (
                  <tr key={attribute.id}>
                    <td>{attribute.attribute_name}</td>
                    <td>
                      <select
                        {...register(`attributes.${i}.idAttributeValue`, {
                          required: true,
                        })}
                        className="form-select"
                        autoComplete="off"
                      >
                        <option value="">-</option>
                        {attribute.values.map((attributeValue) => (
                          <option value={attributeValue.id}>
                            {attributeValue.value_name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>

          <div>
            <div>
              <h5>Изображение</h5>
            </div>
            <div>
              <div className="mt-2">
                {previewImages.map((image, index) => (
                  <div className="" key={index}>
                    <Image
                      loader={() => image}
                      src={image}
                      alt=""
                      width={0}
                      height={0}
                      style={{
                        width: "auto",
                        height: "auto",
                        marginBottom: 5,
                        // cursor: "pointer",
                        maxWidth: 500,
                      }}
                    />
                  </div>
                ))}
              </div>
              <input
                type="file"
                {...register("images")}
                onChange={handleImageChange}
                multiple
              />
            </div>
            {/* {errors.images && (
              <span className="text-danger">Обязательное поле</span>
            )} */}
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

async function onSubmit(data: any) {
  const {
    name,
    code,
    color,
    cost_price,
    note,
    purchase_price,
    retail_price,
    stock,
    idCategory,
    images,
    attributes,
  } = data;

  const scalarData: ProductOnCreate = {
    name,
    code,
    color,
    cost_price,
    note,
    purchase_price,
    retail_price,
    stock,
    idCategory,
    attributes,
  };

  const jsonData = JSON.stringify(scalarData, null, "");

  const formData = new FormData();

  formData.append("jsonData", jsonData);

  if (images) {
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
  }
  const createRes = await fetch("/api/products/create", {
    method: "POST",
    body: formData,
  }).then((x) => x.json());

  return createRes;
}
