import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import { IconButton, Zoom} from "@mui/material"
import { useReturnNotification } from '../../hooks/useNotifications';
import {useNotificationStore} from '../../hooks/useNotificationStore'
import { useReturnFile, useRequestAdditionalTime } from '../../hooks/useRequest'
import CustomModal from './CustomModal'
import NotificationContent from './NotificationContent'
import LightTooltip from './LightTooltip'
import { toast } from 'react-toastify'

function RequestAccountNotification() {
  
  const { data, refetch } = useReturnNotification()
  const numberOfNotifications = data?.data?.requests?.length

  const { mutate } = useReturnFile()
  const { mutate: request } = useRequestAdditionalTime()
  
  const { modal, id, setId, setOpenBackdrop, reason, remarks, setReason, setRemarks} = useNotificationStore()
  
  const closeModal = () => {
    setOpenBackdrop(false)
  }

  const returnFile = () => {
    mutate({ id, remarks })
    // found out that calling refetch immediately after mutate doesn't get the new data. so wait after .2.5 secs before refetching.
    setTimeout(() => {
      refetch()
    }, 2500)
    setId('')
    setOpenBackdrop(false)
  }

  const requestAdditionalTime = () => {
    if (!reason) {
      return toast.
        warn('Please provide a reason why you\'d like additional time')
    }
    request({id, reason})
    // found out that calling refetch immediately after mutate doesn't get the new data. so wait after 2.5 secs before refetching.
    setTimeout(() => {
      refetch()
    }, 2500)
    setId('')
    setOpenBackdrop(false)
  }

  const moreTimeTitle = 'You are about to request for more time from the RMD'
  const returnTitle = 'You are about to return this  file'
  const selectedModal = {
    return: <CustomModal
      submit={returnFile}
      cancel={closeModal}
      title={returnTitle}
      inputValue={remarks}
      setInputValue={setRemarks}
      placeholder={'Remarks? (Optional)'}
    />,
    more: <CustomModal
      submit={requestAdditionalTime}
      cancel={closeModal}
      title={moreTimeTitle}
      inputValue={reason}
      setInputValue={setReason}
      placeholder={'Reason (Required)'}
    />
  }[modal]

  return (
    <>
      {selectedModal}
      <LightTooltip
        title={
          <NotificationContent requests={data?.data?.requests}/>
        }
        placement={'left-end'}
        transitionComponent={Zoom}
      >
        <IconButton >
          <Badge badgeContent={numberOfNotifications} color="error">
            <NotificationsIcon sx={{color: 'primary.contrastText'}}/>
          </Badge>
        </IconButton>
      </LightTooltip>
    </>
  )
}

export default RequestAccountNotification