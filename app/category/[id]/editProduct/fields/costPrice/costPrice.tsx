import { PriceTypesFromDBInterface } from "#types/products/priceTypesFromDBInterface.ts";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function CostPrice(props: {
  priceTypes: PriceTypesFromDBInterface[];
  defaultType: number | undefined;
}) {
  const { register, reset } = useFormContext();

  useEffect(() => {
    if (!props.defaultType)
      reset({
        cost_price: {
          type: "3",
        },
      });
  }, []);

  return (
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
  );
}
