import * as React from "react";
import WebcamCapture from "../../utils/camera/camera";
import BoolInput from "./components/BoolInput";
import ClassOutput from "./components/ClassOutput";
import ImageInput from "./components/ImageInput";
import NumberInput from "./components/NumberInput";
import SelectorInput from "./components/SelectorInput";
import LogOutput from "./components/LogOutput";
import TextInput from "./components/TextInput";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { toast } from "react-hot-toast";

const Modelpage: React.FC = () => {
  const dataset = [
    { name: "Dog", data: 13 },
    { name: "Cat", data: 23 },
    { name: "Chicken", data: 32 },
    { name: "Rat", data: 15 },
  ];
  const toastId = React.useRef("");
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
    setValue,
  } = useForm();

  const [model_data, setmodel_data] = React.useState(null);
  const { model_id } = useParams();
  const [output, setoutput] = React.useState({ status: "default", data: "" });
  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_Backend_URL}model/${model_id}/`
    );
    if (response) setmodel_data(response.data);
  };

  const manageInput = (listInput: []) => {
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
            />
          );
        }
      }
    });
  };

  const onSubmit = handleSubmit(async (data) => {
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
        docker_image_id: model_data ? model_data["docker_image_id"][0] : "",
      };

      const response = await axios.post(
        `${process.env.REACT_APP_Backend_URL}predict/`,
        req,
        { withCredentials: true }
      );
      setoutput({
        status: response.data["status"],
        data: `${process.env.REACT_APP_Backend_URL}`.slice(0,-1) +response.data["output"],
      });
      toast.dismiss(toastId.current);
      toast.success('Predicted!')
      
    } catch (error) {
      setoutput({
        status: "default",
        data: "",
      });
      toast.dismiss(toastId.current);
      toast.error('Predict Error!');
    }
  });

  React.useEffect(() => {
    fetchData();
  }, [model_id]);

  return (
    <div className="w-screen h-screen pt-16 pl-5 pr-5 overflow-x-hidden">
      <div id="model" className="flex w-full basis-1/2 pt-2">
        <div id="input" className="flex flex-col w-1/2">
          <h1 className="text-2xl">{model_data ? model_data["name"] : ''}</h1>
          {/* INPUT FORM */}
          <form
            className="flex flex-col w-full p-5 gap-y-2"
            onSubmit={onSubmit}
          >
            {model_data ? (
              manageInput(model_data["input_detail"])
            ) : (
              <div>Loading!</div>
            )}

            <button
              type="submit"
              className="bg-sl-orange text-white p-2 pl-5 pr-5 rounded-full "
            >
              RUN
            </button>
          </form>
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
            {output.status === "default" ? (
              <></>
            ) : output.status === "pending" ? (
              <div>Loading</div>
            ) : (
              <img id="output" alt="output" src={output.data ? output.data : ''} />
            )}
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
      <div id="description" className="w-full prose pb-5">
        <h1 className="text-2xl">Description</h1>
        <ReactMarkdown children={model_data ? model_data["description"] : ""} />
      </div>
    </div>
  );
};

export default Modelpage;
