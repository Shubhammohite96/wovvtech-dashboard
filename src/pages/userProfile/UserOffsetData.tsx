import React, { useState, useMemo } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material';
import CustomSelectDropdown from '../../components/cutomComponents/CustomDropdown';
import { SelectChangeEvent } from '@mui/material';
import ReusableTable, {
    ColumnConfig,
  } from "../../components/cutomComponents/ReusableTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const data = [
  {
    buildCardName: 'Nathan Robinsons BC',
    TrackedHrs: '08hr 04min',
    Unqualifiedhours: 'Unqualified hours',
    ApprovalHours: '8 hrs',
    approval: '100.00%',
    NonComplianceIssue: '["ide_vs_tracked_hours", "manual_deduction"]',
    month: 'jan-2025'
  },
  {
    buildCardName: 'John Doe BC',
    TrackedHrs: '05hr 30min',
    Unqualifiedhours: 'None',
    ApprovalHours: '5 hrs',
    approval: '90.00%',
    NonComplianceIssue: '[]',
    month: 'feb-2025'
  },
  {
    buildCardName: 'Nathan Robinsons BC',
    TrackedHrs: '08hr 04min',
    Unqualifiedhours: 'Unqualified hours',
    ApprovalHours: '8 hrs',
    approval: '100.00%',
    NonComplianceIssue: '["ide_vs_tracked_hours", "manual_deduction"]',
    month: 'jan-2025'
  },
];


const OffsetDataComponent: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null); 
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '', comments: '' }); 
   

  const months = useMemo(() => {
    const uniqueMonths = new Set(data.map((item) => item.month));
    return ['All', ...Array.from(uniqueMonths)];
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedMonth(event.target.value as string);
  };

  const filteredData = useMemo(() => {
    if (!selectedMonth || selectedMonth === 'All') return data;
    return data.filter((item) => item.month === selectedMonth);
  }, [selectedMonth]);

  const renderSelectedValue = (value: string | number) => {
    if (!value || value === 'All') {
      return 'All';
    }
    return typeof value === 'string' ? value : value.toString();
  };

  const menuItems = months.map((month) => ({ label: month, value: month }));

  const entries = filteredData.map((item) => ({
    item: item.buildCardName,
    description: item.TrackedHrs,
    status: item.Unqualifiedhours,
    storyPoints: item.ApprovalHours,
    remarks: item.NonComplianceIssue
  }));

    const columns: ColumnConfig<(typeof entries)[0]>[] = [
        { key: 'item', label: 'Build Card Name' },
        { key: 'description', label: 'Tracked Hours' },
        { key: 'status', label: 'Unqualified Hours' },
        { key: 'storyPoints', label: 'Approval Hours' },
        { key: 'remarks', label: 'Non-Compliance Issues' }
    ];

    const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
      setMenuAnchorEl(event.currentTarget);
    };


    const handleAction = (action: string) => { 
      setOpen(true)
      handleActionMenuClose();
    };
    
  const handleActionMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', formData);
    setOpen(false); // Close modal after submission
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(entries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
    // Excel file banayenge
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(data, 'table_data.xlsx');
  };

  // 🔹 CSV Export Function
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(entries);
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'table_data.csv');
  };
  return (
    <Box>
      {/* Dropdown Filter */}
      <Typography variant="h5" textAlign={"center"} mt={"1%"}>
        Offset Form Data
      </Typography>

      <Box m={10}>
        <Box mb={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <CustomSelectDropdown
            fieldName="monthFilter"
            fieldId="monthFilter"
            fieldValue={selectedMonth}
            fieldMenuItems={menuItems}
            handleChangeMenu={handleChange}
            fieldError={false}
            fieldStyles={selectDropdownStyles}
            renderValue={renderSelectedValue}
          />
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(e: any) => handleActionClick(e)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
        id="menu-action"
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleActionMenuClose}
      >
       <MenuItem onClick={() => handleAction("edit")}>Claim</MenuItem>
      </Menu>
      <Button onClick={exportToExcel} variant="contained" color="primary" style={{ margin: '10px' }}>
        Export to Excel
      </Button>
      <Button onClick={exportToCSV} variant="contained" color="secondary">
        Export to CSV
      </Button>
        </Box>

        {/* Reusable Table */}
        <ReusableTable
          columns={columns}
          rows={entries}
          showPagination={false}
          pageSize={5}
          showEditMenuIcon={false}
        />
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Provide Offset Reason</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChangeText}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Enter Reason"
            name="comments"
            value={formData.comments}
            onChange={handleChangeText}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
const selectDropdownStyles: React.CSSProperties = {
  width: "403px",
  borderRadius: "8px",
  height: "40px",
  paddingRight: "9px",
  backgroundColor: "#ffffff",
};
export default OffsetDataComponent;


