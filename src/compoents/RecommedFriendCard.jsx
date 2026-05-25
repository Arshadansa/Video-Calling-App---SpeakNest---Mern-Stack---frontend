import React, { useEffect, useState } from "react";
import { CustomImage } from "../ui";
import { IoLocationOutline } from "react-icons/io5";
import { LANGUAGE_TO_FLAG } from "../constant";
import { useTheme } from "../Context/ThemeContext";
import { useOutGoingFriendReqs, useSendFriendRequest } from "../hooks/useUsers";

function RecommedFriendCard({ Recommfriend }) {
  const { theme } = useTheme();
  console.log(Recommfriend._id);

  // store sent request ids
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  // fetch outgoing requests
  const { data: outgoingFriendReqs } = useOutGoingFriendReqs();

  // send request mutation
  const { mutate: sendRequestMutation, isPending } = useSendFriendRequest();

  // convert requests array -> Set
  useEffect(() => {
    const outgoingIds = new Set();

    outgoingFriendReqs?.data?.outgoingRequests?.forEach((req) => {
      outgoingIds.add(req.recipient._id);
    });

    setOutgoingRequestsIds(outgoingIds);
  }, [outgoingFriendReqs]);

  return (
    <div
      className={`shadow-md
      ${
        theme === "light"
          ? "hover:bg-amber-50/50 bg-secondary/10"
          : "bg-amber-50/10 hover:bg-primary/10"
      }
      hover:scale-105 transition-all duration-700
      ease-in-out cursor-pointer min-w-80 p-3 rounded-xl`}
    >
      {/* profile */}
      <div className="flex items-center gap-3">
        <CustomImage
          src={Recommfriend.profilePic}
          alt={Recommfriend.fullName}
          className="w-16 h-16 bg-white border rounded-full"
        />

        <div className="flex flex-col">
          <span>{Recommfriend.fullName}</span>

          <span className="flex items-center gap-1">
            <IoLocationOutline />
            {Recommfriend.location}
          </span>
        </div>
      </div>

      {/* languages */}
      <div className="w-full mt-3 flex gap-2">
        <span
          className="text-xs rounded-full bg-[#00bb86]
        text-white flex items-center w-fit px-2"
        >
          {getLanguageFlag(Recommfriend.nativeLanguage)}
          Native : {Recommfriend.nativeLanguage}
        </span>

        <span
          className="text-sm rounded-full border
        border-gray-300 flex items-center w-fit px-1 py-0.5"
        >
          {getLanguageFlag(Recommfriend.learningLanguage)}
          Learning : {Recommfriend.learningLanguage}
        </span>
      </div>

      {/* bio */}
      <div className="mt-2">{Recommfriend.bio}</div>

      {/* button */}

      <div className="mt-3">
        <button
          disabled={outgoingRequestsIds.has(Recommfriend._id)}
          onClick={() => sendRequestMutation(Recommfriend._id)}
          className={`" rounded-full   text-gray-600 cursor-pointer w-full ${
            outgoingRequestsIds.has(Recommfriend._id)
              ? " bg-gray-50 py-2"
              : "bg-[#1fb952] py-2 hover:text-gray-300"
          } "`}
        >
          {outgoingRequestsIds.has(Recommfriend._id)
            ? "Request Sent"
            : isPending
              ? "Sending..."
              : "Send Request"}
        </button>
      </div>
    </div>
  );
}

export default RecommedFriendCard;

function getLanguageFlag(language) {
  if (!language) return null;

  const langlower = language.toLowerCase();

  const countryCode = LANGUAGE_TO_FLAG[langlower];

  if (countryCode) {
    return (
      <CustomImage
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langlower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
}
