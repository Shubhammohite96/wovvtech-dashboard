import { Box, Button, TextField, Typography, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../../components/cutomComponents/CustomTextField";
import Navbar from "../../components/Navbar";
import { StyledDsrRoot } from "./DsrStyle"
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const WeeklyDataForm = () => {
  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    mrLink: '',
    raiseDate: '',
    ccStatus: '',
    merged: '',
    mergedDate: '',
    hoursForCCFixes: '',
    reasonForFailing: '',
    careCertUrl: '',
    ccNotGeneratedTicketId: '',
    selectedFile: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormdata(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10 MB.");
        return;
      }

      setFormdata(prevState => ({ ...prevState, selectedFile: file }));
    }
  };

  const handleSubmit = () => {
    if (!formData.name) {
      alert('name is empty')

    }
    if (!formData.email.trim()) {
      alert('email is empty')
    }
  }

  return (
    <StyledDsrRoot>
      <Navbar />
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
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Name</Typography>
            <CustomTextField
              name="name"
              placeholder="Enter your Name"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              value={formData.name}
              onChange={handleChange}
            />
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Email</Typography>
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
            <Typography>MR Link</Typography>
            <CustomTextField
              name="mrLink"
              placeholder="Enter your MR Link"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              value={formData.mrLink}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Typography>MR Raise Date</Typography>
            <TextField
              name="raiseDate"
              type="date"
              placeholder="MR Raise Date"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                sx: {
                  "& fieldset": { borderColor: "#ccc !important" },
                  "&:hover fieldset": { borderColor: "#ccc !important" },
                  "&.Mui-focused fieldset": { borderColor: "#ccc !important" },
                  "&.MuiOutlinedInput-root": { borderColor: "#ccc !important" },
                },
              }}
              sx={{
                width: "406px",
                backgroundColor: "#FFFFFF",
                "& input": { padding: "10px" }
              }}
              value={formData.raiseDate}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Typography>Care Cert Pass or Fail</Typography>
            <Select
              name="ccStatus"
              displayEmpty
              sx={{
                height: "40px",
                padding: "10px",
                width: "406px",
                backgroundColor: "#FFFFFF",
                "& fieldset": { borderColor: "#ccc !important" },
                "&:hover fieldset": { borderColor: "#ccc !important" },
                "&.Mui-focused fieldset": { borderColor: "#ccc !important" },
                "&.MuiOutlinedInput-root": { borderColor: "#ccc !important" },
              }}
              value={formData.ccStatus}
              onChange={(e) => setFormdata({ ...formData, ccStatus: e.target.value })}
            >
              <MenuItem value="" disabled>Select Status</MenuItem>
              <MenuItem value="Pass">Pass</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Not Generated">Not Generated</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Typography>Is your MR  Merged</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <RadioGroup
                row
                name="merged"
                value={formData.merged}
                onChange={(e) => setFormdata({ ...formData, merged: e.target.value })}
              >
                <FormControlLabel
                  value="Yes"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="No"
                />
              </RadioGroup>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Typography>MR Merged Date</Typography>
            <TextField
              name="mergedDate"
              type="date"
              placeholder="MR Merged Date
"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                sx: {
                  "& fieldset": { borderColor: "#ccc !important" },
                  "&:hover fieldset": { borderColor: "#ccc !important" },
                  "&.Mui-focused fieldset": { borderColor: "#ccc !important" },
                  "&.MuiOutlinedInput-root": { borderColor: "#ccc !important" },
                },
              }}
              sx={{
                width: "406px",
                backgroundColor: "#FFFFFF",
                "& input": { padding: "10px" }
              }}
              value={formData.mergedDate}
              onChange={handleChange}
            />
          </Box>

          {formData.ccStatus === "Failed" &&
            <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
              <Typography>CPE agreed to provide you hours for care cert issues</Typography>
              <Select
                name="hoursForCCFixes"
                displayEmpty
                sx={{
                  height: "40px",
                  padding: "10px",
                  width: "406px",
                  backgroundColor: "#FFFFFF",
                  "& fieldset": { borderColor: "#ccc !important" },
                  "&:hover fieldset": { borderColor: "#ccc !important" },
                  "&.Mui-focused fieldset": { borderColor: "#ccc !important" },
                  "&.MuiOutlinedInput-root": { borderColor: "#ccc !important" },
                }}
                value={formData.hoursForCCFixes}
                onChange={(e) => setFormdata({ ...formData, hoursForCCFixes: e.target.value })}
              >
                <MenuItem value="" disabled>Choose</MenuItem>
                <MenuItem value="Pass">Yes</MenuItem>
                <MenuItem value="Failed">No</MenuItem>
              </Select>
            </Box>}

            {formData.ccStatus === "Failed" &&
          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Typography>Reason why it's failing</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <RadioGroup
                name="reasonForFailing"
                value={formData.reasonForFailing}
                onChange={(e) => setFormdata({ ...formData, reasonForFailing: e.target.value })}
              >
                <FormControlLabel
                  value="Issues from my side which can't be fixed + other expert's + builder code"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="Issues from my side which can't be fixed + other expert's + builder code"
                />
                <FormControlLabel
                  value="Other expert's + builder code issue"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="Other expert's + builder code issue"
                />
                <FormControlLabel
                  value="Own code issue"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="Own code issue"
                />
                <FormControlLabel
                  value="Other expert's code issue"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="Other expert's code issue"
                />
                <FormControlLabel
                  value="Other reason"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="Other reason"
                />
              </RadioGroup>
            </Box>
          </Box>}

          {formData.ccStatus === "Failed" &&
          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Typography>Care Cert URL</Typography>
            <CustomTextField
              name="careCertUrl"
              placeholder="Enter your MR Link"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              value={formData.careCertUrl}
              onChange={handleChange}
            />
          </Box>}

          {formData.ccStatus === "Not Generated" &&
          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Typography>Care Ticket ID</Typography>
            <CustomTextField
              name="ccNotGeneratedTicketId"
              placeholder="Ticket Id"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              value={formData.ccNotGeneratedTicketId}
              onChange={handleChange}
            />
          </Box>}

          {formData.ccStatus === "Not Generated" &&
          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Typography>CPE approval Screenshot</Typography>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="file-upload"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{ textTransform: "none" }}
              >
                {formData.selectedFile ?  formData.selectedFile.name : "Add file"}
              </Button>
            </label>            
          </Box>}

          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <Button onClick={handleSubmit}>submit</Button>
          </Box>
        </Box>
      </Box>
    </StyledDsrRoot>
  );
};

export default WeeklyDataForm;
