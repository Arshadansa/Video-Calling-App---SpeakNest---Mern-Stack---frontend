import React from "react";
import { CustomImage } from "../ui";
import { useTheme } from "../Context/ThemeContext";
import { LANGUAGE_TO_FLAG } from "../constant";
import { Link, useNavigate } from "react-router-dom";
import { getLanguageFlag } from "../constant/Flag.jsx";

function FriendCard({ friend }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const handleChat = () => {
    navigate(`/chat/${friend._id}`);
  };
  return (
    <div
      className={`"relative ${theme === "light" ? "bg-amber-50" : "bg-secondary/20"} bg-neutral-primary-soft max-w-xs w-full px-3  py-3 border border-gray-200  rounded-lg shadow-md "`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <CustomImage
            className="h-12 border w-12 object-contain bg-white rounded-full"
            src={"https://api.dicebear.com/6.x/avataaars/svg?seed=88"}
          />
          <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-heading">
            {friend?.fullName || "John Doe"}
          </h5>
        </div>

        <div className="flex gap-2  w-full  items-center">
          <span className="bg-[#2eb082] flex items-center text-white rounded-full px-3 py-1 text-xs">
        { getLanguageFlag(friend?.nativeLanguage)}
            Native:{friend?.nativeLanguage || "English"}
          </span>
          <span className="border flex items-center  rounded-full px-3 py-1 text-xs">
          { getLanguageFlag(friend?.learningLanguage)}
            Learning:{friend?.learningLanguage || "Spanish"}
          </span>
        </div>

        <div className=" flex ">
          <button
            onClick={handleChat}
            className="w-full hover:bg-primary hover:text-white transition-all duration-700 ease-in-out border text-center cursor-pointer outline-none rounded-full px-3 py-2"
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendCard;


