import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({isSignedIn, children}) => {
  if (!isSignedIn) {
    return <Navigate to='/' replace />
  }
  return children
}
