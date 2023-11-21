import { useQuery} from "@tanstack/react-query"
import axios from "../utils/axios"
import { toast } from "react-toastify"

const message = number => {
  toast.info(
    `You have ${number} Notification(s). Please check them out`,
    { position: 'bottom-right' }
  )
}

export const useReturnNotification = () => {
  return useQuery({
    queryKey: ['return-files'],
    queryFn: async () => {
      return axios.get(`/notification/return/requests`)
    },
    onSuccess: data => {
      if (data?.data.requests.length) {
        message(data?.data.requests.length)
      }
    },
    refetchIntervalInBackground: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000  // refetch after every hour
  })
}

export const useFileReturnNotification = () => {
  return useQuery({
    queryKey: ['file-return-notification'],
    queryFn: async () => {
      return axios.get('/notification/file/return')
    },
    onSuccess: data => {
      if (data?.data.requests.length) {
        message(data?.data.requests.length)
      }
    },
    refetchIntervalInBackground: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000  // refetch after every 5 minutes
  })
}

export const useManagingAccountNotifications = () => {
  return useQuery({
    queryKey: ['managing-account-notifications'],
    queryFn: async () => {
      return axios.get('/notification/account/managing')
    },
    onSuccess: data => {
      if (data?.data.requests.length) {
        message(data?.data.requests.length)
      }
    },
    refetchIntervalInBackground: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000  // refetch after every 5 minutes
  })
}

export const useApprovalAccountNotifications = () => {
  return useQuery({
    queryKey: ['approval-account-notifications'],
    queryFn: async () => {
      return axios.get('/notification/account/approval')
    },
    onSuccess: data => {
      if (data?.data.requests.length) {
        message(data?.data.requests.length)
      }
    },
    refetchIntervalInBackground: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000  // refetch after every 5 minutes
  })
}