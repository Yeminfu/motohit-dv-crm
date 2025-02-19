import { PriceTypesFromDBInterface } from "#types/products/priceTypesFromDBInterface.ts";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function PriceTypeSelect(props: {
  fieldName: string;
  priceTypes: PriceTypesFromDBInterface[];
}) {
  const { register, setValue, getValues } = useFormContext();
  useEffect(() => {
    const value = getValues(props.fieldName);
    if (!value) setValue(props.fieldName, "3");
  }, []);
  return (
    <>
      <select
        {...(() => {
          return register(
            //@ts-ignore
            props.fieldName,
            {
              required: true,
            }
          );
        })()}
        className="form-select"
        autoComplete="off"
      >
        {props.priceTypes.map((priceType) => (
          <option value={priceType.id} key={priceType.id}>
            {priceType.priceType}
          </option>
        ))}
      </select>
    </>
  );
}
