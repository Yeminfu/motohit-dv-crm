import { useFormContext } from "react-hook-form";

export default function Color() {
  const { register } = useFormContext();
  return (
    <>
      <select
        {...register("color", { required: true })}
        className="form-select"
        autoComplete="off"
      >
        <option value="">Цвет</option>
        <option value="black" style={{ color: "black" }}>
          Черный
        </option>
        <option value="green" style={{ color: "green" }}>
          Зеленый
        </option>
        <option value="red" style={{ color: "red" }}>
          Красный
        </option>
        <option value="blue" style={{ color: "blue" }}>
          Синий
        </option>
        <option value="brown" style={{ color: "brown" }}>
          Коричневый
        </option>
        <option value="orange" style={{ color: "orange" }}>
          Рыжий
        </option>
      </select>
    </>
  );
}
