import { PriceTypesFromDBInterface } from "#types/products/priceTypesFromDBInterface.js";
import { useFormContext } from "react-hook-form";

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
  );
}
