import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import { IconButton, Paper, Zoom} from "@mui/material"
import { useReturnNotification } from '../../hooks/useNotifications';
import {useNotificationStore} from '../../hooks/useNotificationStore'
import { useReturnFile } from '../../hooks/useRequest'
import { styled } from '@mui/material/styles'
import CustomModal from './CustomModal'
import NotificationContent from './NotificationContent'
import LightTooltip from './LightTooltip'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

function RequestAccountNotification() {
  const { data } = useReturnNotification()
  const {mutate, isSuccess, data: successMessage, isError, error} = useReturnFile()
  const { modalTitle, id, setOpenBackdrop } = useNotificationStore()
  
  const cancel = () => {
    setOpenBackdrop(false)
  }

  const submit = () => {
    if (modalTitle == 'return') {
      mutate({ id })
      setOpenBackdrop(false)
      return
    }
  }
  const numberOfNotifications = data?.data.requests.length

  return (
    <>
      <CustomModal
        submit={submit}
        cancel={cancel}
        isSuccess={isSuccess}
        successMessage={successMessage?.data.message}
        isError={isError}
        errorMessage={error?.message}
      />
      <LightTooltip
        title={<NotificationContent requests={ data?.data?.requests} />}
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