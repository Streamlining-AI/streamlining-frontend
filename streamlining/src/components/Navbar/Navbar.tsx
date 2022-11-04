import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="flex absolute m-auto p-auto font-bold justify-between w-full h-16 border-b border-black bg-white pl-2 pr-2">
      <div className="flex h-full pr-4 pl-4 pt-2 pb-2">
        <span className="text-2xl m-auto ">Streamlining AI</span>
      </div>
      <button type="button" className="flex pr-4 pl-4 pt-2 pb-2 bg-sl-orange rounded-full self-center text-white" >
        <a href="/#">
        Let’s Join Us!
        </a>
      </button>
    </div>
  );
};

export default Navbar;
