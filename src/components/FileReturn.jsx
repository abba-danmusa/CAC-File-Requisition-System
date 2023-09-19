import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button, Container, Grid, Paper} from '@mui/material';
import { contrastText, primaryColor, secondaryColor } from '../utils/colors';
import Skeleton from '@mui/material/Skeleton';
import Alert from './Alert'
import { Backdrop, Box, Slide, TextareaAutosize } from '@mui/material';
import { useState } from 'react'
import { useAcknowledgeFileReturn, useFilesReturned } from '../hooks/useRequest'
import {useReturnedFilesSearch} from '../hooks/useSearch'
import { styled } from '@mui/system'
import Theme from './Theme'
import SearchItem from './SearchItem'
import PaginationItem from './Pagination'
import CountdownTimer from './Timer';

// eslint-disable-next-line react/prop-types
function FileReturn() {

  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [authorize, setAuthorize] = useState('')
  const [remarks, setRemarks] = useState('')
  const [id, setId] = useState('')
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const { mutate, isSuccess: isAuthSuccess, data: authData, isError: isAuthError, error: authError } = useAcknowledgeFileReturn()
  
  const {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    refetch
  } = useFilesReturned(page)

  const {
    isSuccess: isSearchSuccess,
    isError: isSearchError,
    data: searchData,
    error: searchError,
    refetch: searchRefetch
  } = useReturnedFilesSearch(searchQuery)

  const changePage = (e, page) => {
    setPage(page)
    refetch()
  }

  const search = (e) => {
    const value = e.target.value
    if (!value) return
    const handler = setTimeout(() => {
      setSearchQuery(value)
      searchRefetch()
    }, 250)
    return () => {
      clearTimeout(handler)
    }
  }
  
  const authorizeRequest = e => {
    let data = {
      id,
      status: e.target.dataset.status,
      remarks
    }
    
    mutate(data)
    refetch()
    setOpenBackdrop(false)
    setAuthorize('')
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {
              authorize === 'CONFIRM' && openBackdrop && (
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
            <Title>Requests</Title>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <SearchItem search={search}/>
              <PaginationItem
                page={page}
                pages={data?.data?.pages}
                changePage={changePage}
              />
            </Box>
            {
              isSearchError &&
              <Alert
                message={
                  searchData?.response?.data?.message ||
                  searchError?.message
                }
                severity={'error'}
              />
            }
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
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell sx={{color: primaryColor}}>Since</TableCell>
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
                    [1, 2, 3, 4].map(skeleton => 
                      <TableRow key={skeleton}>
                        <TableCell><Skeleton/></TableCell>
                        <TableCell><Skeleton/></TableCell>
                        <TableCell><Skeleton/></TableCell>
                        <TableCell><Skeleton/></TableCell>
                        <TableCell><Skeleton/></TableCell>
                        <TableCell><Skeleton/></TableCell>
                      </TableRow>
                    )
                  )
                }
                {
                  isError && (
                    <p>{error?.response?.data?.message }</p>
                  )
                }
                {
                  isSearchSuccess && searchData?.data?.requests?.map(request => 
                    <Row
                      key={request._id}
                      row={request}
                      setAuthorize={setAuthorize}
                      setOpenBackdrop={setOpenBackdrop}
                      setId={setId}
                      isSearchData
                    />
                  )
                }
                {
                  isSuccess && data?.data?.requests?.map(request => 
                    <Row
                      key={request._id}
                      row={request}
                      setAuthorize={setAuthorize}
                      setOpenBackdrop={setOpenBackdrop}
                      setId={setId}
                    />
                  )
                }
              </TableBody>
            </Table>
            <Grid
              alignSelf={'center'}
              display={error?.response?.status == 404 || isLoading ? 'none' : ''}
            >
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
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
const Modal = ({ openBackdrop, status, authorizeRequest, id, setOpenBackdrop, remarks, setRemarks}) => {
  
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
            <h2 style={{textAlign: 'center'}}>You are about to acknowledge the receipt of this file!</h2>
            <h4>NOTE:</h4>
            <p style={{color: 'charcoal'}}>1. Make sure that you receive the file before confirming</p>
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
              data-id={id}
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

import { formatDistanceToNow } from 'date-fns';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line react/prop-types
function Row({ row, initialOpenState, setAuthorize, setOpenBackdrop, setId, isSearchData}) {
  
  const [open, setOpen] = useState(initialOpenState)
  const openModal = () => {
    setId(row._id)
    setOpenBackdrop(true)
    setAuthorize('CONFIRM')
  }
  
  return (
    <>
      <TableRow key={row?._id} sx={isSearchData ? {border: `1px ridge ${secondaryColor}`} : {}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            // sx={{backgroundColor: primaryColor}}  
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>
        <TableCell >{row && formatDistanceToNow(new Date(row?.date), {addSuffix: true})}</TableCell>
        <TableCell >{row?.companyName}</TableCell>
        <TableCell >{row?.rcNumber}</TableCell>
        <TableCell >{row?.rrrNumber}</TableCell>
        <TableCell align="right" >{row?.purpose}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ boxShadow: 20, borderRadius: 2, padding: 3 }}
          >
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                From
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{color: primaryColor}}>Name</TableCell>
                    <TableCell sx={{color: primaryColor}}>Department</TableCell>
                    <TableCell align="right" sx={{color: primaryColor}}>Rank</TableCell>
                    <TableCell align="right" sx={{color: primaryColor}}>ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row?.from.name}
                    </TableCell>
                    <TableCell>{row?.from.department}</TableCell>
                    <TableCell align="right">{row?.from.rank}</TableCell>
                    <TableCell align="right">
                      {row?.from.staffId}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box p={2}>
              {
                row?.requestStatus.fileReturn.status === 'return' && 
                <Button
                  onClick={openModal}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    ':hover': {backgroundColor: 'primary.light'}
                  }}
                >
                  Acknowledge Receipt
                </Button>
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default FileReturn

