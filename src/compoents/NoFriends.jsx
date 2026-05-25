import React from "react";
import { useTheme } from "../Context/ThemeContext";

function NoFriends({friendTitle,descTitle}) {
  const { theme, toggleTheme } = useTheme();
 

  return (
    <div
      className={`w-full flex   flex-col cursor-pointer transition-all ease-in-out duration-500  p-4 rounded-md items-center justify-center 
        ${theme === "light" ? " bg-secondary/10 " : "bg-amber-50/10"}`}
    >
      <span>{friendTitle} </span>
      <span>
       {descTitle}
      </span>
    </div>
  );
}

export default NoFriends;
