import { useEffect, useState } from "react";
import CreateView4Class from "./components/createView4Class/createView4Class";

export default function DBViews(props: { idClass: number }) {
  const [viewsState, setViewsState] = useState();
  useEffect(() => {
    (async () => {
      const views = await getViews(props.idClass);
      console.log("views", views);
    })();
  }, []);
  return (
    <>
      <pre>{JSON.stringify(["viewsState", viewsState], null, 2)}</pre>
      <CreateView4Class idClass={props.idClass} />
    </>
  );
}

async function getViews(idClass: number) {
  const res = await fetch("/admin/api/dbViews/get-db-views-by-class", {
    method: "POST",
    body: JSON.stringify({ idClass }),
  });
  const body = await res.json();
  console.log("body", body);
  return body;
}
