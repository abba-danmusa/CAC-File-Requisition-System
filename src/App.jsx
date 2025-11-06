import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {ProtectedRoute} from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import DashboardPage from './pages/DashboardPage';
import {socket} from './utils/socket.io.jsx'

// Guard any DOM / Notification / socket usage so it doesn't run during the
// server/build phase where `window` and `Notification` are undefined.
let notify = null
if (typeof window !== 'undefined') {
  const hasNotificationAPI = ('Notification' in window) || ('webkitNotifications' in window)

  if (hasNotificationAPI && typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
    try {
      Notification.requestPermission()
    } catch (e) {
      // ignore in environments where Notification.requestPermission is not available
    }
  }

  notify = (notification) => {
    try {
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        new Notification(notification.subject, {
          body: notification.body,
          icon: '/src/assets/images/logos.png',
          tag: notification.tag
        })
      }
    } catch (e) {
      // swallow errors from Notifications in environments that don't support them
    }
  }

  if (socket && typeof socket.on === 'function') {
    socket.on('notification', (n) => notify && notify(n))
  }
}

function App() {
  const queryClient = new QueryClient()

  let signin = false
  const token = localStorage.getItem('token')
  if (token) signin = true

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute isSignedIn={signin} >
                <DashboardPage/>
              </ProtectedRoute>
            } 
          />
          <Route
            path='/signin'
            element={
              <LandingPage/>
            } 
          />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
