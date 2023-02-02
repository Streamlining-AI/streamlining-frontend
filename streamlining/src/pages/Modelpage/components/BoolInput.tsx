import * as React from "react";

interface Props {
  name: string;
  data: boolean;
  description: string;
}

const BoolInput: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-2 justify-center w-full">
      <div className="flex gap-x-2">
        <input type={"checkbox"} className="border-2 rounded-lg w-6" />
        <h3>variable name</h3>
      </div>

      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
        repudiandae inventore esse odit repellendus facere tempora iusto,
        assumenda magnam voluptatibus consequuntur quia ducimus, dolorem commodi
        reprehenderit adipisci delectus ea quas.
      </p>
    </div>
  );
};

export default BoolInput;
