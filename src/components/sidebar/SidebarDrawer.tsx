import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, ListItemButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import { userRole } from "../../signals/userSignal";
import { drawerWidth } from "../../signals/sidebarDrawerSignal";
import { useNavigate } from "react-router-dom";
import {Person } from '@mui/icons-material';

// Define the menu structure with roles
const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard", roles: ["admin", "user"] },
  { key: "settings", label: "Settings", icon: <SettingsIcon />, path: "/settings", roles: ["admin"] },
  { key: "profile", label: "Profile", icon: <Person />, path: "/Profile", roles: ["admin"] },
  { key: "dsrReport", label: "Reports", icon: <Person />, path: "/DsrReport", roles: ["admin"] },
  { key: "adminDashboard", label: "AdminDashBoard", icon: <Person />, path: "/AdminDashBoard", roles: ["admin"] },
  { key: "uploadCsv", label: "Upload CSV", icon: <Person />, path: "/uploadCsv", roles: ["admin"] },
  { key: "analytics", label: "Analytics", icon: <Person />, path: "/analytics", roles: ["admin"] },
  { key: "fileZilla", label: "fileZilla", icon: <Person />, path: "/fileZilla", roles: ["admin"] },
];

const SidebarDrawer: React.FC = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation function
  console.log("userRole",userRole.value);
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth.value,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth.value, boxSizing: "border-box" },
      }}
      open
    >
      <List>
        {menuItems.map((item) =>
          item.roles.includes(userRole.value) ? ( // Check if the user role has permission
            <ListItemButton onClick={() => navigate(item.path)} key={item.key}>
            <ListItem  >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
            </ListItemButton>
          ) : null
        )}
      </List>
    </Drawer>
  );
};

export default SidebarDrawer;
