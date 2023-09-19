import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../utils/axios";
import {socket} from '../utils/socket.io'

const user = JSON.parse(localStorage.getItem('user'))

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
    onSuccess: (data) => {
      socket.emit('authorization notification', data.data.request, user)
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

export const useGetRequests = (page) => {
  return useQuery({
    queryKey: ["requests", page],
    queryFn: async () => {
      return axios.get(`/requests/${page}`)
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

export const usePendingAuthCounts = () => {
  return useQuery({
    queryKey: ['pending-authorization-count'],
    queryFn: async () => {
      return axios.get('/authorization/request/pending/count')
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
      await queryClient.cancelQueries(['pending-authorization-count'])
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
    onSuccess: (data) => {
      socket.emit('approval notification',
        data.data.request.from,
        data.data.request._id,
        data.data.request.requestStatus.authorization
      )
    },
    onError: (_error, _request, context) => {
      queryClient.setQueryData(['pending-authorization'], context.previousRequest)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['authorization-request'])
      queryClient.invalidateQueries(['pending-authorization'])
      queryClient.invalidateQueries(['pending-authorization-count'])
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
    onSuccess: (data) => {
      socket.emit('release notification',
        data.data.request.from,
        data.data.request._id,
        data.data.request.requestStatus.approval
      )
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
    onSuccess: data => {
      socket.emit('file notification',
        data.data.request.from,
        data.data.request._id,
        data.data.request.companyName
      )
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
    onSuccess: data => {
      const to = data.data.request.requestStatus.fileRelease.releasedBy._id
      const from = data.data.request.from.name
      const companyName = data.data.request.companyName
      socket.emit('receipt', to, from, companyName)
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

export const useReturnFile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['return-file'],
    mutationFn: async data => {
      return axios.post('/return/request', data)
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
    onSuccess: data => {
      const to = data.data.request.requestStatus.fileRelease.releasedBy._id
      const from = data.data.request.from.name
      const request = data.data.request
      socket.emit('return notification', to, from, request)
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

export const useAcknowledgeFileReturn = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['acknowledge-file-return'],
    mutationFn: async data => {
      return axios.post('/return/acknowledged', data)
    },
    onMutate: async (newRequest) => {
      await queryClient.cancelQueries(['returned-files'])
      await queryClient.cancelQueries(['searched-returned-files'])
      const previousLatestRequest = queryClient.getQueryData(['returned-file'])
      const previousRequests = queryClient.getQueryData(['searched-returned-files'])

      queryClient.setQueryData(['returned-file'], (oldQueryData) => {
        if (!previousLatestRequest) return null
        return {
          ...oldQueryData,
          data: [...oldQueryData.data.request, newRequest]
        }
      })

      queryClient.setQueryData(['searched-returned-files'], (oldQueryData) => {
        if (!previousRequests) return null
        return {
          ...oldQueryData,
          data: [...oldQueryData.data.requests, newRequest]
        }
      })
      return { previousRequests, previousLatestRequest }
    },
    onSuccess: data => {
      const to = data.data.request.requestStatus.fileRelease.releasedBy._id
      const from = data.data.request.from
      const request = data.data.request
      socket.emit('acknowledge', to, from, request)
    },
    onError: (_error, _request, context) => {
      queryClient.setQueryData(['returned-files'], context.previousLatestRequest)
      queryClient.setQueryData(['searched-returned-files'], context.previousRequests)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['returned-files'])
      queryClient.invalidateQueries(['searched-returned-files'])
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

export const useAuthorizedRequests = (page) => {
  return useQuery({
    queryKey: ['authorized-requests', page],
    queryFn: async () => {
      return axios.get(`/authorization/request/accepted/${page}`)
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useApprovedRequests = (page) => {
  return useQuery({
    queryKey: ['approved-requests', page],
    queryFn: async () => {
      return axios.get(`/approval/request/accepted/${page}`)
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useFilesReceived = (page) => {
  return useQuery({
    queryKey: ['authorized-requests', page],
    queryFn: async () => {
      return axios.get(`/receive/request/accepted/${page}`)
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

export const useAcceptedApprovalRequests = () => {
  return useQuery({
    queryKey: ['accepted-approval-requests'],
    queryFn: async () => {
      return axios.get('/approval/account/approved/request')
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useRejectedApprovalRequests = () => {
  return useQuery({
    queryKey: ['rejected-approval-requests'],
    queryFn: async () => {
      return axios.get('/approval/account/disapproved/request')
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useApprovalRequests = () => {
  return useQuery({
    queryKey: ['all-approval-requests'],
    queryFn: async () => {
      return axios.get('/approval/account/request')
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useReleasedFiles = () => {
  return useQuery({
    queryKey: ['released-files'],
    queryFn: async () => {
      return axios.get('/release/section/release/request')
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useReleaseFiles = () => {
  return useQuery({
    queryKey: ['release-files'],
    queryFn: async () => {
      return axios.get('/release/section/request')
    },
    retry: 1,
    refetchOnMount: true
  })
}

export const useFilesReturned = (page) => {
  return useQuery({
    queryKey: ['returned-files'],
    queryFn: async () => {
      return axios.get(`/return/section/returned/request/${page}`)
    },
    retry: 1,
    refetchOnMount: true
  })
}