import React, { useState } from "react";
import { CustomImage } from "../ui";
import login from "../assets/login.png";
import { FaStarOfLife } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { mutate: loginMutate, isPending, loading, error } = useLogin();

  const handleSubmit = (e) =>{
    e.preventDefault();
    loginMutate(formData,{
      onSuccess:()=>{
        
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      },
      onError:(error)=>{
        toast.error(error.response?.data?.message || "Something went wrong");
        }
    })
  }


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full bg-secondary  overflow-hidden shadow-lg flex md:flex-row flex-col max-w-5xl mx-auto border border-primary rounded-3xl">
        <div className="w-1/2 border-primary border p-8">
          <div className="flex flex-col  gap-10">
            <div className="flex items-center  gap-2">
              <span className="animate-spin duration-1000 ease-in-out inline-flex">
                <FaStarOfLife className="text-primary" size={33} />
              </span>
              <span className="text-4xl text-primary">SpeakNest</span>
            </div>
            <div>
              <p className=" text-2xl text-gray-200 stroke-1">Welcome Back</p>
              <p className="text-gray-400 text-xs">
                Sign in to your account and continue your language learning
                journey
              </p>
            </div>
            <div>
              <form action="submit" onSubmit={handleSubmit}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                   onChange={(e)=>setFormData((pre)=>({...pre,email:e.target.value}))}
                   value={formData.email}
                  required="true"
                  className="w-full border rounded-full py-2 px-3 outline-none mt-3"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <label
                  htmlFor="Password"
                  className="block text-sm mt-8 font-medium text-gray-300"
                >
                  Password
                </label>
                <input
                  onChange={(e)=>setFormData((pre)=>({...pre,password:e.target.value}))}
                  value={formData.password}
                  required="true"
                  className="w-full border rounded-full py-2 px-3 mt-3 outline-none "
                  type="password"
                  name="Password"
                  placeholder="........"
                />
                <div className=" mt-4">
                  <button  type="submit" className="w-full cursor-pointer hover:text-white bg-primary text-secondary rounded-full py-2 mt-8">
                    Sign In
                  </button>
                  <span className="text-sm text-gray-300 text-center mt-2 block">
                    Don't have an account?{" "}
                    <Link to="/signup">
                      <span className="text-primary cursor-pointer hover:underline">
                        Sign Up
                      </span>
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-primary">
          <CustomImage
            src={login}
            alt="Signup"
            className="w-full  object-cover"
          />

          <div className="w-full py-4 px-6 flex flex-col gap-4 justify-center items-center ">
            <div className="text-center">
              <p className="font-bold text-xl">
                Connect with language partners
              </p>
              <p className="font-bold text-xl">worldwide</p>
            </div>
            <div className="text-center">
              <p>
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
