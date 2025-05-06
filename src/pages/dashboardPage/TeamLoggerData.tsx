import React, { useEffect, useState,useRef } from "react";
import {
    Box,
    SelectChangeEvent,
    Typography,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem
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
    totalKeys?: number;
    whitespaceKeys?: number;
    visibleKeys?: number;
    invisibleKeys?: number;
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
function TeamLoggerData() {
    const [isModalOpen, setModalOpen] = React.useState(false);
    //@ts-ignore
    const [selectedRow, setSelectedRow] = useState(null)
    const [fileData, setFileData] = useState<FileData>({ dailySummary: {}, structuredData: {} });
    const [users, setUsers] = useState<User[]>([]);
    const [loader, setLoader] = useState(false);
    const [userList,setUserList] = useState<UserData[]>([])
    const navigate = useNavigate();

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
 
    const navigateToKeyLoggerData = () => {
        navigate("/dashboard")
    }

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

      const handleClearAll=()=>{
        setSelectedUsers([]);
        setSelectedDate('');
        setSelectedSlot('')
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
            label: "Hours",
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
                                const teamLoggerData = structuredData[date][hours]?.teamlogerReport;

                                dateData = {
                                    date: date,
                                    time: hours,
                                    activeTimeCount: teamLoggerData?.activeTimeCount || 0,
                                    idleHours: teamLoggerData?.idleHours
                                        ? Number(teamLoggerData.idleHours.toFixed(2))
                                        : 0,
                                    inactiveTimeCount: teamLoggerData?.inactiveTimeCount || 0,
                                    meetingHours: teamLoggerData?.meetingHours
                                        ? Number(teamLoggerData.meetingHours.toFixed(2))
                                        : 0,
                                    offComputerHours: teamLoggerData?.offComputerHours
                                        ? Number(teamLoggerData.offComputerHours.toFixed(2))
                                        : 0,
                                    onComputerHours: teamLoggerData?.onComputerHours
                                        ? Number(teamLoggerData.onComputerHours.toFixed(2))
                                        : 0,
                                    totalHours: teamLoggerData?.totalHours
                                        ? Number(teamLoggerData.totalHours.toFixed(2))
                                        : 0,
                                }
                                const user = {
                                    empId: val,
                                    empName: fileData.dailySummary[val].userData?.name,
                                    ...dateData
                                }
                                users.push(user);

                            })
                        })
                    } else {
                        const user = {
                            empId: val,
                            empName: fileData.dailySummary[val].userData?.name,
                        }
                        users.push(user);
                    }
                }
            })
            setUsers(users);
            setLoader(false);
        }
    }, [fileData])


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
            style={{ border: "1px solid black" }}
            onClick={navigateToKeyLoggerData}
          >
            Key Logger Activity
          </Button>
          <Button
            style={{
              border: "1px solid black",
              marginLeft: "20px",
              backgroundColor: "#696969",
              color: "white",
            }}
          >
            Team Logger Data
          </Button>
          <StyledBox>
            <Box>
              <StyledTypography>Filters</StyledTypography>
            </Box>
            <Box sx={{ display: "flex", gap: "30px" }}>
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
                getOptionLabel={(option) =>
                  `${option.name} (${option.emp_code})`
                }
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
                <InputLabel id="demo-simple-select-label">
                  Time Period
                </InputLabel>
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
            <Box sx={{ marginTop: "20px" }}>
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
                  <h5 style={{ textAlign: "center", marginTop: "140px" }}>
                    Looks like there’s no data here. Apply a filter to fetch
                    relevant results.
                  </h5>
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

export default TeamLoggerData;
