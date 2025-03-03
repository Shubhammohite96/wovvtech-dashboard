import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import CustomButton from "../../components/cutomComponents/CustomButton";

interface EmployeeReportProps {
  title: string;
  count: number;
  total: number;
  empOnBuilderText?: string;
  empOnInternalText?: string;
  buttonText: string;
}

const EmployeeReport: React.FC<EmployeeReportProps> = ({
  title,
  count,
  total,
  empOnBuilderText,
  empOnInternalText,
  buttonText,
}) => {
  const percentage = (count / total) * 100;

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        padding: "16px",
        width: "100%",
        boxShadow: 1,
      }}
    >
      <Typography sx={{color:'#000000',fontSize:'22px'}}>
        {title}
      </Typography>

      {/* Circular Progress Bar */}
      <Box textAlign={"center"}>
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            margin: "16px auto",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            sx={{ color: "#ddd", position: "absolute", top: 0, left: 0 }}
            size={103}
            thickness={4}
          />
          <CircularProgress
            variant="determinate"
            value={percentage}
            sx={{ color: "#928686" }}
            size={103}
            thickness={4}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {Math.round(percentage)}%
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: "24px" }}>
          <Typography variant="body2" color="text.secondary">
            {empOnBuilderText && `${empOnBuilderText}: ${count}`}
            {empOnInternalText && `${empOnInternalText}: ${count}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {empOnBuilderText && `Total emp: ${total}`}
            {empOnInternalText && `Emp on bench: ${total}`}
          </Typography>
        </Box>

        <Box>
          <CustomButton
            btnText={buttonText}
            buttonVariant="contained"
            btnStyle={{ marginTop: 2, width: "100%", borderRadius: "16px" }}
            buttonId="outlined-button"
            handleButtonClick={() => {}}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeReport;
