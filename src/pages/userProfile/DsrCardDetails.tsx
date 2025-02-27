import { Box, Container, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserProfileTabs from "./UserProfileTabs";
import ReusableTable, { ColumnConfig } from "../../components/cutomComponents/ReusableTable";

interface FormEntry {
  id: number;
  date: string; // Format: "YYYY-MM-DD"
  item: string;
  description: string;
  statusId: string;
  status?: string;
  storyPoints: string;
  remarks: string;
}

const DsrCardDetails = () => {
  const [entries, setEntries] = useState<FormEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<FormEntry[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    const savedEntries = localStorage.getItem("formEntries");
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      setEntries(parsedEntries);
      setFilteredEntries(parsedEntries); // Initially, show all entries
    }
  }, []);

  // Function to handle filtering based on selected month & year
  useEffect(() => {
    let filteredData = [...entries];

    if (selectedMonth) {
      filteredData = filteredData.filter((entry) => {
        const entryMonth = new Date(entry.date).getMonth() + 1; // Get month (1-12)
        return entryMonth === parseInt(selectedMonth);
      });
    }

    if (selectedYear) {
      filteredData = filteredData.filter((entry) => {
        const entryYear = new Date(entry.date).getFullYear().toString();
        return entryYear === selectedYear;
      });
    }

    setFilteredEntries(filteredData);
  }, [selectedMonth, selectedYear, entries]);

  const columns: ColumnConfig<(typeof entries)[0]>[] = [
    { key: "item", label: "Item", },
    { key: "date", label: "Date" },
    { key: "description", label: "Description",width:'200px' },
    { key: "status", label: "Status" },
    { key: "storyPoints", label: "Story Points" },
    { key: "remarks", label: "Remarks" },
  ];

  return (
    <Box>
      <Box my={4}>
        <UserProfileTabs />
      </Box>
      
      {/* Filters Section */}
      <Container maxWidth="md">
        <Box display="flex" justifyContent="space-between" my={3}>
          {/* Month Filter */}
          <Box>
            <Typography fontWeight="bold">Filter by Month</Typography>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              displayEmpty
              sx={{ width: 150, mr: 2 ,height:36}}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i + 1} value={(i + 1).toString()}>
                  {new Date(2000, i).toLocaleString("default", { month: "long" })}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Year Filter */}
          <Box>
            <Typography fontWeight="bold">Filter by Year</Typography>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              displayEmpty
              sx={{ width: 150,height:36 }}
            >
              <MenuItem value="">All</MenuItem>
              {[...new Set(entries.map((entry) => new Date(entry.date).getFullYear().toString()))].map(
                (year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                )
              )}
            </Select>
          </Box>
        </Box>

        {/* Table Section */}
        <Box my={5}>
          <ReusableTable
            columns={columns}
            rows={filteredEntries}
            showPagination={false}
            pageSize={5}
            showEditMenuIcon={false}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default DsrCardDetails;
