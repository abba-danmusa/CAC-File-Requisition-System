import { Typography, Backdrop, Box, Slide, TextareaAutosize} from "@mui/material"
import { useNotificationStore } from "../../hooks/useNotificationStore"
import Theme from '../Theme';
import { styled } from '@mui/material/styles';
import CustomButton from "./CustomButton"
import { primaryColor } from "../../utils/colors"
import Alert from '../Alert'

const StyledTextarea = styled(TextareaAutosize)(
  () => `
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    &:hover {
      border-color: ${primaryColor};
    }
  
    &:focus {
      border-color: ${primaryColor};
    }
  `
)

// eslint-disable-next-line react/prop-types
const CustomModal = ({submit, cancel, isSuccess, successMessage, isError, errorMessage}) => {
  
  const {openBackdrop, remarks, setRemarks, modalTitle} = useNotificationStore()
  
  const returnTitle = 'You are about to return this  file'
  const moreTimeTitle = 'You are about to request for more time from the RMD'
  const title = modalTitle == 'return' ? returnTitle : moreTimeTitle 

  return (
    <Slide direction="left" in={openBackdrop} mountOnEnter unmountOnExit>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: 10,
            padding: 3,
            height: 'fit-content',
            width: 500
          }}
        > 
          {isSuccess && <Alert severity={'success'} message={successMessage}/>}
          {isError && <Alert severity={'error'} message={errorMessage}/>}
          <Typography
            color='black'
            align='center'
            textTransform={'uppercase'}
            mb={5}
          >
            {title}
          </Typography>
          <Theme>
            <StyledTextarea
              variant="outlined"
              placeholder={modalTitle == 'return' ? 'Remarks? (Optional)' : 'Reason (Required)'}
              minRows={3}
              margin="normal"
              fullWidth
              id="remarks"
              label="Remarks"
              name="remarks"
              autoFocus
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </Theme>
          <Box
            align='center'
            mt={5}
            display={'flex'}
            justifyContent={'space-between'}
            paddingX={10}
          >
            <CustomButton
              title={'confirm'}
              type={'confirm'}
              clickHandler={submit}
            />
            <CustomButton
              title={'cancel'}
              type={'cancel'}
              clickHandler={cancel}
            />
          </Box>
        </Box>
      </Backdrop>
    </Slide>
  )
}

export default CustomModal