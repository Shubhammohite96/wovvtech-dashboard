import React, { useState } from "react";
import {
  Button,
  Box,
  Select,
  MenuItem
}
  from "@mui/material";
import ReusableTable, {
  ColumnConfig,
} from "../../components/cutomComponents/ReusableTable";
import * as XLSX from "xlsx";

const UploadCsv: React.FC = () => {
  const [tableData, setTableData] = useState<{ [key: string]: string }[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFile,setIsFile]=useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const fileType = file.name.split(".").pop()?.toLowerCase();

    if (fileType === "csv") {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (event) => {
        if (!event.target?.result) return;

        const csvData = event.target.result as string;
        const rows = csvData.split("\n").map((row) => row.split(","));

        if (rows.length > 1) {
          const headers = rows[0];
          const formattedRows = rows.slice(1).map((row) =>
            Object.fromEntries(headers.map((header, index) => [header.trim(), row[index] || ""]))
          );
          setTableData(formattedRows);
          setCurrentPage(1);
        }
      };
    } else if (fileType === "xlsx" || fileType === "xls") {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (event) => {
        if (!event.target?.result) return;

        const data = new Uint8Array(event.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<{ [key: string]: string }>(sheet);
        setTableData(rows);
        setCurrentPage(1);
      };
    } else {
      alert("Only CSV and Excel files are supported.");
    }
  };

  const pageSize = 10;
  const totalRows = tableData.length;
  const totalPages = Math.ceil(totalRows / pageSize);

  const displayedRows = tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize);


  let columns: ColumnConfig<{ [key: string]: string }>[] =
    tableData.length > 0
      ? Object.keys(tableData[0]).map((header) => ({
        key: header,
        label: header,
      }))
      : [];

  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <Select
        name="hoursForCCFixes"
        displayEmpty
        sx={{
          height: "40px",
          padding: "10px",
          width: "150px",
          backgroundColor: "#FFFFFF",
          "& fieldset": { borderColor: "#ccc !important" },
          "&:hover fieldset": { borderColor: "#ccc !important" },
          "&.Mui-focused fieldset": { borderColor: "#ccc !important" },
          "&.MuiOutlinedInput-root": { borderColor: "#ccc !important" },
        }}
        value={isFile}
        onChange={(e) => setIsFile(e.target.value)}
      >
        <MenuItem value="" disabled>
          Choose file
        </MenuItem>
        <MenuItem value="Pass"> Journey data</MenuItem>
        <MenuItem value="Failed">Tracker data</MenuItem>
      </Select>
      <Button
        disabled={!isFile}
        variant="contained"
        color="primary"
        onClick={handleUpload}
        style={{ marginLeft: "10px" }}
      >
        Show data
      </Button>
      <Button
        disabled={!isFile}
        variant="contained"
        color="primary"
        onClick={handleUpload}
        style={{ marginLeft: "10px" }}
      >
        Upload Data To Server
      </Button>
      {tableData.length > 0 && (
        <Box style={{ marginTop: "40px" }}>
          <ReusableTable
            columns={columns}
            rows={displayedRows}
            showPagination={false}
            pageSize={pageSize}
          />
          <Button
            style={{ margin: "20px 10px", fontWeight: 700 }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {currentPage} of {totalPages}
          <Button
            style={{ margin: "20px 10px", fontWeight: 700 }}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </Button>
        </Box>
      )}
    </div>
  );
};
export default UploadCsv;
