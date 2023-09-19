import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {ProtectedRoute} from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import DashboardPage from './pages/DashboardPage';
import {socket} from './utils/socket.io.jsx'

const hasNotificationAPI = 'Notification' in window || 'webkitNotifications' in window

if (hasNotificationAPI && Notification.permission !== 'granted') Notification.requestPermission()

const notify = notification => {
  if ('Notification' in window) {
    if (Notification.permission == 'granted') {
      new Notification(notification.subject, {
        body: notification.body,
        icon: '/assets/images/logos.png',
        tag: notification.tag
      })
    }
  }
}

socket.on('notification', notify)

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
