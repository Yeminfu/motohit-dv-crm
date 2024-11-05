"use client";

import ts_productAttributes from "@/types/products/ts_productAttributes";
import { useEffect, useState } from "react";

export default function Attributes(props: { idProduct: number }) {
  const [productAttributes, setProductAttributes] = useState<
    ts_productAttributes[] | null
  >(null);

  useEffect(() => {
    getAttributes(props.idProduct).then(setProductAttributes);
  }, []);
  return (
    <>
      <pre>{JSON.stringify(productAttributes, null, 2)}</pre>
    </>
  );
}

async function getAttributes(
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
