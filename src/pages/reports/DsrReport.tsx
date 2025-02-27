import React, { useEffect, useState } from "react";
import { Box, Typography, SelectChangeEvent } from "@mui/material";
import CustomTextField from "../../components/cutomComponents/CustomTextField";
import CustomSelectDropdown from "../../components/cutomComponents/CustomDropdown";
import {
  StyledTextarea,
  StyledTypography,
  StyledDsrRoot,
  StyledFormBox,
} from "./DsrStyle";
import CustomButton from "../../components/cutomComponents/CustomButton";
import ReusableTable, {
  ColumnConfig,
} from "../../components/cutomComponents/ReusableTable";
import Navbar from "../../components/Navbar";

interface FormEntry {
  id: number;
  item: string;
  date:string;
  description: string;
  statusId: string;
  status?:string;
  storyPoints: string;
  remarks: string;
}

const actions = {
  edit: true,
  delete: true,
  // claimStatus: true
};

// Define table column configuration

const DsrReport: React.FC = () => {
  const [entries, setEntries] = useState<FormEntry[]>([]);
  const [formData, setFormData] = useState<FormEntry>({
    id: Date.now(),
    date:"",
    item: "",
    description: "",
    statusId: "",
    status:"",
    storyPoints: "",
    remarks: "",
  });
  console.log('child re render DSR report')

  useEffect(() => {
    const savedEntries = localStorage.getItem("formEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveToLocalStorage = (updatedEntries: FormEntry[]) => {
    localStorage.setItem("formEntries", JSON.stringify(updatedEntries));
  };

  const columns: ColumnConfig<(typeof entries)[0]>[] = [
    { key: "item", label: "Item" },
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    { key: "status", label: "Status" },
    { key: "storyPoints", label: "Story Points" },
    { key: "remarks", label: "Remarks" },
  ];

  // Handle input change
  const handleInputChange = (field: keyof FormEntry, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add entry to the table
  const handleAddEntry = () => {
    if (!formData.item || !formData.description || !formData.status) {
      alert("Please fill all required fields.");
      return;
    }
    const updatedEntries = [...entries, { ...formData, id: Date.now() }];
    setEntries(updatedEntries);
    saveToLocalStorage(updatedEntries);
    setFormData({
      id: Date.now(),
      item: "",
      date:"",
      description: "",
      statusId: "",
      storyPoints: "",
      remarks: "",
      status:""
    });
  };

  
  // Options for dropdown
  const menuItems = [
    { value: "1", label: "Pending" },
    { value: "2", label: "In-Progress" },
    { value: "3", label: "Completed"},
  ];
  // Handle Change Event
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    const selectedItem = menuItems.find((item) => item.value === selectedValue);
    const newone =selectedItem?.label
    setFormData((prev) => ({
      ...prev,statusId:selectedValue,
      status:newone
    }));
  };

  const renderSelectedValue = (selected: string | number) => {
    const selectedItem = menuItems.find((item) => item.value === selected);
    return selectedItem ? selectedItem.label : "Select Status";
  };

  const handleEdit = (row: any) => {
    console.log('Edit clicked for', row);
  };

  const handleDelete = (row: FormEntry) => {
    const updatedEntries = entries.filter(entry => entry.id !== row.id);
    setEntries(updatedEntries);
    saveToLocalStorage(updatedEntries);
  };
 
  return (
    <StyledDsrRoot>
      <Navbar />
      <Box
        sx={{
          marginTop: "2%",
          display: "flex",
          marginBottom: "2%",
          gap:'30px',
        }}
      >
        <StyledFormBox>
          <StyledTypography>DSR</StyledTypography>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Item</Typography>
            <CustomTextField
              placeholder="Enter your item"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              value={formData.item}
              onChange={(e) => handleInputChange("item", e.target.value)}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Select Date</Typography>
            <CustomTextField
              placeholder="Enter your item"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              value={formData.date}
              type="date"
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Description</Typography>
            <StyledTextarea
              aria-label="empty textarea"
              placeholder="Type here"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <Typography>Status</Typography>
            <CustomSelectDropdown
              fieldName="customDropdown"
              fieldId="customDropdown"
              fieldValue={formData.statusId}
              fieldMenuItems={menuItems}
              handleChangeMenu={handleChange}
              fieldError={false}
              fieldStyles={selectDropdownStyles}
              renderValue={renderSelectedValue}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Story Points</Typography>
            <CustomTextField
              placeholder="Enter your item"
              height="40px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF", paddingLeft: "0px" }}
              value={formData.storyPoints}
              onChange={(e) => handleInputChange("storyPoints", e.target.value)}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Remarks</Typography>
            <StyledTextarea
              aria-label="empty textarea"
              placeholder="Type here"
              value={formData.remarks}
              onChange={(e) => handleInputChange("remarks", e.target.value)}
            />
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <CustomButton
              btnText="Add"
              buttonVariant="contained"
              btnStyle={{ margin: "10px", width: "103px" }}
              buttonId="outlined-button"
              handleButtonClick={handleAddEntry}
            />
            <CustomButton
              btnText="Submit"
              buttonVariant="contained"
              btnStyle={{ margin: "10px", width: "103px" }}
              buttonId="outlined-button"
              // handleButtonClick={handleAddEntry}
            />
          </Box>
        </StyledFormBox>
        <Box mt={3.4}>
          <ReusableTable
            columns={columns}
            rows={entries}
            showPagination={false}
            pageSize={5}
            actions={actions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showEditMenuIcon={true}
          />
        </Box>
      </Box>
    </StyledDsrRoot>
  );
};
const selectDropdownStyles: React.CSSProperties = {
  width: "403px",
  borderRadius: "8px",
  height: "40px",
  paddingRight: "9px",
  backgroundColor: "#ffffff",
};
export default DsrReport;
