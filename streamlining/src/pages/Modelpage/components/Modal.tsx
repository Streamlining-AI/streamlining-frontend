import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import { Config } from "../../../config";
import { useUser } from "../../../state/user/hooks";

interface Props {
  id: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ id, showModal, setShowModal }) => {
  const [desciption, setDescription] = useState("");
  const { user } = useUser();
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${Config.REACT_APP_Backend_URL}model/report`
      ,{
        user_id : user!.id,
        desciption : desciption,
        model_id : id
      });
      setShowModal(false);
      toast.success("Reported Model Thank you to develop our community!");
    } catch (error) {
      setShowModal(false);
      toast.error("Reported Model had some problem!");
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Delete Model</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block ">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex flex-col my-4 text-slate-500 text-lg leading-relaxed">
                    <label>Description</label>
                    <input
                      type="text"
                      className="my-4 text-slate-500 text-lg leading-relaxed"
                      onChange={(e) => {setDescription(e.target.value)}}
                      defaultValue={desciption}
                      placeholder="Tell us the problem that you seen"
                    ></input>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className=" background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-red-500 hover:text-white hover:bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={async () => await fetchData()}
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
