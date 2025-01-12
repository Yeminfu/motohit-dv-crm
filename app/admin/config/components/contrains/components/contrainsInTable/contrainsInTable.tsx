import { Fragment } from "react";
import getContrains from "../../utils/getContrains";
import Columns from "./components/columns/columns";

export default async function ContrainsInTable(props: { tableName: string }) {
  const contrains = await getContrains(props.tableName);
  if (!contrains) return <>err #kfds93</>;
  if (!contrains.result) return <>err #kfds93</>;

  return (
    <>
      {contrains.result.map((contrain, i: number) => (
        <Fragment key={i}>
          <div className="mt-3">
            <div className="card shadow">
              <div className="card-header">
                CONSTRAINT_NAME: {contrain.CONSTRAINT_NAME}
              </div>
              <div className="card-body">
                <pre>{JSON.stringify({ contrain }, null, 2)}</pre>
                <Columns
                  tableName={contrain.TABLE_NAME}
                  contrainName={contrain.CONSTRAINT_NAME}
                />
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
}
