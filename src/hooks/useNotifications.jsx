import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "../utils/axios"

export const useReturnNotification = () => {
  return useQuery({
    queryKey: ['return-files'],
    queryFn: async () => {
      return axios.get(`/notification/return/requests`)
    },
    
    refetchIntervalInBackground: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000  // refetch after every hour
  })
}