import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Title from './Title';
import { Typography } from '@mui/material';
import moment from 'moment';
import { formatDistanceToNow } from 'date-fns'

// eslint-disable-next-line react/prop-types
export default function HorizontalLinearAlternativeLabelStepper({ request }) {
  
  const latestRequest = request && request.length ? request[0] : null
  const requestStatus = latestRequest?.requestStatus
 
  // const steps = 

  return (
    <>
      <Title>Request Status</Title>
      {/* eslint-disable-next-line react/prop-types, react/prop-types */}
      <p>{`Company Name: ${latestRequest?.companyName || ''}`}</p>
      <Box sx={{ width: '100%' }}>
        {
          latestRequest && (
            <Stepper activeStep={requestStatus?.currentStep} alternativeLabel>
              {
                [
                  `Awaiting Authorization -- ${formatDistanceToNow(new Date('2023-08-16T20:39:09.657Z'), {addSuffix: true})}`,
                  'Awaiting Approval From RMD',
                  'Awaiting File Release',
                  'Awaiting File Receive'
                ].map((label, index) => (
                  <Step key={index}>
                    <StepLabel>
                      {label}
                    </StepLabel>
                  </Step>
                ))
              }
            </Stepper>
          ) || (
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              The status of your file requests shows here
            </Typography>
          )
        }
    </Box>
    </>
  );
}
