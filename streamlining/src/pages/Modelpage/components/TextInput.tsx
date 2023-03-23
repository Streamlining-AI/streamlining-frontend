import * as React from "react";
import { UseFormRegister , FieldValues } from "react-hook-form";


interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    name: string;
    data: any[];
    description: string;
    min_legth? : number;
    max_legth? : number;
    register : UseFormRegister<FieldValues>;
  }


const TextInput: React.FC<Props> = ({name,data,description,register , minLength , maxLength}) => {
  return (
    <div className="flex flex-col gap-y-2 justify-center w-full">
      <h3>{name}</h3>
      <input
        type={"text"}
        className="border-2 rounded-lg p-2 w-full"
        defaultValue={data}
        {...register(name , {required : true , maxLength :maxLength , minLength : minLength})}
      />
      <p className="text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default TextInput;
