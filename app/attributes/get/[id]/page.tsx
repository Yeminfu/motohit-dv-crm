import AuthedLayout from "@/utils/authedLayout";
import getAttributeById from "./utils/getAttributeById";

export default async function Page(a: { params: { id: string } }) {
  const attribute = await getAttributeById(Number(a.params.id));

  return (
    <AuthedLayout title={String(attribute?.attribute_name)}>
      Атрибут № {a.params.id}
    </AuthedLayout>
  );
}
