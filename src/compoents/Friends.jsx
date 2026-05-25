import React from "react";
import { useUserFriends, useUserRecommedFriends } from "../hooks/useUsers.js";
import { FriendCard, Loader, NoFriends, RecommedFriendCard } from "../ui";

function Friends() {
  const { data: friends = [], isLoading: loadingFriends } = useUserFriends();
  const { data: recommedFriends = [], isLoading: loadingRecommedFriends } =
    useUserRecommedFriends();

  const friendsPara = {
    friendTitle: "No friends yet",
    friendDesc:
      "connect with language partners below to start practicing together!",
    recomFriendTitle: "No recommedations available",
    recomFriendDesc: "Check back later for new language partner!",
  };

  return (
    <div>
      {loadingFriends ? (
        <div>
          <Loader />
        </div>
      ) : friends?.data?.userFriends?.length === 0 ? (
        <NoFriends
          friendTitle={friendsPara.friendTitle}
          descTitle={friendsPara.friendDesc}
        />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {friends?.data?.userFriends?.map((friend) => {
            <FriendCard key={friend._id} friend={friend} />;
          })}
        </div>
      )}
      <section className="mt-6">
        <div className="flex flex-col mb-3">
          <span className="text-2xl text-gray-500 font-bold">
            Meet New Learners
          </span>
          <span className="text-sm">
            Discover perfect language exchange partner based on your profile
          </span>
        </div>
        {loadingRecommedFriends ? (
          <div>
            <Loader />
          </div>
        ) : recommedFriends?.data?.recommendedUsers?.length === 0 ? (
          <NoFriends
            friendTitle={friendsPara.recomFriendTitle}
            descTitle={friendsPara.recomFriendDesc}
          />
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {recommedFriends?.data?.recommendedUsers?.map((friend) => (
              <RecommedFriendCard key={friend._id} Recommfriend={friend} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Friends;
