import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import RequestAccountNotificationItem from './NotificationItem'

// eslint-disable-next-line react/prop-types
const NotificationItems = ({ request }) => {
  
  const User = JSON.parse(localStorage.getItem('user'))
  
  const item = {
    'Request Account':  <RequestAccountNotificationItem request={request} />,
    'Managing Account': <ManagingAccountNotificationItem request={request} />,
    'Approval Account': <ApprovalAccountNotificationItem request={request}/>
  }[User.accountType]

  return item
}

// eslint-disable-next-line react/prop-types
const NotificationContent = ({ requests }) => {

  return (
    <Box sx={{padding: 1, borderRadius: 2}}>
      <Stack spacing={2}>
        {
          // eslint-disable-next-line react/prop-types
          requests?.map(request =>
            <NotificationItems key={request._id} request={request} />
          )
        }
        {
          // eslint-disable-next-line react/prop-types
          !requests?.length && <Typography align='center' color='error'>
            No Notifications
          </Typography>
        }
      </Stack>
    </Box>
  )
}

import { useNotificationStore } from '../../hooks/useNotificationStore'
import CustomButton from './CustomButton'
import { Divider } from '@mui/material'

// eslint-disable-next-line react/prop-types
const ManagingAccountNotificationItem = ({ request }) => {

  const {setOpenBackdrop, setId} = useNotificationStore()

  const openModal = () => {
    setId(request._id)
    setOpenBackdrop(true)
  }

  return (
    <Box
      sx={{
        boxShadow: 2,
        padding: 2,
        borderRadius: 2
      }}>
      <Typography align='center' mb={2} color={'error'}>File Return</Typography>
      <Typography mb={1}>{`${request?.companyName} `}</Typography>
      <Divider/>
      <Typography mt={1} fontWeight={300} fontSize={13}>From</Typography>
      <Typography color='success' fontSize={12}>
        {`${request.from.name}`}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 3
        }}
      >
        <CustomButton
          title={'acknowledge'}
          clickHandler={openModal}
          type={'confirm'}
        />
      </Box>
    </Box>
  )
}

// eslint-disable-next-line react/prop-types
const ApprovalAccountNotificationItem = ({ request }) => {
  
  const {setOpenBackdrop, setId, setModal} = useNotificationStore()

  const openApproveModal = () => {
    setId(request._id)
    setModal('approve')
    setOpenBackdrop(true)
  }

  const openDisapproveModal = () => {
    setId(request._id)
    setModal('disapprove')
    setOpenBackdrop(true)
  }

  return (
    <Box
      sx={{
        boxShadow: 2,
        padding: 2,
        borderRadius: 2
      }}>
      <Typography align='center' mb={2} color={'error'}>
        Additional Time Request
      </Typography>
      <Typography mb={1}>{`${request?.companyName} `}</Typography>
      <Divider />
      <Typography mt={1} fontWeight={400} fontSize={13}>Reason</Typography>
      <Typography my={1} fontWeight={400} fontSize={13}>
        {`${request?.moreTimeRequest?.reason}`}
      </Typography>
      <Divider />
      <Typography my={1} fontWeight={300} fontSize={13}>From</Typography>
      <Typography my={1} color='success' fontSize={12}>
        {`${request.from.name}`}
      </Typography>
      <Divider my={1} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 3
        }}
      >
        <CustomButton
          title={'approve'}
          clickHandler={openApproveModal}
          type={'confirm'}
        />
        <CustomButton
          title={'disapprove'}
          clickHandler={openDisapproveModal}
          type={'cancel'}
        />
      </Box>
    </Box>
  )
}

export default NotificationContent