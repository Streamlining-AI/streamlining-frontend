import React from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../state/user/hooks";
import { FormLogin } from "./type";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>();

  const {handleLogin,handleLoginGithub} = useUser();
  // Login
  const onSubmit: SubmitHandler<FormLogin> =async (data) => {
    try {
      await handleLogin(data);
      navigate('/dashboard');
    } catch (error) {
      
    }
  };

  // GithubLogin
  const GithubLogin = async () => {
    await handleLoginGithub()
    const res = JSON.parse(localStorage.getItem('app_user') || '')
    localStorage.removeItem('app_user');
    window.location.href = res.redirectURL;
  }
  
  return (
    <div className="w-screen h-screen ">
      <div className="flex flex-col h-full w-full justify-center text-center font-bold">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-96 border-4 border-sl-orange border-opacity-50 m-auto pl-20 pr-20 pt-12 pb-12 gap-y-4 rounded-lg">
          <h1 className="text-6xl">SignIn</h1>
          {/* <input
            type="text"
            placeholder="username"
            className="flex w-full h-10 border-4 border-sl-orange border-opacity-50 rounded-lg p-2"
            {...register('username', { required: { value: true, message: 'Username is required' } })}
          />
          {errors?.username && (
            <div className=" text-base font-small text-red-600">* {errors.username.message}</div>
          )}
          <input
            type="password"
            placeholder="password"
            className="flex w-full h-10 border-4 border-sl-orange border-opacity-50 rounded-lg p-2"
            {...register('password', {
              required: { value: true, message: 'Password is required' },
            })}
          />
           {errors?.password && (
            <div className=" text-base font-small text-red-600">* {errors.password.message}</div>
          )}
          <button
            type="submit"
            className="w-full bg-sl-orange bg-opacity-50 rounded-lg p-4 text-white text-xl"
          >
            SignIn
          </button>
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-4 border-sl-orange border-opacity-50 rounded-lg"></div>
            <h3 className="flex-shrink mx-4 text-sl-orange">or</h3>
            <div className="flex-grow border-t border-4 border-sl-orange border-opacity-50 rounded-lg"></div>
          </div> */}
          <button
            type="button"
            className="flex w-full bg-black rounded-lg p-4 text-white justify-center"
            onClick={GithubLogin}
          >
            <svg
              className="w-6 h-6 mr-2"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="github"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path
                fill="currentColor"
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
              ></path>
            </svg>
            Sign In With GitHub.
          </button>
          <span className="text-sm">
            By signing in, you agree to our{" "}
            <a href="/#" className="underline">
              terms of service
            </a>{" "}
            and{" "}
            <a href="/#" className="underline">
              privacy policy.
            </a>
          </span>
          {/* <Link to="/register" className="text-sm underline text-right">Sign Up?</Link> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
