import * as React from "react";

interface Props {
  name: string;
  imgUrl: string;
  description: string;
}

const ImageInput: React.FC = () => {
  const [imgUploaded, setimgUploaded] = React.useState("");
  const readURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    // const file = target.files![0];
    if (target.files && target.files[0]) {
      let reader = new FileReader();
      reader.onload = () => {
        setimgUploaded(`${reader.result}`);
      };
      reader.readAsDataURL(target.files[0]);
    }
  };
  
  return (
    <div className="flex flex-col gap-y-2 justify-center w-full">
      <h3>variable name</h3>
      <label className={"relative flex flex-col items-center justify-center w-full h-80 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 " + (imgUploaded === "" ? "border-2 border-dashed border-gray-300" : "")}>
        {imgUploaded !== "" ? (
          <img
            id="banner"
            src={imgUploaded}
            alt="banner"
            className="absolute rounded-lg object-cover w-full h-full"
          />
        ) : (
          <></>
        )}
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
          onChange={readURL}
        />
      </label>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
        repudiandae inventore esse odit repellendus facere tempora iusto,
        assumenda magnam voluptatibus consequuntur quia ducimus, dolorem commodi
        reprehenderit adipisci delectus ea quas.
      </p>
    </div>
  );
};

export default ImageInput;
