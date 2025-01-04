export default function ViewSQLResult(props: { SQLResult: any }) {
  if (props.SQLResult.find((el: any) => Array.isArray(el))) {
    return <pre>{JSON.stringify(props, null, 2)}</pre>;
  }

  return (
    <>
      err #kdf94k
      <ViewTable SQLResult={props.SQLResult} />;
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
}

interface UnknownFields {
  [key: string]: any; // Здесь 'any' можно заменить на более конкретный тип, если это необходимо
}

type ArrayOfUnknownObjects = UnknownFields[];

function ViewTable(props: { SQLResult: ArrayOfUnknownObjects }) {
  const [firstObject] = props.SQLResult;
  const keys = Object.keys(firstObject);

  try {
    return (
      <>
        <table className="table table-striped table-bordered">
          <thead
            style={{
              background: "#eee",
              position: "sticky" /* Делаем заголовки липкими */,
              top: 0 /* Устанавливаем верхнюю границу */,
              backgroundColor: "white" /* Фон заголовка */,
              zIndex: 1 /* Убедитесь, что заголовок выше других элементов */,
            }}
          >
            <tr>
              {keys.map((keyName, i) => (
                <th style={{ background: "rgb(183, 171, 171)" }} key={i}>
                  {keyName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.SQLResult.map((row, i) => {
              const values = Object.values(row);

              return (
                <tr key={i}>
                  {values.map((value) => (
                    <td key={value}>
                      <div style={{ maxHeight: "100px", overflowY: "scroll" }}>
                        {value}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {String(keys)}
        <pre>{JSON.stringify({ props }, null, 2)}</pre>
      </>
    );
  } catch (error) {
    console.log("error", error);
  }
  return <pre>{JSON.stringify({ props }, null, 2)}</pre>;
}
