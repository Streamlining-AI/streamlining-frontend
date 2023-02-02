import React from "react";
import { useForm ,SubmitHandler} from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../state/user/hooks";
import { FormRegister } from "./type";
const Register: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormRegister>();


  const {handleRegister} = useUser();

  const onSubmit: SubmitHandler<FormRegister> = data => {
    try {
      handleRegister(data);
      toast.success(`Registed! 👏`)
      navigate('/login');
    } catch (error) {
      toast.error('Something was wrong!')
    }
  };


  return (
    <div className="w-screen h-screen ">
      <div className="flex flex-col h-full w-full justify-center text-center font-bold">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-96 border-4 border-sl-orange border-opacity-50 m-auto pl-20 pr-20 pt-12 pb-12 gap-y-4 rounded-lg">
          <h1 className="text-6xl">SignUp</h1>
          <input
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
          <input
            type="password"
            placeholder="confirm password"
            className="flex w-full h-10 border-4 border-sl-orange border-opacity-50 rounded-lg p-2"
            {...register('cf_password', {
              required: { value: true, message: 'ConfirmPassword is required' },
              validate: (val: string) => {
                if (watch('password') !== val) {
                  return "Your passwords do no match";
                }
              }
            })}
          />
          {errors?.cf_password && (
            <div className=" text-base font-small text-red-600">* {errors.cf_password.message}</div>
          )}
          
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
          <Link to="/login" className="text-sm underline text-right">Already exist?</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
