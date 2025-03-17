import React, { useEffect, useState } from "react";
import CustomSelectDropdown from "../../components/cutomComponents/CustomDropdown";
import {
  Box,
  SelectChangeEvent,
  Typography,
  Button,
  CircularProgress
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
import { useNavigate } from "react-router-dom";

interface User {
  empId: string | number;
  empName?: string;
  date?: string;
  time?: string;
  totalKeyPress?: number;
  totalWhiteKeyPress?: number;
  totalVisibleKeyPress?: number;
  totalInVisibleKeyPress?: number;
  activeTimeCount?: number;
  idleHours?: number;
  inactiveTimeCount?: number;
  meetingHours?: number;
  offComputerHours?: number;
  onComputerHours?: number;
  totalHours?: number;
  invisibleKeys?: number;
  totalKeys: number;
  visibleKeys: number;
  visiblePercentage: number;
  whitespaceKeys: number;
  whitespacePercentage: number;
  child?: {
    [date: string]: {
      totalKeyPress?: number;
      totalWhiteKeyPress?: number;
      totalVisibleKeyPress?: number;
      totalInVisibleKeyPress?: number;
      activeTimeCount?: number;
      idleHours?: number;
      inactiveTimeCount?: number;
      meetingHours?: number;
      offComputerHours?: number;
      onComputerHours?: number;
      totalHours?: number;
    } | undefined
  }
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
  visibleKeys?: number;
  visiblePercentage: number;
  invisibleKeys?: number;
  totalKeys?: number;
  whitespaceKeys?: number;
  whitespacePercentage: number;
}

interface ITeamLoggerData {
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
    teamlogerReport?: ITeamLoggerData;
  };
}

interface DailySummary {
  [key: string]: {
    dateWise?: DateWise;
    userData?: UserData;
  };
}

interface StructuredData {
  [key: string]: {
    [date: string]: {
      [hours: string]: {
        keylogerData?: KeyloggerData;
        teamlogerReport?: ITeamLoggerData;
        userData?: UserData;
      };
    };
  };
}

interface FileData {
  dailySummary: DailySummary,
  structuredData: StructuredData
}

function DashboardPage() {
  const [selectedValue, setSelectedValue] = useState<string | number>("");
  const [isModalOpen, setModalOpen] = useState(false);
  //@ts-ignore
  const [selectedRow, setSelectedRow] = useState(null)
  const [fileData, setFileData] = useState<FileData>({ dailySummary: {}, structuredData: {} });
  const [users, setUsers] = useState<User[]>([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

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

  const navigateToTeamLoggerData = () => {
    navigate('/TeamLoggerData')
  }
  // click function for custom btn
  const handleClick = () => {
    console.log("Button clicked!");
  };

  console.log("fileData:", fileData)

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
      key: "date",
      label: "Date",
      icon: sortIcon,
    },
    {
      key: "time",
      label: "Hours",
      icon: sortIcon,
    },
    {
      key: "visibleKeys",
      label: "Visible Keys",
      icon: sortIcon,
    },
    {
      key: "visiblePercentage",
      label: "Visible Percentage",
      icon: sortIcon,
    },
    {
      key: "invisibleKeys",
      label: "Invisible Keys",
      icon: sortIcon,
    },
    {
      key: "totalKeys",
      label: "Total Keys",
      icon: sortIcon,
    },
    {
      key: "whitespaceKeys",
      label: "Whitespace Keys",
      icon: sortIcon,
    },
    {
      key: "whitespacePercentage",
      label: "Whitespace Percentage",
      icon: sortIcon,
    }
  ];

  useEffect(() => {
    setLoader(true);
    if (Object.keys(fileData.structuredData).length) {
      const users: User[] = [];

      Object.keys(fileData.structuredData).map((val) => {
        let dateData: any = {};

        if (fileData.structuredData[val]) {
          const structuredData = fileData.structuredData[val];          
          if (Object.keys(structuredData).length > 0) {
            Object.keys(structuredData).map((date) => {
              
              Object.keys(structuredData[date]).map((hours) => {
                const keylogerData = structuredData[date][hours]?.keylogerData;

                dateData = {
                  date: date,
                  time: hours,
                  visibleKeys: keylogerData?.visibleKeys,
                  visiblePercentage: Number.isNaN(keylogerData?.visiblePercentage) ? 0 : keylogerData?.visiblePercentage,
                  invisibleKeys: keylogerData?.invisibleKeys,
                  totalKeys: keylogerData?.totalKeys,
                  whitespaceKeys: keylogerData?.whitespaceKeys,
                  whitespacePercentage: Number.isNaN(keylogerData?.whitespacePercentage) ? 0 : keylogerData?.whitespacePercentage
                };

                const user: User = {
                  empId: val,
                  empName: fileData.dailySummary[val].userData?.name,
                  ...dateData,
                };
                users.push(user);
              });
            });
          } else {
            const user: User = {
              empId: val,
              empName: fileData.dailySummary[val].userData?.name,
              totalKeys: 0,
              visibleKeys: 0,
              visiblePercentage: 0,
              invisibleKeys: 0,
              whitespaceKeys: 0,
              whitespacePercentage: 0,
            };
            users.push(user);
          }
        }
      });

      setUsers(users);
      setLoader(false);
    }
  }, [fileData]);

  return (
    <>
      <Box sx={{ width: "100%", padding: "14px 11px" }}>
        <Button
          style={{ border: "1px solid black",backgroundColor:'#696969',color:'white' }}>
          Key Logger Activity
        </Button>
        <Button
          onClick={navigateToTeamLoggerData}
          style={{ border: "1px solid black", marginLeft: "20px"}}>
          Team Logger Data
        </Button>
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
        {loader ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ marginTop: "20px", width: "99% !important" }}>
            <ReusableTable columns={columns} rows={users} showPagination={true} pageSize={15} />
          </Box>
        )}
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
