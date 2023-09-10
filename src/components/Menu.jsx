import ApprovalAccount from './Menu/ApprovalAccount'
import AuthorizationAccount from './Menu/AuthorizationAccount'
import ManagingAccount from './Menu/ManagingAccount'
import RequestAccount from './Menu/RequestAccount'

// eslint-disable-next-line react/prop-types
function Menu({accountType}) {
  const currentMenu = {
    'Request Account': <RequestAccount />,
    'Authorization Account': <AuthorizationAccount />,
    'Approval Account': <ApprovalAccount />,
    'Managing Account': <ManagingAccount/>
  }[accountType]
  
  return (
    <>{currentMenu}</>
  )
}

export default Menu