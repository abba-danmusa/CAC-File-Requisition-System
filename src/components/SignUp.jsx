/* eslint-disable react/no-unescaped-entities */
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {darkColor, primaryColor, secondaryColor} from '../utils/colors';
import Container from '@mui/material/Container';
import Copyright from './CopyRight';
import Theme from './Theme';
import { Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import { useSignupState } from '../hooks/useSignupState';
import { useState } from 'react';
import TransitionAlerts from './Alert';
import { useSignup } from '../hooks/useAuth';
import SimpleBackdrop from './BackDrop';

const departments = [
  { id: 1, name: 'Status Unit', label: 'Status Unit (RG\'s Office)' },
  { id: 2, name: 'CTC', label: 'CTC' },
  { id: 3, name: 'Compliance', label: 'Compliance' },
  { id: 4, name: 'SPU', label: 'SPU' },
  { id: 5, name: 'Incorporated Trustee', label: 'Incorporated Trustee' },
  { id: 6, name: 'Business Names', label: 'Business Names' },
  {id: 7, name: 'Registry', label: 'Registry'},
]

const ranks = [
  { id: 1, name: 'Manager', label: 'Manager' },
  {id: 2, name: 'Senior Manager', label: 'Senior Manager'},
  { id: 3, name: 'Assistant Manager', label: 'Assistant Manager' },
  { id: 4, name: 'Principal Manager', label: 'Principal Manager' },
  { id: 5, name: 'Assistant Director', label: 'Assistant Director' },
  { id: 6, name: 'Deputy Director', label: 'Deputy Director' },
  {id: 7, name: 'Director', label: 'Director'}
]

// eslint-disable-next-line react/prop-types
export default function SignUp({ activeTab }) {
  
  const [inputError, setInputError] = useState('')

  const {
    username,
    name,
    rank,
    password,
    department,
    staffId,
    setUsername,
    setName,
    setRank,
    setPassword,
    setStaffId,
    setDepartment,
    setInitialState
  } = useSignupState()

  const handleOnChange = (event) => {
    const { value, name } = event.target
    switch (name) {
      case 'department':
        setDepartment(value)
        break
      case 'name':
        setName(value)
        break
      case 'rank':
        setRank(value)
        break
      case 'staffId':
        setStaffId(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'username':
        setUsername(value)
        break
    }
  }

  const {
    mutate: signup,
    isLoading: isSignupLoading,
    isError: isSignupError,
    error: signupError,
    isSuccess: isSignupSuccess,
    data: signupData
  } = useSignup()

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!(name || username || rank || password || department || staffId)) {
      return setInputError('All fields are required')
    }
    const data = {name, username, rank, password, department, staffId}
    signup(data)
    setInitialState()
  };

  return (
    <>
      <SimpleBackdrop openBackDrop={isSignupLoading} />
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

          {
            inputError && (
              <TransitionAlerts
                severity="error"
                message={inputError}
              />
            )
          } 
          {
            isSignupError && (
              <TransitionAlerts
                severity="error"
                message={signupError.response?.data?.message || signupError.message}
              />
            )
          }
          {
            isSignupSuccess && (
              <TransitionAlerts
                severity="success"
                message={signupData.data.message}
              />
            )
          }
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={5}>
              
              {/* username */}
              <Grid item xs={12} sm={6}>
                <Theme>
                  <TextField
                    variant='standard'
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    value={username}
                    onChange={handleOnChange}
                    autoFocus
                  />
                </Theme>
              </Grid>

              {/* full name */}
              <Grid item xs={12} sm={6}>
                <Theme>
                  <TextField
                    variant='standard'
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    value={name}
                    onChange={handleOnChange}
                  />
                </Theme>
              </Grid>

              {/* Staff rank */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="rank-label">Staff Rank</InputLabel>
                  <Select
                    variant='standard'
                    required
                    fullWidth
                    id="rank"
                    label="Staff Rank"
                    labelId='Rank-label'
                    value={rank}
                    name='rank'
                    sx={{textAlign: 'left', borderColor: darkColor, ':hover': {borderColor: primaryColor}}}
                    onChange={handleOnChange}
                  >
                    {
                      ranks.map(rank => 
                        <MenuItem key={rank.id} value={rank.name}>
                          {rank.label}
                        </MenuItem>
                      )
                    }
                  </Select>
                </FormControl>
              </Grid>

              {/* department */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="department-label">Department</InputLabel>
                  <Select
                    variant='standard'
                    required
                    fullWidth
                    id="department"
                    label="Department"
                    labelId='department-label'
                    value={department}
                    name='department'
                    sx={{textAlign: 'left', borderColor: darkColor, ':hover': {borderColor: primaryColor}}}
                    onChange={handleOnChange}
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
              </Grid>
              
              {/* staff id */}
              <Grid item xs={12} sm={6}>
                <Theme>
                  <TextField
                    variant='standard'
                    required
                    fullWidth
                    name="staffId"
                    label="Staff Id"
                    type="string"
                    id="staffId"
                    value={staffId}
                    onChange={handleOnChange}
                    autoComplete="staff id"
                  />
                </Theme>
              </Grid>

              {/* password */}
              <Grid item xs={12} sm={6}>
                <Theme>
                  <TextField
                    variant='standard'
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handleOnChange}
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
    </>
  )
}