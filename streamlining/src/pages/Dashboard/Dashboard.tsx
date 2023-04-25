import Card from "../../components/Card/Card";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../state/user/hooks";
import Modal from "./components/Modal";
import { Config } from "../../config";

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [model_id, setModel_id] = useState("");
  const { user } = useUser();

  const [data, setData] = useState([]);

  //FETCHDATA
  const fetchData = async () => {
    const response = await axios.get(
      `${Config.REACT_APP_Backend_URL}users/model/${user?.id}`
    );
    if (response) setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [showModal]);

  return (
    <>
      <Modal id={model_id} showModal={showModal} setShowModal={setShowModal} />
      <div className="w-screen h-screen pt-16 pl-5 pr-5">
        <div className="flex flex-col w-full h-full gap-y-5 pt-5 pb-16">
          <section>
            <h1 className="text-3xl font-bold">DASHBOARD</h1>
            <div className="w-full h-full grid grid-cols-1 grid-rows-1 gap-5 sm:grid-cols-1 lg:grid-cols-5">
              {data
                ? data.map((card) => {
                    return (
                      <div className="flex flex-col">
                        <Card
                          id={card["model_id"]}
                          imgUrl={card["banner_url"]}
                          name={card["name"]}
                          author={user ? user.username : ""}
                          desciption={card["description"]}
                          predict_record_count={card["predict_record_count"]}
                        ></Card>
                        <div className="flex self-end gap-x-2">
                          <a
                            className="p-2 bg-sl-orange rounded-lg text-white hover:bg-gray-500"
                            href={`updateModel/${card["model_id"]}`}
                          >
                            UPDATE
                          </a>
                          <button
                            id={card["model_id"]}
                            className="p-2 bg-red-500 rounded-lg text-white hover:bg-gray-500"
                            onClick={() => {
                              setModel_id(card["model_id"]);
                              setShowModal(!showModal);
                            }}
                          >
                            DELETE
                          </button>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </section>
          
        </div>
      </div>
    </>
  );
};

export default Dashboard;
