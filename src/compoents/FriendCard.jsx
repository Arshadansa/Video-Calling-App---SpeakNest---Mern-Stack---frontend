import React from "react";
import { CustomImage } from "../ui";
import { useTheme } from "../Context/ThemeContext";
import { LANGUAGE_TO_FLAG } from "../constant";
import { Link } from "react-router-dom";

function FriendCard({ friend }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`"relative ${theme === "light" ? "bg-amber-50" : "bg-secondary/20"} bg-neutral-primary-soft max-w-xs w-full p-6  py-4  rounded-lg shadow-md "`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <CustomImage
            className="h-12 border w-12 object-contain bg-white rounded-full"
            src={"https://api.dicebear.com/6.x/avataaars/svg?seed=88"}
          />
          <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-heading">
            Bonnie Green
          </h5>
        </div>
        <div className="flex justify-evenly border w-full gap-2 items-center">
          <span className="text-sm text-body">Native:</span>
          <span className="text-sm text-body">Learning:</span>
        </div>
        <div className="">
          <Link
            to={"/chat"}
            className="w-full border cursor-pointer outline-none rounded-full px-3 py-2"
          >
            Message
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FriendCard;

function getLanguageFlag(language) {
  if (!language) return null;

  const langlower = language.toLowercase();
  const countryCode = LANGUAGE_TO_FLAG[langlower];

  if (countryCodex) {
    return (
      <CustomImage
        src={`https://flagcdn.com/24*18/${countryCode}`}
        alt={`${langlower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
}
