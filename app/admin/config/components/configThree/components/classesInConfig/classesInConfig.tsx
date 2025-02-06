import { useEffect, useState } from "react";
import DBViews from "../dbViews/dbViews";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ClassesInConfig(props: { idConfig: number }) {
  const [load, setLoad] = useState(false);

  const [classes, setClasses] = useState<ts_classFromDB[]>([]);

  useEffect(() => {
    //@ts-ignore
    (async () => {
      setLoad(true);
      const res = await getClassesByIdConfig(props.idConfig);
      if (!res) return;
      setClasses(res);
      setLoad(false);
    })();
  }, []);
  if (load) return <>Ждем классы</>;
  return (
    <>
      {classes.map((classFromDB) => (
        <div className="card" key={classFromDB.id}>
          <div
            className="card-header"
            onClick={() => {
              toast("Открываем класс");
            }}
          >
            Класс{" "}
            <Link
              href={`/admin/classes/${classFromDB.id}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {classFromDB.name}
            </Link>
          </div>
          {/* <div className="card-body">
            <DBViews idClass={classFromDB.id} />
          </div> */}
        </div>
      ))}

      {/* <pre>{JSON.stringify(classes, null, 2)}</pre> */}
    </>
  );
}

async function getClassesByIdConfig(
  idConfig: number
): Promise<ts_classFromDB[] | undefined> {
  const res = await fetch("/admin/api/classes/get-classes-by-config", {
    method: "POST",
    body: JSON.stringify({ idConfig }),
  });

  const data = await res.json();

  if (data.error) {
    alert("Ошибка #jdsf84m");
    return;
  }

  return data.result;
}

interface ts_classFromDB {
  id: number;
  name: string;
  title: string | null;
  description: string | null;
  idConfig: number;
}
