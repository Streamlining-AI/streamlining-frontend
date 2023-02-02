import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FormUpload } from "./type";

const UploadModel: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<FormUpload>();
  const { fields, append, remove } = useFieldArray({
    name: "input",
    control,
  });
  const [imgUploaded, setimgUploaded] = useState("");

  const onSubmit: SubmitHandler<FormUpload> = async (data) => {
    try {
      data.code = JSON.parse(localStorage.getItem("app_user") || "").token;
      toast.loading("Uploading");
      await axios.post(
        `${process.env.REACT_APP_Backend_URL}upload/clone`,
        data
      );
      toast.dismiss();
      toast.success("Uploaded!");

      console.log("posted!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

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
    <>
      <div className="w-screen h-screen pt-16 pl-5 pr-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-y-3 pr-32 pl-32 pt-12 max-w-screen-lg m-auto"
        >
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              {imgUploaded !== "" ? (
                <img
                  id="banner"
                  src={imgUploaded}
                  alt="banner"
                  className="absolute rounded-lg object-cover max-w-screen-lg w-full h-40 pr-32 pl-32"
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={readURL}
              />
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
              <select
                name="name"
                className="border-2 rounded-full border-sl-orange p-2 w-full"
              >
                
                <option value={"Example"}>Example</option>
                <option value={"Example"}>Example</option>
                <option value={"Example"}>Example</option>
                <option value={"Example"}>Example</option>
              </select>
              {/* <input
                type={"text"}
                placeholder="Github Repository"
                className="border-2 rounded-full border-sl-orange p-2 w-full"
                {...register("url", {
                  required: {
                    value: true,
                    message: "Github Repository is required",
                  },
                })}
              /> */}
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
                name="ModelType"
                className="border-2 rounded-full border-sl-orange p-2 w-full"
              >
                <option value={"Image Segmentation"} selected>
                  Image Segmentation
                </option>
                <option value={"Image Classification"}>
                  Image Classification
                </option>
              </select>
            </div>
          </div>
          {/* Input */}
          {/* <div className="flex flex-col items-center w-full gap-y-2 ">
            <div className="w-full justify-start">
              <label style={{ maxWidth: "78px" }}>Input</label>
            </div>
            <div id="inputlayout" className="flex flex-col w-full gap-y-2">
              {fields.map((field, index) => {
                return (
                  <div className="flex flex-col gap-2">
                    <div className="w-full justify-start">
                      <label style={{ maxWidth: "78px" }}>Input {index}</label>
                    </div>
                    <input
                      type={"text"}
                      placeholder={`Name`}
                      className="border-2 rounded-full border-sl-orange p-2"
                      {...register(`input.${index}.name` as const, {
                        required: {
                          value: true,
                          message: "InputName is required",
                        },
                      })}
                    />
                    <input
                      type={"text"}
                      placeholder={`Default`}
                      className="border-2 rounded-full border-sl-orange p-2"
                      {...register(`input.${index}.default` as const, {
                        required: {
                          value: true,
                          message: "InputDefault is required",
                        },
                      })}
                    />
                    <select
                      id={`inputtype${index}`}
                      className="border-2 rounded-full border-sl-orange p-2 w-full"
                      {...register(`input.${index}.type` as const)}
                    >
                      <option value={"string"} selected>
                        String
                      </option>
                      <option
                        value={"number"}
                      >
                        Int
                      </option>
                      <option value={"float"}>
                        Float
                      </option>
                      <option value={"image"}>Image</option>
                    </select>
                    
                    <input
                      type={"text"}
                      placeholder={`Description`}
                      className="border-2 rounded-full border-sl-orange p-2"
                      {...register(`input.${index}.description` as const, {
                        required: {
                          value: true,
                          message: "InputDescription is required",
                        },
                      })}
                    />

                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                );
              })}
              <button
                type="button"
                className="w-full border-2 border-sl-orange p-2 pl-5 pr-5 rounded-full "
                onClick={() =>
                  append({ name: "", type: "", default: "", description: "" })
                }
              >
                Add
              </button>
            </div>
          </div> */}
          {/* Output */}
          
          {/* <div className="flex flex-row  items-center w-full">
            <div className="w-2/6">
              <label style={{ maxWidth: "78px" }} className="w-2/6 break-words">
                Output
              </label>
            </div>
            <div className="w-full">
            <select
                      id={`outputtype`}
                      className="border-2 rounded-full border-sl-orange p-2 w-full"
                      {...register(`output`)}
                    >
                      <option value={"string"} selected>
                        String
                      </option>
                      <option
                        value={"number"}
                      >
                        Int
                      </option>
                      <option value={"float"}>
                        Float
                      </option>
                      <option value={"image"}>Image</option>
                    </select>
            </div>
          </div> */}
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
                  type={"radio"}
                  name="Visibility"
                  value={"false"}
                  className="border-2 rounded-full border-sl-orange"
                />
              </div>
              <div className="flex w-1/2 space-x-5">
                <label>Private</label>
                <input
                  type={"radio"}
                  name="Visibility"
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
