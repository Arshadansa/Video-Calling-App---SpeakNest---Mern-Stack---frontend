import { useMutation } from "@tanstack/react-query";
import { onboardUser } from "../services/authApi.js";

export const useOnboard = () => {
  return useMutation({
    mutationFn: onboardUser,
  });
};
