import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { Skeleton, Typography } from '@mui/material';
import { usePendingReleases, useSendFile } from '../hooks/useRequest';
import Row from './Row';
import { Backdrop, Box, Slide,TextareaAutosize, Button } from '@mui/material';
import Alert from './Alert'
import Theme from './Theme'
import { styled } from '@mui/system';
import { useState } from 'react'
import {useManageAccountSearch} from '../hooks/useSearch'
import SearchItem from './SearchItem'
import useDebounceValue from '../hooks/useDebounceValue'
import { primaryColor, secondaryColor, contrastText} from '../utils/colors';

function PendingFileRelease() {
  
  const { isError, error, isSuccess, data, isLoading }  = usePendingReleases()

  const { mutate, isSuccess: isAuthSuccess, data: authData, isError: isAuthError, error: authError } = useSendFile()
  
  const skeletonRows = [1, 2, 3, 4, 5]
  
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [authorize, setAuthorize] = useState('')
  const [remarks, setRemarks] = useState('')
  const [id, setId] = useState('')
  
  const authorizeRequest = e => {
    let data = {
      status: e.target.dataset.status,
      id,
      remarks
    }
    mutate(data)
    refetch()
    setOpenBackdrop(false)
    setAuthorize('')
  }

  const [searchQuery, setSearchQuery] = useState('')
  const debouncedValue = useDebounceValue(searchQuery)

  const {
    data: searchData,
    error: searchError,
    isSuccess: isSearchSuccess,
    isError: isSearchError,
    refetch,
  } = useManageAccountSearch(debouncedValue)
  
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
        authorize === 'RELEASE' && openBackdrop && (
          <Modal
            message={'send file'}
            openBackdrop={openBackdrop}
            status={'accepted'}
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
                  row={request}
                  key={request?._id}
                  initialOpenState={false}
                  setAuthorize={setAuthorize}
                  setId={setId}
                  setOpenBackdrop={setOpenBackdrop}
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
const Modal = ({ openBackdrop, status, authorizeRequest, setOpenBackdrop, remarks, setRemarks}) => {
  
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
            height: 'fit-content'
          }}
        >
          <Box color={'black'} paddingX={3}>
            <h2 style={{textAlign: 'center'}}>You are about to send this file!</h2>
            <h4>NOTE:</h4>
            <p style={{color: 'charcoal'}}>1. Make sure the file is ready and on its way before confirming</p>
            <p style={{ color: 'charcoal' }}>2. Make sure the receiving party confirm the receipt of the file</p>
            <Theme>
              <StyledTextarea
                variant="outlined"
                placeholder='Remarks? (optional)'
                minRows={3}
                margin="normal"
                id="remarks"
                label="Remarks"
                name="remarks"
                autoFocus
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Theme>
          </Box>
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

export default PendingFileRelease