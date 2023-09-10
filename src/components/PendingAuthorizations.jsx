// import { useEffect } from 'react'
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { Skeleton, Typography } from '@mui/material';
import { primaryColor, secondaryColor, contrastText} from '../utils/colors';
import { useAuthorizeRequest, useGetAuthRequests } from '../hooks/useRequest';
import Row from './Row'
import { Backdrop, Box, Slide, TextareaAutosize, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react'
import Alert from './Alert'
import Theme from './Theme'
import useDebounceValue from '../hooks/useDebounceValue'
import axios from "../utils/axios"
import SearchItem from './SearchItem'
import {useAuthorizationAccountSearch} from '../hooks/useSearch'

function PendingAuthorizations() {
  
  const { isLoading, isSuccess, isError, data, error } = useGetAuthRequests()

  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [authorize, setAuthorize] = useState('')
  const [remarks, setRemarks] = useState('')
  const [id, setId] = useState('')

  const { mutate, isSuccess: isAuthSuccess, data: authData, isError: isAuthError, error: authError } = useAuthorizeRequest()

  const [searchQuery, setSearchQuery] = useState('')
  const debouncedValue = useDebounceValue(searchQuery)

  const {
    data: searchData,
    error: searchError,
    isSuccess: isSearchSuccess,
    isError: isSearchError,
    refetch,
  } = useAuthorizationAccountSearch(debouncedValue)

  const authorizeRequest = e => {
    let data = {
      id,
      status: e.target.dataset.status,
      remarks
    }
    mutate(data)
    // refetch the search data
    refetch()
    setOpenBackdrop(false)
    setAuthorize('')
  }
  
  const search = (e) => {
    const value = e.target.value
    if (!value) return setSearchQuery('')
    setSearchQuery(value)
    refetch()
  }

  return (
    <>
      {
        isAuthSuccess && (
          <Alert
            message={authData?.data?.message}
            severity={'success'}
          />
        )
      }
      {
        isAuthError && (
          <Alert
            message={
              authData?.response?.data?.message ||
              authError?.message
            }
            severity={'error'}
          />
        )
      }
      {
        isSearchError && (
          <Alert severity={'error'}
            message={
              searchData?.response?.data?.message ||
              searchError?.message
            }
          />
        )
      }
      {
        authorize === 'AUTHORIZE' && openBackdrop && (
          <Modal
            message={'authorize'}
            openBackdrop={openBackdrop}
            status={'accepted'}
            setOpenBackdrop={setOpenBackdrop}
            authorizeRequest={authorizeRequest}
            remarks={remarks}
            setRemarks={setRemarks}
          />
        ) ||
        authorize === 'REJECT' && openBackdrop && (
          <Modal
            message={'reject'}
            openBackdrop={openBackdrop}
            status={'rejected'}
            setOpenBackdrop={setOpenBackdrop}
            authorizeRequest={authorizeRequest}
            remarks={remarks}
            setRemarks={setRemarks}
          />
        )
      }
      <Title>New Requests</Title>
      <Box sx={{display: 'flex', flexDirection: 'row', marginTop: 2}}>
        <SearchItem search={search} />
      </Box>
      {
        isError && (
          <Typography color="text.secondary" sx={{ flex: 1 }} align='center'>
            {error.response?.data?.message || error?.message}
          </Typography>
        )
      }
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell sx={{color: primaryColor}}>Date</TableCell>
            <TableCell sx={{color: primaryColor}}>Company Name</TableCell>
            <TableCell sx={{color: primaryColor}}>RC Number</TableCell>
            <TableCell sx={{color: primaryColor}}>RRR Number</TableCell>
            <TableCell align="right" sx={{color: primaryColor}}>Purpose</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* eslint-disable-next-line react/prop-types */}
          {
            isLoading && (
              skeletonRows.map(num => 
                <TableRow key={num}>
                  <TableCell><Skeleton height={25}/></TableCell>
                  <TableCell><Skeleton height={25}/></TableCell>
                  <TableCell><Skeleton height={25}/></TableCell>
                  <TableCell><Skeleton height={25}/></TableCell>
                  <TableCell><Skeleton height={25}/></TableCell>
                  <TableCell><Skeleton height={25}/></TableCell>
                </TableRow>
              )
            )
          }
          {
            isSearchSuccess && (
              searchData?.data?.requests.map(request => (
                <Row
                  key={request?._id}
                  row={request}
                  initialOpenState={false}
                  setAuthorize={setAuthorize}
                  setOpenBackdrop={setOpenBackdrop}
                  setId={setId}
                  isSearchData
                />
              ))
            )
          }
          {
            isSuccess && (
              data?.data?.requests?.map(request => 
                <Row
                  row={request} key={request?._id}
                  initialOpenState={false}
                  setAuthorize={setAuthorize}
                  setOpenBackdrop={setOpenBackdrop}
                  setId={setId}
                />
              )
            )
          }
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={e=> e.preventDefault()} sx={{ mt: 3 }}>
        See more requests
      </Link>
    </>
  )
}

const skeletonRows = [1, 2, 3, 4, 5]

const StyledTextarea = styled(TextareaAutosize)(
  () => `
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    &:hover {
      border-color: ${primaryColor};
    }
  
    &:focus {
      border-color: ${primaryColor};
    }
  `
)

// eslint-disable-next-line react/prop-types
const Modal = ({ openBackdrop, message, status, authorizeRequest, setOpenBackdrop, remarks, setRemarks}) => {
  
  return (
    <Slide direction="left" in={openBackdrop} mountOnEnter unmountOnExit>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        // onClick={handleClose}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: 10,
            padding: 3,
            height: 'fit-content'
          }}
        >
          <h2 style={{color: 'black', textAlign: 'center'}}>
            You are about to {message} this request!
          </h2>
          
          <Theme>
            <StyledTextarea
              variant="outlined"
              placeholder='Remarks? (optional)'
              minRows={3}
              margin="normal"
              fullWidth
              id="remarks"
              label="Remarks"
              name="remarks"
              autoFocus
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </Theme>
          <Box align='center'>
            <Button
              sx={{
                width: 100,
                alignSelf: 'center',
                backgroundColor: primaryColor,
                ":hover": { backgroundColor: secondaryColor },
                color: contrastText,
                margin: 2,
                fontSize: '10px'
              }}
              data-status={status}
              onClick={authorizeRequest}
            >
              Confirm
            </Button>
            <Button
              sx={{
                width: 100,
                alignSelf: 'center',
                backgroundColor: 'brown',
                ":hover": { backgroundColor: 'red' },
                color: contrastText,
                margin: 2,
                fontSize: '10px'
              }}
              onClick={() => setOpenBackdrop(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Backdrop>
    </Slide>
  )
}

export default PendingAuthorizations