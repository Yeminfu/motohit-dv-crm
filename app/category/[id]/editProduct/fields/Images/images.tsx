import { useEffect } from "react";

export default function Images(props: { idProduct: number }) {
  useEffect(() => {
    console.log("gogogo");
  }, []);
  return (
    <>
      <pre>{JSON.stringify({ props }, null, 2)}</pre>
    </>
  );
}
