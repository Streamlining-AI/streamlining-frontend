import * as React from "react";

const TextInput: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-2 justify-center w-full">
      <h3>variable name</h3>
      <input
        type={"text"}
        className="border-2 rounded-lg p-2 w-full"
      />
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
        repudiandae inventore esse odit repellendus facere tempora iusto,
        assumenda magnam voluptatibus consequuntur quia ducimus, dolorem commodi
        reprehenderit adipisci delectus ea quas.
      </p>
    </div>
  );
};

export default TextInput;
