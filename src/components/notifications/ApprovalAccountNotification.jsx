import CustomModal from './CustomModal'
import NotificationContent from './NotificationContent'
import { Badge, IconButton, Zoom} from "@mui/material"
import LightTooltip from './LightTooltip'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {useApprovalAccountNotifications} from '../../hooks/useNotifications'
import { useNotificationStore } from '../../hooks/useNotificationStore'
import { useApproveAdditionalTimeRequest } from '../../hooks/useRequest'
function ApprovalAccountNotification() {
  
  const { data, refetch } = useApprovalAccountNotifications()
  const {mutate} = useApproveAdditionalTimeRequest()
  const { remarks, setRemarks, setOpenBackdrop, setId, id, modal } = useNotificationStore()

  
  const numberOfNotifications = data?.data.requests.length
  const approveTitle = 'You Are About To Approve This Request'
  const disapproveTitle = 'You Are About To Disapprove This Request'
  const placeholder = 'Remarks? (Optional)'

  const closeModal = () => {
    setId('')
    setOpenBackdrop(false)
  }

  const approve = () => {
    mutate({ id, remarks, status: 'accepted' })
    // found out that calling refetch immediately after mutate doesn't get the new data. so wait after 2.5 secs before refetching.
    setTimeout(() => {
      refetch()
    }, 2500)
    setId('')
    setOpenBackdrop(false)
  }

  const disapprove = () => {
    mutate({ id, remarks, status: 'rejected' })
    // found out that calling refetch immediately after mutate doesn't get the new data. so wait after 2.5 secs before refetching.
    setTimeout(() => {
      refetch()
    }, 2500)
    setId('')
    setOpenBackdrop(false)
  }
  
  const selectedModal = {
    approve: <CustomModal
      title={approveTitle}
      inputValue={remarks}
      setInputValue={setRemarks}
      submit={approve}
      cancel={closeModal}
      placeholder={placeholder}
    />,
    disapprove: <CustomModal
      title={disapproveTitle}
      inputValue={remarks}
      setInputValue={setRemarks}
      submit={disapprove}
      cancel={closeModal}
      placeholder={placeholder}
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

export default ApprovalAccountNotification