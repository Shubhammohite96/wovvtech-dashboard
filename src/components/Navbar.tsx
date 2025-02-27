import { Tabs, Tab } from "@mui/material";
import {Link, useLocation} from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const getSelectedTab = () => {
    if (location.pathname === "/DsrReport") return 0;
    if (location.pathname === "/WeeklyFormData") return 1;
    if (location.pathname === "/OffsetForm") return 2;
    if (location.pathname === "/BuilderTickets") return 3;
    if (location.pathname === "/BuilderAnnouncement") return 4;    
  };

  return (
    <Tabs value={getSelectedTab()} centered>
      <Tab label="Daily DSR" component={Link} to="/DsrReport" />
      <Tab label="Weekly Form" component={Link} to="/WeeklyFormData" />
      <Tab label="Offset Form" component={Link} to="/OffsetForm"/>
      <Tab label="Builder Tickets" component={Link} to="/BuilderTickets" />
      <Tab label="Builder Announcement" component={Link} to="/BuilderAnnouncement" />
    </Tabs>
  );
};
export default Navbar;