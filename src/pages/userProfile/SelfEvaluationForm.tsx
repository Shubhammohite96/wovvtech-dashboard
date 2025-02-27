import { Box, styled, TextareaAutosize, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../../components/cutomComponents/CustomTextField";
import StarIcon from "@mui/icons-material/Star";
import CustomButton from "../../components/cutomComponents/CustomButton";
import UserProfileTabs from "./UserProfileTabs";

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    width: "403px",
    maxWidth: "403px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "rgb(0 0 0 / 87%)",
    transition: "border 0.3s ease",
    "&::placeholder": {
      color: "#ccc",
      opacity: 1,
    },
  }));
const SelfEvaluationForm = () => {
  const [value, setValue] = useState<number | null>(null);
  const[formData,setFormData]=useState({
    name:'',
    email:'',
    reason:'',
    goal:''
  })

  const handleChange=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
  setFormData((prevState)=>({...prevState,[e.target.name]:e.target.value}))

  }
  const handleValidate=()=>{
    let isVallid=true;
    if(!formData.name.trim() || !formData.email.trim() || !formData.reason.trim() || !formData.goal.trim() || !value){
        isVallid=false
    }
    return isVallid
  }

  const handleSubmitData =()=>{
    if(!handleValidate()){
      alert('Please fill all data')
    }
  }
  return (
    <Box sx={{ width: "100%", padding: "14px" }}>
         <Box my={3}>
        <UserProfileTabs />
      </Box>
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
            <Typography>WovVTech Email Id</Typography>
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
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "12px" }}
          >
            <Typography>Self Rating</Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={"10px"}
            >
              {/* Numbers Row */}
              <Box display="flex">
                {Array.from({ length: 10 }, (_, i) => (
                  <Box key={i} width={41} textAlign={"center"}>
                    <Typography variant="body2">{i + 1}</Typography>
                  </Box>
                ))}
              </Box>

              {/* Stars Row */}
              <Box display="flex">
                {Array.from({ length: 10 }, (_, i) => (
                  <Box key={i} width={41} textAlign={"center"}>
                    <StarIcon
                      onClick={() => setValue(i + 1)}
                      sx={{
                        fontSize: 30,
                        cursor: "pointer",
                        color: value && value >= i + 1 ? "gold" : "gray",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>
              Provide reasons to justify rating you have assigned
            </Typography>
            <Typography>
              to yourself (please include at least 6-7 points).
            </Typography>
            <StyledTextarea
              aria-label="empty textarea"
              placeholder="Type here"
              name="reason"
                value={formData.reason}
                onChange={handleChange}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>
            Set goals or objectives for the next year.
            *
            </Typography>
            <StyledTextarea
              aria-label="empty textarea"
              placeholder="Type here"
              name="goal"
                value={formData.goal}
                onChange={handleChange}
            />
          </Box>

          <Box
            sx={{ display: "flex",  marginTop: "10px",justifyContent:'center' }}
          >
           
          <CustomButton
              btnText="Submit"
              buttonVariant="contained"
              btnStyle={{ margin: "10px", width: "103px" }}
              buttonId="outlined-button"
              handleButtonClick={handleSubmitData}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SelfEvaluationForm;
