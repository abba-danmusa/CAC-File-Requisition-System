import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { useGetPendingAuthRequests } from '../hooks/useRequest'
import { Button, Grid} from '@mui/material';
import { contrastText, primaryColor, secondaryColor } from '../utils/colors';
import Skeleton from '@mui/material/Skeleton';
import Row from './Row';
import Alert from './Alert'
import { Backdrop, Box, Slide, Typography, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react'
import { useAuthorizeRequest } from '../hooks/useRequest'
import Theme from './Theme'

function Authorizations() {

  const {
    isLoading, 
    isSuccess,
    isError,
    data,
    error
  } = useGetPendingAuthRequests()

  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [authorize, setAuthorize] = useState('')
  const [remarks, setRemarks] = useState('')

  const { mutate, isSuccess: isAuthSuccess, data: authData, isError: isAuthError, error: authError } = useAuthorizeRequest()
  
  const authorizeRequest = e => {
    let data = {
      id: e.target.dataset.id,
      status: e.target.dataset.status,
      remarks
    }
    mutate(data)
    setOpenBackdrop(false)
    setAuthorize('')
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
        authorize === 'AUTHORIZE' && openBackdrop && (
          <Modal
            message={'authorize'}
            openBackdrop={openBackdrop}
            status={'accepted'}
            id={data?.data?.requests?.[0]?._id}
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
            id={data?.data?.requests?.[0]?._id}
            setOpenBackdrop={setOpenBackdrop}
            authorizeRequest={authorizeRequest}
            remarks={remarks}
            setRemarks={setRemarks}
          />
        )
      }
      <Title>Awaiting Authorization</Title>
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
            isSuccess &&
            <Row
              row={data?.data?.requests?.[0]}
              initialOpenState={true}
              setAuthorize={setAuthorize}
              setOpenBackdrop={setOpenBackdrop}
            />
          }
        </TableBody>
      </Table>
      <Grid
        alignSelf={'center'}
        display={error?.response?.status == 404 || isLoading ? 'none' : ''}
      >
        {/* <Button
          sx={{
            width: 100,
            alignSelf: 'center',
            backgroundColor: primaryColor,
            ":hover": { backgroundColor: secondaryColor },
            color: contrastText,
            margin: 2,
            // marginTop: 2
          }}
          onClick={authorizeRequest}
        >
          Authorize
        </Button>
        <Button
          sx={{
            width: 100,
            alignSelf: 'center',
            backgroundColor: 'brown',
            ":hover": { backgroundColor: 'red' },
            color: contrastText,
            margin: 2,
            // marginTop: 2
          }}
          onClick={authorizeRequest}
        >
          Reject
        </Button> */}
      </Grid>
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
const Modal = ({ openBackdrop, message, status, authorizeRequest, id, setOpenBackdrop, remarks, setRemarks}) => {
  
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

export default Authorizations