import React, { useEffect } from "react";
import { fetchAllLogerUsers, getUserReport, getUserProductivity } from '../../services/teamLoggerApis'
import { userLastFileStore } from "../../states/userLastFileStore";
import { getUsersFileList, fetchEncryptedFile, decryptData, convertToUTC } from "./apiCalling";
import { groupDataBySlots, analyzeKeylogData, categorizeUsage } from "../../Utils/otherFunctionality";

interface KeyLoggerListProps {
    fileData: any;
    setFileData: React.Dispatch<React.SetStateAction<any>>;
}

function isValidDateFormat(dateStr: string) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateStr);
}
//@ts-ignore
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
        // @ts-ignore
        const userListFileList: Record<string, string> = userLastFileStore.value;

        const userIdWithLogerId: Record<string, any> = {};
        const structuredData: Record<string, any> = {};
        const dailySummary: Record<string, any> = {};

        const employeeIds = employees.map((user) => {
            const empCode = user.emp_code;
            userIdWithLogerId[empCode] = user;
            return {
                employeeId: empCode,
                // fileName: userListFileList[user.emp_code] || "",
                fileName: `2025-03-17_09-10_${user.emp_code}.enc` || "",
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
        let dateTimeSlot: Record<string, Record<string, string[]>> = {};
        for (const key in fileLists) {

            structuredData[key] = {};
            dailySummary[key] = { userData: userIdWithLogerId[key], dateWise: {} };

            if (fileLists[key].length > 0) {
                for (const file of fileLists[key]) {
                    const fileName = file.split("/").pop();
                    // structuredData[key].lastFileName = fileName;
                    const [date, timeSlot] = fileName.split(".")[0].split("_");
                    if (dateTimeSlot[key]?.[date]) { 
                        dateTimeSlot[key] = { ...dateTimeSlot[key], [date]: [...dateTimeSlot[key][date], timeSlot] }
                    } else {
                        console.log(isValidDateFormat(date));
                        if (isValidDateFormat(date)) {
                            dateTimeSlot[key] = { ...dateTimeSlot[key], [date]: [timeSlot] }
                        }
                    }

                    try {
                        const encryptedData = await fetchEncryptedFile(file);

                        const decryptedLines = encryptedData
                            .split("\n")
                            .map((line: any) => decryptData(line.trim()))
                            .filter(Boolean);
                        const parsedData = decryptedLines.map((line: string) => {
                            const match = line.match(/\[?"?([\d-:\s,.]+)"?\]?,?\s?"?(.+?)"?\s?pressed"?\]?/);
                            return match ? { timestamp: match[1], key: match[2] } : null;
                        }).filter(Boolean);
                        const groupedData = groupDataBySlots(parsedData) as { key: string }[];

                        let analysisResults = {
                            keylogerData: analyzeKeylogData(groupedData),
                            fileUrl: file,
                            utcTimestamps: {
                                covertStartDateTime: {} as { utcTimestamp: number; utcDate: string },
                                covertEndDateTime: {} as { utcTimestamp: number; utcDate: string },
                            },
                            teamlogerReport: {
                                employeeName: "",
                                email: "",
                                onComputerHours: 0,
                                idleHours: 0,
                                meetingHours: 0,
                                offComputerHours: 0,
                                totalHours: 0,
                                activeTimeCount: 0,
                                inactiveTimeCount: 0,
                            },
                            productivityReport: {
                                totalRating: 0,
                                webUsage: [],
                                appUsage: [],
                            },
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
                            accountId: userIdWithLogerId[key].guid,
                            startTime: covertStartDateTime.utcTimestamp,
                            endTime: covertEndDateTime.utcTimestamp,
                        };

                        const reportResponse = await getUserReport(reportApiPayload);
                        const userReport = reportResponse.data?.employeeTimeReport?.timeReportItems?.[0] || {};
                        const productivityResponse = await getUserProductivity(reportApiPayload);
                        //@ts-ignore
                        const webUsage = categorizeUsage(productivityResponse.data?.webDurations || [], "website");
                        //@ts-ignore
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
                            webUsage: [],
                            appUsage: [],
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

                        dailySummary[key].dateWise[date].keylogerData.totalKeys += analysisResults.keylogerData.totalKeys || 0;
                        dailySummary[key].dateWise[date].keylogerData.whitespaceKeys += analysisResults.keylogerData.whitespaceKeys || 0;
                        dailySummary[key].dateWise[date].keylogerData.visibleKeys += analysisResults.keylogerData.visibleKeys || 0;
                        dailySummary[key].dateWise[date].keylogerData.invisibleKeys += analysisResults.keylogerData.invisibleKeys || 0;

                    } catch (error) {

                    }
                }
                // fetch teamlogger data
            }
        }

        console.log('dateTimeSlot: ', dateTimeSlot);
        for (const key in dateTimeSlot) {
            console.log('key: ', key);

            console.log('dateTimeSlot[key]: ', dateTimeSlot[key]);
            for (const dateKey in dateTimeSlot[key]) {
                let startTime = dateTimeSlot[key][dateKey][0]
                console.log('startTime: ', startTime.split('-'));
                let endTime = dateTimeSlot[key][dateKey][dateTimeSlot[key][dateKey].length - 1]

                console.log('endTime: ', endTime.split('-'));
                //@ts-ignore
                const [startTimeSlot, startEndTimeSlot] = startTime.split("-");
                //@ts-ignore
                const [endTimeSlot, endTimeEndSlot] = endTime.split("-");

                const covertStartDateTime = convertToUTC(dateKey, `${startTimeSlot}:00`);
                console.log('dateKey, `${startTimeSlot}:00`: ', dateKey, `${startTimeSlot}:00`);

                const covertEndDateTime = convertToUTC(dateKey, `${endTimeEndSlot}:00`);
                console.log('dateKey, `${endTimeEndSlot}:00`: ', dateKey, `${endTimeEndSlot}:00`);


                const reportApiPayload = {
                    accountId: userIdWithLogerId[key].guid,
                    startTime: covertStartDateTime.utcTimestamp,
                    endTime: covertEndDateTime.utcTimestamp,
                };

                const reportResponse = await getUserReport(reportApiPayload);
                const userReport = reportResponse.data?.employeeTimeReport?.timeReportItems?.[0] || {};
                const productivityResponse = await getUserProductivity(reportApiPayload);

                const webUsage = categorizeUsage(productivityResponse.data?.webDurations || [], "website");
                const appUsage = categorizeUsage(productivityResponse.data?.appDurations || [], "app");



                dailySummary[key].dateWise[dateKey].teamlogerReport = {
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

                dailySummary[key].dateWise[dateKey].productivityReport = {
                    totalRating: productivityResponse.data?.totalRating || 0,
                    webUsage,
                    appUsage,
                };
            }
        }
        setFileData({ structuredData, dailySummary });
        console.log('dailySummary: ', dailySummary);
        console.log('structuredData: ', structuredData);
    };

    return <> </>;
};
export default KeyLoggerList;
