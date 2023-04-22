import React, { useState , Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../state/user/hooks";
import HamburgerMenu from "./components/HambergerMenu";

interface Props {
  isOpen: Boolean;
  state: Dispatch<SetStateAction<boolean>>;
}

const Navbar: React.FC<Props> = ({isOpen,state}) => {
  const { user } = useUser();
  

  const ToggleState : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    state(!isOpen)
    
  };

  
  
  return (
    <>
      {/* {user ? <HamburgerMenu isOpen={isOpen} state={setOpen} /> : <></>} */}
      <div className="flex fixed m-auto p-auto justify-between w-full h-16 border-b border-black bg-white pl-2 pr-2 z-40">
        <div className="flex h-full pr-4 pl-4 pt-2 pb-2 gap-x-3">
          {/* Hamburger */}
          {user ? (
            <button
              type="button"
              onClick={ToggleState}
              className="flex h-8 w-8 m-auto"
            >
              <div className="flex flex-col gap-y-1 justify-center m-auto">
                <div className="w-8 h-1 bg-sl-orange rounded-full"></div>
                <div className="w-8 h-1 bg-sl-orange rounded-full"></div>
                <div className="w-8 h-1 bg-sl-orange rounded-full"></div>
              </div>
            </button>
          ) : (
            <></>
          )}
          <Link to="/" className="text-2xl m-auto font-bold ">
            Streamlining AI
          </Link>
        </div>
        <div className="flex gap-4">
          <Link to="/explore" className="m-auto ">
            Explore
          </Link>
          <Link to="/doc" className="m-auto ">
            Documentation
          </Link>
          <button
            type="button"
            className="flex pr-4 pl-4 pt-2 pb-2 bg-sl-orange rounded-full self-center text-white"
          >
            {user ? (
              <Link to="/dashboard">{user.username}</Link>
            ) : (
              <Link to="/login">Let’s Join Us!</Link>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
