import RequestAccountNotification from "./RequestAccountNotification"
import ManagingAccountNotification from "./ManagingAccountNotification"
import ApprovalAccountNotification from "./ApprovalAccountNotification"

// eslint-disable-next-line react/prop-types
function Notifications({ accountType }) {
  const notification = {
    'Request Account': <RequestAccountNotification />,
    'Managing Account': <ManagingAccountNotification/>,
    'Approval Account': <ApprovalAccountNotification/>,
  }[accountType]

  return notification
}

export default Notifications