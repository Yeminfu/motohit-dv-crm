import CreatorAttribute4Category from "./components/creatorAttribute4Category/creatorAttribute4Category";

export default async function Panel(props: { idCategory: number }) {
  return (
    <>
      панель управления атрибутами категории 2
      <CreatorAttribute4Category {...props} />
    </>
  );
}
