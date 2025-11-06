import { useState } from "react"
import SignIn from '../components/SignIn.jsx'
import SignUp from '../components/SignUp.jsx'


function LandingPage() {
  const [state, setState] = useState('SignIn')

  const activeTab = (dir) => {
    switch (dir) {
      case 'SignUp':
        setState('SignUp')
        break
      case 'SignIn':
        setState('SignIn')
        break
    }
  }

  return (
    <>
      {
        (state === 'SignIn') && (<SignIn activeTab={activeTab} />) 
        ||
        (state === 'SignUp') && (<SignUp activeTab={activeTab} />)
      }
    </>
  )
}

export default LandingPage