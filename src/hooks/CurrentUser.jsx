
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authApi.js";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUser,
    retry: false,
  });
};