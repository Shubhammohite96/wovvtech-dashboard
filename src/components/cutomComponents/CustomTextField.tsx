import React from "react";
import { TextField, TextFieldProps, InputAdornment } from "@mui/material";

interface CustomTextFieldProps extends Omit<TextFieldProps, "variant"> {
  icon?: React.ReactNode;
  height?: number | string;
  width?: number | string;
  padding?: number | string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ 
  icon, 
  height = "50px", 
  width = "60%", 
  padding = "0px", 
  sx, 
  ...props 
}) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      autoComplete="off"
      slotProps={{
        input: {
          sx: {
            paddingLeft:icon ? '10px' :'0px',
            height: "100%",
            display: "flex",
            alignItems: "center",
            width,

          },
          startAdornment: icon ? (
            <InputAdornment position="start">{icon}</InputAdornment>
          ) : null,
        },
      }}
      sx={{
        width,
        height,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        "& .MuiInputBase-input":{
          
        },
        "& .MuiOutlinedInput-root": {
          height: "100%",
          border: "1px solid #ccc",
         
          "&:hover, &:focus-within, &:focus, &:active": {
            border: "1px solid #ccc !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none !important",
          },
        },
        ...sx,
      }}
    />
  );
};

export default CustomTextField;
