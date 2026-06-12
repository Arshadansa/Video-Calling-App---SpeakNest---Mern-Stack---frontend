import React from "react";
import { FaStarOfLife } from "react-icons/fa6";

function Loader() {
  return (
    <span className="animate-spin  duration-1000 ease-in-out inline-flex">
      <FaStarOfLife className="text-primary" size={33} />
    </span>
  );
}

export default Loader;
