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
import {Search } from "@mui/icons-material";
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

interface DateWise {
  [date: string]: {
      keylogerData?: KeyloggerData;
  };
}


interface DailySummary {
  [key: string]: {
      dateWise?: DateWise;
      userData?: UserData;
  };
}

interface FileData {
  dailySummary : DailySummary, 
  structuredData: object
}

function DashboardPage() {
  const [selectedValue, setSelectedValue] = useState<string | number>("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null)
  const [fileData, setFileData] = useState<FileData>({dailySummary: {}, structuredData:{}});
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
  ];

  const handleClaimStatus = (row: any) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  useEffect(() => {
    if(Object.keys(fileData.dailySummary).length) {
      const users: User[] = [];
      
      Object.keys(fileData.dailySummary).map((val) => {
        let totalKeys = 0;
        let whitespaceKeys = 0;
        let visibleKeys = 0;
        let invisibleKeys = 0;

        if(fileData.dailySummary[val].dateWise) {
          Object.keys(fileData.dailySummary[val].dateWise).map((date) => {
            if( val === "TCPL463" && fileData.dailySummary[val].dateWise) {
              const keyLoggerData = fileData.dailySummary[val].dateWise[date].keylogerData;
              totalKeys += keyLoggerData?.totalKeys || 0;
              whitespaceKeys += keyLoggerData?.whitespaceKeys || 0;
              visibleKeys += keyLoggerData?.visibleKeys || 0;
              invisibleKeys += keyLoggerData?.invisibleKeys || 0;
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
        }
        users.push(user);
      })
      setUsers(users);
    }
  }, [fileData])

  console.log("fileData", fileData)
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
