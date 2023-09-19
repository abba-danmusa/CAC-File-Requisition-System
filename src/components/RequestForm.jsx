import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRequisitionState } from '../hooks/useRequisitionState'
import { contrastText, darkColor, primaryColor, secondaryColor } from '../utils/colors';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useEffect, useState } from 'react';
import Alert from './Alert'
import { useSendRequest } from '../hooks/useRequest';
import { Backdrop, CircularProgress } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { socket } from '../utils/socket.io';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        CAC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: darkColor,
      dark: secondaryColor,
      contrastText
    }
  }
});

export default function RequestForm() {
  const [inputError, setInputError] = useState('')
  const {
    mutate: sendRequest,
    isLoading: isSendRequestLoading,
    isError: isRequestError,
    error: requestError,
    isSuccess: isRequestSuccess,
    data: requestData
  } = useSendRequest()

  const {
    companyName,
    rcNumber,
    purpose,
    rrrNumber,
    companyType,
    setCompanyName,
    setRCNumber,
    setPurpose,
    setRRRNumber,
    setRemarks,
    setCompanyType,
    setInitialState
  } = useRequisitionState()

  const handleOnChange = (e) => {
    const { value, name } = e.target
    switch (name) {
      case 'companyName':
        setCompanyName(value)
        break
      case 'companyType':
        setCompanyType(value)
        break
      case 'rcNumber':
        setRCNumber(value)
        break
      case 'purpose':
        setPurpose(value)
        break
      case 'rrrNumber':
        setRRRNumber(value)
        break
      case 'remarks':
        setRemarks(value)
        break
    }
  }

  const inputFields = [
    { id: 1, name: 'companyName', label: 'Company Name', value: companyName },
    { id: 2, name: 'rcNumber', label: 'RC Number', value: rcNumber },
    { id: 4, name: 'rrrNumber', label: 'RRR Number', value: rrrNumber },
    { id: 3, name: 'purpose', label: 'Purpose', value: purpose },
    // { id: 5, name: 'remarks', label: 'Remarks', value: remarks }
  ]

  const companyTypes = [
    { id: 1, name: 'IT', label: 'Incorporated Trustee' },
    { id: 2, name: 'LLC/GTE', label: 'Limited Liability Company/GTE' },
    {id: 3, name: 'BN', label: 'Business Name'}
  ]

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!companyName || !rcNumber || !purpose || !rrrNumber || !companyType) {
      return setInputError('All inputs are required')
    }
    sendRequest({companyName, rcNumber, purpose, rrrNumber, companyType})
    // setInitialState()
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSendRequestLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component="main" maxWidth="sm" sx={{backgroundColor: contrastText}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {
            inputError && (
              <Alert message={inputError} severity={'error'}/>
            )
          }
          {
            isRequestError && (
              <Alert message={requestError.response?.data?.message || requestError.message} severity={'error'}/>
            )
          }
          {
            isRequestSuccess && (
              <Alert message={requestData.data.message} severity={'success'}/>
            )
          }
          <Avatar sx={{ m: 1, bgcolor: primaryColor }}>
            <PostAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={'primary'}>
            New File Request
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {
                inputFields.map(input=> {
                  return (
                    <Grid item xs={12} sm={6} key={input.id}>
                      <TextField
                        name={input.name}
                        value={input.value}
                        onChange={handleOnChange}
                        required
                        fullWidth
                        id={input.name}
                        label={input.label}
                        autoFocus={input.name == 'companyName' ? true : false}
                      />
                    </Grid>
                  )
                })
              }
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="company-type">Company Type</InputLabel>
                  <Select
                    variant='outlined'
                    required
                    fullWidth
                    id="companyType"
                    label="companyType"
                    labelId='company-type'
                    value={companyType}
                    name='companyType'
                    sx={{textAlign: 'left', borderColor: darkColor, ':hover': {borderColor: primaryColor}}}
                    onChange={handleOnChange}
                  >
                    {
                      companyTypes.map(type => (
                        <MenuItem key={type.id} value={type.name}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Request
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}