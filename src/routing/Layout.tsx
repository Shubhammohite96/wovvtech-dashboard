import React from "react";
import { Box, CssBaseline, Drawer, Toolbar } from "@mui/material";
import SidebarDrawer from "../components/sidebar/SidebarDrawer";
import { drawerWidth } from "../signals/sidebarDrawerSignal";
import Header from "../components/header/Header";

interface LayoutProps {
  showSidebar: boolean;
  children: React.ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ showSidebar, children }) => {
  return (
    <>
   
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Topbar (Fixed at the top) */}
      

      {/* Conditional Sidebar */}
      {showSidebar && (<SidebarDrawer />)}


      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <Header />
        {children}
      </Box>
    </Box>
    </>
  );
};

export default Layout;
