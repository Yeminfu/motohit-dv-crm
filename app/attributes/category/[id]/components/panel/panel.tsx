import CreatorAttribute4Category from "./components/creatorAttribute4Category/creatorAttribute4Category";

export default async function Panel(props: { idCategory: number }) {
  return (
    <>
      <CreatorAttribute4Category {...props} />
    </>
  );
}
