import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import NotificationItem from './NotificationItem'

// eslint-disable-next-line react/prop-types
const NotificationContent = ({requests}) => {
  return (
    <Box sx={{padding: 1, borderRadius: 2}}>
      <Stack spacing={2}>
        {
          // eslint-disable-next-line react/prop-types
          requests?.map(request =>
            <NotificationItem key={request._id} request={request} />        
          )
        }
        {
          // eslint-disable-next-line react/prop-types
          !requests.length && <Typography align='center' color='error'>
            No Notifications
          </Typography>
        }
      </Stack>
    </Box>
  )
}

export default NotificationContent