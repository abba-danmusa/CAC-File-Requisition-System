import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { contrastText, primaryColor, secondaryColor } from '../utils/colors';
import { Button } from '@mui/material';
import RequestForm from './RequestForm';
import Backdrop from '@mui/material/Backdrop';
import Close from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide'
import Title from './Title';
import PostAddIcon from '@mui/icons-material/PostAdd';

export default function Request() {
  
  const [open, setOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  
  const handleOnClick = () => {
    return setOpen(true)
  }

  const handleClose = () => {
    return setOpen(false)
  }

  const greetings = () => {
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';

    if (hour >= 5 && hour < 12) {
      greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }
    return `${greeting}`
  }
  
  return (
    <>
      <Title>{`${greetings()}, ${user?.username}`}</Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Click on the {<PostAddIcon/>} button below to request for a file
      </Typography>
      {/* TODO make the clock tick */}
      {/* <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p> */}
      <Button
        sx={{
          width: 'fit-content',
          alignSelf: 'center',
          backgroundColor: primaryColor,
          ":hover": { backgroundColor: secondaryColor }
        }}
        onClick={handleOnClick}
      >
        <PostAddIcon
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