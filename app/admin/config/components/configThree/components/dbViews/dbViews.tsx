import { useEffect } from "react";
import CreateView4Class from "./components/createView4Class/createView4Class";

export default function DBViews(props: { idClass: number }) {
  useEffect(() => {
    (async () => {
      const views = await getViews(props.idClass);
      console.log("views", views);
    })();
  }, []);
  return (
    <>
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
}
