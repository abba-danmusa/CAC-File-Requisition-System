import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "../utils/axios"

export const useAuthorizationNotification = () => {
  return useQuery({
    queryKey: ['authorization-notification'],
    queryFn: async () => {
      return axios.get('/notification/authorization')
    },
    refetchInterval: 2000,
    refetchIntervalInBackground: true
  })
}