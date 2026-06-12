"use client";

import { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useCurrentUser } from "../hooks/CurrentUser";
import { Chat, CustomImage, Header, Notification } from "../ui";
import { AiFillMoon } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaStarOfLife } from "react-icons/fa6";
import { useLogout } from "../hooks/useLogout";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MdWbSunny } from "react-icons/md";
import { useTheme } from "../Context/ThemeContext";
import Friends from "../compoents/Friends";

export default function Home() {
  const navigate = useNavigate(); 

  const [activeTab, setActiveTab] = useState(0);

  const { theme, toggleTheme } = useTheme();

  const location = useLocation();

  const tabs = [
    {
      label: "Home",
      icon: <GoHome />,
      path: "/",
      content: <Friends />,
    },
    {
      label: "Friends",
      icon: <FaUserFriends />,
      path: "/friends",
      content:
        "Manage all your projects in one place. Create new projects, track progress, and collaborate with your team members.",
    },
    {
      label: "Notifications",
      icon: <IoIosNotificationsOutline />,
      path: "/notification",
      content: <Notification />,
    },
  ];

  // Sync tab with current URL
  useEffect(() => {
    const currentTabIndex = tabs.findIndex(
      (tab) => tab.path === location.pathname,
    );

    if (currentTabIndex !== -1) {
      setActiveTab(currentTabIndex);
    }
  }, [location.pathname]);

  const handleTabChange = (index, path) => {
    setActiveTab(index);
    navigate(path);
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Top Navbar */}

      <Header />

      {/* Main Layout */}
      <div className="flex h-screen   justify-between">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index, tab.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  activeTab === index
                    ? "bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-primary border-l-4 border-primary"
                    : "text-gray-950 dark:text-gray-400 hover:cursor-pointer hover:bg-primary dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>

                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 w-full p-6  transition-colors duration-300 ${
            theme === "dark" ? "bg-[#0b1729]" : "bg-amber-50/50 text-gray-950"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between w-full text-gray-700 dark:text-gray-500 font-semibold mb-2">
            <div>
              <span className="text-2xl">{tabs[activeTab].label}</span>
            </div>

            <Link to={"/notification"}>
              <button className=" hover:text-primary text-sm outline-none rounded-full flex cursor-pointer items-center gap-1 px-2">
                <FaUserFriends />

                <span>Friend Request</span>
              </button>
            </Link>
          </div>

          {/* Content */}
          <div className="text-gray   h-162.5 overflow-auto  dark:text-gray-400 leading-relaxed">
            {tabs[activeTab].content}
          </div>
        </div>
      </div>
    </div>
  );
}
