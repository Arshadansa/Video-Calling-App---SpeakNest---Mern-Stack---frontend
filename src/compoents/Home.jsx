"use client";
import { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useCurrentUser } from "../hooks/CurrentUser";
import { CustomImage } from "../ui";
import { AiFillMoon } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaStarOfLife } from "react-icons/fa6";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const { data: user, isLoading } = useCurrentUser();
  console.log(user);
  const tabs = [
    {
      label: "Home",
      icon: <GoHome />,
      contentLabel: "Your Friends",
      content: "your Content compoenet will render herer.",
    },
    {
      label: "Friends",
      icon: <FaUserFriends />,
      content:
        "Manage all your projects in one place. Create new projects, track progress, and collaborate with your team members.",
    },
    {
      label: "Notifications",
      icon: <IoIosNotificationsOutline />,
      content:
        "Stay connected with your team through our messaging system. Send direct messages or create group conversations.",
    },
  ];

  return (
    <div className="  h-screen  overflow-hidden bg-[#15100f]">
      <div className="flex w-full p-4 items-center  gap-12 justify-between  ">
        <div className=" flex items-center gap-3 ">
          <span className="animate-spin duration-1000 ease-in-out inline-flex">
            <FaStarOfLife className="text-primary" size={33} />
          </span>{" "}
          <span className="text-3xl font-medium text-primary">SpeakNest</span>
        </div>
        <div className=" flex justify-end min-w-6xl ">
          <div className=" gap-8 flex items-center justify-center text-gray-400 dark:text-gray-500">
            <p>
              <IoNotificationsOutline size={25} className="cursor-pointer " />
            </p>
            <p>
              <AiFillMoon size={25} className="cursor-pointer " />
            </p>
            <p>
              <CustomImage
                src={user?.data?.profilePic}
                alt="User Avatar"
                className="w-6 h-6 border cursor-pointer bg-white rounded-full object-cover"
              />
            </p>
            <p>
              <TbLogout size={25} className="cursor-pointer" />
            </p>
          </div>
        </div>
      </div>

      <div className="flex h-screen justify-between  ">
        <div className="w-64  flex-shrink-0">
          <nav className="space-y-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  activeTab === index
                    ? "bg-blue-50 dark:bg-blue-900/20  text-primary dark:text-primary border-l-4 border-primary"
                    : "text-gray-600 dark:text-gray-400 hover:cursor-pointer hover:bg-primary dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1  w-full bg-secondary  p-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
            {tabs[activeTab].contentLabel}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {tabs[activeTab].content}
          </p>
        </div>
      </div>
    </div>
  );
}
