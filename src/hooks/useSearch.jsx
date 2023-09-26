import { useQuery } from "@tanstack/react-query"
import axios from "../utils/axios"
import Alert from '../components/Alert'

export const useRequestAccountSearch = (value) => {
  return useQuery({
    queryKey: ['request-account-search'],
    queryFn: async () => {
      return axios.get(`/request/account/search?query=${value}`)
    },
    retry: 1,
    refetchOnMount: true,
    enabled: false
  })
}

export const useAuthorizationAccountSearch = (value) => {
  return useQuery({
    queryKey: ['authorization-account-search'],
    queryFn: async () => {
      return axios.get(`/authorization/account/search?query=${value}`)
    },
    retry: 1,
    refetchOnMount: true,
    enabled: false
  })
}

export const useApprovalAccountSearch = (value) => {
  return useQuery({
    queryKey: ['approval-account-search'],
    queryFn: async () => {
      return axios.get(`/approval/account/search?query=${value}`)
    },
    retry: 1,
    refetchOnMount: true,
    enabled: false
  })
}

export const useManageAccountSearch = (value) => {
  return useQuery({
    queryKey: ['manage-account-search'],
    queryFn: async () => {
      return axios.get(`/manage/account/search?query=${value}`)
    },
    retry: 1,
    refetchOnMount: true,
    enabled: false
  })
}

export const useReturnedFilesSearch = (value) => {
  return useQuery({
    queryKey: ['searched-returned-files'],
    queryFn: async () => {
      return axios.get(`/manage/account/search?query=${value}`)
    },
    retry: 1,
    refetchOnMount: true,
    enabled: false
  })
}

export const useReceivedFilesSearch = (value) => {
  return useQuery({
    queryKey: ['searched-received-files'],
    queryFn: async () => {
      return axios.get(`/request/account/receive/search?query=${value}`)
    },
    onError: error => {
      return <Alert severity={'error'} message={error.response.data.message} />
    },
    retry: 1,
    refetchOnMount: true,
    enabled: false
  })
}