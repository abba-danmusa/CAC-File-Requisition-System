import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Person3Icon from '@mui/icons-material/Person3';
import { mainListItems, secondaryListItems } from '../components/listItems';
import Chart from '../components/Chart';
import Request from '../components/Deposits';
import Orders from '../components/Orders';
import { primaryColor, secondaryColor } from '../utils/colors'
import { useGetPendingAuthRequests, usePendingApprovalCount, usePendingReleaseCount } from '../hooks/useRequest'
import Skeleton from '@mui/material/Skeleton';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem'
import Authorizations from '../components/Authorizations'
import Title from '../components/Title';
import PendingAuthorizations from '../components/PendingAuthorizations';
import Approval from '../components/Approval';
import PendingApprovals from '../components/PendingApprovals';
import Managing from '../components/Managing';
import PendingFileRelease from '../components/PendingFileRelease';

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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: secondaryColor,
      dark: 'red',
      contrastText: '#fff'
    }
  }
});

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openUser = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
            <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              color='inherit'
              id="basic-button"
              aria-controls={openUser ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openUser ? 'true' : undefined}
              onClick={handleClick}
            >
              <Badge color='secondary'>
                <Person3Icon fontSize='medium'/>
              </Badge>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openUser}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <img src='/src/assets/images/logos.png' style={{width: 150, height: 50}}></img>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Request Status || Awaiting Authorization */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 240
                    // height: user?.accountType !== 'Request Account' ? 'fit-content' : 240,
                  }}
                >
                  {
                    user?.accountType === 'Authorization Account' && (
                      <Authorizations/>
                    ) || user?.accountType === 'Request Account' && (
                      <Chart/>
                    ) || user?.accountType === 'Approval Account' && (
                      <Approval/>
                    ) || user?.accountType === 'Managing Account' && (
                      <Managing/>
                    )
                  }

                </Paper>
              </Grid>
              {/* New Request */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    // boxShadow: 10
                  }}
                >
                  {
                    user.accountType === 'Authorization Account' && (
                      <AwaitingAuthorization />
                    ) || user.accountType === 'Request Account' && (
                      <Request/>
                    ) || user.accountType === 'Approval Account' && (
                      <AwaitingApproval/>
                    ) || user.accountType === 'Managing Account' && (
                      <AwaitingFileRelease/>
                    )
                  }
                </Paper>
              </Grid>
              {/* Recent Requests */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {
                    user.accountType === 'Request Account' && (
                      <Orders/>
                    ) || user.accountType === 'Authorization Account' && (
                      <PendingAuthorizations/>
                    ) || user.accountType === 'Approval Account' && (
                      <PendingApprovals/>
                    ) || user.accountType === 'Managing Account' && (
                      <PendingFileRelease/>
                    )
                  }
                </Paper>  
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const AwaitingApproval = () => {

  const {isLoading, data, isSuccess} = usePendingApprovalCount()
  
  const greetings = () => {
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';

    if (hour >= 5 && hour < 12) {
      greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }
    return `${greeting}`
  }

  const user = JSON.parse(localStorage.getItem('user'))
  
  return (
    <>
      <Title>{`${greetings()}, ${user?.username}`}</Title>
      <Typography component="p" variant="h4">
        {
          isLoading && <Skeleton width={50} height={50} />
        }
        {isSuccess && data?.data?.pendingApprovalCount}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Request(s) Awaiting Approval
      </Typography>
    </>
  )
}

const AwaitingFileRelease = () => {

  const { isLoading, data, isSuccess } = usePendingReleaseCount()
  
  const greetings = () => {
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';

    if (hour >= 5 && hour < 12) {
      greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }
    return `${greeting}`
  }

  const user = JSON.parse(localStorage.getItem('user'))
  
  return (
    <>
      <Title>{`${greetings()}, ${user?.username}`}</Title>
      <Typography component="p" variant="h4">
        {
          isLoading && <Skeleton width={50} height={50} />
        }
        {isSuccess && data?.data?.pendingReleaseCount}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Request(s) Awaiting Release
      </Typography>
    </>
  )
}

const AwaitingAuthorization = () => {
  
  const { isLoading, data } = useGetPendingAuthRequests()

  const greetings = () => {
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';

    if (hour >= 5 && hour < 12) {
      greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }
    return `${greeting}`
  }

  const user = JSON.parse(localStorage.getItem('user'))
  
  return (
    <>
      <Title>{`${greetings()}, ${user?.username}`}</Title>
      <Typography component="p" variant="h4">
        {
          isLoading && <Skeleton width={50} height={50} /> ||
          data?.data?.requests?.length || 0
        }
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Request(s) Awaiting Authorization
      </Typography>
    </>
  )
}