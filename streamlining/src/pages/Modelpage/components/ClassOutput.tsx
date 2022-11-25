import * as React from "react";

interface Props {
  name : string;
  data: string;
  color: string;
}

const ClassOutput: React.FC<Props> = ({ name, data, color }) => {
  // var id = setInterval(,10);
  
  
  return (
    <div className="flex flex-col pr-5 pl-5 gap-y-2">
      <div className="flex items-center">
        <h3>{name}</h3>
      </div>
      <div
        id={`percentbar${data}`}
        style={{
          width: `6%`,
          backgroundColor: color,
        }}
        className="flex h-10 max-h-10 pr-3 pl-3 p-2 rounded-lg  items-center"
      >
        <span>{data}%</span>
      </div>
    </div>
  );
};

export default ClassOutput;
