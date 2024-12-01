import { CategoryFromDBInterface } from "#types/categories/categories.ts";
import { useFormContext } from "react-hook-form";

export default function Categories(props: {
  categories: CategoryFromDBInterface[];
}) {
  const { register } = useFormContext();
  return (
    <select
      {...register("idCategory", { required: true })}
      className="form-select"
      autoComplete="off"
    >
      <option value="">-</option>
      {props.categories.map((category) => (
        <option value={String(category.id)} key={category.id}>
          {category.category_name}
        </option>
      ))}
    </select>
  );
}
