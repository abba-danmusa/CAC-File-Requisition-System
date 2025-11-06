import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { primaryColor, secondaryColor, } from '../utils/colors';
import Copyright from './CopyRight';
import Theme from './Theme';
import { useSignin } from '../hooks/useAuth';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
import SimpleBackdrop from './BackDrop';

// eslint-disable-next-line react/prop-types
export default function SignIn({activeTab}) {

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isInputError, setIsInputError] = useState('')
  const { mutate: signin, isError, error, isSuccess, data, isLoading } = useSignin()

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!(username || password)) {
      return setIsInputError('Username and Password are required')
    }
    signin({ username, password })
  }

  if (isSuccess && data?.data?.token && data?.data?.user) {
    localStorage.setItem('token', data?.data?.token)
    localStorage.setItem('user', JSON.stringify(data.data.user))
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  }, [isSuccess, navigate])

  return (
    <>
      <SimpleBackdrop openBackDrop={isLoading} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
            marginTop: 15,
            width: 250,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: primaryColor }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {
            isInputError && (
              <Alert message={isInputError} severity={'error'}/>
            )
          }
          {
            isError && (
              <Alert
                message={error.response?.data?.message || error.message} severity={'error'}
              />
            )
          }
          
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1}}
          >
            <Theme>
              <TextField
                variant="outlined"
                size='small'
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Theme>
            <Theme>
              <TextField
                variant="outlined"
                size='small'
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Theme>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: 'white',
                backgroundColor: primaryColor,
                ":hover": { backgroundColor: secondaryColor }
              }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: primaryColor,
                    textDecorationColor: secondaryColor,
                    ':hover': { color: secondaryColor }
                  }}
                >
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Button
                  variant="body2"
                  onClick={() => activeTab('SignUp')}
                >
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  )
}