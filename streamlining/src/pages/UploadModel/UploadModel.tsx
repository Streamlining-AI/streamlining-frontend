import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FormUpload } from "./type";
import uploadImg from "../../utils/helper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
const UploadModel: React.FC = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormUpload>();
  // const { fields, append, remove } = useFieldArray({
  //   name: "input",
  //   control,
  // });
  const [imgUploaded, setimgUploaded] = useState("");
  const toastId = useRef("");
  const onSubmit: SubmitHandler<FormUpload> = async (data) => {
    try {
      data.github_code = JSON.parse(
        localStorage.getItem("app_user") || ""
      ).token;
      data.user_id = JSON.parse(localStorage.getItem("app_user") || "").user.id;

      data.is_visible = Number(data.is_visible) === 0 ? true : false;
      data.model_version = "v1.0";
      data.banner_url = await uploadImg(data.banner_url);
      const notify = () => (toastId.current = toast.loading("Uploading"));
      notify();
      await axios.post(`${process.env.REACT_APP_Backend_URL}model/`, data);
      toast.dismiss(toastId.current);
      toast.success("Uploaded!");
    } catch (error) {
      toast.dismiss(toastId.current);
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

  const [state, setState] = useState(false);

  return (
    <>
      <div className="w-screen h-screen pt-16 pl-5 pr-5">
        <div
          className={
            "flex flex-col items-center gap-y-3 pr-32 pl-32 pt-12 max-w-screen-lg m-auto " +
            (state ? "hidden" : "")
          }
        >
          <ReactMarkdown
            className="prose"
            children={`### สร้างพื้นที่เตรียมสำหรับขึ้นโมเดลแล้ว ผู้ใช้จำเป็นต้องอัพโหลดโมเดลขึ้น!
แต่ก่อนอื่นเลย อย่าลืมเตรียมโมเดลของคุณให้เรียบร้อยโดยการกำหนด __config.json__ และ __cog.yaml__
ถ้าอยากรู้รายละเอียดเพิ่มเติมได้ทีนี้ [Documentation](/doc)
 ~~~Comand Lind
docker login streamlining.com -u <user> -p <pass>
docker tag SOURCE_IMAGE[:TAG] streamlining.com/streamlining/{MODEL_NAME}
docker push streamlining.com/streamlining/{MODEL_NAME}
 ~~~
 `}
          />
          <button
            className="bg-sl-orange text-white p-2 pl-5 pr-5 rounded-full hover:bg-gray-500"
            onClick={() => {
              setState(true);
            }}
          >
            Next
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={
            "flex flex-col items-center gap-y-3 pr-32 pl-32 pt-12 max-w-screen-lg m-auto" +
            (state ? "" : " hidden")
          }
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
                {...register("banner_url", { onChange: (e) => readURL(e) })}
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
                {...register("github_url", {
                  required: {
                    value: true,
                    message: "Github Repository is required",
                  },
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
                className="border-2 rounded-full border-sl-orange p-2 w-full"
                {...register("type")}
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
          {/* <div className="flex flex-row items-center w-full ">
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
          </div> */}

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
                  value={0}
                  className="border-2 rounded-full border-sl-orange"
                  {...register("is_visible")}
                />
              </div>
              <div className="flex w-1/2 space-x-5">
                <label>Private</label>
                <input
                  type={"radio"}
                  value={1}
                  className="border-2 rounded-full border-sl-orange"
                  {...register("is_visible")}
                />
              </div>
            </div>
          </div>
          {/* Description */}
          {/* <div className="flex flex-col items-start w-full ">
            <div className="w-2/6">
              <label style={{ maxWidth: "78px" }}>Description</label>
            </div>
            <div className="w-full">
              <textarea
                placeholder="Description"
                className="border-2 rounded-lg border-sl-orange p-2 w-full"
                {...register("description", {
                  required: { value: true, message: "Description is required" },
                  minLength: 2,
                })}
              />
            </div>
          </div> */}
          <div className="flex gap-x-2">
          <button
            className="bg-gray-500 text-white p-2 pl-5 pr-5 rounded-full hover:bg-sl-orange"
            onClick={() => {
              setState(false);
            }}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-sl-orange text-white p-2 pl-5 pr-5 rounded-full hover:bg-gray-500"
          >
            Submit
          </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadModel;
