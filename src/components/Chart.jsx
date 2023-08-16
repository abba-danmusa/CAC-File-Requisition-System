import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Title from './Title';

const steps = [
  'Request Awaiting Authorization (10/08/2023)',
  'Awaiting Approval From RMD (11/08/2023)',
  'Awaiting File Release',
  'Awaiting File Receive'
]

// eslint-disable-next-line react/prop-types
export default function HorizontalLinearAlternativeLabelStepper({ request }) {
  return (
    <>
      <Title>Request Status</Title>
      {/* eslint-disable-next-line react/prop-types, react/prop-types */}
      <p>{`Company Name: ${request ? request[0].companyName : ''}`}</p>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
    </Box>
    </>
  );
}
