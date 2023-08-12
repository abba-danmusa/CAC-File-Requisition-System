import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// eslint-disable-next-line react/prop-types
export default function SimpleBackdrop({openBackDrop}) {

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
