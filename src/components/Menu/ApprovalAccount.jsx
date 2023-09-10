import ListItem from "./ListItem"
import DashboardIcon from '@mui/icons-material/Dashboard'
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { Divider, ListSubheader } from "@mui/material";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';

const ApprovalAccount = () => {

  const listItems = [
    { primary: 'Dashboard', Icon: DashboardIcon },
    { primary: 'Approved Request(s)', Icon: DoneIcon },
    {primary: 'Declined Request(s)', Icon: DoDisturbIcon}
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
      <ListItem primary={'All Request(s)'} Icon={DensitySmallIcon}/>
    </>
  )
}

export default ApprovalAccount