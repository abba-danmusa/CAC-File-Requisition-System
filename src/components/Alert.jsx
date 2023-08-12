import { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

// eslint-disable-next-line react/prop-types
export default function TransitionAlerts({ message, severity}) {

  const [isOpen, setIsOpen] = useState(true)

  return (
    <Box sx={{ minWidth: '30%', position: 'absolute', top: '10%' }}>
      <Collapse in={isOpen} timeout={'auto'}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  )
}