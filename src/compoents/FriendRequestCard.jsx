import React from "react";
import { CustomImage } from "../ui";
import { useTheme } from "../Context/ThemeContext";
import { CiChat1 } from "react-icons/ci";
import { MdOutlineAccessTime } from "react-icons/md";
import { useFriendRequest } from "../hooks/useUsers.js";
import { getLanguageFlag } from "../constant/Flag.jsx";

function FriendRequestCard({ button, language, data }) {
  const { theme } = useTheme();
  const { mutate: acceptRequest, isPending } = useFriendRequest();


  return (
    <div
      className={`flex mt-2 shadow-md justify-between items-center ${
        theme === "light"
          ? "bg-amber-100"
          : "bg-primary/10 text-white"
      } px-3 py-3 rounded-2xl`}
    >
      <div>
        <div className="flex mb-2 gap-2 items-center">
          <CustomImage
            className="h-10 w-10 rounded-full object-cover bg-white"
            src={
              data?.sender?.profilePic ||
              "https://api.dicebear.com/6.x/avataaars/svg?seed=default"
            }
          />

          <span>{data?.sender?.fullName}</span>
        </div>

        {language ? (
          <div className="flex gap-2">
            <span className="bg-[#2eb082] text-white rounded-full px-2 py-1 text-xs">
              
              
              Native : {data?.sender?.nativeLanguage}
            </span>

            <span className="border rounded-full px-2 py-1 text-xs">
              Learning : {data?.sender?.learningLanguage}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <MdOutlineAccessTime />

            <span className="text-gray-300 text-sm">
              {new Date(data?.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <div>
        {button ? (
          <button
            disabled={isPending}
             onClick={() => acceptRequest(data?._id)}
            className={`rounded-full px-3 py-1 cursor-pointer transition ${
              theme === "light"
                ? "bg-[#02bb47] text-white"
                : "bg-[#02bb47] text-white"
            } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isPending ? "Accepting..." : "Accept"}
          </button>
        ) : (
          <span
            className={`flex items-center text-xs gap-1 px-2 py-1 rounded-full ${
              theme === "light"
                ? "bg-[#1ba870] text-gray-200"
                : "bg-[#1ba870]"
            }`}
          >
            <CiChat1 />
            New Friends
          </span>
        )}
      </div>
    </div>
  );
}

export default FriendRequestCard;