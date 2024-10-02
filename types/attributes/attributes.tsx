import getAllAttributes from "./getAllAttributes"

export default async function Attributes() {
    const attributes = await getAllAttributes()
    return <>
        <pre>{JSON.stringify(attributes, null, 2)}</pre>
    </>
}
