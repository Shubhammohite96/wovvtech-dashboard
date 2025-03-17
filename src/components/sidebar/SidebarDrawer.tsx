import React, { useState } from "react";
import { Drawer, List, ListItemText, ListItemIcon, ListItemButton, Collapse } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import BarChartIcon from "@mui/icons-material/BarChart";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Person } from "@mui/icons-material";
import { userRole } from "../../signals/userSignal";
import { drawerWidth } from "../../signals/sidebarDrawerSignal";

// Define the menu structure with roles
const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard", roles: ["admin", "user"] },
  { key: "settings", label: "Settings", icon: <SettingsIcon />, path: "/settings", roles: ["admin"] },
  { 
    key: "profile", 
    label: "User Profile", 
    icon: <Person />, 
    // path: "/Profile", 
    roles: ["admin"] ,
    children: [
      { key: "profile", label: "Profile", path: "/userprofile/Profile" },
      { key: "monthFilterTable", label: "OffSet", path: "/userprofile/MonthFilterTable" },
      { key: "dsrCardDetails", label: "DSR", path: "/userprofile/DsrCardDetails" },
      { key: "selfEvaluationForm", label: "Self Evaluation form", path: "/userprofile/SelfEvaluationForm" },
    ]
  },
  { 
    key: "dsrReport", 
    label: "Reports", 
    icon: <AssessmentIcon />, 
    roles: ["admin"],
    children: [
      { key: "dsrReport", label: "Daily DSR", path: "/reports/DsrReport" },
      { key: "weeklyFormData", label: "Weekly Form", path: "/reports/WeeklyFormData" },
      { key: "offsetForm", label: "Offset Form", path: "/reports/OffsetForm" },
      { key: "builderTickets", label: "Builder Tickets", path: "/reports/BuilderTickets" },
      { key: "builderShift", label: "Builder Shift", path: "/reports/BuilderShift" },
      { 
        key: "builderAnnouncement", 
        label: "Builder Announcement", 
        external: true, // Add a flag for external links
        path: "https://partner.builder.ai/release-and-announcements",// External URL
      }
    ]
  },

  { key: "adminDashboard", label: "AdminDashBoard", icon: <AdminPanelSettingsIcon />, path: "/AdminDashBoard", roles: ["admin"] },
  { key: "uploadCsv", label: "Upload CSV", icon: <CloudUploadIcon />, path: "/UploadCsv", roles: ["admin"] },
  { key: "analytics", label: "Analytics", icon: <BarChartIcon />, path: "/Analytics", roles: ["admin"] },
  { key: "expertRating", label: "Expert Rating", icon: <StarIcon />, path: "/ExpertRating", roles: ["admin"] },
  { key: "wovvtechNotification", label: "Wovvtech Notification", icon: <Person />, path: "/WovvtechNotification", roles: ["admin"] },
  { key: "traineeList", label: "Training", icon: <MenuBookIcon />, path: "/TraineeList", roles: ["admin"] },
];

const SidebarDrawer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Function to handle menu toggle
  const handleToggle = (key: string) => {
    setOpenMenu((prev) => (prev === key ? null : key)); // Close other menus, open clicked one
  };

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
          item.roles.includes(userRole.value) ? (
            <React.Fragment key={item.key}>
              {/* If menu has children, make it expandable */}
              {item.children ? (
                <>
                  <ListItemButton 
                    onClick={() => handleToggle(item.key)}
                   
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText  
                    
                     primary={item.label} />
                    {openMenu === item.key ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  <Collapse in={openMenu === item.key} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItemButton
                          key={child.key}
                          sx={{ 
                            pl: 9,
                            fontSize:'1px',
                            backgroundColor: location.pathname === child.path ? "#d3d3d3" : "transparent",
                            "&:hover": { backgroundColor: "#f0f0f0" }
                          }}
                          onClick={() => {
                            if (child.external) {
                              window.open(child.path, "_blank"); // ✅ Open external link in new tab
                            } else {
                              navigate(child.path); // ✅ Navigate to internal routes
                            }
                          }}
                        >
                          <ListItemText primary={child.label} slotProps={{ primary: { sx: { fontSize: "14px" } } }}/>
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItemButton 
                  onClick={() => navigate(item.path)}
                  sx={{ 
                    backgroundColor: location.pathname === item.path ? "#d3d3d3" : "transparent",
                    "&:hover": { backgroundColor: "#f5f5f5" }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              )}
            </React.Fragment>
          ) : null
        )}
      </List>
    </Drawer>
  );
};

export default SidebarDrawer;
