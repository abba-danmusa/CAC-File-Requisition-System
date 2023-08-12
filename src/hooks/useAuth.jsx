import { useMutation } from "@tanstack/react-query";
import axios from "../utils/axios";

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data) => {
      return axios.post("/signup", data);
    }
  })
}

export const useSignin = () => {
  return useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data) => {
      return axios.post("/signin", data);
    }
  })
}