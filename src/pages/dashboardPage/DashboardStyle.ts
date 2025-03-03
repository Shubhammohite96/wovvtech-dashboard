import { styled, Box, TextField,Typography } from "@mui/material";

export const StyledTypography = styled(Typography)({
    fontSize: "20px",
    color: "#222222",
    fontWeight: "bold",
  });

export const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    margin: '22px 0px 0px 0px',
    borderBottom: '1px solid #9A9A9A',
    alignItems:'center'
  });

export const StyledDropDownsBox = styled(Box)({
   display: 'flex',
    justifyContent: 'space-between',
    marginTop:'12px' ,
    flexWrap:'wrap',
  });

  export const StyledChildCommonDropDownsBox = styled(Box)({
    display: 'flex', 
    flexDirection: 'column', 
    gap: '9px' 
   });

export const CustomTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    width:'435px',
    height:'40px',
    borderRadius: "8px",
    "& .MuiOutlinedInput-root": {
      height: "40px",
      backgroundColor:'#ffffff',
      "& fieldset": {
        borderColor: theme.palette.grey[500],
      },
      "&:hover fieldset": {
        borderColor: theme.palette.grey[500],
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.grey[500],
      },
      "&.Mui-disabled": {
        backgroundColor: "red",
      },
    },
  }));