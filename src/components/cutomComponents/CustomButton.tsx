import React from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/system";
//@ts-ignore
const StyledButton = styled(Button)<{ variant: string }>(({ theme, variant }) => ({
  textTransform: "capitalize",
  ...(variant === "outlined" && {
    color: "#696969",
    backgroundColor: "transparent",
    border: `1px solid #696969`,
    "&:hover": {
      backgroundColor: "inherit",
    },
  }),
  ...(variant === "contained" && {
    color: "#ffffff",
    backgroundColor: "#696969",
    border: "none",
    "&:hover": {
      backgroundColor: "#696969",
    },
  }),
  ...(variant === "text" && {
    color: "black",
    "&:hover": {
      color: "black",
    },
  }),
}));

// Define types for props
interface CustomButtonProps {
  btnText: string;
  btnStyle?: React.CSSProperties;
  buttonId?: string;
  type?: "button" | "submit" | "reset";
  buttonVariant?: "text" | "outlined" | "contained";
  isDisabled?: boolean;
  btnIcon?: React.ReactNode;
  handleButtonClick?: () => void;
}

// CustomButton component with TypeScript
const CustomButton: React.FC<CustomButtonProps> = ({
  btnText,
  btnStyle = {},
  buttonId = "",
  type = "button",
  buttonVariant = "text",
  isDisabled = false,
  btnIcon = null,
  handleButtonClick = () => {},
}) => {
  return (
    <StyledButton
      variant={buttonVariant}
      type={type}
      id={buttonId}
      disabled={isDisabled}
      onClick={handleButtonClick}
      sx={{
        opacity: isDisabled ? 0.5 : 1,
        ...btnStyle,
      }}
    >
      {btnText}
      {btnIcon && <Box sx={{ marginLeft: "9px" }}>{btnIcon}</Box>}
    </StyledButton>
  );
};

export default CustomButton;
