import MainDashboard from "../components/MainDashboard"
import Requests from "../components/Menu/Requests"
import { useAwaitAuthorization, useAwaitApproval, useAuthorizedRequests, useApprovedRequests, useFilesReceived, useAcceptedAuthorizationRequests, useDeclinedAuthorizationRequests, useAllAuthorizationRequests } from "../hooks/useRequest"
import { useTab } from "../hooks/useTab"

// eslint-disable-next-line react/prop-types
function UserDashboard() {

  const {currentTab} = useTab()

  // Menu for diff accounts
  const currentView = {
    // All accounts
    'Dashboard': <MainDashboard />,
    // Request account
    'Awaiting Authorization': <AwaitingAuthorization />,
    'Awaiting Approval': <AwaitingApproval />,
    'Authorized Requests': <AuthorizedRequests />,
    'Approved Requests': <ApprovedRequests />,
    'Files Received': <FilesReceived />,
    'Files Returned': <FilesReturned />,
    //Authorization Account
    'Accepted Requests': <AcceptedRequests />,
    'Declined Requests': <DeclinedRequests />,
    'All Requests': <AllRequests/>
  }[currentTab]

  return (
    <>{currentView}</>
  )
}

// Request Account
function AwaitingAuthorization() {
  const { isLoading, isSuccess, data, isError, error } = useAwaitAuthorization()

  return (
    <Requests
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data}
      isError={isError}
      error={error}
    />
  )
}

function AwaitingApproval() {
  const { isLoading, isSuccess, data, isError, error } = useAwaitApproval()

  return (
    <Requests
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data}
      isError={isError}
      error={error}
    />
  )
}

function AuthorizedRequests() {
  const { isLoading, isSuccess, data, isError, error } = useAuthorizedRequests()

  return (
    <Requests
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data}
      isError={isError}
      error={error}
    />
  )
}

function ApprovedRequests() {
  const { isLoading, isSuccess, data, isError, error } = useApprovedRequests()

  return (
    <Requests
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data}
      isError={isError}
      error={error}
    />
  )
}

function FilesReceived() {
  const { isLoading, isSuccess, data, isError, error } = useFilesReceived()

  return (
    <Requests
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data}
      isError={isError}
      error={error}
    />
  )
}

function FilesReturned() {
  
  return (
    <div>FilesReturned</div>
  )
}

// Authorization Account
function AcceptedRequests() {
  const {
    isLoading,
    isSuccess,
    isError,
    data,
    error
  } = useAcceptedAuthorizationRequests()

  return (
    <Requests
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      data={data}
      error={error}
    />
  )
}

function DeclinedRequests() {
  const {
    isLoading,
    isSuccess,
    isError,
    data,
    error
  } = useDeclinedAuthorizationRequests()

  return (
    <Requests
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      data={data}
      error={error}
    />
  )
}

function AllRequests() {
  const {
    isLoading,
    isSuccess,
    isError,
    data,
    error
  } = useAllAuthorizationRequests()
  
  return (
    <Requests
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      data={data}
      error={error}
    />
  )
}
export default UserDashboard