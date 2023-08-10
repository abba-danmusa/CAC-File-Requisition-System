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

// eslint-disable-next-line react/prop-types
export default function SignIn({activeTab}) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 250
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: primaryColor }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1}}
        >
          <Theme>
            <TextField
              variant="standard"
              size='small'
              isRequired
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
          </Theme>
          <Theme>
            <TextField
              variant="standard"
              size='small'
              // color='green'
              isRequired
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
                onClick={() => activeTab('Signup')}
              >
                {"Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}