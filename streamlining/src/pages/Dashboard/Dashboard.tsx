import { CardForm, DashboardInput } from "./types";
import Card from "./components/Card";
const Dashboard: React.FC = () => {
  const data: CardForm[] = [
    {
      imgUrl:
        "https://bucketeer-be99e627-94e7-4e5b-a292-54eeb40ac303.s3.amazonaws.com/public/models_models_cover_image/8faf1a87-e796-4ee5-83e1-385184220187/Screenshot_from_2022-06-17_13-12-.png",
      name: "example",
      author: "example",
      desciption:
        "example",
    },

    {
      imgUrl:
        "https://bucketeer-be99e627-94e7-4e5b-a292-54eeb40ac303.s3.amazonaws.com/public/models_models_cover_image/8faf1a87-e796-4ee5-83e1-385184220187/Screenshot_from_2022-06-17_13-12-.png",
      name: "example",
      author: "example",
      desciption:
        "example",
    },
    {
      imgUrl:
        "https://bucketeer-be99e627-94e7-4e5b-a292-54eeb40ac303.s3.amazonaws.com/public/models_models_cover_image/8faf1a87-e796-4ee5-83e1-385184220187/Screenshot_from_2022-06-17_13-12-.png",
      name: "example",
      author: "example",
      desciption:
        "example",
    },
    {
      imgUrl:
        "https://bucketeer-be99e627-94e7-4e5b-a292-54eeb40ac303.s3.amazonaws.com/public/models_models_cover_image/8faf1a87-e796-4ee5-83e1-385184220187/Screenshot_from_2022-06-17_13-12-.png",
      name: "example",
      author: "example",
      desciption:
        "example",
    },
  ];

  return (
    <>
      <div className="w-screen h-screen pt-16 pl-5 pr-5">
        <div className="flex flex-col w-full h-full gap-y-5 pt-5 pb-16">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="w-full h-full grid grid-cols-1 grid-rows-3 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {data.map((card) => {return <Card imgUrl={card.imgUrl} name={card.name} author={card.author} desciption={card.desciption}></Card>})}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
