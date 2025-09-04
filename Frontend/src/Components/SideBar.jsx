import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import SettingsIcon from "@mui/icons-material/Settings"
import React from 'react'

const drawerWidth = 240;
const SideBar = () => {
  return (
     <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#111827",
            color: "#fff",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Project
          </Typography>
        </Toolbar>
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: "white" }}>
              <DashboardIcon />

            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>

          <ListItem button>
            <ListItemIcon sx={{ color: "white" }}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>

          <ListItem button>
            <ListItemIcon sx={{ color: "white" }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Team Members" />
          </ListItem>

          <ListItem button>
            <ListItemIcon sx={{ color: "white" }}>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>

          <ListItem button>
            <ListItemIcon sx={{ color: "white" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f9fafb",
          p: 3,
          minHeight: "100vh",
        }}
      >
      </Box>
    </Box>
  )
}

export default SideBar