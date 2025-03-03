import { Tabs, Tab } from "@mui/material";
import {Link, useLocation} from "react-router-dom";
let data =[
    {
     buildCardName:'Nathan Robinsons BC', 
     TrackedHrs:'08hr 04min',
     Unqualifiedhours:'Unqualified hours',
     ApprovalHours:'8 hrs',
     approval:'100.00%',
     NonComplianceIssue:'["ide_vs_tracked_hours", "manual_deduction"]',
     month:'jan-2025'
    }
]
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