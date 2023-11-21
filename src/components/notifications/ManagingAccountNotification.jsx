import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import CustomModal from './CustomModal'
import { IconButton, Zoom } from "@mui/material"
import LightTooltip from './LightTooltip'
import NotificationContent from './NotificationContent'
import { useManagingAccountNotifications } from '../../hooks/useNotifications'
import { useNotificationStore } from '../../hooks/useNotificationStore'
import { useAcknowledgeFileReturn } from '../../hooks/useRequest'

export default function ManagingAccountNotification() {
  
  const {data, refetch: refetchNotifications} = useManagingAccountNotifications()
  const { id, setId, setOpenBackdrop, remarks, setRemarks} = useNotificationStore()
  const { mutate } = useAcknowledgeFileReturn()
  
  const title = 'Please make sure that you have received the file before confirming'
  const cancel = () => {
    setId('')
    setOpenBackdrop(false)
  }
  const acknowledgeReceipt = () => {
    mutate({ id })
    setOpenBackdrop(false)
    setTimeout(() => {
      refetchNotifications()
    }, 2000)
  }

  return (
    <>
      <CustomModal
        submit={acknowledgeReceipt}
        cancel={cancel}
        title={title}
        inputValue={remarks}
        setInputValue={setRemarks}
        placeholder={'Remarks (Optional)'}
      />
      <LightTooltip
        title={<NotificationContent requests={ data?.data?.requests} />}
        placement={'left-end'}
        transitioncomponent={Zoom}
      >
        <IconButton >
          <Badge badgeContent={data?.data.requests.length} color="error">
            <NotificationsIcon sx={{color: 'primary.contrastText'}}/>
          </Badge>
        </IconButton>
      </LightTooltip>
    </>
  )
}