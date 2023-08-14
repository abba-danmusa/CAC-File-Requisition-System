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

export default function HorizontalLinearAlternativeLabelStepper() {
  return (
    <>
      <Title>Request Status</Title>
      <p>Company Name: Elvis Presley</p>
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
