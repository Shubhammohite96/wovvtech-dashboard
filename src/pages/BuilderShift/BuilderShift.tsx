import { Box, Button, Typography, RadioGroup, FormControlLabel, Radio, Checkbox } from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../../components/cutomComponents/CustomTextField";
import { StyledDsrRoot } from "../reports/DsrStyle";

const BuilderShift = () => {
  const [formData, setFormdata] = useState({
    email: '',
    selectedShiftTime: '',
    secondaryShiftTime: [] as string[]
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormdata(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const shifts = [
    { label: "India 9:00 AM - 6:00 PM IST" },
    { label: "Dubai 11:30 AM - 8:30 PM IST" },
    { label: "UK 1:00 PM - 9:00 PM IST" },
    { label: "USA 5:30 PM - 2:30 AM IST" }
  ];

  const handleShiftChange = (shift: string) => {
    setFormdata((prevState) => ({
      ...prevState,
      secondaryShiftTime: prevState.secondaryShiftTime.includes(shift)
        ? prevState.secondaryShiftTime.filter((s) => s !== shift) 
        : [...prevState.secondaryShiftTime, shift],
    }));
  };

  const handleSubmit = () => {

  }
  
  return (
    <StyledDsrRoot>
      <Typography variant="h5" textAlign={'center'}>Builder Tickets</Typography>
      <Box
        sx={{
          width: "100%",
          marginTop: "2%",
          padding: "14px 11px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>

          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Typography>Expert Email Id (Please add new email id)</Typography>
            <CustomTextField
              name="email"
              placeholder="Enter your Email"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              value={formData.email}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Typography>Primary Shift Time (Select Only One shift)</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <RadioGroup
                name="reasonForFailing"
                value={formData.selectedShiftTime}
                onChange={(e) => setFormdata({ ...formData, selectedShiftTime: e.target.value })}
              >
                <FormControlLabel
                  value="India (9:00 AM - 6:00 PM IST)"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="India (9:00 AM - 6:00 PM IST)"
                />
                <FormControlLabel
                  value="Dubai (11:30 AM - 8:30 PM IST)"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="Dubai (11:30 AM - 8:30 PM IST)"
                />
                <FormControlLabel
                  value="UK (1:00 PM - 9:00 PM IST)"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="UK (1:00 PM - 9:00 PM IST)"
                />
                <FormControlLabel
                  value="USA (5:30 PM - 2:30 AM IST)"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="USA (5:30 PM - 2:30 AM IST)"
                />
              </RadioGroup>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Typography>
              Secondary Shift Time (Select any shift other than primary shift, you can select multiple shifts for this)
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "10px" }}>
              {shifts.map((shift) => (
                <FormControlLabel
                  key={shift.label}
                  control={
                    <Checkbox
                      checked={formData.secondaryShiftTime.includes(shift.label)}
                      onChange={() => handleShiftChange(shift.label)}
                    />
                  }
                  label={
                    <Typography>
                      {shift.label}
                    </Typography>
                  }
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Button onClick={handleSubmit}>submit</Button>
          </Box>
        </Box>
      </Box>
    </StyledDsrRoot >
  );
};

export default BuilderShift;
