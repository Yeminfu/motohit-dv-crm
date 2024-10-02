import Attributes from "@/types/attributes/attributes";
import AuthedLayout from "@/utils/authedLayout";

export default function Page() {
    return <>
        <AuthedLayout title={"Атрибуты  "}>
            <Attributes />
        </AuthedLayout >
    </>
}
