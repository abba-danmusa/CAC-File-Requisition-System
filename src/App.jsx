import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { ProtectedRoute } from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <LandingPage/>
          }
        >
        </Route>
      </Routes>
      <img src='./src/assets/images/logos.png' className='logo'></img>
    </BrowserRouter>
  )
}

export default App
