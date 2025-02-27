import React, {useState } from "react";
import CustomSelectDropdown from "../../components/cutomComponents/CustomDropdown";
import {
  Box,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  StyledTypography,
  StyledBox,
  StyledDropDownsBox,
  StyledChildCommonDropDownsBox,
} from "./DashboardStyle";
import CustomButton from "../../components/cutomComponents/CustomButton";
import CustomTextField from "../../components/cutomComponents/CustomTextField";
import ReusableTable, {
  ColumnConfig,
} from "../../components/cutomComponents/ReusableTable";
import sortIcon from "../../assets/sortIcon.png";
import {Search } from "@mui/icons-material";
import ClaimModal from "./ClaimModal";
const actions = {
  claimStatus: true
};
function DashboardPage() {
  const [selectedValue, setSelectedValue] = useState<string | number>("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null)

  // Options for dropdown
  const menuItems = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3", disabled: true },
    { value: "option4", label: "Option 4" },
  ];
  // Handle Change Event
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    setSelectedValue(event.target.value);
  };
  // click function for custom btn
  const handleClick = () => {
    console.log("Button clicked!");
  };

  const users = [
    {
      id: 1,
      empId: "TCPL496",
      empName: "Aman Gupta",
      totalKeyPress: 28,
      totalWhiteKeyPress: 16,
      totalVisibleKeyPress: 16,
      totalInVisibleKeyPress: 10,
    },
    {
      id: 2,
      empId: "TCPL494",
      empName: "Neha Kumaru",
      totalKeyPress: 28,
      totalWhiteKeyPress: 16,
      totalVisibleKeyPress: 16,
      totalInVisibleKeyPress: 10,
    },
  ];

  // Column definitions (columns)
  const columns: ColumnConfig<(typeof users)[0]>[] = [
    {
      key: "empId",
      label: "Emp Id",
      icon: sortIcon,
    },
    {
      key: "empName",
      label: "Employee Name",
      icon: sortIcon,
    },
    {
      key: "totalKeyPress",
      label: "Total Key Presses",
      icon: sortIcon,
    },
    {
      key: "totalWhiteKeyPress",
      label: "Total Whitespace Key Presses",
      icon: sortIcon,
    },
    {
      key: "totalVisibleKeyPress",
      label: "Total Visible Key Presses",
      icon: sortIcon,
    },
    {
      key: "totalInVisibleKeyPress",
      label: "Total Invisible Key Presses",
      icon: sortIcon,
    },
  ];

  const handleClaimStatus = (row: any) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  return (
    <>
      <Box sx={{ width: "100%", padding: "14px 11px" }}>
        <StyledTypography>Key Logger Activity</StyledTypography>
        <StyledBox>
          <Box>
            <StyledTypography>Filters</StyledTypography>
          </Box>
          <Box sx={{ display: "flex", gap: "30px" }}>
            <CustomButton
              btnText="Apply"
              buttonVariant="contained"
              btnStyle={{ margin: "10px", width: "103px" }}
              buttonId="outlined-button"
              handleButtonClick={handleClick}
            />
            <CustomButton
              btnText="Clear All"
              buttonVariant="outlined"
              btnStyle={{ margin: "10px", width: "103px" }}
              buttonId="outlined-button"
              handleButtonClick={handleClick}
            />
          </Box>
        </StyledBox>

        {/* Filter DropDowns section */}
        <StyledDropDownsBox>
          <StyledChildCommonDropDownsBox>
            <Typography sx={{ color: "#0f172a", fontSize: "12px" }}>
              Employee Name
            </Typography>
            <CustomSelectDropdown
              fieldName="customDropdown"
              fieldId="customDropdown"
              fieldValue={selectedValue}
              fieldMenuItems={menuItems}
              handleChangeMenu={handleChange}
              fieldError={false}
              fieldStyles={selectDropdownStyles}
              renderValue={(selected) =>
                selected ? `${selectedValue}` : "Select an option"
              }
            />
          </StyledChildCommonDropDownsBox>
          <StyledChildCommonDropDownsBox>
            <Typography sx={{ color: "#0f172a", fontSize: "12px" }}>
              From
            </Typography>
            <CustomSelectDropdown
              fieldName="customDropdown"
              fieldId="customDropdown"
              fieldValue={selectedValue}
              fieldMenuItems={menuItems}
              handleChangeMenu={handleChange}
              fieldError={false}
              fieldStyles={selectDropdownStyles}
              renderValue={(selected) =>
                selected ? `${selectedValue}` : "Select an option"
              }
            />
          </StyledChildCommonDropDownsBox>
          <StyledChildCommonDropDownsBox>
            <Typography sx={{ color: "#0f172a", fontSize: "12px" }}>
              To
            </Typography>
            <CustomSelectDropdown
              fieldName="customDropdown"
              fieldId="customDropdown"
              fieldValue={selectedValue}
              fieldMenuItems={menuItems}
              handleChangeMenu={handleChange}
              fieldError={false}
              fieldStyles={selectDropdownStyles}
              renderValue={(selected) =>
                selected ? `${selectedValue}` : "Select an option"
              }
            />
          </StyledChildCommonDropDownsBox>
          <StyledChildCommonDropDownsBox>
            <Typography sx={{ color: "#0f172a", fontSize: "12px" }}>
              From
            </Typography>
            <CustomSelectDropdown
              fieldName="customDropdown"
              fieldId="customDropdown"
              fieldValue={selectedValue}
              fieldMenuItems={menuItems}
              handleChangeMenu={handleChange}
              fieldError={false}
              fieldStyles={selectDropdownStyles}
              renderValue={(selected) =>
                selected ? `${selectedValue}` : "Select an option"
              }
            />
          </StyledChildCommonDropDownsBox>
          <StyledChildCommonDropDownsBox>
            <Typography sx={{ color: "#0f172a", fontSize: "12px" }}>
              Time
            </Typography>
            <CustomSelectDropdown
              fieldName="customDropdown"
              fieldId="customDropdown"
              fieldValue={selectedValue}
              fieldMenuItems={menuItems}
              handleChangeMenu={handleChange}
              fieldError={false}
              fieldStyles={selectDropdownStyles}
              renderValue={(selected) =>
                selected ? `${selectedValue}` : "Select an option"
              }
            />
          </StyledChildCommonDropDownsBox>
        </StyledDropDownsBox>
        <Box sx={{ marginTop:{md:'10',sm:'20'} }}>
          <CustomTextField
            placeholder="Enter your name"
            icon={<Search />}
            height="40px"
            padding="10px"
            width="406px"
            sx={{ backgroundColor: "#FFFFFF" }}
          />
        </Box>

        {/* Table Section */}
        <Box sx={{ marginTop: "20px" }}>
          <ReusableTable
            columns={columns}
            rows={users}
            showPagination={true}
            pageSize={5}
            actions={actions}
            showEditMenuIcon={true}
            onClaimStatus={handleClaimStatus}
          />
        </Box>
        <ClaimModal open={isModalOpen} onClose={() => setModalOpen(false)} rowData={selectedRow || undefined} />
      </Box>
    </>
  );
}
const selectDropdownStyles: React.CSSProperties = {
  width: "200px",
  borderRadius: "8px",
  height: "40px",
  paddingRight: "9px",
  backgroundColor: "#ffffff",
};
export default DashboardPage;
