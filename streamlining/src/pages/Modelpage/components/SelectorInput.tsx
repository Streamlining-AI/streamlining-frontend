import * as React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  default_data: any;
  data: any[];
  description: string;
  register: UseFormRegister<FieldValues>;
}

const SelectorInput: React.FC<Props> = ({
  name,
  default_data,
  data,
  description,
  register,
}) => {
  return (
    <div className="flex flex-col gap-y-2 justify-center w-full">
      <h3>{name}</h3>
      <select
        className="border-2 rounded-lg p-2 w-full"
        defaultValue={default_data}
        {...register(name)}
      >
        {/* Using map for split data */}
        {data.map((choice, index) => {
          // if(choice === default_data)
          //   return <option key={index} value={choice}>{choice}</option>;
          return (
            <option key={index} value={choice}>
              {choice}
            </option>
          );
        })}
      </select>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default SelectorInput;
