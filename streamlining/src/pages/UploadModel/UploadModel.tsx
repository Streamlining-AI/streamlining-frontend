import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormUpload } from "./type";

const UploadModel: React.FC = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormUpload>();


  
  const onSubmit: SubmitHandler<FormUpload> = async (data) => {
    try {
      data.code = JSON.parse(localStorage.getItem('app_user') || '').token
      await axios.post(`${process.env.REACT_APP_Backend_URL}upload/clone`,data)
      console.log('posted!')
    } catch (error) {

    }
  };

  return (
    <>
      <div className="w-screen h-screen pt-16 pl-5 pr-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-y-3 pr-32 pl-32 pt-12 max-w-screen-lg m-auto"
        >
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          {/* Name */}
          <div className="flex flex-row items-center w-full ">
            <div className="w-2/6">
              <label style={{ maxWidth: "78px" }}>Name</label>
            </div>
            <div className="w-full">
              <input
                type={"text"}
                placeholder="Name"
                className="border-2 rounded-full border-sl-orange p-2 w-full"
                {...register("name", {
                  required: { value: true, message: "name is required" },
                })}
              />
            </div>
          </div>
          {/* GitHub */}
          <div className="flex flex-row  items-center w-full">
            <div className="w-2/6">
              <label style={{ maxWidth: "78px" }} className="w-2/6 break-words">
                GitHub Repository
              </label>
            </div>
            <div className="w-full">
              {/* <select
                name="name"
                className="border-2 rounded-full border-sl-orange p-2 w-full"
              >
                <option value={"Example"}>Example</option>
                <option value={"Example"}>Example</option>
                <option value={"Example"}>Example</option>
                <option value={"Example"}>Example</option>
              </select> */}
              <input
                type={"text"}
                placeholder="Github Repository"
                className="border-2 rounded-full border-sl-orange p-2 w-full"
                {...register("url", {
                  required: { value: true, message: "Github Repository is required" },
                })}
              />
            </div>
          </div>
          {/* Model Type */}
          <div className="flex flex-row  items-center w-full">
            <div className="w-2/6">
              <label style={{ maxWidth: "78px" }} className="w-2/6 break-words">
                Model Type
              </label>
            </div>
            <div className="w-full">
              <select
                name="name"
                className="border-2 rounded-full border-sl-orange p-2 w-full"
              >
                <option value={"Image Segmentation"}>Image Segmentation</option>
                <option value={"Image Classification"}>
                  Image Classification
                </option>
              </select>
            </div>
          </div>
          {/* Input */}
          <div className="flex flex-row items-center w-full ">
            <div className="w-2/6">
              <label style={{ maxWidth: "78px" }}>Input</label>
            </div>
            <div className="w-full">
              <input
                type={"text"}
                placeholder="Input1,Input2,..."
                className="border-2 rounded-full border-sl-orange p-2 w-full"
                {...register("input", {
                  required: { value: true, message: "Input is required" },
                })}
              />
            </div>
          </div>
          {/* Paper */}
          <div className="flex flex-row items-center w-full ">
            <div className="w-2/6">
              <label style={{ maxWidth: "78px" }}>Paper</label>
            </div>
            <div className="w-full">
              <input
                type={"text"}
                name="paper"
                placeholder="Paper Url"
                className="border-2 rounded-full border-sl-orange p-2 w-full"
              />
            </div>
          </div>

          {/* Model Visibility */}
          <div className="flex flex-row items-center w-full ">
            <div className="w-2/6">
              <label style={{ maxWidth: "78px" }} className="break-words">
                Model
                <br />
                Visibility
              </label>
            </div>
            <div className="flex w-full items-center">
              <div className="flex w-1/2 space-x-5">
                <label>Public</label>
                <input
                  type={"checkbox"}
                  name="Public"
                  value={"false"}
                  className="border-2 rounded-full border-sl-orange"
                />
              </div>
              <div className="flex w-1/2 space-x-5">
                <label>Private</label>
                <input
                  type={"checkbox"}
                  name="Private"
                  value={"true"}
                  className="border-2 rounded-full border-sl-orange"
                />
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="flex flex-col items-start w-full ">
            <div className="w-2/6">
              <label style={{ maxWidth: "78px" }}>Description</label>
            </div>
            <div className="w-full">
              <textarea
                name="Description"
                placeholder="Description"
                className="border-2 rounded-lg border-sl-orange p-2 w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-sl-orange text-white p-2 pl-5 pr-5 rounded-full "
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadModel;
