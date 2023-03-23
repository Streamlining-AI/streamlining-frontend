import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../state/user/hooks";

interface Props {
  isOpen: Boolean;
  state: Dispatch<SetStateAction<boolean>>;
}
const HamburgerMenu: React.FC<Props> = (props: Props) => {
   const {handleLogout} = useUser();
  return (
    <>
      <div
        className={
          (props.isOpen
            ? " translate-x-72 "
            : " -translate-x-72 ") +
          "visible transition transform ease-in-out duration-300 absolute bg-white bg-blur-sm h-screen w-64  left-0 z-50 border-r-4 border-sl-orange drop-shadow-lg"
        }
        style={{ marginLeft: "-18rem" }}
      >
        <div className="flex flex-col items-start pl-6 gap-y-3">
          {/* Header */}
          <div className="flex justify-start h-full w-full  pr-2  pt-4 pb-2 gap-x-3 ">
            {/* Hamburger */}
            <button
              type="button"
              onClick={() => {
                props.state(!props.isOpen);
                console.log(props.isOpen);
              }}
              className="flex h-8 w-8"
            >
              <div className="flex flex-col gap-y-1 justify-center m-auto">
                <div className="w-8 h-1 bg-sl-orange rounded-full"></div>
                <div className="w-8 h-1 bg-sl-orange rounded-full"></div>
                <div className="w-8 h-1 bg-sl-orange rounded-full"></div>
              </div>
            </button>
            <Link to="/" className="flex text-2xl font-bold ">
              Streamlining AI
            </Link>
          </div>
          <div className="flex flex-col items-start pl-12 gap-y-3">
            <Link to="/dashboard" className="flex text-2xl">
              Dashboard
            </Link>
            <Link to="/uploadModel" className="flex text-2xl">
              UploadModel
            </Link>
            <button type="button" onClick={handleLogout} className="flex text-2xl">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
