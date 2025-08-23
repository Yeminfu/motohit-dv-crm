import ts_product from "./ts_product";

export default function Client(props: {
  products: ts_product[]
}) {
  return <>
    <pre>{JSON.stringify(props.products, null, 2)}</pre>
  </>
}