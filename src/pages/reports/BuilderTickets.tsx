import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField
} from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { StyledDsrRoot } from './DsrStyle';
import CustomTextField from "../../components/cutomComponents/CustomTextField";

const BuilderTickets: React.FC = () => {
    const [formData, setFormdata] = useState({
        expertName: '',
        expertEmail: '',
        ticketReason: '',
        ticketRaisingDate: '',
        ticketId: '',
        selectedFile: null as File | null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormdata(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

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
        if (!formData.expertName) {
            alert('name is empty')
        }
        if (!formData.expertEmail.trim()) {
            alert('email is empty')
        }
    }
    console.log('child re render builder tickets')
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
                    <Box
                        sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
                    >
                        <Typography>Expert Name</Typography>
                        <CustomTextField
                            name="expertName"
                            placeholder="Enter your Name"
                            height="40px"
                            padding="10px"
                            width="406px"
                            sx={{ backgroundColor: "#FFFFFF" }}
                            value={formData.expertName}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box
                        sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
                    >
                        <Typography>Expert Email</Typography>
                        <CustomTextField
                            name="expertEmail"
                            placeholder="Enter your Email"
                            height="40px"
                            padding="10px"
                            width="406px"
                            sx={{ backgroundColor: "#FFFFFF" }}
                            value={formData.expertEmail}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box
                        sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
                    >
                        <Typography>Reason for raising ticket</Typography>
                        <CustomTextField
                            name="ticketReason"
                            placeholder="Enter reason here.."
                            height="40px"
                            padding="10px"
                            width="406px"
                            sx={{ backgroundColor: "#FFFFFF" }}
                            value={formData.ticketReason}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <Typography>Ticket Raised Date</Typography>
                        <TextField
                            name="ticketRaisingDate"
                            type="date"
                            placeholder="Ticket Raise Date"
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
                            value={formData.ticketRaisingDate}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box
                        sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
                    >
                        <Typography>Ticket ID</Typography>
                        <CustomTextField
                            name="ticketId"
                            placeholder="Enter ticket id"
                            height="40px"
                            padding="10px"
                            width="406px"
                            sx={{ backgroundColor: "#FFFFFF" }}
                            value={formData.ticketId}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <Typography>Ticket Screenshot</Typography>
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
                                sx={{
                                    textTransform: "none",
                                    height: "40px",
                                    padding: "10px",
                                    width: "406px"
                                }}
                            >
                                {formData.selectedFile ? formData.selectedFile.name : "Add file"}
                            </Button>
                        </label>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <Button onClick={handleSubmit}>submit</Button>
                    </Box>
                </Box>
            </Box>
        </StyledDsrRoot>
    )
}
export default BuilderTickets;