import RequestAccountNotification from "./RequestAccountNotification"
import ManagingAccountNotification from "./ManagingAccountNotification"

// eslint-disable-next-line react/prop-types
function Notifications({ accountType }) {
  const notification = {
    'Request Account': <RequestAccountNotification />,
    'Managing Account': <ManagingAccountNotification/>,
  }[accountType]

  return notification
}

export default Notifications