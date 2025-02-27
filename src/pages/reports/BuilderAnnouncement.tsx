import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField
} from '@mui/material';
import { StyledDsrRoot } from './DsrStyle';
import CustomTextField from "../../components/cutomComponents/CustomTextField";
import Navbar from "../../components/Navbar";

const BuilderAnnouncement: React.FC = () => {
    console.log('child re render builder Ammooncemmet')
    const [formData, setFormdata] = useState({
        announcementDate: '',
        title: '',
        content: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormdata(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        
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
                    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <Typography>Announcement Date</Typography>
                        <TextField
                            name="announcementDate"
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
                            value={formData.announcementDate}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box
                        sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
                    >
                        <Typography>Ticket ID</Typography>
                        <CustomTextField
                            name="title"
                            placeholder="Enter your Email"
                            height="40px"
                            padding="10px"
                            width="406px"
                            sx={{ backgroundColor: "#FFFFFF" }}
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <Button onClick={handleSubmit}>submit</Button>
                    </Box>
                </Box>
            </Box>
        </StyledDsrRoot>
    )
}
export default BuilderAnnouncement;