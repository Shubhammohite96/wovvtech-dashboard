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
import {
  userLastFileStore,
  userListing,
} from "../../signals/FileZillaSignal";
import {
  convertToUTC,
  decryptData,
  fetchEncryptedFile,
  getUsersFileList,
} from "./apiCalling";
import {
  analyzeKeylogData,
  categorizeUsage,
  groupDataBySlots,
} from "../../Utils/OtherFunctionality";
import { fetchAllLogerUsers, getUserProductivity, getUserReport } from "../../services/TeamLoggerApi";
const actions = {
  claimStatus: true
};
function DashboardPage() {
  const [selectedValue, setSelectedValue] = useState<string | number>("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null)
  const [fileData, setFileData] = useState({});

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


  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchAllLogerUsers();
          const userLists = response.data || [];
          const employees = userLists.filter((user) => user.emp_code);
          
          if (employees.length) {
            await getFileListing(employees);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const getFileListing = async (employees) => {
      const userListFileList = userLastFileStore.value;
      const userIdWithLogerId = {};
      const structuredData = {};
      const dailySummary = {};
  
      const employeeIds = employees.map((user) => {
        const empCode = user.emp_code;
        userIdWithLogerId[empCode] = user.guid;
        return {
          employeeId: empCode,
          fileName: userListFileList[user.emp_code] || "",
        };
      });
  
      const payload = {
        pageUrl: "retrieveFTPFileV2",
        entityName: "retrieveFTPFile",
        action: "payload",
        event: "replace",
        formList: [
          {
            entityName: "KeyLogger",
            employeeIds,
            tenantId: "_2012119111109",
          },
        ],
      };
  
      try {
        const response = await getUsersFileList(payload);
        const fileLists = response.data?.response?.[0] || {};
        await processFileData(fileLists, userIdWithLogerId, structuredData, dailySummary);
      } catch (error) {
        console.error("Error fetching file list:", error);
      }
    };
  
    const processFileData = async (fileLists, userIdWithLogerId, structuredData, dailySummary) => {
      for (const key in fileLists) {
        structuredData[key] = {};
        dailySummary[key] = {};
        
        if (fileLists[key].length > 0) {
          for (const file of fileLists[key]) {
            const fileName = file.split("/").pop();
            structuredData[key].lastFileName = fileName;
            const [date, timeSlot] = fileName.split(".")[0].split("_");
  
            try {
              const encryptedData = await fetchEncryptedFile(file);
              const decryptedLines = encryptedData
                .split("\n")
                .map((line) => decryptData(line.trim()))
                .filter(Boolean);
  
              const parsedData = decryptedLines.map((line) => {
                const match = line.match(/\["(.+?)", (.+?) pressed\]/);
                return match ? { timestamp: match[1], key: match[2] } : null;
              }).filter(Boolean);
  
              const groupedData = groupDataBySlots(parsedData);
              let analysisResults = { keylogerData: analyzeKeylogData(groupedData) };
              analysisResults.fileUrl = file;
  
              const [startTimeSlot, endTimeSlot] = timeSlot.split("-");
              const covertStartDateTime = convertToUTC(date, `${startTimeSlot}:00`);
              const covertEndDateTime = convertToUTC(date, `${endTimeSlot}:00`);
              
              analysisResults.utcTimestamps = {
                covertStartDateTime,
                covertEndDateTime,
              };
  
  
              const reportApiPayload = {
                accountId: userIdWithLogerId[key],
                startTime: covertStartDateTime.utcTimestamp,
                endTime: covertEndDateTime.utcTimestamp,
              };
  
              const reportResponse = await getUserReport(reportApiPayload);
              const userReport = reportResponse.data?.employeeTimeReport?.timeReportItems?.[0] || {};
              const productivityResponse = await getUserProductivity(reportApiPayload);
              
              const webUsage = categorizeUsage(productivityResponse.data?.webDurations || [], "web");
              const appUsage = categorizeUsage(productivityResponse.data?.appDurations || [], "app");
  
  
  
              analysisResults.teamlogerReport = {
                employeeName: userReport.title || "Unknown",
                email: userReport.email || "N/A",
                onComputerHours: userReport.onComputerHours || 0,
                idleHours: userReport.idleHours || 0,
                meetingHours: userReport.meetingHours || 0,
                offComputerHours: userReport.offComputerHours || 0,
                totalHours: userReport.totalHours || 0,
                activeTimeCount: userReport.activeTimeTupleCount || 0,
                inactiveTimeCount: userReport.inactiveTimeTupleCount || 0,
              };
  
              analysisResults.productivityReport = {
                totalRating: productivityResponse.data?.totalRating || 0,
                webUsage,
                appUsage,
              };
  
              structuredData[key][date] = {
                ...structuredData[key][date],
                [timeSlot]: analysisResults,
              };
  
              if (!dailySummary[key][date]) {
                dailySummary[key][date] = {
                  keylogerData: {
                    totalKeys: 0,
                    whitespaceKeys: 0,
                    visibleKeys: 0,
                    invisibleKeys: 0,
                  },
                  teamlogerReport: {},
                  productivityReport: {},
                };
              }
  
              // Aggregate Keylogger Data
              dailySummary[key][date].keylogerData.totalKeys += analysisResults.keylogerData.totalKeys || 0;
              dailySummary[key][date].keylogerData.whitespaceKeys += analysisResults.keylogerData.whitespaceKeys || 0;
              dailySummary[key][date].keylogerData.visibleKeys += analysisResults.keylogerData.visibleKeys || 0;
              dailySummary[key][date].keylogerData.invisibleKeys += analysisResults.keylogerData.invisibleKeys || 0;
  
            } catch (error) {
              console.error("Error processing file:", fileName, error);
            }
          }
        }
      }
      console.log('structuredData: ', structuredData);
      console.log('dailySummary: ', dailySummary);
      setFileData({ structuredData, dailySummary });
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
