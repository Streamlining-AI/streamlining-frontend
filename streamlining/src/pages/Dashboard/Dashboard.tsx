import { CardForm, DashboardInput, Historydata } from "./types";
import Card from "./components/Card";
import { Link, useNavigate } from "react-router-dom";
const Dashboard: React.FC = () => {
  const data: CardForm[] = [
    {
      imgUrl:
        "https://bucketeer-be99e627-94e7-4e5b-a292-54eeb40ac303.s3.amazonaws.com/public/models_models_cover_image/8faf1a87-e796-4ee5-83e1-385184220187/Screenshot_from_2022-06-17_13-12-.png",
      name: "example",
      author: "example",
      desciption: "example",
    },

    {
      imgUrl:
        "https://bucketeer-be99e627-94e7-4e5b-a292-54eeb40ac303.s3.amazonaws.com/public/models_models_cover_image/8faf1a87-e796-4ee5-83e1-385184220187/Screenshot_from_2022-06-17_13-12-.png",
      name: "example",
      author: "example",
      desciption: "example",
    },
    {
      imgUrl:
        "https://bucketeer-be99e627-94e7-4e5b-a292-54eeb40ac303.s3.amazonaws.com/public/models_models_cover_image/8faf1a87-e796-4ee5-83e1-385184220187/Screenshot_from_2022-06-17_13-12-.png",
      name: "example",
      author: "example",
      desciption: "example",
    },
    {
      imgUrl:
        "https://bucketeer-be99e627-94e7-4e5b-a292-54eeb40ac303.s3.amazonaws.com/public/models_models_cover_image/8faf1a87-e796-4ee5-83e1-385184220187/Screenshot_from_2022-06-17_13-12-.png",
      name: "example",
      author: "example",
      desciption: "example",
    },
  ];

  const history: Historydata[] = [
    {
      id: "f97db440-a9c1-4d88-aac0-37a16d4c0551",
      name: "example",
      response: "Success",
      date: "2/23/2023 10:31PM",
    },
    {
      id: "fb97102a-51ad-4441-a469-cca5a1fbab85",
      name: "example",
      response: "Success",
      date: "2/23/2023 10:31PM",
    },
    {
      id: "fb7d2f4d-f3f9-44ba-81c0-4fc0ba36327b",
      name: "example",
      response: "Success",
      date: "2/23/2023 10:31PM",
    },
    {
      id: "67a1dc35-2060-4a82-b1cd-cbb306401c84",
      name: "example",
      response: "Success",
      date: "2/23/2023 10:31PM",
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <div className="w-screen h-screen pt-16 pl-5 pr-5">
        <div className="flex flex-col w-full h-full gap-y-5 pt-5 pb-16">
          <h1 className="text-3xl font-bold">DASHBOARD</h1>
          <div className="w-full h-1/3 grid grid-cols-1 grid-rows-1 gap-5 sm:grid-cols-1 lg:grid-cols-5">
            {data.map((card) => {
              return (
                <Card
                  imgUrl={card.imgUrl}
                  name={card.name}
                  author={card.author}
                  desciption={card.desciption}
                ></Card>
              );
            })}
          </div>
          <h1 className="text-3xl font-bold">HISTORY</h1>
          {/* Table History */}
          <table className="table-auto w-full ">
            <thead>
              <tr className="text-left">
                <th>ID</th>
                <th>Model name</th>
                <th>Response</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="">
              {history.map((data) => {
                return (
                  <tr
                    key={data.id}
                    onClick={() => {
                      navigate("/", { replace: true });
                    }}

                  >
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.response}</td>
                    <td>{data.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
