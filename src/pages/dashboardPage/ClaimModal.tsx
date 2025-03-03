import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import CustomTextField from "../../components/cutomComponents/CustomTextField";

// Define the expected shape of rowData
interface RowData {
  empName: string;
  email: string;
}

// Props for the modal component
interface ClaimStatusModalProps {
  open: boolean;
  onClose: () => void;
  rowData?: RowData;
}

// Define the form data state type
interface FormData {
  name: string;
  email: string;
  status: string;
  comments: string;
}
const ClaimModal: React.FC<ClaimStatusModalProps> = ({
  open,
  onClose,
  rowData,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    status: "",
    comments: "",
  });

  // Update formData when rowData changes
  useEffect(() => {
    if (rowData) {
      setFormData({
        name: rowData.empName || "",
        email: rowData.email || "",
        status: "",
        comments: "",
      });
    }
  }, [rowData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Claim Status</DialogTitle>
      <DialogContent>
      <CustomTextField
        name="name"
        value={formData.name}
          height="40px"
          padding="10px"
          width="406px"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
       
        <TextField
          fullWidth
          label="Comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClaimModal;
