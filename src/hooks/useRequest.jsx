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
      return axios.get("/requests");
    },
    // refetchInterval: 1000,
    // refetchOnMount: true
  })
}

export const useGetPendingAuthRequests = () => {
  return useQuery({
    queryKey: ['pending-authorization'],
    queryFn: async () => {
      return axios.get('/authorization/request/pending')
    },
    retry: 1
  })
}

export const useGetAuthRequests = () => {
  return useQuery({
    queryKey: ['authorization-request'],
    queryFn: async () => {
      return axios.get('/authorization/request')
    },
    retry: 1
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
      await queryClient.cancelQueries(['authorization-request'])
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
      queryClient.invalidateQueries(['authorization-request'])
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

export const usePendingApproval = () => {
  return useQuery({
    queryKey: ['pending-approval'],
    queryFn: async () => {
      return axios.get('/approval/request')
    },
    retry: 1
  })
}

export const usePendingApprovals = () => {
  return useQuery({
    queryKey: ['pending-approvals'],
    queryFn: async () => {
      return axios.get('/approval/requests')
    }
  })
}

export const useApproveRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['approve-request'],
    mutationFn: async data => {
      return axios.post('/approval/request', data)
    },
    onMutate: async (newRequest) => {
      await queryClient.cancelQueries(['pending-approvals'])
      await queryClient.cancelQueries(['pending-approval'])
      await queryClient.cancelQueries(["pending-approval-count"])
      const previousRequest = queryClient.getQueryData(['pending-approvals'])
      
      queryClient.setQueryData(['pending-approvals'], (oldQueryData) => {
        if (!previousRequest) return null
        return {
          ...oldQueryData,
          data: [...oldQueryData.data.requests, newRequest]
        }
      })
      return {previousRequest}
    },
    onError: (_error, _request, context) => {
      queryClient.setQueryData(['pending-approvals'], context.previousRequest)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['pending-approvals'])
      queryClient.invalidateQueries(['pending-approval'])
      queryClient.invalidateQueries(["pending-approval-count"])
    }
  })
}

export const usePendingApprovalCount = () => {
  return useQuery({
    queryKey: ['pending-approval-count'],
    queryFn: async () => {
      return axios.get('/approval/pending')
    }
  })
}

export const usePendingFileRelease = () => {
  return useQuery({
    queryKey: ['pending-file-release'],
    queryFn: async () => {
      return axios.get('/release/request')
    },
    retry: 1
  })
}

export const usePendingReleaseCount = () => {
  return useQuery({
    queryKey: ['pending-release-count'],
    queryFn: async () => {
      return axios.get('/release/pending')
    }
  })
}

export const usePendingReleases = () => {
  return useQuery({
    queryKey: ['pending-releases'],
    queryFn: async () => {
      return axios.get('/release/requests')
    }
  })
}

export const useSendFile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['release-request'],
    mutationFn: async data => {
      return axios.post('/release/request', data)
    },
    onMutate: async (newRequest) => {
      await queryClient.cancelQueries(['pending-releases'])
      await queryClient.cancelQueries(['pending-file-release'])
      await queryClient.cancelQueries(['pending-release-count'])
      const previousRequest = queryClient.getQueryData(['pending-releases'])
      
      queryClient.setQueryData(['pending-releases'], (oldQueryData) => {
        if (!previousRequest) return null
        return {
          ...oldQueryData,
          data: [...oldQueryData.data.requests, newRequest]
        }
      })
      return { previousRequest }
    },
    onError: (_error, _request, context) => {
      queryClient.setQueryData(['pending-releases'], context.previousRequest)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['pending-releases'])
      queryClient.invalidateQueries(['pending-file-release'])
      queryClient.invalidateQueries(['pending-release-count'])
    }
  })
}

export const useConfirmReceipt = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['receive-request'],
    mutationFn: async data => {
      return axios.post('/receive/request', data)
    },
    onMutate: async (newRequest) => {
      await queryClient.cancelQueries(['latest-request'])
      await queryClient.cancelQueries(['requests'])
      const previousLatestRequest = queryClient.getQueryData(['latest-request'])
      const previousRequests = queryClient.getQueryData(['requests'])

      queryClient.setQueryData(['latest-request'], (oldQueryData) => {
        if (!previousLatestRequest) return null
        return {
          ...oldQueryData,
          data: [...oldQueryData.data.request, newRequest]
        }
      })

      queryClient.setQueryData(['requests'], (oldQueryData) => {
        if (!previousRequests) return null
        return {
          ...oldQueryData,
          data: [...oldQueryData.data.requests, newRequest]
        }
      })
      return { previousRequests, previousLatestRequest }
    },
    onError: (_error, _request, context) => {
      queryClient.setQueryData(['latest-request'], context.previousLatestRequest)
      queryClient.setQueryData(['requests'], context.previousRequests)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['latest-request'])
      queryClient.invalidateQueries(['requests'])
    }
  })
}

export const useAwaitAuthorization = () => {
  return useQuery({
    queryKey: ['await-authorization'],
    queryFn: async () => {
      return axios.get('/authorization/requests/pending')
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useAwaitApproval = () => {
  return useQuery({
    queryKey: ['await-approval'],
    queryFn: async () => {
      return axios.get('/approval/requests/pending')
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useAuthorizedRequests = () => {
  return useQuery({
    queryKey: ['authorized-requests'],
    queryFn: async () => {
      return axios.get('/authorization/request/accepted')
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useApprovedRequests = () => {
  return useQuery({
    queryKey: ['approved-requests'],
    queryFn: async () => {
      return axios.get('/approval/request/accepted')
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useFilesReceived = () => {
  return useQuery({
    queryKey: ['authorized-requests'],
    queryFn: async () => {
      return axios.get('/receive/request/accepted')
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useAcceptedAuthorizationRequests = () => {
  return useQuery({
    queryKey: ['accepted-authorization-requests'],
    queryFn: async () => {
      return axios.get('/authorization/department/accepted/request')
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useDeclinedAuthorizationRequests = () => {
  return useQuery({
    queryKey: ['declined-authorization-requests'],
    queryFn: async () => {
      return axios.get('/authorization/department/declined/request')
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useAllAuthorizationRequests = () => {
  return useQuery({
    queryKey: ['all-authorization-requests'],
    queryFn: async () => {
      return axios.get('/authorization/department/request')
    },
    retry: 1,
    refetchOnMount: true
  })
}