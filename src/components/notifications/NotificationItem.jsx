import Box from '@mui/material/Box'
import { useNotificationStore } from '../../hooks/useNotificationStore'
import Typography from '@mui/material/Typography'
import CustomButton from './CustomButton'

// eslint-disable-next-line react/prop-types
const NotificationItem = ({ request }) => {
  
  const date = request?.requestStatus?.fileReturn?.timeElapse?.time
  const returnDate = new Date(date)

  const {setOpenBackdrop, setId, setModalTitle} = useNotificationStore()

  const moreTime = () => {
    setModalTitle('more')
    setId(request._id)
    setOpenBackdrop(true)
  }

  const returnFile = () => {
    setModalTitle('return')
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
      <Typography align='center' mb={2} color={'error'}>Remainder</Typography>
      <Typography mb={1}>{`${request?.companyName} `}</Typography>
      <Typography>Return Date Due</Typography>
      <Typography color='error'>{`${returnDate}`}</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 3
        }}
      >
        <CustomButton
          title={'return'}
          clickHandler={returnFile}
          type={'confirm'}
        />
        <CustomButton
          title={'more time?'}
          clickHandler={moreTime}
          type={'cancel'}
        />
      </Box>
    </Box>
  )
}

export default NotificationItem