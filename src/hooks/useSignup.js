

import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../services/authApi.js";

export const useSignup = () => {
  return useMutation({
    mutationFn: signupUser,
  });
};