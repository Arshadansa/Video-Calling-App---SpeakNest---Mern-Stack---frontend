import { IoVideocamOutline } from "react-icons/io5";

function CallButton({ handleVideoCall }) {
  return (
    <div className="absolute top-5 right-18 z-10">
      <button
        onClick={handleVideoCall}
        className="btn btn-success btn-sm text-black"
      >
        <IoVideocamOutline  className="cursor-pointer" size={32} />
      </button>
    </div>
  );
}

export default CallButton;
