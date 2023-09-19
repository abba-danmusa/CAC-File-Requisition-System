import RequestAccountNotification from "./RequestAccountNotification"

// eslint-disable-next-line react/prop-types
function Notifications({ accountType }) {
  const notification = {
    'Request Account': <RequestAccountNotification/>
  }[accountType]

  return notification
}

export default Notifications