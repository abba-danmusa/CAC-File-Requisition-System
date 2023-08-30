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
import { createTheme, ThemeProvider } from '@mui/material/styles';


const departments = [
  { id: 1, name: 'Status Unit', label: 'Status Unit (RG\'s Office)' },
  { id: 2, name: 'CTC', label: 'CTC' },
  { id: 3, name: 'Compliance', label: 'Compliance' },
  { id: 4, name: 'SPU', label: 'SPU' },
  { id: 5, name: 'Incorporated Trustee', label: 'Incorporated Trustees' },
  { id: 6, name: 'Business Names', label: 'Business Names' },
  {id: 7, name: 'Registry', label: 'Registry'},
  {id: 8, name: 'Records Management', label: 'Records Management (RMD)'},
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

const accountTypes = [
  {id: 1, name: 'Request Account', label: 'Request Account'},
  { id: 2, name: 'Authorization Account', label: 'Authorization Account' },
  { id: 3, name: 'Approval Account', label: 'Approval Account' },
  {id: 4, name: 'Managing Account', label: 'File Managing Account'}
]

const sections = [
  { id: 1, name: 'Wing A', label: 'Wing A' },
  { id: 2, name: 'Wing B Team 1', label: 'Wing B, Team 1' },
  { id: 3, name: 'Wing B Team 2', label: 'Wing B, Team 2' },
  { id: 4, name: 'Wing B Team 3', label: 'Wing B, Team 3' },
  { id: 5, name: 'Wing B Team 4', label: 'Wing B, Team 4' },
  { id: 6, name: 'Wing B Team 5', label: 'Wing B, Team 5' },
  { id: 7, name: 'Wing B Team 6', label: 'Wing B, Team 6' },
  { id: 8, name: 'Wing B Team 7', label: 'Wing B, Team 7' },
  { id: 9, name: 'Wing B Team 5', label: 'Wing B, Team 5' },
  { id: 10, name: 'Incorporated Trustees', label: 'Incorporated Trustees' },
  { id: 11, name: 'Business Names', label: 'Business Names' },
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
    accountType,
    section,
    setUsername,
    setName,
    setRank,
    setPassword,
    setStaffId,
    setDepartment,
    setAccountType,
    setSection,
    setInitialState
  } = useSignupState()

  const handleOnChange = (event) => {
    const { value, name } = event.target
    switch (name) {
      case 'department':
        setAccountType('')
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
      case 'accountType':
        setAccountType(value)
        break
      case 'section':
        setSection(value)
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
    if (!(name || username || rank || password || department || staffId || accountType || section)) {
      return setInputError('All fields are required')
    }
    const data = {name, username, rank, password, department, staffId, accountType, section}
    signup(data)
    // setInitialState()
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
        light: secondaryColor,
        dark: darkColor,
        contrastText: '#fff'
      }
    }
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <SimpleBackdrop openBackDrop={isSignupLoading} />
      <Container component="main" maxWidth='md'>
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
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, }}>
            <Grid container spacing={5}>
              
              {/* username */}
              <Grid item xs={12} sm={6}>
                <Theme>
                  <TextField
                    variant='outlined'
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
                    variant='outlined'
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
                    variant='outlined'
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
                    variant='outlined'
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
                    variant='outlined'
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

              {/* Account Type */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="account-type">Account Type</InputLabel>
                  <Select
                    variant='outlined'
                    required
                    fullWidth
                    id="accountType"
                    label="Staff Rank"
                    labelId='Rank-label'
                    value={accountType}
                    name='accountType'
                    sx={{textAlign: 'left', borderColor: darkColor, ':hover': {borderColor: primaryColor}}}
                    onChange={handleOnChange}
                  >
                    {
                      department === 'Records Management' && accountTypes.slice(2).map(type => 
                        <MenuItem key={type.id} value={type.name}>
                          {type.label}
                        </MenuItem>
                      ) ||
                      department !== 'Records Management' && accountTypes.slice(0, 2).map(type => 
                        <MenuItem key={type.id} value={type.name}>
                          {type.label}
                        </MenuItem>
                      )
                    }
                  </Select>
                </FormControl>
              </Grid>

              {/* Section */}
              {
                accountType === 'Managing Account' && (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="section">Section</InputLabel>
                      <Select
                        variant='outlined'
                        required
                        fullWidth
                        id="section"
                        label="section"
                        labelId='section'
                        value={section}
                        name='section'
                        sx={{textAlign: 'left', borderColor: darkColor, ':hover': {borderColor: primaryColor}}}
                        onChange={handleOnChange}
                      >
                        {
                          sections.map(type => 
                            <MenuItem key={type.id} value={type.name}>
                              {type.label}
                            </MenuItem>
                          )
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                )
              }

              {/* password */}
              <Grid item xs={12} sm={accountType === 'Managing Account' ? 6 : undefined}>
                <Theme>
                  <TextField
                    variant='outlined'
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
    </ThemeProvider>
  )
}