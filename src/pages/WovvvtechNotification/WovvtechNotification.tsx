import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    TextareaAutosize
} from '@mui/material';
import { StyledDsrRoot } from '../reports/DsrStyle';
import CustomTextField from "../../components/cutomComponents/CustomTextField";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const WovvtechNotification: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormdata] = useState({
        announcementDate: '',
        title: '',
        description: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormdata(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const handleSubmit = () => {
        navigate('/NotificationList')
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
                            placeholder="Announcement Date"
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
                    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <Typography>Title</Typography>
                        <CustomTextField
                            name="title"
                            placeholder="Enter title"
                            height="40px"
                            padding="10px"
                            width="406px"
                            sx={{ backgroundColor: "#FFFFFF" }}
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <Typography>Discription</Typography>
                        <TextareaAutosize
                            minRows={5}
                            name="description"
                            placeholder="Enter your text..."
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "16px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                resize: "none"
                            }}
                            value={formData.description}
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
export default WovvtechNotification;