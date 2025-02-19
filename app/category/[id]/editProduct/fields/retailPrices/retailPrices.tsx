import { PriceTypesFromDBInterface } from "#types/products/priceTypesFromDBInterface.js";
import { useFormContext } from "react-hook-form";
import PriceTypeSelect from "./components/priceTypeSelect";

export default function RetailPrices(props: {
  retailPriceFields: any;
  priceTypes: PriceTypesFromDBInterface[];
}) {
  const { register } = useFormContext();
  return (
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
            {props.retailPriceFields.map((shop: any, index: number) => {
              //@ts-ignore
              return (
                <tr key={index}>
                  <td>{props.retailPriceFields[index].shopName}</td>
                  <td>
                    <PriceTypeSelect
                      fieldName={`retail_price[${index}].idPriceType`}
                      priceTypes={props.priceTypes}
                    />
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
  );
}
