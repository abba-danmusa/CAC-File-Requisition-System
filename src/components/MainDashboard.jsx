import Authorizations from '../components/Authorizations'
import PendingAuthorizations from '../components/PendingAuthorizations';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../components/Chart';
import Request from '../components/Deposits';
import Orders from '../components/Orders';
import Approval from '../components/Approval';
import PendingApprovals from '../components/PendingApprovals';
import Managing from '../components/Managing';
import PendingFileRelease from '../components/PendingFileRelease';
import Copyright from './CopyRight';
import { usePendingApprovalCount, usePendingAuthCounts, usePendingReleaseCount } from '../hooks/useRequest'
import Skeleton from '@mui/material/Skeleton';
import Title from '../components/Title';
import { Typography } from '@mui/material';
import { socket } from '../utils/socket.io';
import { useEffect } from 'react';

function MainDashboard() {

  const user = JSON.parse(localStorage.getItem('user'))
  
  useEffect(() => {
    if (socket && typeof socket.emit === 'function') {
      socket.emit('join-room', user)
    }
  }, [user])

  return (
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
  )
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
  
  const { isLoading, data } = usePendingAuthCounts()
  
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
          data?.data?.requests?.[0]?.count || 0
        }
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Request(s) Awaiting Authorization
      </Typography>
    </>
  )
}

export default MainDashboard