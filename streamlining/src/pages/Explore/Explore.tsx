import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import { Config } from "../../config";


const Explore: React.FC = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    type: "All",
  });
  const [display, setDisplay] = useState([]);
  const search_type_ref = useRef<HTMLSelectElement>(null);
  const search_name_ref = useRef<HTMLInputElement>(null);
  const fetchData = async () => {
    const response = await axios.get(
      `${Config.REACT_APP_Backend_URL}model/`
    );
    if (response) {
      setData(response.data);
      setDisplay(response.data);
    }
  };

  const filterData = (data: never[], name: string, type: string) => {
    return data.filter((obj) => {
      if (name === "") return type === "All" ? obj : obj["type"] === type;
      return type === "All"
        ? (obj["name"] as string).includes(name)
        : obj["type"] === type && (obj["name"] as string).includes(name);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data)
      setDisplay(
        filterData(
          data,
          search_name_ref.current ? search_name_ref.current?.value : "",
          search_type_ref.current ? search_type_ref.current?.value : "All"
        )
      );
  }, [search_type_ref.current?.value]);

  return (
    <div className="w-screen h-full pt-16 pl-5 pr-5">
      <div className="flex flex-col w-full h-full gap-y-3">
        <div className="flex justify-between items-center">
          <div className="flex">
            <h1 className="pt-5 text-3xl">Explore</h1>
          </div>
          <div className="flex gap-x-5">
            <select
              className="text-center p-1"
              ref={search_type_ref}
              onChange={() => {
                setSearch({
                  type: search_type_ref.current
                    ? search_type_ref.current.value
                    : "All",
                });
              }}
            >
              <option selected={true} value={"All"}>
                All
              </option>
              <option value={"Image Classification"}>
                Image Classification
              </option>
              <option value={"Image Segmentation"}>Image Segmentation</option>
            </select>
            <input
              type="text"
              className="border-2 rounded-lg p-2 w-full"
              placeholder="Search"
              ref={search_name_ref}
              onChange={(e) => {
                setDisplay(filterData(data, e.target.value, search.type));
              }}
            ></input>
          </div>
        </div>
        <section id="popular-models" className="w-full">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 grid-flow-row auto-rows-max gap-2lh">
            {/* <div className="flex flex-col h-80">
              <img
                className="object-cover object-center w-full h-full "
                alt="banner"
                src="https://bucketeer-be99e627-94e7-4e5b-a292-54eeb40ac303.s3.amazonaws.com/public/models_models_cover_image/8faf1a87-e796-4ee5-83e1-385184220187/Screenshot_from_2022-06-17_13-12-.png"
              ></img>

              <h3 className="">Name</h3>
              <h4>Description</h4>
            </div>
            <div className="flex flex-col h-80">
              <img
                className="object-cover object-center w-full h-full "
                alt="banner"
                src="https://bucketeer-be99e627-94e7-4e5b-a292-54eeb40ac303.s3.amazonaws.com/public/models_models_cover_image/8faf1a87-e796-4ee5-83e1-385184220187/Screenshot_from_2022-06-17_13-12-.png"
              ></img>

              <h3 className="">Name</h3>
              <h4>Description</h4>
            </div>
            <div className="flex flex-col h-80">
              <img
                className="object-cover object-center w-full h-full "
                alt="banner"
                src="https://bucketeer-be99e627-94e7-4e5b-a292-54eeb40ac303.s3.amazonaws.com/public/models_models_cover_image/8faf1a87-e796-4ee5-83e1-385184220187/Screenshot_from_2022-06-17_13-12-.png"
              ></img>

              <h3 className="">Name</h3>
              <h4>Description</h4>
            </div> */}

            {display ? (
              display.map((item) => {
                return (
                  <Card
                    id={item["model_id"]}
                    imgUrl={item["banner_url"]}
                    author={"streamlining-ai"}
                    desciption={item["description"]}
                    name={item["name"]}
                    predict_record_count={item["predict_record_count"]}
                  />
                );
              }).reverse()
            ) : (
              <div>Loading!</div>
            )}
          </div>
        </section>
        <section id="models" className="w-full"></section>
      </div>
    </div>
  );
};

export default Explore;
