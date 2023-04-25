import * as React from "react";
import {
  UseFormRegister,
  FieldValues,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import uploadImg from "../../../utils/helper";
import Webcam from "react-webcam";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  imgUrl: string;
  description: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  state: boolean;
  webRef: React.RefObject<Webcam>;
}

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

const ImageInput: React.FC<Props> = ({
  name,
  imgUrl,
  description,
  register,
  setValue,
  state,
  getValues,
  webRef,
}) => {
  const [imgUploaded, setimgUploaded] = React.useState(imgUrl);
  const readURL = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    // const file = target.files![0];
    if (target.files && target.files[0]) {
      try {
        const url = await uploadImg(target.files);
        if(url)
        setimgUploaded(url);
        setValue(name, url);
        return url;
      } catch (error) {
        toast.error("Failed to upload.");
        setValue(name, imgUrl);
        return imgUrl;
      }
    }
  };

 
  

  return (
    <div className="flex flex-col gap-y-2 justify-center w-full">
      <h3>{name}</h3>
      {state ? (
        <Webcam
          audio={false}
          height={canvasHeight}
          ref={webRef}
          screenshotFormat="image/jpeg"
          width={canvasWidth}
          videoConstraints={videoConstraints}
          forceScreenshotSourceSize={true}
          screenshotQuality={0.5}
          mirrored={true}
          minScreenshotHeight={resHeight}
          minScreenshotWidth={resWidth}
          className="rounded-xl"
        />
      ) : (
        <label
          className={
            "relative flex flex-col items-center justify-center w-full h-80 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 " +
            (imgUploaded === "" ? "border-2 border-dashed border-gray-300" : "")
          }
        >
          <img
            id="banner"
            src={getValues(name)}
            alt="banner"
            className="absolute z-30 rounded-lg object-cover w-full h-full"
          />

          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            {...register(name, {
              value: `${imgUrl}`,
              onChange: (e) => readURL(e),
            })}
          />
        </label>
      )}
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default ImageInput;
