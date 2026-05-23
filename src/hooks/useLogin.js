import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authApi.js";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
