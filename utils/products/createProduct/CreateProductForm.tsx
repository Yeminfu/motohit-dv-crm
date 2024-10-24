import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import tsAttributeWithValues from "@/types/attributes/ts_attributesWithValues";
import { ProductOnCreate } from "@/types/products/prodyctType";

export default function CreateProductForm(props: {
  closeFn: any,
  idCategory: number,
  priceTypes: PriceTypesFromDBInterface[],
  shops: ShopFromDB[]
  attributesWithValues: tsAttributeWithValues[]
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<any>({

    defaultValues: {
      // "name": "Лодка 1" + Date.now(),
      // "color": "black",
      // "code": "№выаь",
      // "purchase_price": "123",
      // "cost_price": { "type": "3", "value": "123" },
      // "stock": { "khv": "123", "bir": "321" },
      // "note": "здравствуйте",
      "idCategory": props.idCategory,
    }
  });

  const { fields: retailPriceFields, append: appendRetailPrice }: any = useFieldArray<any>({
    control,
    name: "retail_price",
  });

  const { fields: stockFields, append: appendStock }: any = useFieldArray<any>({
    control,
    name: "stock",
  });

  useEffect(
    () => {
      props.shops.forEach(shop => {
        appendRetailPrice({
          idShop: shop.id,
          shopName: shop.shopName,
          idPriceType: "",
          priceValue: ""
        });
        appendStock({
          idShop: shop.id,
          shopName: shop.shopName,
          count: ""
        });
      });
    },
    []
  );

  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = async (e: any) => {
    const files = e.target.files;

    const newImages: any = [];
    for (let i = 0; i < files.length; i++) {
      const imageBase64 = await new Promise(r => {
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

  return <>
    <form onSubmit={handleSubmit(async x => {
      const { success, error } = await onSubmit(x);
      if (success) {
        toast.success('Товар создан');
        reset();
        setPreviewImages([]);
      } else {
        toast.error(error)
      }
    })}>

      {/* <pre>{JSON.stringify(props.attributesWithValues, null, 2)}</pre> */}
      <div className="row">
        <div className="col">
          <div className="mb-2">
            <div><b>Название товара</b></div>
            <input {...register("name", { required: true })} placeholder="" className="form-control" autoComplete="off" />
          </div>
        </div>
        <div className="col">
          <div className="mb-2">
            <div><b>Цвет</b></div>
            <select {...register("color", { required: true })} className="form-select" autoComplete="off" >
              <option value="">Цвет</option>
              <option value="black" style={{ color: "black" }}>Черный</option>
              <option value="green" style={{ color: "green" }}>Зеленый</option>
              <option value="red" style={{ color: "red" }}>Красный</option>
              <option value="blue" style={{ color: "blue" }}>Синий</option>
              <option value="brown" style={{ color: "brown" }}>Коричневый</option>
              <option value="orange" style={{ color: "orange" }}>Рыжий</option>
            </select>
          </div>
        </div>
        <div className="col">
          <div className="mb-2">
            <div><b>Код товара</b></div>
            <input {...register("code", { required: true })} className="form-control" autoComplete="off" />
          </div>
        </div>
      </div>

      {/*Закупочная цена*/}
      <div className="mb-2">
        <div><b>Закупочная цена</b></div>
        <input {...register("purchase_price", { required: true, pattern: /^-?\d*(\.\d+)?$/i })} className="form-control" autoComplete="off" />
      </div>

      <div className="mt-3">
        <h5>Себестоимость</h5>
        <div className="row">
          <div className="col-6">
            <div><b>Тип</b></div>
            <select {...register("cost_price.type", { required: true })} className="form-select" autoComplete="off" >
              <option value="">-</option>
              {props.priceTypes.map(priceType => <option value={priceType.id} key={priceType.id}>{priceType.priceType}</option>)}
            </select>
          </div>
          <div className="col-6">
            <div><b>Значение</b></div>
            <input {...register("cost_price.value", { required: true, pattern: /^-?\d*(\.\d+)?$/i })} className="form-control" autoComplete="off" />
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
                {retailPriceFields.map((shop: any, index: any) => {
                  return <tr key={index}>
                    <td>
                      {retailPriceFields[index].shopName}
                    </td>
                    <td>
                      <select {...register(`retail_price[${index}].idPriceType`, { required: true })} className="form-select" autoComplete="off" >
                        <option value="">-</option>
                        {props.priceTypes.map(priceType => <option value={priceType.id} key={priceType.id}>{priceType.priceType}</option>)}
                      </select>
                    </td>
                    <td>
                      <input {...register(`retail_price[${index}].priceValue`, { required: true, pattern: /^-?\d*(\.\d+)?$/i })} className="form-control" autoComplete="off" />
                    </td>
                  </tr>
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
                  return <tr key={stockFields[index].id}>
                    <td>
                      {stockFields[index].shopName}
                    </td>
                    <td>
                      <input {...register(`stock[${index}].count`, { required: true })} className="form-control" autoComplete="off" />
                    </td>
                  </tr>
                })}
              </>
            </tbody>
          </table>
        </>
      </div>

      <div><h5>Заметки</h5></div>
      <div>
        <textarea {...register("note", { required: true })} className="form-control" autoComplete="off" />
      </div>

      <div><h5>Атрибуты</h5></div>
      <div>
        <table className="table table-bordered">
          <tbody>
            {props.attributesWithValues.map((attribute, i) => <tr key={attribute.id}>
              <td>
                {attribute.attribute_name}
              </td>
              <td>
                <select {...register(`attributes.${i}.idAttributeValue`, { required: true })} className="form-select" autoComplete="off" >
                  <option value="">-</option>
                  {attribute.values.map(attributeValue =>
                    <option value={attributeValue.id}>{attributeValue.value_name}</option>
                  )}
                </select>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>

      <div>
        <div><h5>Изображение</h5></div>
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
                    maxWidth: 500
                  }}
                />
              </div>
            ))}
          </div>
          <input type="file" {...register("images")} onChange={handleImageChange} multiple />
        </div>
        {errors.images && <span className="text-danger">Обязательное поле</span>}
      </div>

      <div className="mt-4">
        <div className="d-flex">
          <button className="btn btn-sm btn-primary">Сохранить</button>
          <div className="btn btn-sm btn-danger ms-2" onClick={() => {
            reset();
            props.closeFn(false);
          }}>отмена</div>
        </div>
      </div>
    </form>
  </>
}

async function onSubmit(data: any) {
  // console.log(data);

  const {
    name, code, color, cost_price, note, purchase_price, retail_price, stock, idCategory,
    images, attributes
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
    attributes
  }

  const jsonData = JSON.stringify(scalarData, null, "");

  const formData = new FormData();

  formData.append('jsonData', jsonData);

  if (images) {
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
  }
  const createRes = await fetch("/api/products/create", {
    method: "POST",
    body: formData
  })
    .then(x => x.json())

  return createRes;
}