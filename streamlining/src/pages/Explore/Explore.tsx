import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card";

const Explore: React.FC = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_Backend_URL}model/`
    );
    if (response) setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-screen h-full pt-16 pl-5 pr-5">
      <div className="flex flex-col w-full h-full gap-y-3">
        <h1 className="pt-5 text-3xl">Explore</h1>
        <section id="popular-models" className="w-full">
          <h2>Popular Models</h2>
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

            {data ? (
              data.map((item) => {
                return (
                  <Card
                    id={item["model_id"]}
                    imgUrl={item['banner_url']}
                    author={item["name"]}
                    desciption={item["description"]}
                    name={item["name"]}
                  />
                );
              }).filter()
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
