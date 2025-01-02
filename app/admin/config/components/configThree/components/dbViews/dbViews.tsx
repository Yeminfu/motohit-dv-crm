import { useEffect } from "react";

export default function DBViews(props: { idClass: number }) {
  useEffect(() => {
    (async () => {
      const views = await getViews(props.idClass);
      console.log("views", views);
    })();
  }, []);
  return <>idClass:number</>;
}

async function getViews(idClass: number) {
  const res = await fetch("/admin/api/dbViews/get-db-views-by-class", {
    method: "POST",
    body: JSON.stringify({ idClass }),
  });

  const body = await res.json();
  console.log("body", body);
}
