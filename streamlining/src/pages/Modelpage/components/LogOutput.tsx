
import * as React from "react";

const LogOutput: React.FC = () => {
  return (
    <div className="flex w-full">
      <textarea id="output" name="output_text" disabled={true}>
        Log of progression!
      </textarea>
    </div>
  );
};

export default LogOutput;
