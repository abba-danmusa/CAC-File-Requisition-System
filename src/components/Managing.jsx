import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { Button, Grid} from '@mui/material';
import { contrastText, primaryColor, secondaryColor } from '../utils/colors';
import Skeleton from '@mui/material/Skeleton';
import Row from './Row';
import Alert from './Alert'
import { Backdrop, Box, Slide, TextareaAutosize } from '@mui/material';
import { useState } from 'react'
import { usePendingFileRelease, useSendFile} from '../hooks/useRequest'
import { styled } from '@mui/system'
import Theme from './Theme'

function Managing() {
  const [remarks, setRemarks] = useState('')

  const {
    isLoading, 
    isSuccess,
    isError,
    data,
    error
  } = usePendingFileRelease()

  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [authorize, setAuthorize] = useState('')

  const { mutate, isSuccess: isAuthSuccess, data: authData, isError: isAuthError, error: authError } = useSendFile()
  
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
        authorize === 'RELEASE' && openBackdrop && (
          <Modal
            message={'send file'}
            openBackdrop={openBackdrop}
            status={'accepted'}
            id={data?.data?.request?.[0]?._id}
            setOpenBackdrop={setOpenBackdrop}
            authorizeRequest={authorizeRequest}
            remarks={remarks}
            setRemarks={setRemarks}
          />
        )
      }
      <Title>Awaiting File Release</Title>
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
              row={data?.data?.request?.[0]}
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
                fullWidth
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

export default Managing