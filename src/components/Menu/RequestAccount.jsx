import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RuleIcon from '@mui/icons-material/Rule';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import PendingIcon from '@mui/icons-material/Pending';
import NorthEastIcon from '@mui/icons-material/NorthEast'
import Divider from '@mui/material/Divider'
import ListItem from './ListItem'

function RequestAccount() {

  const listItems = [
    { primary: 'Dashboard', Icon: DashboardIcon },
    { primary: 'Awaiting Authorization', Icon: PendingIcon },
    { primary: 'Awaiting Approval', Icon: RuleIcon },
    { primary: 'Authorized Requests', Icon: DoneIcon },
    { primary: 'Approved Requests', Icon: DoneAllIcon },
  ]
  
  return (
    <>
      {
        listItems.map(item => (
          <ListItem primary={item.primary} Icon={item.Icon} key={item.primary}/>
        ))
      }
      <Divider />
      <ListSubheader component="div" inset>
        History
      </ListSubheader>
      <ListItem primary={'Files Received'} Icon={SouthWestIcon} />
      <ListItem primary={'Files Returned'} Icon={NorthEastIcon} />
    </>
  )
}

export default RequestAccount