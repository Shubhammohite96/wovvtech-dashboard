import { styled, Box, TextField, Button, Checkbox } from "@mui/material";
import loginBg from "../../assets/loginBg.png";
export const Form = styled(Box)(({ theme }) => ({
    width: "100%",
    maxWidth: 400,
    padding: theme.spacing(4),
    backgroundColor: "#fff",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    "& .MuiOutlinedInput-root": {
        borderRadius: "30px",
    },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    backgroundColor: "#6C757D",
    borderRadius: "30px",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: "#5a6268",
    },
}));



export const CustomTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    borderRadius: "8px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
      height: "47px",
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


  export const CustomCheckbox = styled(Checkbox)({
    color: "#979797",
    padding: "0px",
    "&.Mui-checked": {
      color: "#333333",
    },
    "&:hover": {
      backgroundColor: "rgba(255, 20, 147, 0.1)",
    },
  });


  export const LoginButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(0),
    padding: theme.spacing(1.5),
    backgroundColor: "#6C757D",
    height: "47px",
    borderRadius: "30px",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#5a6268",
    },
  }));


export const LoginStyles = {
    container: {
        height: "100vh",
    },
    leftSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default",
        padding: 3,
    },
    formBox: {
        width: "50%",
        maxWidth: 400,
        textAlign: "center",
    },

    loginButton: {
        paddingY: 1.5,
        mt: 1,
    },
    rightSection: {
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
   
};





