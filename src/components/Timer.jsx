import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
// import { makeStyles } from '@mui/styles';

// eslint-disable-next-line no-unused-vars
// const useStyles = makeStyles((theme) => ({
//   timer: {
//     color: 'red', // Set the text color to red
//   },
// }));

// eslint-disable-next-line react/prop-types
const CountdownTimer = ({ targetTime }) => {
  // const classes = useStyles();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function calculateTimeLeft() {
    const difference = new Date(targetTime) - new Date();
    if (difference < 0) {
      return { total: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const total = difference;

    return { total, hours, minutes, seconds };
  }

  return (
    <>
      <CssBaseline />
      <h1 variant="h5" color={timeLeft.total < 900 ? 'red' : ''}>
        {`${timeLeft.hours}:${String(timeLeft.minutes).padStart(2, '0')}:${String(
          timeLeft.seconds
        ).padStart(2, '0')}`}
      </h1>
    </>
  );
};

export default CountdownTimer;
