"use client";

import ts_productAttributes from "@/types/products/ts_productAttributes";
import { useEffect, useState } from "react";

export default function Attributes(props: {
  idProduct: number;
  idCategory: number;
}) {
  const [loading, setLoading] = useState(false);

  const [productAttributes, setProductAttributes] = useState<
    ts_productAttributes[] | null
  >(null);

  const [categoryAttributes, setCategoryAttributes] = useState<
    ts_productAttributes[] | null
  >(null);

  useEffect(() => {
    getProductAttributes(props.idProduct).then(setProductAttributes);
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getCategoryAttributes(props.idCategory).then(setCategoryAttributes);
      setLoading(false);
    })();
  }, [props.idCategory]);

  if (loading) return <>Загрузка...</>;

  return (
    <>
      <pre>
        {JSON.stringify(
          { productAttributes, props, categoryAttributes },
          null,
          2
        )}
      </pre>
    </>
  );
}

async function getProductAttributes(
  idProduct: number
): Promise<ts_productAttributes[] | null> {
  try {
    const response = await fetch("/api/attributes/getProductAttributes", {
      method: "post",
      body: JSON.stringify({
        idProduct,
      }),
    });
    if (!response.ok) {
      alert("Ошибка #d9m3b");
      return null;
    }
    const data = await response.json();
    return data.attributes; // Возвращаем массив обновлений
  } catch (error) {
    alert("#d0mn5");
    return null;
  }
}

async function getCategoryAttributes(
  idCategory: number
): Promise<ts_productAttributes[] | null> {
  console.log({ idCategory });
  // return null;

  try {
    const response = await fetch("/api/attributes/getCategoryAttributes", {
      method: "post",
      body: JSON.stringify({
        idCategory,
      }),
    });
    if (!response.ok) {
      alert("Ошибка #dsad93k");
      return null;
    }
    const data = await response.json();
    return data.attributes; // Возвращаем массив обновлений
  } catch (error) {
    alert("#ds93m");
    return null;
  }
}
