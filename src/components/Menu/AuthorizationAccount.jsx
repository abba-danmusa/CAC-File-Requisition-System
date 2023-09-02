import ListItem from "./ListItem"
import DashboardIcon from '@mui/icons-material/Dashboard'
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { Divider, ListSubheader } from "@mui/material";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';

const   AuthorizationAccount = () => {

  const listItems = [
    { primary: 'Dashboard', Icon: DashboardIcon },
    { primary: 'Accepted Requests', Icon: DoneIcon },
    {primary: 'Declined Requests', Icon: DoDisturbIcon}
  ]

  return (
    <>
      {
        listItems.map(item => (
          <ListItem
            primary={item.primary}
            Icon={item.Icon}
            key={item.primary}
          />
        ))
      }
      <Divider />
      <ListSubheader component="div" inset>
        History
      </ListSubheader>
      <ListItem primary={'All Requests'} Icon={DensitySmallIcon}/>
    </>
  )
}

export default AuthorizationAccount