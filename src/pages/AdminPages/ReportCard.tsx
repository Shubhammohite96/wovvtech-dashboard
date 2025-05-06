import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

interface ReportCardProps {
  title: string;
  value: number;
  total: number;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, value, total }) => {
  const progress = (value / total) * 100; 

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        padding: "12px",
        width: "100%",
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{color:'#000000',fontSize:'18px'}}>
          {title}
        </Typography>
        <Box
          sx={{
            backgroundColor: "#ddd",
            padding: "4px 8px",
            borderRadius: "8px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          View all reports
        </Box>
      </Box>
     <Box mt={1} sx={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'20px'}}>
      <Typography sx={{color:'#000000',fontSize:'30px',fontWeight:'600'}} >
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        / {total} (number of present)
      </Typography>
     </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        color="inherit"
        sx={{ mt: 2, height: 10, borderRadius: 4, backgroundColor: "#FFFFFF" ,color:'#928686'}}
      />
    </Box>
  );
};

export default ReportCard;
