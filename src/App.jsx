import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {ProtectedRoute} from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import DashboardPage from './pages/DashboardPage';

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
