import { Box, Container } from "@mui/material";
import React from "react";
import EmployeeReport from "../AdminPages/EmployeeReport";
import UserProfileTabs from "./UserProfileTabs";

const DsrCardDetails = () => {
  return (
    <Box>
        <Box my={4}>
      <UserProfileTabs />
        </Box>
      <Container maxWidth="md">
        <Box my={10}>
          <EmployeeReport
            title="Monthly DSR Report"
            count={50}
            total={100}
            empOnBuilderText="Emp on builder"
            buttonText="View More"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default DsrCardDetails;
