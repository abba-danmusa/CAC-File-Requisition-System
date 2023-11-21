import { useState } from "react"
import SignIn from '@components/Signin'
import SignUp from "@components/SignUp"


function LandingPage() {
  const [state, setState] = useState('Signin')

  const activeTab = (dir) => {
    switch (dir) {
      case 'Signup':
        setState('Signup')
        break
      case 'Signin':
        setState('Signin')
        break
    }
  }

  return (
    <>
      {
        (state === 'Signin') && (<SignIn activeTab={activeTab} />) 
        ||
        (state === 'Signup') && (<SignUp activeTab={activeTab} />)
      }
    </>
  )
}

export default LandingPage