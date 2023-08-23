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
      await queryClient.cancelQueries(['latest-request'])
      const previousRequest = queryClient.getQueryData(['requests'])
      
      queryClient.setQueryData(['requests'], (oldQueryData) => {
        if (!previousRequest) return null
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
      queryClient.invalidateQueries(['latest-request'])
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

export const useGetPendingAuthRequests = () => {
  return useQuery({
    queryKey: ['pending-authorization'],
    queryFn: async () => {
      return axios.get('/authorization/request')
    }
  })
}

export const useGetAuthRequests = () => {
  return useQuery({
    queryKey: ['authorization-request'],
    queryFn: async () => {
      return axios.get('/authorization/requests')
    }
  })
}

export const useAuthorizeRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['authorize-request'],
    mutationFn: async data => {
      return axios.post('/authorization/request', data)
    },
    onMutate: async (newRequest) => {
      await queryClient.cancelQueries(['pending-authorization'])
      const previousRequest = queryClient.getQueryData(['pending-authorization'])
      
      queryClient.setQueryData(['pending-authorization'], (oldQueryData) => {
        if (!previousRequest) return null
        return {
          ...oldQueryData,
          data: [...oldQueryData.data.requests, newRequest]
        }
      })
      return {previousRequest}
    },
    onError: (_error, _request, context) => {
      queryClient.setQueryData(['pending-authorization'], context.previousRequest)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['pending-authorization'])
    }
  })
}

export const useLatestRequestStatus = () => {
  return useQuery({
    queryKey: ['latest-request'],
    queryFn: async () => {
      return axios.get('/request/status')
    }  
  })
}