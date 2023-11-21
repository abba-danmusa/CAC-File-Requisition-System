import Box from '@mui/material/Box'
import { useNotificationStore } from '../../hooks/useNotificationStore'
import Typography from '@mui/material/Typography'
import CustomButton from './CustomButton'
import { Divider } from '@mui/material'

// eslint-disable-next-line react/prop-types
const NotificationItem = ({ request }) => {
  
  const date = request?.requestStatus?.fileReturn?.timeElapse?.time
  const returnDate = new Date(date)

  const {setOpenBackdrop, setId, setModal} = useNotificationStore()

  const moreTime = () => {
    setId(request._id)
    setModal('more')
    setOpenBackdrop(true)
  }

  const returnFile = () => {
    setId(request._id)
    setModal('return')
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
      <Divider/>
      <Typography mt={1} fontWeight={300} fontSize={13}>Return Date</Typography>
      <Typography color='error' fontSize={12}>{`${returnDate}`}</Typography>
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