import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import AddIcon from '@mui/icons-material/Add';
import { contrastText, primaryColor, secondaryColor } from '../utils/colors';
import { Button } from '@mui/material';
import RequestForm from './RequestForm';
import Backdrop from '@mui/material/Backdrop';
import Close from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide'
import moment from 'moment';

export default function Request() {
  
  const [open, setOpen] = useState(false)
  
  const handleOnClick = () => {
    return setOpen(true)
  }

  const handleClose = () => {
    return setOpen(false)
  }
  
  return (
    <>
      <Title>Make A File Request</Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Click on the + button below to request for a file
      </Typography>
      {/* TODO make the clock tick */}
      <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
      <Button
        sx={{
          width: 'fit-content', alignSelf: 'center', backgroundColor: primaryColor, ":hover": {backgroundColor: secondaryColor}
        }}
        onClick={handleOnClick}
      >
        <AddIcon
          sx={{ fontSize: 25, color: contrastText }}
        />
      </Button>

      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          // onClick={handleClose}
        >
          <Button
            onClick={handleClose}
            sx={{
              position: 'fixed',
              top: '20%',
              right: '30%',
              color: contrastText,
              width: 'fit-content',
              backgroundColor: 'brown',
              ':hover': { backgroundColor: 'red' }
            }}
          >
            <Close fontSize='medium'/>
          </Button>
          <RequestForm/>
        </Backdrop>
      </Slide>
    </>
  );
}