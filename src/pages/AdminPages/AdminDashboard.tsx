import {
  Typography,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ReportCard from "./ReportCard";
import EmployeeReport from "./EmployeeReport";
import ReusableTable, {
  ColumnConfig,
} from "../../components/cutomComponents/ReusableTable";
import CustomButton from "../../components/cutomComponents/CustomButton";

const AdminDashboard = () => {
  const users = [
    {
      id: 1,
      empName: "Aman Gupta",
      empId: "TCPL496",
      teamLoggersHrs: 28,
      builderHrs: 16,
      idleHrs: 16,
      action: "coming soon",
    },
  ];

  // Column definitions (columns)
  const columns: ColumnConfig<(typeof users)[0]>[] = [
    {
      key: "empName",
      label: "Employee Name",
    },
    {
      key: "empId",
      label: "Emp Id",
    },
    {
      key: "teamLoggersHrs",
      label: "Team logger hrs",
    },
    {
      key: "builderHrs",
      label: "Builder Hr's",
    },
    {
      key: "idleHrs",
      label: "Idle Hr's",
    },
    {
      key: "action",
      label: "Action",
    },
  ];
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
              <Grid size={{ xs: 12 }}>
                <Box mt={2}>
                  <Typography sx={{ color: "#000000", fontSize: "24px" }}>
                    Team Logger / Key Logger Table
                  </Typography>
                  <ReusableTable
                    columns={columns}
                    rows={users}
                    showPagination={false}
                    pageSize={5}
                  />
                </Box>
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
              <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <Typography sx={{fontSize:'18px',fontWeight:'600'}}>Expert Variance</Typography>
              <CustomButton
              btnText="View all"
              buttonVariant="text"
              btnStyle={{ margin: "0px", width: "42px" ,fontSize:'12px'}}
              buttonId="outlined-button"
              handleButtonClick={()=>{alert('coming soon')}}
            />
              </Box>
              {[...Array(6)].map((_, index) => (
                <Box sx={{display:'flex',justifyContent:'space-between'}} my={2}>
                  <Box>
                  <Typography key={index} sx={{fontSize:'14px'}}>Expert name</Typography>
                  <Typography key={index} sx={{fontSize:'10px'}}>Project name</Typography>
                  </Box>
                  <Typography key={index}>00hrs</Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{
                padding: 2,
                marginBottom: 0,
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
                width: "100%",
                boxShadow: 1,
              }}>
              <Typography sx={{fontSize:'18px',fontWeight:'600'}}>Leave Approval</Typography>
              {[...Array(1)].map((_, index) => (
                <Box sx={{display:'flex',justifyContent:'space-between'}} my={1}>
                  <Box>
                  <Typography key={index} sx={{fontSize:'14px'}}>Expert name</Typography>
                  <Typography key={index} sx={{fontSize:'10px'}}>Leave Type</Typography>
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
