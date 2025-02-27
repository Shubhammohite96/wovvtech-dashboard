import { styled, Box, Typography, TextareaAutosize } from "@mui/material";

export const StyledDsrRoot = styled(Box)({
  width: "100%",
  padding: "14px",
});

export const StyledFormBox = styled(Box)({
  width: "36%",
  backgroundColor: "#ffffff",
  padding: "10px",
  marginTop: "25px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
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

export const StyledTypography = styled(Typography)({
  fontSize: "20px",
  color: "#222222",
  fontWeight: "bold",
});
