import React, { useState } from "react";
import Webcam from "react-webcam";

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight * 0.75;

const resWidth = 640;
const resHeight = 360;

const videoConstraints = {
  //Resolution Image
  width: resWidth,
  height: resHeight,
  facingMode: "user",
};

const WebcamCapture: React.FC = () => {
  const webcamRef = React.useRef<Webcam>(null);
  const [state, setState] = useState(false);
  // eslint-disable-next-line
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);



  return (
    <>
      <Webcam
        audio={false}
        height={canvasHeight}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={canvasWidth}
        videoConstraints={videoConstraints}
        forceScreenshotSourceSize={true}
        mirrored={true}
        minScreenshotHeight={resHeight}
        minScreenshotWidth={resWidth}
        className="rounded-xl"
      />
      {/* <button
        className="bg-sl-orange text-white p-2 pl-5 pr-5 rounded-full "
        onClick={() => {
          setState(!state);
          capture();
        }}
      >
        {state ? "Stop" : "Start"}
      </button> */}
    </>
  );
};

export default WebcamCapture;
