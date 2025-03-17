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

function TeamLoggerData() {
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
    // click function for custom btn
    const handleClick = () => {
        console.log("Button clicked!");
    };

    const navigateToKeyLoggerData = () => {
        navigate("/dashboard")
    }

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
    return (
        <>
            <Box sx={{ width: "100%", padding: "14px 11px" }}>
                <Button
                    style={{ border: "1px solid black", }}
                    onClick={navigateToKeyLoggerData}
                >
                    Key Logger Activity
                </Button>
                <Button
                    style={{ border: "1px solid black", marginLeft: "20px", backgroundColor: '#696969', color: 'white' }}>
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
                    <Box sx={{ marginTop: "20px" }}>
                        <ReusableTable
                            columns={columns}
                            rows={users}
                            showPagination={true}
                            pageSize={15}
                        />
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

export default TeamLoggerData;
