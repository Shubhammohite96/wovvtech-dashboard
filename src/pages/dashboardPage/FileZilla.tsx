import React, { useEffect, useState } from "react";
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

const FileZilla = () => {
  const [fileData, setFileData] = useState({});

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

  return <div>FileZilla</div>;
};

export default FileZilla;
