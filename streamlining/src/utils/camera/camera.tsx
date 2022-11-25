
import React from "react";
import Webcam from "react-webcam";

const canvasWidth = window.innerWidth 
const canvasHeight = window.innerHeight * 0.75

const videoConstraints = {
    width: canvasWidth,
    height: canvasHeight,
    facingMode: "user"
  };
  
const WebcamCapture : React.FC = () => {
    const webcamRef = React.useRef<Webcam>(null);
    // eslint-disable-next-line
    const capture = React.useCallback( 
    () => {
      const imageSrc = webcamRef?.current?.getScreenshot();
      console.log(imageSrc)
    },
    [webcamRef]
  );
  return (
    <>
      <Webcam
        audio={false}
        height={canvasHeight}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={canvasWidth}
        videoConstraints={videoConstraints}
        className="rounded-xl"
      />
      {/* <button onClick={capture}>Capture photo</button> */}
    </>
  );
}

export default WebcamCapture;