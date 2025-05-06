import {
  Box,
  CircularProgress,  
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ReportCard from "./ReportCard";
import EmployeeReport from "./EmployeeReport";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import CustomButton from "../../components/cutomComponents/CustomButton";
import { useState } from "react";

interface KeyloggerData {
  totalKeys: number;
  whitespaceKeys: number;
  visibleKeys: number;
  invisibleKeys: number;
  totalKeysBelow10k: boolean;
  whitespaceExceeds75: boolean;
  visibleExceeds85: boolean;
  visibleBelow3: boolean;
  whitespacePercentage: number;
  visiblePercentage: number;
}

interface TeamloggerReport {
  employeeName: string;
  email: string;
  onComputerHours: number;
  idleHours: number;
  meetingHours: number;
  offComputerHours: number;
  totalHours: number;
  activeTimeCount: number;
  inactiveTimeCount: number;
}

interface TimeSlot {
  keylogerData: KeyloggerData;
  teamlogerReport: TeamloggerReport;
}

interface DateData {
  [timeSlot: string]: TimeSlot;
}

interface UserLog {
  [date: string]: DateData;
}

interface KeyloggerSuspiciousData {
  [userId: string]: UserLog;
}

const keyloggerSuspiciousData: KeyloggerSuspiciousData = {
  TCPL496: {
    '2025-04-01': {
      '10-11': {
        keylogerData: {
          totalKeys: 866,
          whitespaceKeys: 0,
          visibleKeys: 820,
          invisibleKeys: 46,
          totalKeysBelow10k: true,
          whitespaceExceeds75: false,
          visibleExceeds85: true,
          visibleBelow3: false,
          whitespacePercentage: 0,
          visiblePercentage: 94.7,
        },
        teamlogerReport: {
          employeeName: 'Shubham Mohite',
          email: 'mohite1696@gmail.com',
          onComputerHours: 0.9144725,
          idleHours: 0,
          meetingHours: 0,
          offComputerHours: 0,
          totalHours: 0.9144725,
          activeTimeCount: 50,    
          inactiveTimeCount: 5,
        },
      },
    },
  },
  TCPL513: {
    '2025-04-01': {
      '11-12': {
        keylogerData: {
          totalKeys: 262,
          whitespaceKeys: 0,
          visibleKeys: 255,
          invisibleKeys: 7,
          totalKeysBelow10k: true,
          whitespaceExceeds75: false,
          visibleExceeds85: true,
          visibleBelow3: false,
          whitespacePercentage: 0,
          visiblePercentage: 97.3,
        },
        teamlogerReport: {
          employeeName: 'Pinky Kumari',
          email: 'shubhammohite390@gmail.com',
          onComputerHours: 0.5496191666666667,
          idleHours: 0,
          meetingHours: 0,
          offComputerHours: 0,
          totalHours: 0.5496191666666667,
          activeTimeCount: 34,
          inactiveTimeCount: 0,
        },
      },
    },
  },
};

const AdminDashboard = () => {
  const [emailStatus, setEmailStatus] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const sendEmail = async (userId: string, date: string, timeSlot: string, email: string, employeeName: string) => {
    if (emailStatus[`${userId}-${date}-${timeSlot}`] === 'Sent ✅') {
      alert('Email already sent for this time slot!');
      return;
    }
  
    setLoading(prev => ({ ...prev, [`${userId}-${date}-${timeSlot}`]: true }));
  
    const apiKey = '445427Ayjjdqil04Vo67ebaff3P1';
    const templateId = 'template_01_04_2025_15_04_5';  // Correct template ID
    const domain = 'it0r1h.mailer91.com';  // Correct domain
  
    const requestData = {
      recipients: [
        {
          to: [
            {
              email: email,
              name: employeeName,
            },
          ],
        },
      ],
      from: {
        email: 'mohite@it0r1h.mailer91.com',  // Correct sender email
      },
      domain: domain,
      template_id: templateId,
    };
  
    try {
      const response = await fetch('https://api.msg91.com/api/v5/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authkey: apiKey,
        },
        body: JSON.stringify(requestData),
      });
  
      const result = await response.json();
  
      if (result.status === 'success') {
        setEmailStatus(prev => ({ ...prev, [`${userId}-${date}-${timeSlot}`]: 'Sent ✅' }));
      } else {
        setEmailStatus(prev => ({ ...prev, [`${userId}-${date}-${timeSlot}`]: 'Failed ❌' }));
        console.error('Email sending failed:', result);
      }
    } catch (error) {
      setEmailStatus(prev => ({ ...prev, [`${userId}-${date}-${timeSlot}`]: 'Failed ❌' }));
      console.error('Error sending email:', error);
    } finally {
      setLoading(prev => ({ ...prev, [`${userId}-${date}-${timeSlot}`]: false }));
    }
  };

  return (
    <Box
      sx={{ width: "100%", padding: "12px 20px", display: "flex", gap: "20px" }}
    >
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {/* Left Side */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Grid container spacing={2}>
              {/* DSR Report & Training */}
              <Grid size={{ xs: 12, md: 6 }}>
                <ReportCard title="DSR Report" value={56} total={100} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReportCard title="Training / Course" value={56} total={100} />
              </Grid>

              {/* Builder Project & Internal Bench */}
              <Grid size={{ xs: 12, md: 6 }}>
                <EmployeeReport
                  title="BUILDER PROJECT"
                  count={50}
                  total={100}
                  empOnBuilderText="Emp on builder"
                  buttonText="View More"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <EmployeeReport
                  title="INTERNAL/BENCH"
                  count={80}
                  total={100}
                  empOnInternalText="Emp on internal"
                  buttonText="Assign task"
                />
              </Grid>

              {/* Team Logger Table */}
              <Grid size={{ xs: 12, md: 12 }}>
                <TableContainer component={Paper}>
                  <Typography variant="h6" sx={{ p: 2 }}>
                    Keylogger Report
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>User ID</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Employee Name</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Email</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(keyloggerSuspiciousData).map(
                        ([userId, dateData]) =>
                          Object.entries(dateData).flatMap(
                            ([date, timeSlots]) =>
                              Object.entries(timeSlots).map(
                                ([timeSlot, data]) => (
                                  <TableRow
                                    key={`${userId}-${date}-${timeSlot}`}
                                  >
                                    <TableCell>{userId}</TableCell>
                                    <TableCell>
                                      {data.teamlogerReport.employeeName}
                                    </TableCell>
                                    <TableCell>
                                      {data.teamlogerReport.email}
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        variant="contained"
                                        color={
                                          emailStatus[
                                            `${userId}-${date}-${timeSlot}`
                                          ] === "Sent ✅"
                                            ? "success"
                                            : emailStatus[
                                                  `${userId}-${date}-${timeSlot}`
                                                ] === "Failed ❌"
                                              ? "error"
                                              : "primary"
                                        }
                                        disabled={
                                          emailStatus[
                                            `${userId}-${date}-${timeSlot}`
                                          ] === "Sent ✅" ||
                                          loading[
                                            `${userId}-${date}-${timeSlot}`
                                          ]
                                        }
                                        onClick={() =>
                                          sendEmail(
                                            userId,
                                            date,
                                            timeSlot,
                                            data.teamlogerReport.email,
                                            data.teamlogerReport.employeeName
                                          )
                                        }
                                      >
                                        {loading[
                                          `${userId}-${date}-${timeSlot}`
                                        ] ? (
                                          <CircularProgress size={24} />
                                        ) : emailStatus[
                                            `${userId}-${date}-${timeSlot}`
                                          ] === "Sent ✅" ? (
                                          "Sent"
                                        ) : (
                                          "Send Email"
                                        )}
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                )
                              )
                          )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Side */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                padding: 2,
                marginBottom: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
                width: "100%",
                boxShadow: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                  Expert Variance
                </Typography>
                <CustomButton
                  btnText="View all"
                  buttonVariant="text"
                  btnStyle={{ margin: "0px", width: "42px", fontSize: "12px" }}
                  buttonId="outlined-button"
                  handleButtonClick={() => {
                    alert("coming soo n");
                  }}
                />
              </Box>
              {[...Array(6)].map((_, index) => (
                <Box   
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  my={2}
                >
                  <Box>
                    <Typography key={index} sx={{ fontSize: "14px" }}>
                      Expert name
                    </Typography>
                    <Typography key={index} sx={{ fontSize: "10px" }}>
                      Project name
                    </Typography     >
                  </Box>
                  <Typography key={index}>00hrs</Typography>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                padding: 2,
                marginBottom: 0,
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
                width: "100%",
                boxShadow: 1,
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                Leave Approval
              </Typography>
              {[...Array(1)].map((_, index) => (
                <Box
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  my={1}
                >
                  <Box>
                    <Typography key={index} sx={{ fontSize: "14px" }}>
                      Expert name
                    </Typography>
                    <Typography key={index} sx={{ fontSize: "10px" }}>
                      Leave Type
                    </Typography>
                  </Box>
                  <Typography key={index}>Approve / Reject</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
