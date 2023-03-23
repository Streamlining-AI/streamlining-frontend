import * as React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  data: boolean;
  description: string;
  register: UseFormRegister<FieldValues>;
}

const BoolInput: React.FC<Props> = ({ name, data, description, register }) => {
  return (
    <div className="flex flex-col gap-y-2 justify-center w-full">
      <div className="flex gap-x-2">
        <input
          type={"checkbox"}
          defaultChecked={data}
          className="border-2 rounded-lg w-6"
          {...register(name)}
        />
        <h3>{name}</h3>
      </div>

      <p className="text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default BoolInput;
