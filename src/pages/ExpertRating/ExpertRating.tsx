import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextareaAutosize,
    Select,
    MenuItem
} from '@mui/material';
import { StyledDsrRoot } from '../reports/DsrStyle';
import CustomTextField from "../../components/cutomComponents/CustomTextField";
import Rating from "@mui/material/Rating";

const ExpertRating: React.FC = () => {
    const [formData, setFormdata] = useState({
        expertName: '',
        expertEmailId: '',
        teamContribution: '',
        expertRating: null as number | null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormdata(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
    }

    return (
        <StyledDsrRoot>
            <Typography sx={{ textAlign: "center", fontWeight: 700, fontSize: "20px" }}>
                Expert Rating Form
            </Typography>
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
                        <Typography>Expert Name</Typography>
                        <CustomTextField
                            name="expertName"
                            placeholder="Enter name"
                            height="40px"
                            padding="10px"
                            width="406px"
                            sx={{ backgroundColor: "#FFFFFF" }}
                            value={formData.expertName}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <Typography>Expert Email</Typography>
                        <Select
                            name="expertEmailId"
                            displayEmpty
                            sx={{
                                height: "40px",
                                padding: "10px 0px",
                                width: "406px",
                                backgroundColor: "#FFFFFF",
                                "& fieldset": { borderColor: "#ccc !important" },
                                "&:hover fieldset": { borderColor: "#ccc !important" },
                                "&.Mui-focused fieldset": { borderColor: "#ccc !important" },
                                "&.MuiOutlinedInput-root": { borderColor: "#ccc !important" },
                            }}
                            value={formData.expertEmailId}
                            onChange={(e) => setFormdata({ ...formData, expertEmailId: e.target.value })}
                        >
                            <MenuItem value="" disabled>Email id</MenuItem>
                            <MenuItem value="Pass">test@test.com</MenuItem>
                            <MenuItem value="Failed">test2@test.com</MenuItem>
                            <MenuItem value="Not Generated">test3@test.com</MenuItem>
                        </Select>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <Typography>Contribution to internal support</Typography>
                        <TextareaAutosize
                            minRows={5}
                            name="teamContribution"
                            placeholder="Enter your text..."
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "16px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                resize: "none"
                            }}
                            value={formData.teamContribution}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box sx={{ marginTop: "8px" }}>
                        <Typography>Expert Rating</Typography>

                        <Box display="flex" justifyContent="center" mt={1} width="100%">
                            {Array.from({ length: 10 }, (_, i) => (
                                <Typography
                                    key={i}
                                    sx={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        width: "10%",
                                        textAlign: "center",
                                        mr: "16px"
                                    }}
                                >
                                    {i + 1}
                                </Typography>
                            ))}
                        </Box>

                        <Box display="flex" justifyContent="center" mt={1} width="100%">
                            <Rating
                                name="self-rating"
                                value={formData.expertRating}
                                max={10}
                                onChange={(_, newValue) => setFormdata({ ...formData, expertRating: newValue })}
                                sx={{
                                    fontSize: "32px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <Button onClick={handleSubmit}>submit</Button>
                    </Box>
                </Box>
            </Box>
        </StyledDsrRoot>
    )
}
export default ExpertRating;