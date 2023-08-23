import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Title from './Title';
import { Skeleton, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns'
import {useLatestRequestStatus} from '../hooks/useRequest'

// eslint-disable-next-line react/prop-types
export default function HorizontalLinearAlternativeLabelStepper() {
  
  const {
    isLoading,
    data
  } = useLatestRequestStatus()

  const steps = [
    {
      label: data?.data?.request?.[0]?.authorization.status,
      date: data?.data?.request?.[0]?.authorization.date
    },
    {
      label: data?.data?.request?.[0]?.approval.status,
      date: data?.data?.request?.[0]?.approval.date
    },
    {
      label: data?.data?.request?.[0]?.fileRelease.status,
      date: data?.data?.request?.[0]?.fileRelease.date
    },
    {
      label: data?.data?.request?.[0]?.fileReceive.status,
      date: data?.data?.request?.[0]?.fileReceive.date
    },
  ]

  return (
    <>
      <Title>Request Status</Title>
      {/* eslint-disable-next-line react/prop-types, react/prop-types */}
      {isLoading && <Skeleton width={'50%'}/>}
      {
        data?.data?.request?.[0] && (
          <p>{`Company Name: ${data?.data?.request?.[0]?.companyName || ''}`}</p>
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
                  if (step.label.includes('Declined' || 'Not' || 'Disapproved')) {                 
                    labelProps.error = true;
                  }
                  labelProps.optional = (
                    <Typography variant="caption" color="primary">
                      {step.date? `${step.date && formatDistanceToNow(new Date(step.date))} ago` : null}
                    </Typography>
                  );
                  return (
                    <Step key={index}>
                      <StepLabel {...labelProps}>
                        {step.label}
                      </StepLabel>
                    </Step>
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
