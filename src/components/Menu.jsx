import AuthorizationAccount from './Menu/AuthorizationAccount'
import RequestAccount from './Menu/RequestAccount'

// eslint-disable-next-line react/prop-types
function Menu({accountType}) {
  const currentMenu = {
    'Request Account': <RequestAccount />,
    'Authorization Account': <AuthorizationAccount/>
  }[accountType]
  
  return (
    <>{currentMenu}</>
  )
}

export default Menu