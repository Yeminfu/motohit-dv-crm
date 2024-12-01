import { ProductsFull } from "@/types/products/prodyctType";
import { t_CreateSaleResponseData } from "@/types/sales/t_CreateSaleResponseData";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import Modal from "@/utils/modal/modal";
import createPriceWithMarkup from "@/utils/prices/createPriceWithMarkup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SaleForm(props: {
  productFull: ProductsFull;
  shops: ShopFromDB[];
  retailPrices: {
    idShop: number;
    sum: number;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      idProduct: props.productFull.id,
    },
  });

  if (!isOpen)
    return (
      <button
        className="btn btn-sm btn-primary me-2"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Продать
      </button>
    );

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeFn={() => setIsOpen(false)}
        title={`Продать ${props.productFull.name}`}
      >
        <form onSubmit={handleSubmit((values) => onSubmit(values, reset))}>
          <table className="table m-0">
            <tbody>
              <tr>
                <th>Магазин</th>
                <td>
                  <div className="form-group">
                    {/* {props.shops.map(shop => <option key={shop.id} value={shop.id}>{shop.shopName} { }</option>)} */}
                    {props.shops.map((shop, i) => (
                      <div key={shop.id} className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id={`option_${i}`}
                          value={shop.id}
                          {...register("idShop", {
                            onChange: (e) => {
                              const idShop = e.target.value;
                              (() => {
                                const count = getValues("count");
                                if (!count) return;
                                const priceObj = props.retailPrices.find(
                                  (priceObj) =>
                                    priceObj.idShop === Number(idShop)
                                );
                                const retailPriceSum = priceObj?.sum;
                                if (!retailPriceSum) return;
                                const totalSum = Number(count) * retailPriceSum;
                                setValue("sumTotal", String(totalSum));
                              })();
                            },
                          })}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`option_${i}`}
                        >
                          {shop.shopName}
                        </label>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Количество</th>
                <td>
                  <input
                    {...register("count", {
                      value: "1",
                      required: true,
                      onChange: (e) => {
                        const clearCount = Number(
                          e.target.value.replace(/[^0-9.]+/gim, "")
                        );
                        (() => {
                          const idShop = getValues("idShop");
                          if (!idShop) return;
                          const priceObj = props.retailPrices.find(
                            (priceObj) => priceObj.idShop === Number(idShop)
                          );
                          const retailPriceSum = priceObj?.sum;
                          if (!retailPriceSum) return;
                          const totalSum = Number(clearCount) * retailPriceSum;
                          setValue("sumTotal", String(totalSum));
                        })();
                      },
                    })}
                    placeholder="Введите к-во"
                    className="form-control"
                    autoComplete="off"
                  />
                </td>
              </tr>
              <tr>
                <th>Сумма</th>
                <td>
                  <input
                    {...register("sumTotal", {
                      onChange: (e) => {
                        setValue(
                          "sumTotal",
                          e.target.value.replace(/[^0-9.]+/gim, "")
                        );
                      },
                    })}
                    placeholder="введите сумму"
                    className="form-control"
                    autoComplete="off"
                  />
                </td>
              </tr>
              <tr>
                <th></th>
                <td>
                  <div className="d-flex mt-2">
                    <button className="btn btn-primary">
                      Провести продажу
                    </button>
                    <div
                      className="btn btn-outline-danger ms-2"
                      onClick={() => {
                        setIsOpen(false);
                        reset();
                      }}
                    >
                      Отмена
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  );
}

async function onSubmit(values: t_CreateSaleResponseData, reset: () => void) {
  if (!values.idProduct) {
    toast.error("Не указан товар");
    return;
  }
  if (!values.idShop) {
    toast.error("Не указан магазин");
    return;
  }
  if (!values.count) {
    toast.error("Не указано количество товара");
    return;
  }
  if (!values.sumTotal) {
    toast.error("Не указана сумма");
    return;
  }

  await fetch("/api/sales/create", {
    method: "POST",
    body: JSON.stringify({
      idProduct: values.idProduct,
      idShop: values.idShop,
      count: values.count,
      sumTotal: values.sumTotal,
    }),
  })
    .then((x) => x.json())
    .then((x) => {
      if (x.success) {
        toast.success("Продажа проведена");
        reset();
      } else {
        toast.error("Ошибка #fsd8: " + x.error);
      }
    })
    .catch((error) => {
      console.error("error #fds4n", error);
      toast.error("Ошибка #d9jn");
    });
}
