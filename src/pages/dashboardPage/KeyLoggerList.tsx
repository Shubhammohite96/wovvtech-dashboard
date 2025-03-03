import React, { useEffect } from "react";
import { fetchAllLogerUsers, getUserReport, getUserProductivity } from '../../services/teamLoggerApis'
import { userLastFileStore } from "../../states/userLastFileStore";
import { getUsersFileList, fetchEncryptedFile, decryptData, convertToUTC } from "./apiCalling";
import { groupDataBySlots, analyzeKeylogData, categorizeUsage } from "../../Utils/otherFunctionality";

interface KeyLoggerListProps {
    fileData: any;
    setFileData: React.Dispatch<React.SetStateAction<any>>;
}

interface KeylogEntry {
    timestamp: string;
    key: string;
}

interface AnalysisResults {
    keylogerData: any;
    fileUrl?: string;
    utcTimestamps?: {
        covertStartDateTime: any;
        covertEndDateTime: any;
    };
    teamlogerReport?: any;
    productivityReport?: any;
}


const KeyLoggerList: React.FC<KeyLoggerListProps> = ({ fileData, setFileData }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAllLogerUsers();
                const userLists = response.data || [];
                const employees = userLists.filter((user: any) => user.emp_code);

                if (employees.length) {
                    await getFileListing(employees);
                }
            } catch (error) {

            }
        };

        fetchData();
    }, []);

    const getFileListing = async (employees: any[]) => {
        const userListFileList: Record<string, string> = userLastFileStore.value;

        const userIdWithLogerId: Record<string, any> = {};
        const structuredData: Record<string, any> = {};
        const dailySummary: Record<string, any> = {};

        const employeeIds = employees.map((user: any) => {
            const empCode = user.emp_code;
            userIdWithLogerId[empCode] = user;
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

        }
    };

    const processFileData = async (
        fileLists: Record<string, any>,
        userIdWithLogerId: Record<string, any>,
        structuredData: Record<string, any>,
        dailySummary: Record<string, any>
    ) => {
        for (const key in fileLists) {
            structuredData[key] = {};
            dailySummary[key] = { userData: userIdWithLogerId[key], dateWise: {} };

            if (fileLists[key].length > 0) {
                for (const file of fileLists[key]) {
                    const fileName = file.split("/").pop();
                    structuredData[key].lastFileName = fileName;
                    const [date, timeSlot] = fileName.split(".")[0].split("_");

                    try {
                        const encryptedData = await fetchEncryptedFile(file);
                        const decryptedLines = encryptedData
                            .split("\n")
                            .map((line: string) => decryptData(line.trim()))
                            .filter(Boolean);

                        // ✅ Ensure parsedData always has `key` property
                        const parsedData: KeylogEntry[] = decryptedLines
                            .map((line: string) => {
                                const match = line.match(/\["(.+?)", (.+?) pressed\]/);
                                return match ? { timestamp: match[1], key: match[2] } : null;
                            })
                            .filter((item: any): item is KeylogEntry => !!item);

                        // ✅ Ensure `groupedData` has a valid type
                        const groupedData = groupDataBySlots(parsedData) as KeylogEntry[];

                        // ✅ Pass correctly typed `groupedData` to analyzeKeylogData
                        let analysisResults: AnalysisResults = {
                            keylogerData: analyzeKeylogData(groupedData),
                        };
                        analysisResults.fileUrl = file;

                        const [startTimeSlot, endTimeSlot] = timeSlot.split("-");
                        const covertStartDateTime = convertToUTC(date, `${startTimeSlot}:00`);
                        const covertEndDateTime = convertToUTC(date, `${endTimeSlot}:00`);

                        analysisResults.utcTimestamps = {
                            covertStartDateTime,
                            covertEndDateTime,
                        };

                        const reportApiPayload = {
                            accountId: userIdWithLogerId[key]?.guid,
                            startTime: covertStartDateTime.utcTimestamp,
                            endTime: covertEndDateTime.utcTimestamp,
                        };

                        const reportResponse = await getUserReport(reportApiPayload);
                        const userReport = reportResponse.data?.employeeTimeReport?.timeReportItems?.[0] || {};
                        const productivityResponse = await getUserProductivity(reportApiPayload);

                        const webUsage = categorizeUsage(productivityResponse.data?.webDurations || [], "website");
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

                        if (!dailySummary[key].dateWise[date]) {
                            dailySummary[key].dateWise[date] = {
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

                        // ✅ Aggregate Keylogger Data Safely
                        dailySummary[key].dateWise[date].keylogerData.totalKeys += analysisResults.keylogerData.totalKeys || 0;
                        dailySummary[key].dateWise[date].keylogerData.whitespaceKeys +=
                            analysisResults.keylogerData.whitespaceKeys || 0;
                        dailySummary[key].dateWise[date].keylogerData.visibleKeys +=
                            analysisResults.keylogerData.visibleKeys || 0;
                        dailySummary[key].dateWise[date].keylogerData.invisibleKeys +=
                            analysisResults.keylogerData.invisibleKeys || 0;
                    } catch (error) {
                        console.error("Error processing file:", error);
                    }
                }
            }
        }
        console.log("structuredData: ", structuredData);
        console.log("dailySummary: ", dailySummary);
        setFileData({ structuredData, dailySummary });
    };
    return <> </>;
};
export default KeyLoggerList;
