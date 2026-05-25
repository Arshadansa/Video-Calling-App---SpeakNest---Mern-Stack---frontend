import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "../hooks/CurrentUser";
import { CgProfile } from "react-icons/cg";
import { RiAiGenerate } from "react-icons/ri";
import { LANGUAGES } from "../constant";
import { CustomImage } from "../ui";
import { useOnboard } from "../hooks/useOnboard.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Onboarding() {

 const navigate = useNavigate();

  const { data: user, isLoading } = useCurrentUser();
  ///optimize this by using useMemo
  // console.log("user", user);
  const { mutate, isPending,error } = useOnboard();

  const [formData, setFormData] = useState({
    fullName: user?.data?.fullName || "",
    bio: user?.data?.bio || "",
    nativeLanguage: user?.data?.nativeLanguage || "",
    learningLanguage: user?.data?.learningLanguage || "",
    location: user?.data?.location || "",
    profilePic: user?.data?.profilePic || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user?.data?.fullName || "",
        bio: user?.data?.bio || "",
        nativeLanguage: user?.data?.nativeLanguage || "",
        learningLanguage: user?.data?.learningLanguage || "",
        location: user?.data?.location || "",
        profilePic: user?.data?.profilePic || "",
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
       mutate(formData, {
         onSuccess: () => {
           toast.success("Onboarding completed successfully");
           setTimeout(() => {
             navigate("/");
           }, 1000);
         },
         onError: (error) => {
           toast.error(error.response?.data?.message || "Something went wrong");
         },
       });
  };

  const handleRandromAvatar = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const randomAvatarUrl = `https://api.dicebear.com/6.x/avataaars/svg?seed=${randomId}`;
    setFormData({ ...formData, profilePic: randomAvatarUrl });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center ">
      <div className="border-gray-400 border shadow-2xl rounded-2xl p-12 gap-4 flex flex-col justify-center items-center w-full mx-auto max-w-5xl">
        <h1 className="text-3xl text-center text-primary font-bold">
          Complete Your Profile!
        </h1>
        <form
          className=" min-w-lg  flex flex-col items-center "
          onSubmit={handleSubmit}
          action=""
        >
          <div>
            {formData.profilePic ? (
              <CustomImage
                src={formData.profilePic}
                alt="Profile"
                className="w-22 h-22  object-cover"
              />
            ) : (
              <div className="w-full flex items-center justify-center ">
                <CgProfile size={82} className="" />
              </div>
            )}
          </div>
          <div className="w-full mt-2 flex items-center justify-center">
            <button
              onClick={handleRandromAvatar}
              className="bg-primary flex items-center gap-2 cursor-pointer py-2 rounded-full px-4"
            >
              <RiAiGenerate />
              <span> Generate Randrom Avatar</span>
            </button>
          </div>
          <div className="w-full mt-3 flex flex-col gap-3  ">
            <label htmlFor="fullname">fullName</label>
            <input
              type="text"
              value={formData.fullName}
              className="w-full text-xs border placeholder:text-gray-500 py-2 px-2 rounded-full outline-none"
              placeholder="fullName"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            <label htmlFor="fullname">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full border placeholder:text-gray-500  text-xs rounded-3xl py-3 px-3 outline-none"
              placeholder="Tell others about yourself and your language learing goals"
            />
            <div className="w-full flex gap-2">
              <div className="w-1/2">
                <label htmlFor="language">Native Language</label>
                <select
                  value={formData.nativeLanguage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="py-2 text-xs  w-full px-2 outline-none border rounded-full"
                >
                  {LANGUAGES.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label htmlFor="Learning">Learning Level</label>
                <select
                  value={formData.learningLanguage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="py-2 text-xs w-full px-2 outline-none border rounded-full"
                >
                  {LANGUAGES.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <label>Location:</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full text-xs placeholder:text-gray-500 border py-2 px-2 rounded-full outline-none"
              placeholder="📍 City, Country"
            />
            <button
              type="submit"
              disabled={""}
              className="bg-primary cursor-pointer text-white py-2 rounded-full"
            >
              {/* {!isPending ? "Complete Onboarding..." : " Complete Onboarding"} */}
              Complete Onboarding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Onboarding;
