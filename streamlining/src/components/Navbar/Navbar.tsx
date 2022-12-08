import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../state/user/hooks";
import HamburgerMenu from "./components/HambergerMenu";

const Navbar: React.FC = () => {
  const { user } = useUser();
  const [isOpen, setOpen] = useState(false);

  const ToggleState = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      {user ? <HamburgerMenu isOpen={isOpen} state={setOpen} /> : <></> }
      <div className="flex absolute m-auto p-auto font-bold justify-between w-full h-16 border-b border-black bg-white pl-2 pr-2">
        <div className="flex h-full pr-4 pl-4 pt-2 pb-2 gap-x-3">
          {/* Hamburger */}
          {user ? <button
            type="button"
            onClick={ToggleState}
            className="flex h-8 w-8 m-auto"
          >
            <div className="flex flex-col gap-y-1 justify-center m-auto">
              <div className="w-8 h-1 bg-sl-orange rounded-full"></div>
              <div className="w-8 h-1 bg-sl-orange rounded-full"></div>
              <div className="w-8 h-1 bg-sl-orange rounded-full"></div>
            </div>
          </button> : <></>}
          <Link to="/" className="text-2xl m-auto ">
            Streamlining AI
          </Link>
        </div>
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
    </>
  );
};

export default Navbar;
