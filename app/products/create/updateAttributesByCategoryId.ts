import { setAttributes } from "./form";

export async function updateAttributesByCategoryId(categoryId: number) {
    fetch(
        "/api/attributes/get?categoryId=" + categoryId
    ).then(x => x.json())
        .then(res => {
            if (!res.success) {
                alert('Что-то пошло не так #jdn56')
                return;
            }
            if (!res.attributes) {
                alert('Что-то пошло не так #cn5klls')
                return;
            }
            setAttributes(res.attributes);
            console.log('attributes', res);

        })
}