/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {greyColor, primaryColor, secondaryColor} from '../utils/colors';
import Container from '@mui/material/Container';
import Copyright from './CopyRight';
import Theme from './Theme';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const departments = [
  { id: 1, name: 'Status Unit', label: 'Status Unit (RG\'s Office)' },
  { id: 2, name: 'CTC', label: 'CTC' },
  { id: 3, name: 'Compliance', label: 'Compliance' },
  { id: 4, name: 'SPU', label: 'SPU' },
  { id: 5, name: 'Incorporated Trustee', label: 'Incorporated Trustee' },
  { id: 6, name: 'Business Names', label: 'Business Names' },
  {id: 7, name: 'Registry', label: 'Registry'},
]

// eslint-disable-next-line react/prop-types
export default function SignUp({ activeTab }) {
  const [department, setDepartment] = useState('');
  console.log(department)
  const handleOnChangeDepartments = (event) => {
    setDepartment(event.target.value)
  }

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
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: primaryColor }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Theme>
                <TextField
                  variant='standard'
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Theme>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Theme>
                <TextField
                  variant='standard'
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Theme>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="department-label">Department</InputLabel>
                <Theme>
                </Theme>
                <Select
                  variant='standard'
                  required
                  fullWidth
                  id="department"
                  label="Department"
                  labelId='department-label'
                  value={department}
                  sx={{textAlign: 'left', borderColor: greyColor, ':hover': {borderColor: primaryColor}}}
                  onChange={handleOnChangeDepartments}
                >
                  {
                    departments.map(department => 
                      <MenuItem key={department.id} value={department.name}>
                        {department.label}
                      </MenuItem>
                    )
                  }
                </Select>
              </FormControl>
              {/* <Theme>
              </Theme> */}
            </Grid>
            <Grid item xs={6}>
              <Theme>
                <TextField
                  variant='standard'
                  required
                  fullWidth
                  name="staff id"
                  label="Staff Id"
                  type="string"
                  id="staffId"
                  autoComplete="staff id"
                />
              </Theme>
            </Grid>
            <Grid item xs={12}>
              <Theme>
                <TextField
                  variant='standard'
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Theme>
            </Grid>
          </Grid>
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                variant="body2"
                onClick={() => activeTab('Signin')}
              >
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}