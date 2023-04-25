import * as React from "react";
import BoolInput from "./components/BoolInput";
import ImageInput from "./components/ImageInput";
import NumberInput from "./components/NumberInput";
import SelectorInput from "./components/SelectorInput";
import TextInput from "./components/TextInput";
import { UseFormRegister, FieldValues } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { toast } from "react-hot-toast";
import { saveAs } from "file-saver";
import { useUser } from "../../state/user/hooks";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./components/Table";
import Webcam from "react-webcam";
import { Config } from "../../config";
import Modal from "./components/Modal";
import moment from "moment";

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
  const navigate = useNavigate();
  const [model_data, setmodel_data] = React.useState(null);
  const [streaming, setStreaming] = React.useState(false);
  const [statusStreaming, setStatusStreaming] = React.useState(false);
  const [history, setHistory] = React.useState(false);
  const [history_data, setHistoryData] = React.useState([]);
  const { model_id, version } = useParams();
  const [output, setoutput] = React.useState({ status: "default", data: "" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalReport, setModalReport] = React.useState(false);
  const docker_version = React.useRef<HTMLSelectElement>(null);
  const [streamUrl, setStreamUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [intervalId, setIntervalId] = React.useState<number | null>(null);
  //Webcam
  const webcamRef = React.useRef<Webcam>(null);

  const fetchData = async () => {
    const response = await axios.get(
      `${Config.REACT_APP_Backend_URL}model/${model_id}/` +
        (version ? version : "")
    );
    if (response) {
      setmodel_data(response.data);
    }
  };

  const fetchHistory = async () => {
    const response = await axios.get(
      `${Config.REACT_APP_Backend_URL}model/output/${model_id}/`
    );

    if (response) setHistoryData(response.data !== null ? response.data : []);
  };

  const dataURItoBlob = (dataURI: string): Blob => {
    // const byteString = window.atob(dataURI.split(",")[1]);
    // const ab = new ArrayBuffer(byteString.length);
    // const ia = new Uint8Array(ab);

    // for (let i = 0; i < byteString.length; i++) {
    //   ia[i] = byteString.charCodeAt(i);
    // }

    // return new Blob([ab], { type: 'image/jpeg' });

    const byteString = window.atob(dataURI.split(",")[1]);

    const uint8Array = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: "image/jpeg" });
  };

  const manageInput = (
    listInput: [],
    register: UseFormRegister<FieldValues>
  ) => {
    return listInput.map((data, index) => {
      if (searchParams.get("ModelOutputID")) {
        if (history_data) {
          let history_input_data = history_data.filter(
            (data) =>
              data["ModelOutputID"] === searchParams.get("ModelOutputID")
          )[0];
          if (history_input_data) {
            if (model_data)
              data["default"] =
                history_input_data["model_input_data"]["data_inputs"][index][
                  "data"
                ];
          }
        }
      }
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
  const postWebcam = async () => {
    try {
      const imageSrc = webcamRef?.current?.getScreenshot();
      if (!imageSrc) return;
      //Post Uploader
      const img = new FormData();
      img.append("uploadFile", dataURItoBlob(imageSrc));

      const response = await axios.post(
        `${Config.REACT_APP_Backend_URL}upload`,
        img,
        {
          headers: {
            "Content-Type": `multipart/form-data;`,
          },
        }
      );
      setStreamUrl(
        `${Config.REACT_APP_Backend_URL}`.slice(0, -1) +
          response.data["image_url"]
      );
    } catch (error) {
      toast.error("Get Image to Server Error!");
    }
  };

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
        version: version ? version : model_data!["version"][0],
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
    try {
      const data_inputs = Object.keys(data).map((key, index) => {
        return {
          name: key,
          data: model_data
            ? model_data["input_detail"][index]["type"] === "image"
              ? streamUrl
              : ""
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
        version: version ? version : model_data!["version"][0],
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
      toast.success("Success!");
    } catch (error) {
      toast.error("Error! Try again...");
    }
  };

  const onStreaming = handleSubmit(async (data) => {
    setStatusStreaming(true);
    const notify = () => (toastId.current = toast.loading("On Streaming..."));
    notify();
    setoutput({
      status: "default",
      data: "",
    });
    const id = window.setInterval(async () => {
      await postWebcam();
    }, 8000);
    setIntervalId(id);
  });

  const stopStreaming = () => {
    // window.clearInterval(intervalref.current || 0);
    if (intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(null);
    }
    toast.dismiss(toastId.current);
    toast.success("Streaming Stop!");
    setStatusStreaming(false);
  };
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
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    if (streamUrl !== "") postStreaming(getValues());
  }, [streamUrl]);

  React.useEffect(() => {
    fetchHistory();
  }, [history]);

  React.useEffect(() => {
    if (searchParams.get("ModelOutputID")) {
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
    }
  }, [searchParams]);

  React.useEffect(() => {
    getParam();
  }, [model_data]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        <div className="mt-4 text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen pt-16 pl-5 pr-5 overflow-x-hidden">
      <Modal
        id={model_id ? model_id : ""}
        showModal={modalReport}
        setShowModal={setModalReport}
      />
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
                <select
                  className="text-center p-1"
                  ref={docker_version}
                  onChange={(e) => {
                    navigate(`/model/${model_id}/${e.target.value}`);
                  }}
                  value={version ? version : model_data["version"][0]}
                >
                  {(model_data["version"] as []).map((ver) => {
                    return <option value={ver}>{ver}</option>;
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
              <div className="flex flex-col gap-y-2">
                <button
                  type="submit"
                  className={
                    (statusStreaming ? "bg-gray-500" : "bg-sl-orange") +
                    " text-white p-2 pl-5 pr-5 rounded-full "
                  }
                  disabled={statusStreaming}
                >
                  Start
                </button>

                <button
                  type="button"
                  className={
                    (!statusStreaming ? "bg-gray-500" : "bg-sl-orange") +
                    " text-white p-2 pl-5 pr-5 rounded-full "
                  }
                  disabled={!statusStreaming}
                  onClick={() => {
                    stopStreaming();
                  }}
                >
                  Stop
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-sl-orange text-white p-2 pl-5 pr-5 rounded-full "
                disabled={output.status === "pending"}
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
                  data={history_data
                    .filter(
                      (value) =>
                        value["version"] === docker_version.current?.value
                    )
                    .map((each) => {
                      const obj = Object.assign({}, each);
                      obj["output"] !== ""
                        ? ((obj["output"] as string) = "success")
                        : ((obj["output"] as string) = "failed");
                      (obj["created_at"] as string) = moment(
                        obj["created_at"]
                      ).format("DD MM YYYY hh:mm:ss");
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
                setModalReport(true);
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
