import ListItem from "./ListItem"
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Divider, ListSubheader } from "@mui/material";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { NorthEast, SouthWest } from "@mui/icons-material";

const ManagingAccount = () => {

  const listItems = [
    { primary: 'Dashboard', Icon: DashboardIcon },
    { primary: 'Released Files', Icon: NorthEast },
    { primary: 'Returned Files', Icon: SouthWest }
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
      <ListItem primary={'Recent Requests'} Icon={DensitySmallIcon}/>
    </>
  )
}

export default ManagingAccount