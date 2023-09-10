import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTab } from '../../hooks/useTab'

// eslint-disable-next-line react/prop-types
const ListItem = ({ primary, Icon}) => {
  
  const current = { backgroundColor: 'primary.main', boxShadow: 10, ':hover': { backgroundColor: 'primary.light' } }
  const currentColor = {color: 'primary.contrastText'}

  const { currentTab, setCurrentTab } = useTab()

  const changeTab = tab => {
    setCurrentTab(tab)
    // switch (tab) {
    //   // All accounts
    //   case 'Dashboard':
    //     setCurrentTab(tab)
    //     break
    //   // Request Account
    //   case 'Awaiting Authorization':
    //     setCurrentTab(tab)
    //     break
    //   case 'Awaiting Approval':
    //     setCurrentTab(tab)
    //     break
    //   case 'Authorized Requests':
    //     setCurrentTab(tab)
    //     break
    //   case 'Approved Requests':
    //     setCurrentTab(tab)
    //     break
    //   case 'Files Received':
    //     setCurrentTab(tab)
    //     break
    //   case 'Files Returned':
    //     setCurrentTab(tab)
    //     break
    //   // Authorization Account
    //   case 'Accepted Requests':
    //     setCurrentTab(tab)
    //     break
    //   case 'Declined Requests':
    //     setCurrentTab(tab)
    //     break
    //   case 'All Requests':
    //     setCurrentTab(tab)
    //     break
    //   case 'Approved Request(s)': 
    //     setCurrentTab(tab)
    //     break
    //   case 'Declined Request(s)': 
    //     setCurrentTab(tab)
    //     break
    //   case 'All Request(s)':
    //     setCurrentTab(tab)
    //     break
    //   case 'Released Files':
    //     setCurrentTab(tab)
    //     break
    // }
  }

  return (
    <ListItemButton
      sx={currentTab == primary ? { ...current } : {}}
      onClick={() => changeTab(primary)}
    >
      <ListItemIcon>
        <Icon sx={currentTab == primary ? { ...currentColor } : {}} />
      </ListItemIcon>

      <ListItemText
        sx={currentTab == primary ? { ...currentColor } : {}}
        primary={primary}
      />
    </ListItemButton>
  )
}

export default ListItem