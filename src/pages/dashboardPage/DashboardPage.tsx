import React, { useEffect, useState } from "react";
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
import { Search } from "@mui/icons-material";
import ClaimModal from "./ClaimModal";
import KeyLoggerList from "./KeyLoggerList";

const actions = {
  claimStatus: true
};

interface User {
  empId: string | number;
  empName?: string;
  totalKeyPress: number;
  totalWhiteKeyPress: number;
  totalVisibleKeyPress: number;
  totalInVisibleKeyPress: number;
  activeTimeCount: number;
  idleHours: number;
  inactiveTimeCount: number;
  meetingHours: number;
  offComputerHours: number;
  onComputerHours: number;
  totalHours: number; 
}

interface UserData {
  email?: string;
  emp_code?: string;
  guid?: string;
  name?: string;
  status?: string;
  username?: string;
}

interface KeyloggerData {
  totalKeys?: number;
  whitespaceKeys?: number;
  visibleKeys?: number;
  invisibleKeys?: number;
}

interface TeamLoggerData {
  activeTimeCount: number;
  idleHours: number;
  inactiveTimeCount: number;
  meetingHours: number;
  offComputerHours: number;
  onComputerHours: number;
  totalHours: number;
}

interface DateWise {
  [date: string]: {
    keylogerData?: KeyloggerData;
    teamlogerReport?: TeamLoggerData;
  };
}


interface DailySummary {
  [key: string]: {
    dateWise?: DateWise;
    userData?: UserData;
  };
}

interface FileData {
  dailySummary: DailySummary,
  structuredData: object
}

function DashboardPage() {
  const [selectedValue, setSelectedValue] = useState<string | number>("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null)
  const [fileData, setFileData] = useState<FileData>({ dailySummary: {}, structuredData: {} });
  const [users, setUsers] = useState<User[]>([])

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

  const columns: ColumnConfig<User>[] = [
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
    {
      key: "activeTimeCount",
      label: "Active Time Count",
      icon: sortIcon,
    },
    {
      key: "idleHours",
      label: "Idle Hours",
      icon: sortIcon,
    },
    
    {
      key: "inactiveTimeCount",
      label: "Inactive Time Count",
      icon: sortIcon,
    },    
    {
      key: "meetingHours",
      label: "Meeting Hours",
      icon: sortIcon,
    },    
    {
      key: "offComputerHours",
      label: "Off Computer Hours",
      icon: sortIcon,
    },
    {
      key: "onComputerHours",
      label: "On Computer Hours",
      icon: sortIcon,
    },
    {
      key: "totalHours",
      label: "Total Hours",
      icon: sortIcon,
    },
  ];

  const handleClaimStatus = (row: any) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  useEffect(() => {
    if (Object.keys(fileData.dailySummary).length) {
      const users: User[] = [];

      Object.keys(fileData.dailySummary).map((val) => {
        let totalKeys = 0;
        let whitespaceKeys = 0;
        let visibleKeys = 0;
        let invisibleKeys = 0;
        let activeTimeCount = 0;
        let idleHours = 0;
        let inactiveTimeCount =0;
        let meetingHours = 0;
        let offComputerHours = 0;
        let onComputerHours = 0;
        let totalHours = 0;

        if (fileData.dailySummary[val].dateWise) {
          Object.keys(fileData.dailySummary[val].dateWise).map((date) => {
            if (val === "TCPL463" && fileData.dailySummary[val].dateWise) {
              const keyLoggerData = fileData.dailySummary[val].dateWise[date].keylogerData;
              const teamLoggerData = fileData.dailySummary[val].dateWise[date].teamlogerReport;
              
              totalKeys += keyLoggerData?.totalKeys || 0;
              whitespaceKeys += keyLoggerData?.whitespaceKeys || 0;
              visibleKeys += keyLoggerData?.visibleKeys || 0;
              invisibleKeys += keyLoggerData?.invisibleKeys || 0;
              activeTimeCount += teamLoggerData?.activeTimeCount || 0;
              idleHours += teamLoggerData?.idleHours || 0;
              idleHours = parseFloat(idleHours.toFixed(2));
              inactiveTimeCount += teamLoggerData?.inactiveTimeCount || 0;
              meetingHours += teamLoggerData?.meetingHours || 0;
              offComputerHours += teamLoggerData?.offComputerHours || 0;
              offComputerHours = parseFloat(offComputerHours.toFixed(2))
              onComputerHours += teamLoggerData?.onComputerHours ||0;
              onComputerHours = parseFloat(onComputerHours.toFixed(2))
              totalHours += teamLoggerData?.totalHours || 0;
              totalHours = parseFloat(totalHours.toFixed(2))
            }
          })
        }
        const user = {
          empId: val,
          empName: fileData.dailySummary[val].userData?.name,
          totalKeyPress: totalKeys,
          totalWhiteKeyPress: whitespaceKeys,
          totalVisibleKeyPress: visibleKeys,
          totalInVisibleKeyPress: invisibleKeys,
          activeTimeCount: activeTimeCount,
          idleHours: idleHours,
          inactiveTimeCount: inactiveTimeCount,
          meetingHours: meetingHours,
          offComputerHours: offComputerHours,
          onComputerHours: onComputerHours,
          totalHours: totalHours
        }
        users.push(user);
      })
      setUsers(users);
    }
  }, [fileData])

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
        <Box sx={{ marginTop: { md: '10', sm: '20' } }}>
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
            pageSize={15}
            actions={actions}
            showEditMenuIcon={true}
            onClaimStatus={handleClaimStatus}
          />
        </Box>
        <ClaimModal open={isModalOpen} onClose={() => setModalOpen(false)} rowData={selectedRow || undefined} />
        <KeyLoggerList fileData={fileData} setFileData={setFileData} />        
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
