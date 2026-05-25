"use client";

import { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useCurrentUser } from "../hooks/CurrentUser";
import { CustomImage, Notification } from "../ui";
import { AiFillMoon } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaStarOfLife } from "react-icons/fa6";
import { useLogout } from "../hooks/useLogout";
import { toast } from "react-toastify";
import {
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { MdWbSunny } from "react-icons/md";
import { useTheme } from "../Context/ThemeContext";
import Friends from "./Friends";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const { data: user, isLoading } = useCurrentUser();
  const { mutate: logout } = useLogout();
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
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
      (tab) => tab.path === location.pathname
    );

    if (currentTabIndex !== -1) {
      setActiveTab(currentTabIndex);
    }
  }, [location.pathname]);

  const handleTabChange = (index, path) => {
    setActiveTab(index);
    navigate(path);
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout successful");
        navigate("/login");
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || "Logout failed");
      },
    });
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Top Navbar */}
      <div className="flex w-full p-4 items-center gap-12 justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="animate-spin duration-1000 ease-in-out inline-flex">
            <FaStarOfLife className="text-primary" size={33} />
          </span>

          <span className="text-3xl font-medium text-primary">
            SpeakNest
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex justify-end min-w-6xl">
          <div className="gap-8 flex items-center justify-center text-gray-400 dark:text-gray-500">
            {/* Notification Icon */}
            <p>
              <IoNotificationsOutline
                size={25}
                className="cursor-pointer hover:text-primary"
              />
            </p>

            {/* Theme Toggle */}
            <p>
              {theme === "light" ? (
                <AiFillMoon
                  onClick={toggleTheme}
                  size={25}
                  className="cursor-pointer hover:text-primary"
                />
              ) : (
                <MdWbSunny
                  onClick={toggleTheme}
                  size={25}
                  className="cursor-pointer hover:text-primary"
                />
              )}
            </p>

            {/* User Profile */}
            <p>
              <CustomImage
                src={user?.data?.profilePic}
                alt="User Avatar"
                className="w-6 h-6 border hover:text-primary cursor-pointer bg-white rounded-full object-cover"
              />
            </p>

            {/* Logout */}
            <p>
              <TbLogout
                onClick={handleLogout}
                size={25}
                className="cursor-pointer hover:text-primary"
              />
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-screen justify-between">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() =>
                  handleTabChange(index, tab.path)
                }
                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  activeTab === index
                    ? "bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-primary border-l-4 border-primary"
                    : "text-gray-950 dark:text-gray-400 hover:cursor-pointer hover:bg-primary dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>

                <span className="font-medium">
                  {tab.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 w-full p-6 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-[#0b1729]"
              : "bg-amber-50/50 text-gray-950"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between w-full text-gray-700 dark:text-gray-500 font-semibold mb-2">
            <div>
              <span className="text-2xl">
                {tabs[activeTab].label}
              </span>
            </div>

            <Link to={"/notification"}>
              <button className="border hover:text-primary text-sm outline-none rounded-full flex cursor-pointer items-center gap-1 px-2">
                <FaUserFriends />

                <span>Friend Request</span>
              </button>
            </Link>
          </div>

          {/* Content */}
          <div className="text-gray dark:text-gray-400 leading-relaxed">
            {tabs[activeTab].content}
          </div>
        </div>
      </div>
    </div>
  );
}