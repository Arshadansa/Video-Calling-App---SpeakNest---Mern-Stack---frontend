import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserFriends,
  getRecommededUsers,
  sendFriendRequest,
  outGoingFriendReqs,
} from "../services/authApi.js";

export const useUserFriends = () => {
  return useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
    retry: false,
  });
};

export const useUserRecommedFriends = () => {
  return useQuery({
    queryKey: ["recommedFriends"],
    queryFn: getRecommededUsers,
    retry: false,
  });
};

export const useOutGoingFriendReqs = () => {
  return useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: outGoingFriendReqs,
    retry: false,
  });
};


export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendFriendRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["outgoingFriendReqs"],
      });
    },
  });
};
