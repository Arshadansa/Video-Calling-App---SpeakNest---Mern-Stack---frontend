import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { FriendRequestCard, Loader } from "../ui";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useGetFriendRequest } from "../hooks/useUsers";

function Notification() {
  const { data: friendRequests, isLoading } = useGetFriendRequest();
  console.log("friendReaquest:", friendRequests);
  const incoimmingRequest = friendRequests?.data?.incommingRequests || [];
  const acceptRequest = friendRequests?.data?.acceptedRequests || [];

  return (
    <div className="p-3">
      <div className="flex flex-col  mx-auto max-w-3xl  gap-2">
        <div className="flex items-center gap-2">
          <FaUserFriends />
          <span>Friend Requests ({incoimmingRequest?.length})</span>
        </div>

        <div>
          {isLoading ? (
            <Loader />
          ) : incoimmingRequest.length > 0 ? (
            incoimmingRequest.map((request) => (
              <FriendRequestCard
                key={request._id}
                data={request}
                button={true}
                language={true}
              />
            ))
          ) : (
            <p>No friend requests</p>
          )}
        </div>

        

        {/* {acceptRequest.length > 0 && ( */}
          <section>
            <div className="flex mt-8 items-center gap-2">
              <IoIosNotificationsOutline size={24} />
              <span>New Connections ({acceptRequest.length})</span>
            </div>

            <div className="p-2">
              {isLoading ? (
                <Loader />
              ) : acceptRequest.length > 0 ? (
                acceptRequest.map((accept) => (
                  <FriendRequestCard
                    key={accept._id}
                    data={accept}
                    button={false}
                    language={false}
                  />
                ))
              ) : (
                <p>No new connections</p>
              )}
            </div>
          </section>
        {/* )} */}
      </div>
    </div>
  );
}

export default Notification;
