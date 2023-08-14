import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RuleIcon from '@mui/icons-material/Rule';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import PendingIcon from '@mui/icons-material/Pending';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import {primaryColor } from '../utils/colors'
// import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon color={'primary'} />
      </ListItemIcon>
      <ListItemText sx={{color: primaryColor}} primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PendingIcon/>
      </ListItemIcon>
      <ListItemText primary="Pending Authorization" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <RuleIcon/>
      </ListItemIcon>
      <ListItemText primary="Pending Approvals" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DoneIcon/>
      </ListItemIcon>
      <ListItemText primary="Authorized Requests" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DoneAllIcon/>
      </ListItemIcon>
      <ListItemText primary="Approved Requests" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      History
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <SouthWestIcon />
      </ListItemIcon>
      <ListItemText primary="Files Received" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NorthEastIcon />
      </ListItemIcon>
      <ListItemText primary="Files Returned" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);