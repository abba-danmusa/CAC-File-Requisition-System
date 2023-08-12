import { Button } from "@mui/material"
import { primaryColor, secondaryColor } from "../utils/colors"
import { useNavigate } from "react-router-dom"

function DashboardPage() {
  const navigate = useNavigate()
  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  return (
    <Button
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        color: 'white',
        backgroundColor: primaryColor,
        ":hover": { backgroundColor: secondaryColor }
      }}
      onClick={handleSignOut}
    >
      Sign out
    </Button>
  )
}

export default DashboardPage