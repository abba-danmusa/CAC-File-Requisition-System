import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../utils/axios";

export const useSendRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["request"],
    mutationFn: async (data) => {
      return axios.post("/request", data);
    },
    onMutate: async (newRequest) => {
      await queryClient.cancelQueries(['requests'])
      const previousRequest = queryClient.getQueryData(['requests'])
      queryClient.setQueryData(['requests'], (oldQueryData) => {
        console.log(oldQueryData)
        return {
          ...oldQueryData,
          data: [...oldQueryData.data.requests, newRequest]
        }
      })
      return {previousRequest}
    },
    onError: (_error, _request, context) => {
      queryClient.setQueryData(['requests'], context.previousRequest)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['requests'])
    }
  })
}

export const useGetRequests = () => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      return axios.get("/request");
    },
    // refetchInterval: 1000,
    // refetchOnMount: true
  })
}