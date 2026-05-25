import React, { useState } from "react";
import signup from "../assets/Signup.png";
import { CustomImage } from "../ui";
import { FaStarOfLife } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { toast } from "react-toastify";

function Singup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const navigate = useNavigate();

  const { mutate, isPending, error } = useSignup();

  const handleChnage = (e) => {
    setFormData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.data);
        setTimeout(() => {
          navigate("/onboarding");
        }, 1000);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      },
    });
  };
  return (
    <div className="flex  items-center justify-center min-h-screen ">
      <div className="w-full  overflow-hidden shadow-2xl flex md:flex-row flex-col max-w-5xl mx-auto border border-primary rounded-3xl">
        <div className="w-1/2 border border-primary  flex flex-col justify-evenly p-8">
          <div>
            <div className="flex items-center  gap-2">
              <span className="animate-spin duration-1000 ease-in-out inline-flex">
                <FaStarOfLife className="text-primary" size={33} />
              </span>
              <span className="text-3xl text-primary">SpeakNest</span>
            </div>
            <div className="mt-2">
              <p className=" text-2xl stroke-1">Create an Account</p>
              <p className="text-gray-400 text-xs">
                Join LangConnect and start your language learning journey
              </p>
            </div>
          </div>
          <div>
            {error && (
              <p className="text-red-500 text-sm">
                {error.response?.data?.message || "An error occurred"}
              </p>
            )}
          </div>
          <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label htmlFor="fullName">
                <span>Full Name</span>
              </label>
              <input
                required="true"
                type="text"
                value={formData.fullName}
                placeholder="John Doe"
                className="border rounded-full py-2 px-3 outline-none"
                onChange={handleChnage}
                name="fullName"
              />
              <label htmlFor="name">Email</label>
              <input
                type="text"
                required="true"
                value={formData.email}
                placeholder="example@gmail.com"
                className="border rounded-full py-2 px-3 outline-none"
                onChange={handleChnage}
                name="email"
              />
              <div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="name">Password</label>
                  <input
                    type="pssword"
                    required="true"
                    value={formData.password}
                    placeholder="********"
                    className="border rounded-full py-2 px-3 outline-none"
                    onChange={handleChnage}
                    name="password"
                  />
                </div>
                <span className="text-xs text-gray-400">
                  password must altest be 6 characters long
                </span>
              </div>
              <div className="flex gap-2  items-center">
                <input
                  type="radio"
                  required="true"
                  value={formData.agreeToTerms}
                  className="border h-5 w-5 rounded-full  accent-primary cursor-pointer"
                  onChange={handleChnage}
                  name="agreeToTerms"
                />
                <label className="text-xs" htmlFor="radio">
                  I agree to the{" "}
                  <span className="text-primary">
                    Terms <span className="text-white">and </span> Conditions
                  </span>
                </label>
              </div>
              <button
                disabled={isPending}
                type="submit"
                className="bg-primary text-white py-2 rounded-full"
              >
                {isPending ? "loading..." : "Create Account"}
              </button>
              <span className="text-center">
                Already have an account?{" "}
                <span className="text-primary hover:underline cursor-pointer">
                  <Link to={"/login"}>Sign in</Link>
                </span>
              </span>
            </form>
          </div>
        </div>

        <div className="w-1/2 bg-primary">
          <CustomImage
            src={signup}
            alt="Signup"
            className="w-full  object-cover"
          />
          <div className="w-full py-4 px-6 flex flex-col gap-4 justify-center items-center ">
            <div className="text-center">
              <p className="font-bold text-xl">Connect with language partners</p>
              <p className="font-bold text-xl">worldwide</p>
            </div>
            <div className="text-center">
              <p>
                Practice conversations, make friends, and improve your 
                language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singup;
