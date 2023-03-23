import * as React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  data: any; // number , float
  description: string;
  type: string;
  ge?: any; // number , float
  le?: any; // number , float
  register: UseFormRegister<FieldValues>;
}

const NumberInput: React.FC<Props> = ({
  name,
  data,
  description,
  type,
  ge,
  le,
  register,
}) => {
  const [data_default, setData] = React.useState(data);
  if (type === "int") {
    data = parseInt(data);
  } else {
    data = parseFloat(data);
  }

  return (
    <div className="flex flex-col gap-y-2 justify-center w-full">
      <h3>{name}</h3>
      <input
        type={"number"}
        className="border-2 rounded-lg p-2 w-full"
        step={type === "float" ? 0.1 : 1}
        defaultValue={data_default}
        {...register(name, {
          required: true,
          maxLength: le,
          minLength: ge,
          onChange: (e) =>
            setData(
              type === "int"
                ? parseInt(e.target.value)
                : parseFloat(e.target.value)
            ),
        })}
      />
      {/* for ge and le */}

      <input
        name="data"
        type={"range"}
        step={type === "float" ? 0.1 : 1}
        className={"border-2 rounded-lg w-full " + (ge || le ? " " : "hidden")}
        defaultValue={data_default}
        onChange={(e) => {
          setData(
            type === "int"
              ? parseInt(e.target.value)
              : parseFloat(e.target.value)
          );
        }}
      />

      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default NumberInput;
