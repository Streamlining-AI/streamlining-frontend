import * as React from "react";
import BoolInput from "./components/BoolInput";
import ImageInput from "./components/ImageInput";
import NumberInput from "./components/NumberInput";
import SelectorInput from "./components/SelectorInput";
import TextInput from "./components/TextInput";
import { UseFormRegister, FieldValues } from "react-hook-form";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { toast } from "react-hot-toast";
import { saveAs } from "file-saver";
import { useUser } from "../../state/user/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./components/Table";
import Webcam from "react-webcam";
import { Config } from "../../config";

const Modelpage: React.FC = () => {
  const toastId = React.useRef("");
  const {
    register,
    handleSubmit,
    getValues,
    // formState: { errors },
    setValue,
  } = useForm();
  const { user } = useUser();
  const [model_data, setmodel_data] = React.useState(null);
  const [streaming, setStreaming] = React.useState(false);
  const intervalref = React.useRef<number | null>(null);
  const [statusStreaming, setStatusStreaming] = React.useState(false);
  const [history, setHistory] = React.useState(false);
  const [history_data, setHistoryData] = React.useState([]);
  const { model_id } = useParams();
  const docker_version = React.useRef<HTMLSelectElement>(null);
  const [output, setoutput] = React.useState({ status: "default", data: "" });
  const [searchParams, setSearchParams] = useSearchParams();
  //Webcam
  const webcamRef = React.useRef<Webcam>(null);

  const fetchData = async () => {
    const response = await axios.get(
      `${Config.REACT_APP_Backend_URL}model/${model_id}/`
    );
    if (response) {
      setmodel_data(response.data);
    }
  };

  const fetchHistory = async () => {
    const response = await axios.get(
      `${Config.REACT_APP_Backend_URL}model/output/${model_id}`
    );

    if (response) setHistoryData(response.data !== null ? response.data : []);
  };

  const manageInput = (
    listInput: [],
    register: UseFormRegister<FieldValues>
  ) => {
    return listInput.map((data) => {
      switch (data["type"]) {
        case "str": {
          if (data["optional"]["choices"]) {
            return (
              <SelectorInput
                key={data["ModelInputDetailID"]}
                name={data["name"]}
                default_data={data["default"]}
                data={data["optional"]["choices"]}
                description={data["description"]}
                register={register}
              />
            );
          }

          if (data["optional"]) {
            if (data["optional"]["min_legth"] || data["optional"]["max_legth"])
              return (
                <TextInput
                  key={data["ModelInputDetailID"]}
                  name={data["name"]}
                  data={data["default"]}
                  description={data["description"]}
                  minLength={
                    data["optional"]["min_legth"]
                      ? data["optional"]["min_legth"]
                      : undefined
                  }
                  maxLength={
                    data["optional"]["max_legth"]
                      ? data["optional"]["max_legth"]
                      : undefined
                  }
                  register={register}
                />
              );
          }

          return (
            <TextInput
              key={data["ModelInputDetailID"]}
              name={data["name"]}
              data={data["default"]}
              description={data["description"]}
              register={register}
            />
          );
        }
        case "int": {
          if (data["optional"]["choices"]) {
            return (
              <SelectorInput
                key={data["ModelInputDetailID"]}
                name={data["name"]}
                default_data={data["default"]}
                data={data["optional"]["choices"]}
                description={data["description"]}
                register={register}
              />
            );
          }
          if (data["optional"]) {
            if (data["optional"]["ge"] || data["optional"]["le"]) {
              return (
                <NumberInput
                  key={data["ModelInputDetailID"]}
                  name={data["name"]}
                  data={data["default"]}
                  description={data["description"]}
                  register={register}
                  type={"int"}
                  ge={
                    data["optional"]["ge"] ? data["optional"]["ge"] : undefined
                  }
                  le={
                    data["optional"]["le"] ? data["optional"]["le"] : undefined
                  }
                  setValue={setValue}
                  getValues={getValues}
                />
              );
            }
          }
          return (
            <NumberInput
              key={data["ModelInputDetailID"]}
              name={data["name"]}
              data={data["default"]}
              description={data["description"]}
              register={register}
              type={"int"}
              setValue={setValue}
              getValues={getValues}
            />
          );
        }
        case "float": {
          if (data["optional"]["choices"]) {
            return (
              <SelectorInput
                key={data["ModelInputDetailID"]}
                name={data["name"]}
                default_data={data["default"]}
                data={data["optional"]["choices"]}
                description={data["description"]}
                register={register}
              />
            );
          }
          if (data["optional"]) {
            if (data["optional"]["ge"] || data["optional"]["le"]) {
              return (
                <NumberInput
                  key={data["ModelInputDetailID"]}
                  name={data["name"]}
                  data={data["default"]}
                  description={data["description"]}
                  register={register}
                  type={"float"}
                  ge={
                    data["optional"]["ge"] ? data["optional"]["ge"] : undefined
                  }
                  le={
                    data["optional"]["le"] ? data["optional"]["le"] : undefined
                  }
                  setValue={setValue}
                  getValues={getValues}
                />
              );
            }
          }
          return (
            <NumberInput
              key={data["ModelInputDetailID"]}
              name={data["name"]}
              data={data["default"]}
              description={data["description"]}
              register={register}
              type={"float"}
              setValue={setValue}
              getValues={getValues}
            />
          );
        }
        case "bool": {
          return (
            <BoolInput
              key={data["ModelInputDetailID"]}
              name={data["name"]}
              data={data["default"]}
              description={data["description"]}
              register={register}
            />
          );
        }
        case "image": {
          return (
            <ImageInput
              key={data["ModelInputDetailID"]}
              name={data["name"]}
              description={data["description"]}
              imgUrl={data["default"]}
              register={register}
              setValue={setValue}
              state={streaming}
              getValues={getValues}
              webRef={webcamRef}
            />
          );
        }
      }
    });
  };
  //Webcam Upload Image
  const postWebcam = React.useCallback(async () => {
    try {
      const imageSrc = webcamRef?.current?.getScreenshot();
      //Base64 => Blob => File
      var bs = window.atob(imageSrc ? imageSrc : "");
      var buffer = new ArrayBuffer(bs.length);
      var ba = new Uint8Array(buffer);
      for (var i = 0; i < bs.length; i++) {
        ba[i] = bs.charCodeAt(i);
      }
      var file = new Blob([ba], { type: "image/png" });
      //Base64 => Blob => File

      //Post Uploader
      let img = new FormData();
      img.append("uploadFile", file);
      const { status, data } = await axios.post(
        `${Config.REACT_APP_Backend_URL}upload`,
        img,
        {
          headers: {
            "Content-Type": `multipart/form-data;`,
          },
        }
      );
      if (status === 500 || status === 400) throw new Error(data["message"]);
      //Post Uploader

      const result =
        `${Config.REACT_APP_Backend_URL}`.slice(0, -1) + data.image_url;
      return result;
    } catch (error) {
      toast.error("Get Image to Server Error!");
    }
  }, [webcamRef]);

  const onSubmit = handleSubmit(async (data) => {
    setHistory(false);
    const notify = () =>
      (toastId.current = toast.loading("Predict pending..."));
    notify();
    setoutput({ status: "pending", data: "" });
    try {
      const data_inputs = Object.keys(data).map((key, index) => {
        return {
          name: key,
          data: data[key],
          type: model_data ? model_data["input_detail"][index]["type"] : "",
          model_input_detail_id: model_data
            ? model_data["input_detail"][index]["ModelInputDetailID"]
            : "",
        };
      });

      const req = {
        data_inputs: data_inputs,
        model_id: model_id,
        docker_image_id: docker_version.current?.value,
      };

      const response = await axios.post(
        `${Config.REACT_APP_Backend_URL}predict/`,
        req,
        { withCredentials: true }
      );
      setoutput({
        status: response.data["status"],
        data:
          `${Config.REACT_APP_Backend_URL}`.slice(0, -1) +
          response.data["output"],
      });
      toast.dismiss(toastId.current);
      toast.success("Predicted!");
    } catch (error) {
      setoutput({
        status: "default",
        data: "",
      });
      toast.dismiss(toastId.current);
      toast.error("Predict Error!");
    }
  });

  //Streaming
  const postStreaming = async (data: FieldValues) => {
    let imgUrl = await postWebcam();
    const notify = () => (toastId.current = toast.loading("On Streaming..."));
    notify();
    setoutput({ status: "pending", data: "" });
    try {
      const data_inputs = Object.keys(data).map((key, index) => {
        return {
          name: key,
          data: model_data
            ? streaming
              ? model_data["input_detail"][index]["type"] === "image"
                ? imgUrl
                : data[key]
              : data[key]
            : "",
          type: model_data ? model_data["input_detail"][index]["type"] : "",
          model_input_detail_id: model_data
            ? model_data["input_detail"][index]["ModelInputDetailID"]
            : "",
        };
      });

      const req = {
        data_inputs: data_inputs,
        model_id: model_id,
        docker_image_id: docker_version.current?.value,
      };

      const response = await axios.post(
        `${Config.REACT_APP_Backend_URL}stream/`,
        req,
        { withCredentials: true }
      );
      setoutput({
        status: response.data["status"],
        data:
          `${Config.REACT_APP_Backend_URL}`.slice(0, -1) +
          response.data["output"],
      });
      toast.dismiss(toastId.current);
      toast.success("Success!");
    } catch (error) {
      setoutput({
        status: "default",
        data: "",
      });
      toast.dismiss(toastId.current);
      toast.error("Error!");
    }
  };

  const onStreaming = handleSubmit(async (data) => {
    setStatusStreaming(!statusStreaming);

    if (statusStreaming && (intervalref.current === 0 || intervalref.current === null)) {
      intervalref.current = window.setInterval(async () => {
        await postStreaming(data);
      }, 10000);
    }

    if (!statusStreaming) {
      window.clearInterval(intervalref.current || 0);
      toast.dismiss(toastId.current);
      toast.success("Streaming Stop!")
    }
  });
  type Item = {
    id: string;
    modelname: string;
    response: string;
    date: string;
  };

  const cols = React.useMemo<ColumnDef<Item>[]>(
    () => [
      {
        header: "ID",
        cell: (row) => row.renderValue(),
        accessorKey: "ModelOutputID",
      },
      {
        header: "Model ID",
        cell: (row) => row.renderValue(),
        accessorKey: "ModelID",
      },
      {
        header: "Response",
        cell: (row) => row.renderValue(),
        accessorKey: "output",
      },
      {
        header: "Date",
        cell: (row) => row.renderValue(),
        accessorKey: "created_at",
      },
    ],
    []
  );

  const getParam = () => {
    if (searchParams.get("ModelOutputID")) {
      if (history_data) {
        let history_input_data = history_data.filter(
          (data) => data["ModelOutputID"] === searchParams.get("ModelOutputID")
        )[0];
        if (history_input_data) {
          if (model_data)
            (model_data["input_detail"] as []).map((init_data, index) => {
              init_data["default"] =
                history_input_data["model_input_data"]["data_inputs"][index][
                  "data"
                ];
            });

          setoutput({
            status: "success",
            data:
              `${Config.REACT_APP_Backend_URL}`.slice(0, -1) +
              history_input_data["output"],
          });
        }
      }
    }
  };

  React.useEffect(() => {
    fetchData();
    fetchHistory();
  }, []);

  React.useEffect(() => {
    if (history_data) {
      let history_input_data = history_data.filter(
        (data) => data["ModelOutputID"] === searchParams.get("ModelOutputID")
      )[0];
      if (history_input_data) {
        (history_input_data["model_input_data"]["data_inputs"] as []).map(
          (data) => {
            if (data["type"] === "image") {
              setValue(data["name"] as string, data["data"]);
            } else setValue(data["name"], data["data"]);
          }
        );
        setoutput({
          status: "success",
          data:
            `${Config.REACT_APP_Backend_URL}`.slice(0, -1) +
            history_input_data["output"],
        });
        setHistory(false);
      }
    }
  }, [searchParams]);

  React.useEffect(() => {
    getParam();
  }, [model_data]);

  return (
    <div className="w-screen h-screen pt-16 pl-5 pr-5 overflow-x-hidden">
      <div id="model" className="flex w-full basis-1/2 pt-2">
        <div id="input" className="flex flex-col w-1/2">
          <div className="flex justify-between pr-2">
            <h1 className="text-2xl">{model_data ? model_data["name"] : ""}</h1>
            <div className="flex gap-x-2">
              <button
                className="bg-black text-white p-2 pl-3 pr-3 rounded-full hover:bg-sl-orange"
                onClick={() => {
                  setStreaming(!streaming);
                }}
              >
                Streaming Mode
              </button>
              {model_data ? (
                <select className="text-center p-1" ref={docker_version}>
                  {(model_data["docker_image_id"] as [])
                    .slice(0)
                    .reverse()
                    .map((ver) => {
                      return (
                        <option value={ver}>
                          {(ver as string).split(":")[1]}
                        </option>
                      );
                    })}
                </select>
              ) : null}
            </div>
          </div>

          {/* INPUT FORM */}

          <form
            className="flex flex-col w-full p-5 gap-y-2"
            onSubmit={streaming ? onStreaming : onSubmit}
          >
            {model_data ? (
              manageInput(model_data["input_detail"], register)
            ) : (
              <div>Loading!</div>
            )}

            {streaming ? (
              <button
                type="submit"
                className="bg-sl-orange text-white p-2 pl-5 pr-5 rounded-full "
              >
                {statusStreaming ? "Stop" : "Start"}
              </button>
            ) : (
              <button
                type="submit"
                className="bg-sl-orange text-white p-2 pl-5 pr-5 rounded-full "
              >
                RUN
              </button>
            )}
          </form>
        </div>
        <div id="output_zone" className="flex flex-col w-1/2 gap-y-3">
          <div id="header_output" className="flex flex-row gap-x-5 w-full ">
            <div className="flex items-center">
              <h1 className="text-2xl ">Output</h1>
            </div>
            <div className="flex items-center gap-x-5">
              <a
                href={model_data ? model_data["github_url"] : ""}
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white p-2 pl-3 pr-3 rounded-full hover:bg-sl-orange"
              >
                GitHub
              </a>
              <button
                className="bg-black text-white p-2 pl-3 pr-3 rounded-full hover:bg-sl-orange"
                onClick={() => {
                  setHistory(!history);
                }}
              >
                History
              </button>
            </div>
          </div>

          <div id="model_output" className="flex flex-col w-full gap-y-2">
            {/* Box Output */}
            {/* <ClassOutput data={'15'} /> */}
            {/* {dataset.map((data, index) => {
              return (
                <ClassOutput
                  key={index}
                  name={data.name}
                  data={data.data.toString()}
                  color={colors[index % 3]}
                />
              );
            })} */}

            {history ? (
              // <table className="table-auto w-full ">
              //   <thead>
              //     <tr className="text-left">
              //       <th>ID</th>
              //       <th>Model name</th>
              //       <th>Response</th>
              //       <th>Date</th>
              //     </tr>
              //   </thead>
              //   <tbody className="">
              //     {history_data.map((data) => {
              //       return (
              //         <button className="inline" onClick={()=>{}}>
              //         <tr
              //           key={data["ModelOutputID"]}
              //           onClick={() => {
              //             // navigate("/", { replace: true });

              //           }}
              //         >
              //           <td>{data["ModelOutputID"]}</td>
              //           <td>{model_data ? model_data["name"] : ''}</td>
              //           <td>{data["output"] !== '' ? "success" : "failed"}</td>
              //           <td>{data["created_at"]}</td>
              //         </tr>
              //         </button>
              //       );
              //     })}
              //   </tbody>
              // </table>
              history_data ? (
                <Table
                  data={history_data.map((each) => {
                    const obj = Object.assign({}, each);
                    obj["output"] !== ""
                      ? ((obj["output"] as string) = "success")
                      : ((obj["output"] as string) = "failed");
                    return obj;
                  })}
                  columns={cols}
                  showNavigation={true}
                />
              ) : (
                <div>Loading!</div>
              )
            ) : output.status === "default" ? null : output.status ===
              "pending" ? (
              <div>Loading</div>
            ) : (
              <img
                id="output"
                alt="output"
                src={output.data ? output.data : ""}
              />
            )}
          </div>

          <div className="flex items-center gap-x-5">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Copied to clipboard!");
              }}
              className="bg-black text-white p-2 pl-3 pr-3 rounded-full hover:bg-sl-orange"
            >
              Share
            </button>
            <button
              onClick={() => {
                output.data
                  ? saveAs(output.data)
                  : toast.error("No Output Data!");
              }}
              className="bg-black text-white p-2 pl-3 pr-3 rounded-full hover:bg-sl-orange"
            >
              Download
            </button>
            <button
              onClick={async () => {
                if (!user) {
                  toast.error("Please,Login Before Report!");
                  return;
                }
                console.log(user.id);
                // try {
                //   // const dataReport = {
                //   //   user_id: data_inputs,
                //   //   description: model_id,
                //   //   model_id: model_id
                //   // };
                //   //  "user_id": "63fcd452f3c52be1440593c4",
                //   //  "description":"report Problem",
                //   //  "model_id":"63fcd452f3c52be1440593c4"
                //   const response = await axios.post(
                //     `${Config.REACT_APP_Backend_URL}predict/`,
                //     dataReport
                //   );
                // } catch (error) {}
              }}
              className="bg-black text-white p-2 pl-3 pr-3 rounded-full hover:bg-sl-orange"
            >
              Report
            </button>
          </div>
        </div>
      </div>
      <div id="description" className="w-full prose pb-5">
        <h1 className="text-2xl">Description</h1>
        <ReactMarkdown children={model_data ? model_data["description"] : ""} />
      </div>
    </div>
  );
};

export default Modelpage;
