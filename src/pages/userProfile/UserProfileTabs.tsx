import { Tabs, Tab } from "@mui/material";
import {Link, useLocation} from "react-router-dom";
const UserProfileTabs: React.FC = () => {
  const location = useLocation();
  const getSelectedTab = () => {
    if (location.pathname === "/Profile") return 0;
    if (location.pathname === "/MonthFilterTable") return 1;
    if (location.pathname === "/DsrCardDetails") return 2;
    if (location.pathname === "/") return 4;    
  };

  return (
    <Tabs value={getSelectedTab()} centered>
      <Tab label="Profile" component={Link} to="/Profile" />
      <Tab label="Offset" component={Link} to="/MonthFilterTable" />
      <Tab label="DSR" component={Link} to="/DsrCardDetails" />
      <Tab label="TL Rating" />
    </Tabs>
  );
};
export default UserProfileTabs;