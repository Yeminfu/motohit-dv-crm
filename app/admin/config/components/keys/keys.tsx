import getDBKeys from "../../utils/getDBKeys";
import Create from "./components/create/create";
import DeleteKeyBtn from "./components/deleteKeyBtn/deleteKeyBtn";

export default async function Keys() {
  const dbKeys = await getDBKeys();
  // if (1) return <pre>{JSON.stringify(dbKeys, null, 2)}</pre>;
  return (
    <>
      <Create />
      {/* <table className="table table-bordered w-auto">
        <thead>
          <tr>
            {(() => {
              const dbKey = dbKeys[0];
              const keysFromObject = Object.keys(dbKey);
              return keysFromObject.map((key) => <th key={key}>{key}</th>);
            })()}
          </tr>
        </thead>
        <tbody>
          {dbKeys.map((keyObject) => {
            return (
              <tr key={keyObject.COLUMN_NAME}>
                {Object.values(keyObject).map((value) => (
                  <td key={value}>{value}</td>
                ))}
                <td>
                  <div
                    className="btn"
                    title={JSON.stringify(keyObject, null, 2)}
                  >
                    ...
                  </div>
                  <DeleteKeyBtn keyObject={keyObject} />
                  <div
                    className="btn tn-sm"
                    title={JSON.stringify(keyObject, null, 2)}
                  >
                    удалить ключ
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </>
  );
}
