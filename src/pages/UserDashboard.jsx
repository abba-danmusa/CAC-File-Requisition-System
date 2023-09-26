import { useState } from "react"
import MainDashboard from "../components/MainDashboard"
import Requests from "../components/Menu/Requests"
import { useAwaitAuthorization, useAwaitApproval, useAuthorizedRequests, useApprovedRequests, useFilesReceived, useAcceptedAuthorizationRequests, useDeclinedAuthorizationRequests, useAllAuthorizationRequests, useAcceptedApprovalRequests, useRejectedApprovalRequests, useApprovalRequests, useReleasedFiles, useReleaseFiles, useFilesReturned } from "../hooks/useRequest"
import { useTab } from "../hooks/useTab"
import FileRelease from "../components/FileReturn"
import FileReturn from "../components/FileReturn"
import { useReceivedFilesSearch } from "../hooks/useSearch"

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
    // Authorization Account
    'Accepted Requests': <AcceptedRequests />,
    'Declined Requests': <DeclinedRequests />,
    'All Requests': <AllRequests />,
    // Approval Account
    'Approved Request(s)': <AllApprovedRequests />,
    'Declined Request(s)': <DisapprovedRequests />,
    'All Request(s)': <AllApprovalRequests />,
    // File Release
    'Released Files': <ReleasedFiles />,
    'Returned Files': <ReturnedFiles />,
    'Recent Requests': <RecentRequests/>
  }[currentTab]

  return currentView
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
  
  const [page, setPage] = useState(1)

  const {                                 
    isLoading,
    isRefetching,
    isRefetchError,
    isSuccess,
    data, 
    isError, 
    error, 
    refetch
  } = useAuthorizedRequests(page)
  
  const changePage = (e, page) => {
    setPage(page) 
    refetch()
  }

  return (
    <Requests
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data}
      page={page}
      isError={isError}
      error={error}
      isRefetching={isRefetching}
      isRefetchError={isRefetchError}
      changePage={changePage}
    />
  )
}

function ApprovedRequests() {
  
  const [page, setPage] = useState(1)
  
  const {                                 
    isLoading,
    isRefetching,
    isRefetchError,
    isSuccess,
    data, 
    isError, 
    error, 
    refetch
  } = useApprovedRequests(page)

  const changePage = (e, page) => {
    setPage(page) 
    refetch()
  }

  return (
    <Requests
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data}
      page={page}
      isError={isError}
      error={error}
      isRefetching={isRefetching}
      isRefetchError={isRefetchError}
      changePage={changePage}
    />
  )
}

function FilesReceived() {
  const [page, setPage] = useState(1)
  
  const {                                 
    isLoading,
    isRefetching,
    isRefetchError,
    isSuccess,
    data, 
    isError, 
    error, 
    refetch
  } = useFilesReceived(page)

  const changePage = (e, page) => {
    setPage(page) 
    refetch()
  }

  const [searchValue, setSearchValue] = useState('')

  const {
    data: searchData,
    refetch: refetchSearchData,
    isError: isSearchError,
    error: searchError
  } = useReceivedFilesSearch(searchValue)

  const search = (e, delay = 250) => {
    const value = e.target.value
    const handler = setTimeout(() => {
      setSearchValue(value)
      refetchSearchData()
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }

  return (
    <Requests
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data}
      page={page}
      isError={isError}
      error={error}
      isRefetching={isRefetching}
      isRefetchError={isRefetchError}
      changePage={changePage}
      search={search}
      searchData={searchData?.data.requests}
      isSearchError={isSearchError}
      searchError={searchError}
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

function AllApprovedRequests() {
  const {
    isLoading,
    isSuccess,
    isError,
    data,
    error
  } = useAcceptedApprovalRequests()

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

function DisapprovedRequests() {
  const {
    isLoading,
    isSuccess,
    isError,
    data,
    error
  } = useRejectedApprovalRequests()

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

function AllApprovalRequests() {
  const {
    isLoading,
    isSuccess,
    isError,
    data,
    error
  } = useApprovalRequests()

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

function ReleasedFiles() {
  // const {
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   data,
  //   error,
  //   refetch
  // } = useReleasedFiles()

  return (
    <p>ReleasedFiles</p>
    // <FileRelease
    //   isLoading={isLoading}
    //   isSuccess={isSuccess}
    //   isError={isError}
    //   data={data}
    //   error={error}
    //   refetch={refetch}
    // />
  )
}

function ReturnedFiles() {
  return (
    <FileReturn />
  )
}

function RecentRequests() {
  const {
    isLoading,
    isSuccess,
    isError,
    data,
    error
  } = useReleaseFiles()

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