import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import CustomModal from './CustomModal'
import { IconButton, Zoom } from "@mui/material"
import LightTooltip from './LightTooltip'

export default function ManagingAccountNotification() {
  return (
    <div>
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
    </div>
  )
}