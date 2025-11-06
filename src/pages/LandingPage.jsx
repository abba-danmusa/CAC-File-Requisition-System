import { useState } from "react"
import SignIn from '/src/components/SignIn'
import SignUp from '/src/components/SignUp'


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