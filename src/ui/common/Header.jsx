import React from "react";
import { AiFillMoon } from "react-icons/ai";
import { FaStarOfLife } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";
import CustomImage from "./CustomImage";
import { TbLogout } from "react-icons/tb";
import { useTheme } from "../../Context/ThemeContext";
import { useCurrentUser } from "../../hooks/CurrentUser";
import {Link, useNavigate} from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { toast } from "react-toastify";
function Header() {
  const { theme, toggleTheme } = useTheme();
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: logout } = useLogout();
 const navigate = useNavigate();
 
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
    <div className="flex  w-full p-4 items-center gap-12 justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <span className="animate-spin duration-1000 ease-in-out inline-flex">
          <FaStarOfLife className="text-primary" size={33} />
        </span>

        <span className="text-3xl font-medium text-primary">SpeakNest</span>
      </Link>

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
  );
}

export default Header;
