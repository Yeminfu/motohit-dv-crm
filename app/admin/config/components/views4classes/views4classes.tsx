import Link from "next/link";
import ts_viewFromDB from "../../types/ts_viewFromDB";
import Create from "./components/create";
import getViews from "./utils/getViews";

export default async function Views4classes() {
  const viewsRes = await getViews();
  return (
    <>
      <Create />
      {(() => {
        if (viewsRes.error) {
          return <>err #ks93lsk</>;
        }
        if (!viewsRes.result) {
          return <>err #jdsa93</>;
        }
        const views: ts_viewFromDB[] = viewsRes.result;

        if (views)
          return (
            <table className="table table-bordered table-striped w-auto">
              <tbody>
                {views.map((view) => (
                  <tr key={view.name} title={JSON.stringify(view, null, 2)}>
                    <td>
                      <Link href={`/admin/scalarFunctions/${view.name}`}>
                        {view.name}
                      </Link>
                    </td>
                    <td>{view.title}</td>
                    <td>{view.description}</td>
                    <td>{view.idClass}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
      })()}
    </>
  );
}
