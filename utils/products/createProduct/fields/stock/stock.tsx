import { useFormContext } from "react-hook-form";

export default function Stock(props: { stockFields: any }) {
  const { register } = useFormContext();

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th></th>
          <th>К-во на складе</th>
        </tr>
      </thead>
      <tbody>
        <>
          {props.stockFields.map((shop: any, index: any) => {
            return (
              <tr key={props.stockFields[index].id}>
                <td>{props.stockFields[index].shopName}</td>
                <td>
                  <input
                    {...(() => {
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
  );
}
