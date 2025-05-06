import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  SelectChangeEvent,
  Typography,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import {
  StyledTypography,
  StyledBox,
  StyledDropDownsBox,
  StyledChildCommonDropDownsBox,
} from "./DashboardStyle";
import CustomButton from "../../components/cutomComponents/CustomButton";
import ReusableTable, {
  ColumnConfig,
} from "../../components/cutomComponents/ReusableTable";
import sortIcon from "../../assets/sortIcon.png";
import ClaimModal from "./ClaimModal";
import KeyLoggerList from "./KeyLoggerList";
import { useNavigate } from "react-router-dom";
import { fetchAllLogerUsers} from '../../services/teamLoggerApis'
import { Autocomplete, TextField } from '@mui/material';
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
  totalKeysBelow10k:boolean;
  visibleExceeds85:boolean;
  whitespaceExceeds75:boolean;
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
  totalKeysBelow10k:boolean;
  visibleExceeds85:boolean;
  whitespaceExceeds75:any;
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

const timeSlots: string[] = [
  '09-10', '10-11', '11-12', '12-13',
  '13-14', '14-15', '15-16', '16-17',
  '17-18', '18-19'
];

function DashboardPage() {
  const [isModalOpen, setModalOpen] = React.useState(false);
  //@ts-ignore
  const [selectedRow, setSelectedRow] = useState(null)
  const [fileData, setFileData] = useState<FileData>({ dailySummary: {}, structuredData: {} });
  const [users, setUsers] = useState<User[]>([]);
  const [loader, setLoader] = useState(false);
  const [userList,setUserList] = useState<UserData[]>([])
  const [selectedUsers, setSelectedUsers] = useState<UserData[]>([]);
  const [selectedDate, setSelectedDate] = useState('');

  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [formList123, setFormList123] = useState<any>({
    employeeIds: [],
  });
  const[requiredError,setRequiredError]=useState(false)
  const keyLoggerRef = useRef<any>(null);
  

  const handleChangeTimeSlot = (event: SelectChangeEvent) => {
    setSelectedSlot(event.target.value);
  };

  const handleChangeDD = (_event: any, value: UserData[]) => {
    setSelectedUsers(value);
  };
  const handleDateChange = (event:any) => {
    setSelectedDate(event.target.value);
  };
  const navigate = useNavigate();

  const navigateToTeamLoggerData = () => {
    navigate('/TeamLoggerData')
  }
  // click function for custom btn
  const handleClick = () => {
    if (!selectedUsers.length || !selectedDate || !selectedSlot) {
      setFormList123([]);
      setRequiredError(true)
      return;
    }
    setRequiredError(false)
    const employeeIds = selectedUsers.map((user) => ({
      employeeId: user.emp_code ?? '',
      fileName: `${selectedDate}_${selectedSlot}_${user.emp_code}.enc`,
    }));
  
    setFormList123({ employeeIds });
  
    // Wait for next tick to let state update
    setTimeout(() => {
      if (keyLoggerRef.current) {
        keyLoggerRef.current.fetchDataFromParent();
        setLoader(true);
      }
    }, 0);
  };

  const handleClearAll=()=>{
    setSelectedUsers([]);
    setSelectedDate('');
    setSelectedSlot('')
  }

  const handleSelectAll=()=>{
    if (!selectedDate || !selectedSlot) {
      setFormList123([]);
      setRequiredError(true)
      return;
    }
    setRequiredError(false)
    const employeeIds = userList.map((user) => {
      const empCode = user.emp_code;
      return {
          employeeId: empCode,
          // fileName: userListFileList[user.emp_code] || "",
          fileName: `${selectedDate}_${selectedSlot}_${user.emp_code}.enc`,
      };
  });
  setFormList123({ employeeIds });
  
  // Wait for next tick to let state update
  setTimeout(() => {
    if (keyLoggerRef.current) {
      keyLoggerRef.current.fetchDataFromParent();
      setLoader(true);
    }
  }, 0);
  }
  


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
      label: "Time Period",
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
    },
    {
      key: "totalKeysBelow10k",
      label: "Total Keys Below 10k",
      icon: sortIcon,
    },
    {
      key: "visibleExceeds85",
      label: "visible Exceeds 85",
      icon: sortIcon,
    },
    {
      key: "whitespaceExceeds75",
      label: "whiteSpace Exceeds 75",
      icon: sortIcon,
    }
  ];

  useEffect(() => {
    // setLoader(true);
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
                if( keylogerData?.totalKeysBelow10k === false||
                  keylogerData?.whitespaceExceeds75 === true ||
                  keylogerData?.visibleExceeds85 === true
                 ) {

                  dateData = {
                    date: date,
                    time: hours,
                    visibleKeys: keylogerData?.visibleKeys,
                    visiblePercentage: Number.isNaN(keylogerData?.visiblePercentage) ? 0 : keylogerData?.visiblePercentage,
                    invisibleKeys: keylogerData?.invisibleKeys,
                    totalKeys: keylogerData?.totalKeys,
                    whitespaceKeys: keylogerData?.whitespaceKeys,
                    whitespacePercentage: Number.isNaN(keylogerData?.whitespacePercentage) ? 0 : keylogerData?.whitespacePercentage,
                    totalKeysBelow10k:keylogerData?.totalKeysBelow10k === true ? 'true':'false',
                    visibleExceeds85:keylogerData?.visibleExceeds85 === true ? 'true' :'false',
                    whitespaceExceeds75:keylogerData?.whitespaceExceeds75 == false ? 'false' : 'true'
                  };
                  const user: User = {
                    empId: val,
                    empName: fileData.dailySummary[val].userData?.name,
                    ...dateData,
                  };
                  users.push(user);
                }

              });
            });
          } 
          else {
            const user: User = {
              empId: val,
              empName: fileData.dailySummary[val].userData?.name,
              totalKeys: 0,
              visibleKeys: 0,
              visiblePercentage: 0,
              invisibleKeys: 0,
              whitespaceKeys: 0,
              whitespacePercentage: 0,
              totalKeysBelow10k:true,
              visibleExceeds85:true,
              whitespaceExceeds75:false
            };
            users.push(user);
          }
        }
      });

      setUsers(users);
      setLoader(false);
    }
  }, [fileData]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchAllLogerUsers();
          const userLists = response.data || [];
          const employees = userLists.filter((user: any) => user.emp_code);

          setUserList(employees)
          if (employees.length) {
            console.log(userLists, "shubhamMohite12345677");
          }
        } catch (error) {}
      };

      fetchData();
    }, []);


  return (
    <>
      <Box sx={{ width: "100%", padding: "14px 11px" }}>
        <Button
          style={{
            border: "1px solid black",
            backgroundColor: "#696969",
            color: "white",
          }}
        >
          Key Logger Activity
        </Button>
        <Button
          onClick={navigateToTeamLoggerData}
          style={{ border: "1px solid black", marginLeft: "20px" }}
        >
          Team Logger Data
        </Button>
        <StyledBox>
          <Box>
            <StyledTypography>Filters</StyledTypography>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
          <CustomButton
              btnText="Select All"
              buttonVariant="contained"
              btnStyle={{ margin: "10px", width: "103px" }}
              buttonId="outlined-button"
              handleButtonClick={handleSelectAll}
            />
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
              handleButtonClick={handleClearAll}
            />
          </Box>
        </StyledBox>

        {/* Filter DropDowns section */}
        <StyledDropDownsBox>
          <StyledChildCommonDropDownsBox sx={{ width: "30%" }}>
            <Typography sx={{ color: "#0f172a", fontSize: "12px" }}>
              Employee Name
            </Typography>
            <Autocomplete
              multiple
              options={userList.filter((user) => user.status === "ACTIVE")}
              // getOptionLabel={(option: UserData) =>
              //   `${option.name} (${option.email})`
              // }
              getOptionLabel={(option) => `${option.name} (${option.emp_code})`}
              value={selectedUsers}
              onChange={handleChangeDD}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a user"
                  variant="outlined"
                />
              )}
            />
            {selectedUsers.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                <strong>Selected Users:</strong>
                <ul>
                  {selectedUsers.map((user) => (
                    <li key={user.guid}>{user.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </StyledChildCommonDropDownsBox>
          <StyledChildCommonDropDownsBox sx={{ width: "30%" }}>
            <Typography sx={{ color: "#0f172a", fontSize: "12px" }}>
              From
            </Typography>
            <TextField
              fullWidth
              // inputRef={inputRef}
              label="Select Date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                style: { cursor: "pointer" },
              }}
            />
          </StyledChildCommonDropDownsBox>
          <StyledChildCommonDropDownsBox sx={{ width: "30%" }}>
            <Typography sx={{ color: "#0f172a", fontSize: "12px" }}>
              Time Period
            </Typography>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Time Period</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedSlot}
                label="Time Period"
                onChange={handleChangeTimeSlot}
              >
                {timeSlots.map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </StyledChildCommonDropDownsBox>
        </StyledDropDownsBox>
        <Box sx={{ marginTop: { md: "10", sm: "20" } }}>
          <Typography sx={{ color: "red" }}>
            {requiredError ? "All fileds are required *" : ""}
          </Typography>
        </Box>

        {/* Table Section */}
        {loader ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ marginTop: "20px", width: "1200px" }}>
            {users.length ? (
              <>
                <ReusableTable
                  columns={columns}
                  rows={users}
                  showPagination={true}
                  pageSize={15}
                />
              </>
            ) : (
              <>
                <h5 style={{textAlign:'center',marginTop:'140px'}}>Looks like there’s no data here. Apply a filter to fetch relevant results.</h5>
              </>
            )}
          </Box>
        )}
        <ClaimModal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          rowData={selectedRow || undefined}
        />
        <KeyLoggerList
          fileData={fileData}
          setFileData={setFileData}
          formList={formList123}
          ref={keyLoggerRef}
        />
      </Box>
    </>
  );
}

export default DashboardPage;
