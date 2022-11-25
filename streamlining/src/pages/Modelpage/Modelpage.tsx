import * as React from "react";
import WebcamCapture from "../../utils/camera/camera";
import ClassOutput from "./components/ClassOutput";




const Modelpage: React.FC = () => {
  const colors: string[] = ["#FCD650", "#ADFCAB", "#92D8EE"];

  const dataset = [
    { name: "Dog", data: 13 },
    { name: "Cat", data: 23 },
    { name: "Chicken", data: 32 },
    { name: "Rat", data: 15 },
  ];

  // var id = setInterval(frame, 10);
  // var width = 1;
  // var a = 0;
  // function frame() {
  //   var elem = document.getElementById(`percentbar${dataset[a]}`);
  //   if (width >= 6 + 94 * (dataset[a] / 100)) {
  //     clearInterval(id);
  //     width = 1;
  //   } else {
  //     width++;
  //     if (elem != null) {
  //       elem.style.width = width + "%";
  //     }
  //   }
  // }

  React.useEffect(() => {
    for (let i = 0; i < dataset.length; i++) {
      for (let width = 1; width <= 6 + 94 * (dataset[i].data / 100); width++) {
        var elem = document.getElementById(`percentbar${dataset[i].data}`);
        elem!.style.width = width + "%";
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-screen h-screen pt-16 pl-5 pr-5">
      <div id="model" className="flex w-full h-2/3 basis-1/2 pt-2">
        <div id="camera" className="flex flex-col w-1/2">
          <h1 className="text-2xl">Author/Model Name</h1>
          <div className="flex flex-col w-full p-5 m-auto">
            <WebcamCapture />
          </div>
        </div>
        <div id="output_zone" className="flex flex-col w-1/2 gap-y-3">
          <div id="header_output" className="flex flex-row gap-x-5 w-full ">
            <div className="flex items-center">
              <h1 className="text-2xl ">Output</h1>
            </div>
            <div className="flex items-center gap-x-5">
              <button className="bg-black text-white p-2 pl-3 pr-3 rounded-full hover:bg-sl-orange">
                GitHub
              </button>
              <button className="bg-black text-white p-2 pl-3 pr-3 rounded-full hover:bg-sl-orange">
                Paper
              </button>
            </div>
          </div>

          <div id="model_output" className="flex flex-col w-full gap-y-2">
            {/* Box Output */}
            {/* <ClassOutput data={'15'} /> */}
            {dataset.map((data, index) => {
              return (
                <ClassOutput
                  key={index}
                  name={data.name}
                  data={data.data.toString()}
                  color={colors[index % 3]}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-x-5">
            <button className="bg-black text-white p-2 pl-3 pr-3 rounded-full hover:bg-sl-orange">
              Share
            </button>
            <button className="bg-black text-white p-2 pl-3 pr-3 rounded-full hover:bg-sl-orange">
              Download
            </button>
            <button className="bg-black text-white p-2 pl-3 pr-3 rounded-full hover:bg-sl-orange">
              Report
            </button>
          </div>
        </div>
      </div>
      <div id="description" className="w-full">
        <h1 className="text-2xl">Description</h1>
      </div>
    </div>
  );
};

export default Modelpage;
