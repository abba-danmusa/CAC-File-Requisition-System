import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import { Box, IconButton, Stack, Paper, Zoom} from "@mui/material"
import { styled } from '@mui/material/styles';
import Tooltip, {tooltipClasses } from '@mui/material/Tooltip';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[10],
    fontSize: 15,
    width: 500,
    height: 600,
    // overflowY: 'scroll',
  },
}))

function RequestAccountNotification() {
  return (
    <LightTooltip
      title={<NotificationContent />}
      placement={'left-end'}
      transitionComponent={Zoom}
    >
      <IconButton >
        <Badge badgeContent={10} color="error">
          <NotificationsIcon sx={{color: 'primary.contrastText'}}/>
        </Badge>
      </IconButton>
    </LightTooltip>
  )
}

const NotificationContent = () => {
  return (
    <Box sx={{padding: 2, borderRadius: 2}}>
      <Stack spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 1</Item>
        <Item>Item 1</Item>
      </Stack>
    </Box>
  )
}
export default RequestAccountNotification