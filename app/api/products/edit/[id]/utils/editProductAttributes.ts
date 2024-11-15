import dbWorker from "#db/dbWorker.ts";
import getAttributeRelation from "./getAttributeRelation";

export default async function editProductAttributes(
  idProduct: number,
  attributes: {
    idAttribute: string;
    idAttributeValue: string;
  }[]
) {
  for (let index = 0; index < attributes.length; index++) {
    const newAttribute = attributes[index];

    console.log("newAttribute", newAttribute);

    const oldAttribute = await getAttributeRelation(
      idProduct,
      Number(newAttribute.idAttributeValue)
    );

    console.log({
      idProduct,
      oldAttribute,
      newAttribute,
    });

    /*
  входные данные: idAttributeValue (new) и idProduct

  по idAttributeValue находим idAttribute

  по idAttribute и idProduct находим relations
    select
      *
    from chbfs_attr_prod_relation
    where
      idProduct = idProduct
      and idAttributeValue in (
        select
          id
        from chbfs_attributes_values
        where
          idAttribute = idAttribute
      )
*/

    console.log({
      newAttribute,
      oldAttribute,
    });

    console.log("oldAttribute", oldAttribute);

    // if (matchedRelation) {
    //   console.log(
    //     "matchedRelation.idAttribute",
    //     Number(matchedRelation.idAttribute)
    //   );

    //   if (Number(matchedRelation.idAttribute) === 97225) {
    //     console.log("matchedRelation", matchedRelation);
    //     //     console.log({
    //     //       newAttribute,
    //     //       matchedRelation,
    //     //     });
    //     console.log("йахэй баля");
    //   }
    // }

    //   const result = await updateAttrProdRelation(
    //     Number(newAttribute.idAttributeValue),
    //     matchedRelation.idRelation
    //   );
    //   // console.log("result", result);
    //   // break;
    // } else {
    // }
  }
}

async function updateAttrProdRelation(
  idAttributeValue: number,
  idRelation: number
) {
  console.log(
    "zzz",
    await dbWorker(
      `
      select * from chbfs_attr_prod_relation where id = ?
    `,
      [idRelation]
    )
  );

  const sql = `
    update chbfs_attr_prod_relation
    set
      idAttributeValue = ?
    where
      id = ?
  `;
  console.log(sql, idAttributeValue, idRelation);

  return await dbWorker(sql, [idAttributeValue, idRelation]);
}
