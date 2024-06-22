export default function Price(props: { value: number }) {
    return <>
    {props.value.toLocaleString()} &#8381;
    </>;
}