export default async function getViewsByIdClass(idClass: number) {
  const res = await fetch("/admin/api/dbViews/get-db-views-by-class", {
    method: "POST",
    body: JSON.stringify({ idClass }),
  });
  const body = await res.json();
  console.log("body", body);
}
