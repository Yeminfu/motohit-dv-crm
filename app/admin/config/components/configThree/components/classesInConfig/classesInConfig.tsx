import { useEffect, useState } from "react";

export default function ClassesInConfig(props: { idConfig: number }) {
  const [load, setLoad] = useState(false);
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    //@ts-ignore
    (async () => {
      setLoad(true);
      const res = await getClassesByIdConfig(props.idConfig);
      setClasses(res);
      setLoad(false);
    })();
  }, []);
  if (load) return <>Ждем классы</>;
  return (
    <>
      <pre>{JSON.stringify(classes, null, 2)}</pre>
    </>
  );
}

async function getClassesByIdConfig(idConfig: number) {
  const res = await fetch("/admin/api/classes/get-classes-by-config", {
    method: "POST",
    body: JSON.stringify({ idConfig }),
  });

  const data = await res.json();

  return data;
}
