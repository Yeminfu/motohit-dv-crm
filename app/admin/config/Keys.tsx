import getDBKeys from "./getDBKeys";

export default async function Keys() {
  const dbKeys = await getDBKeys();

  return (
    <table className="table table-bordered w-auto">
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
                <td>{value}</td>
              ))}
              <td>
                <div className="btn" title={JSON.stringify(keyObject, null, 2)}>
                  ...
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
