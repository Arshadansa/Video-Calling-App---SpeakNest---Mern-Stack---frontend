import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/authApi.js";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};

