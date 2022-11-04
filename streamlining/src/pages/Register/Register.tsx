import React from "react";

const Register: React.FC = () => {
  return (
    <div className="w-screen h-screen ">
      <div className="flex flex-col h-full w-full justify-center text-center font-bold">
        <form className="flex flex-col  w-96 border-4 border-sl-orange border-opacity-50 m-auto pl-20 pr-20 pt-12 pb-12 gap-y-4 rounded-lg">
          <h1 className="text-6xl">SignUp</h1>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="flex w-full h-10 border-4 border-sl-orange border-opacity-50 rounded-lg p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="flex w-full h-10 border-4 border-sl-orange border-opacity-50 rounded-lg p-2"
          />
          <input
            type="password"
            name="cf_password"
            placeholder="confirm password"
            className="flex w-full h-10 border-4 border-sl-orange border-opacity-50 rounded-lg p-2"
          />
          <button
            type="submit"
            className="w-full bg-sl-orange bg-opacity-50 rounded-lg p-4 text-white text-xl"
          >
            SignIn
          </button>
        
          <span className="text-sm">
            By signing up, you agree to our{" "}
            <a href="/#" className="underline">
              terms of service
            </a>{" "}
            and{" "}
            <a href="/#" className="underline">
              privacy policy.
            </a>
          </span>
          <a href="/Login" className="text-sm underline text-right">Already exist?</a>
        </form>
      </div>
    </div>
  );
};

export default Register;
