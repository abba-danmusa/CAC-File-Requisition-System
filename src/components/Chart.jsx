import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Title from './Title';
import { Skeleton, Typography, Button, Backdrop, CircularProgress } from '@mui/material';
import Tooltip, {tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { formatDistanceToNow } from 'date-fns'
import { useLatestRequestStatus, useConfirmReceipt, useReturnFile } from '../hooks/useRequest'
import {primaryColor, contrastText, secondaryColor} from '../utils/colors'
import Alert from './Alert'
import Zoom from '@mui/material/Zoom'

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
export default function HorizontalLinearAlternativeLabelStepper() {
  
  const {
    isLoading,
    data
  } = useLatestRequestStatus()

  const steps = [
    {
      label: data?.data?.request?.[0]?.authorization.status,
      date: data?.data?.request?.[0]?.authorization.date,
      remarks: data?.data?.request?.[0]?.authorization.remarks
    },
    {
      label: data?.data?.request?.[0]?.approval.status,
      date: data?.data?.request?.[0]?.approval.date,
      remarks: data?.data?.request?.[0]?.approval.remarks
    },
    {
      label: data?.data?.request?.[0]?.fileRelease.status,
      date: data?.data?.request?.[0]?.fileRelease.date,
      remarks: data?.data?.request?.[0]?.fileRelease.remarks
    },
    {
      label: data?.data?.request?.[0]?.fileReceive.status,
      date: data?.data?.request?.[0]?.fileReceive.date,
      remarks: data?.data?.request?.[0]?.fileReceive.remarks
    },
    {
      label: data?.data?.request?.[0]?.fileReturn.status,
      date: data?.data?.request?.[0]?.fileReturn.date,
      remarks: data?.data?.request?.[0]?.fileReturn.remarks
    },
  ]

  return (
    <>
      <Title>Request Status</Title>
      {/* eslint-disable-next-line react/prop-types, react/prop-types */}
      {isLoading && <Skeleton width={'50%'}/>}
      {
        data?.data?.request?.[0] && (
          <p>{`${data?.data?.request?.[0]?.companyName || ''}`}</p>
        )
      }
      <Box sx={{ width: '100%' }}>
        {
          isLoading && (
            <>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
            </>
          )
        }
        {
          data?.data?.request?.[0] && (
            <Stepper activeStep={data?.data?.request?.[0]?.step} alternativeLabel sx={{boxShadow: 0, padding: 0, borderRadius: 2}}>
              {
                steps?.map((step, index) => {
                  const labelProps = {};
                  const labelRegex = /(Declined|Not|Disapproved)/
                  if (labelRegex.test(step.label)) {                 
                    labelProps.error = true
                  }
                  labelProps.optional = (
                    <Typography variant="caption" color={labelProps.error? 'error' : 'primary'}>
                      {step.date? `${step.date && formatDistanceToNow(new Date(step.date))} ago` : null}
                    </Typography>
                  );

                  if (index === 3 && data?.data?.request?.[0].fileRelease.status === 'File Released' && data?.data?.request?.[0].fileReceive.status === 'Awaiting File')
                    return (
                      <LightTooltip
                        title={<ReceiptConfirmation request={data?.data?.request?.[0] } />}
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
                  
                  if (index === 4 && data?.data?.request?.[0].fileReturn.status === 'Awaiting Return')
                    return (
                      <LightTooltip
                        title={
                          <ReturnFile request={data?.data?.request?.[0]} />
                        }
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
          !(data?.data?.requests) && (
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

  const {mutate, isLoading, isSuccess, data, isError, error} = useConfirmReceipt()

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

// eslint-disable-next-line react/prop-types
function ReturnFile({request}) {

  const {mutate, isLoading, isSuccess, data, isError, error} = useReturnFile()

  const returnFile = e => {
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
        height={'fit-content'}
        sx={{ borderRadius: 3, alignContent: 'center', padding: 1 }}
      >
        <Typography color="text.primary" sx={{ flex: 1 }}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          If you want to return this file please click on the button below and wait for the receiving part acknowledge the receipt of the file
        </Typography>
        <Button
          onClick={returnFile}
          data-id={request._id}
          sx={{
            fontSize: '12px',
            backgroundColor: primaryColor,
            color: contrastText,
            alignContent: 'center',
            ':hover': { backgroundColor: secondaryColor, color: contrastText },
          }}
        >Return File</Button>
      </Box>
    </>
  )
}
