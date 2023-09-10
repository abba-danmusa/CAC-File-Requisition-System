import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import moment from 'moment'
import { Box, Collapse, IconButton, Skeleton, Typography, Backdrop, CircularProgress, Button} from '@mui/material'
import { useConfirmReceipt, useGetRequests } from '../hooks/useRequest'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import Alert from './Alert'
import { styled} from '@mui/material/styles'
import axios from "../utils/axios"
import { primaryColor, contrastText, secondaryColor } from '../utils/colors'

// eslint-disable-next-line react/prop-types
export default function Orders() {
  // eslint-disable-next-line react/prop-types
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchData, setSearchData] = useState([])
  const [searchError, setSearchError] = useState('')
  const debouncedValue = useDebounceValue(searchQuery)
  
  const { isLoading, isRefetching, isRefetchError, isSuccess, data, isError, error, refetch } = useGetRequests(page)

  const changePage = (e, page) => {
    setPage(page)
    refetch()
  }

  // const {
  //   isLoading: isSearchLoading,
  //   isError: isSearchError,
  //   data: searchData,
  //   refetch: refetchSearch
  // } = useRequestAccountSearch(searchQuery)

  const search = (e) => {
    const value = e.target.value
    if (!value) return
    setSearchQuery(value)
  }

  useEffect(() => {
    const search = async () => {
      if (!debouncedValue) return
      try {
        const response = await axios.get(`/request/account/search?query=${debouncedValue}`)
        setSearchData(response?.data?.requests)
      } catch (error) {
        setSearchError(error.response.data.message)
      }
    }
    search()
  }, [debouncedValue])

  return (
    <>
      <Title>Recent Requests</Title>
      {
        isError || isRefetchError && (
          <Typography color="text.secondary" sx={{ flex: 1 }} align='center'>
            {error.response?.data?.message || error?.message}
          </Typography>
        )
      }
      {
        searchError && (
          <Alert severity={'error'} message={searchError}/>
        )
      }
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <SearchItem search={search}/>
        <PaginationItem
          page={page}
          pages={data?.data?.pages}
          changePage={changePage}
        />
      </Box>
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
            isLoading || isRefetching && (
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
            searchData && (searchData.map(request =>
              <Row row={request} key={request._id}/>
            ))
          }
          {
            isSuccess && (
              data?.data?.requests?.map(request =>
                <Row row={request} key={request._id} isLoading={isLoading} />
              )
            )
          }
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more requests
      </Link> */}
    </>
  );
}

const skeletonRows = [1,2,3,4,5,6,]

// eslint-disable-next-line react/prop-types
const Row = ({ row }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow key={row._id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            // sx={{backgroundColor: primaryColor}}  
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
          </IconButton>
        </TableCell>
        <TableCell>{moment(row?.date).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
        <TableCell>{row?.companyName}</TableCell>
        <TableCell>{row?.rcNumber}</TableCell>
        <TableCell>{row?.rrrNumber}</TableCell>
        <TableCell align="right">{row?.purpose}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ boxShadow: 10, borderRadius: 2, paddingTop: 2 }}
          >
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                Status
              </Typography> */}
              <HorizontalLinearAlternativeLabelStepper data={row}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { formatDistanceToNow } from 'date-fns'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Zoom from '@mui/material/Zoom'
import PaginationItem from './Pagination';
import useDebounceValue from '../hooks/useDebounceValue';
import { useRequestAccountSearch } from '../hooks/useSearch';
import SearchItem from './SearchItem';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[10],
    fontSize: 15
  },
}));

// eslint-disable-next-line react/prop-types
function HorizontalLinearAlternativeLabelStepper({data}) {

  const steps = [
    {
      label: data?.authorization.status,
      date: data?.authorization.date,
      remarks: data?.authorization.remarks
    },
    {
      label: data?.approval.status,
      date: data?.approval.date,
      remarks: data?.approval.remarks
    },
    {
      label: data?.fileRelease.status,
      date: data?.fileRelease.date,
      remarks: data?.fileRelease.remarks
    },
    {
      label: data?.fileReceive.status,
      date: data?.fileReceive.date,
      remarks: data?.fileReceive.remarks
    },
    {
      label: data?.fileReceive.status,
      date: data?.fileReceive.date,
      remarks: data?.fileReceive.remarks
    }
  ]
  
  return (
    <>
      <Title>Request Status</Title>
      {/* eslint-disable-next-line react/prop-types, react/prop-types */}
      {
        data && (
          <p>{`${data?.companyName || ''}`}</p>
        )
      }
      <Box sx={{ width: '100%' }}>
        {
          data && (
            <Stepper activeStep={data?.step} alternativeLabel sx={{boxShadow: 20, paddingTop: 5, paddingBottom: 5, borderRadius: 2}}>
              {
                steps?.map((step, index) => {
                  const labelProps = {};
                  const labelRegex = /(Declined|Not|Disapproved)/
                  if (labelRegex.test(step.label)) {                 
                    labelProps.error = true
                  }
                  labelProps.optional = (
                    <Typography variant="caption" color={labelProps.error ? 'error' : 'primary'}>
                      {step.date? `${step.date && formatDistanceToNow(new Date(step.date))} ago` : null}
                    </Typography>
                  )

                  if (index === 3 && data?.fileRelease.status === 'File Released' && data?.fileReceive.status === 'Awaiting File')
                    return (
                      <LightTooltip
                        title={<ReceiptConfirmation request={data} />}
                        key={index}
                        TransitionComponent={Zoom}
                      >
                        <Step >
                          <StepLabel {...labelProps}>
                            {step.label}
                          </StepLabel>
                        </Step>
                      </LightTooltip>
                    )
                  return (
                    <LightTooltip
                      key={index}
                      title={step.remarks}
                      TransitionComponent={Zoom}
                    >
                      <Step>
                        <StepLabel {...labelProps}>
                          {step.label}
                        </StepLabel>
                      </Step>
                    </LightTooltip>
                  )
                })
              }
            </Stepper>
          ) ||
          !(data) && (
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              The status of your file requests shows here
            </Typography>
          )
        }
    </Box>
    </>
  );
}

// eslint-disable-next-line react/prop-types
function ReceiptConfirmation({request}) {

  const { mutate, isLoading, isSuccess, data, isError, error } = useConfirmReceipt()

  const confirmReceipt = e => {
    mutate({id: e.target.dataset.id})
  }

  return (
    <>
      {
        isError && (
          <Alert
            severity={'error'}
            message={data?.response?.data?.message ||
              error?.message}
          />
        )
      }
      {
        isSuccess && (
          <Alert message={data?.data?.message} severity={'success'}/>
        )
      }
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        width={200}
        height={150}
        sx={{ borderRadius: 3, alignContent: 'center', padding: 1 }}
      >
        <Typography color="text.primary" sx={{ flex: 1 }}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          If you have received the file please confirm by clicking on the 'Confirm Button' below.
        </Typography>
        <Button
          onClick={confirmReceipt}
          data-id={request._id}
          sx={{
            fontSize: '12px',
            backgroundColor: primaryColor,
            color: contrastText,
            ':hover': { backgroundColor: secondaryColor, color: contrastText },
          }}
        >Confirm Receipt</Button>
      </Box>
    </>
  )
}
