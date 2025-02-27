import React, { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import CustomSelectDropdown from '../../components/cutomComponents/CustomDropdown';
import { SelectChangeEvent } from '@mui/material';
import ReusableTable, {
    ColumnConfig,
  } from "../../components/cutomComponents/ReusableTable";
import UserProfileTabs from './UserProfileTabs';

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

  return (
    <Box>
      {/* Dropdown Filter */}
      <Box my={4}>
      <UserProfileTabs />
        </Box>
      <Box m={10}>
      <Box mb={2}>
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


