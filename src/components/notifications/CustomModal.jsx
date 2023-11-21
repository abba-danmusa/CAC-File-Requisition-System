import { Typography, Backdrop, Box, Slide, TextareaAutosize} from "@mui/material"
import { useNotificationStore } from "../../hooks/useNotificationStore"
import Theme from '../Theme';
import { styled } from '@mui/material/styles';
import CustomButton from "./CustomButton"
import { primaryColor } from "../../utils/colors"

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
const CustomModal = ({submit, cancel, title, inputValue, setInputValue, placeholder}) => {
  
  const {openBackdrop} = useNotificationStore()
  
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
          <Typography
            color='black'
            align='center'
            textTransform={'uppercase'}
            mb={5}
          >
            {title}
          </Typography>

          {/* Conditional Text Area */}
          <TextArea
            placeholder={placeholder}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          
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

// eslint-disable-next-line react/prop-types
const TextArea = ({placeholder, inputValue, setInputValue}) => {
  if (inputValue == undefined) return
  return (
    <Theme>
      <StyledTextarea
        variant="outlined"
        placeholder={placeholder}
        minRows={3}
        margin="normal"
        fullWidth
        id="remarks"
        label="Remarks"
        name="remarks"
        autoFocus
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
    </Theme>
  )
}

export default CustomModal