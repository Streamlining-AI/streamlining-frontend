import * as React from "react";

interface Props {
  name: string;
  data: any; // number , float
  description: string;
  ge: any; // number , float
  le: any; // number , float
}

const NumberInput: React.FC = () => {
  const [data, setData] = React.useState(0);

  return (
    <div className="flex flex-col gap-y-2 justify-center w-full">
      <h3>variable name</h3>
      <input
        name="data"
        type={"number"}
        className="border-2 rounded-lg p-2 w-full"
        step={1}
        value={data}
        onChange={(e) => {
          setData(parseInt(e.target.value));
        }}
      />
      <input
        name="data"
        type={"range"}
        step={1}
        className="border-2 rounded-lg w-full"
        value={data}
        onChange={(e) => {
          setData(parseInt(e.target.value));
        }}
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

export default NumberInput;
