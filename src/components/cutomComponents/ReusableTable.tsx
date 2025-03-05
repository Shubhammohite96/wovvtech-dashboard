import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  PaginationItem,
  Box,
  Typography,
  styled,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

// Define TypeScript interfaces
export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  icon?: string;
  renderCell?: (value: any, row: T) => React.ReactNode; // Updated to React.ReactNode
}

export interface TableProps<T> {
  columns: ColumnConfig<T>[];
  rows: T[];
  pageSize?: number;
  rowsPerPageOptions?: number[];
  defaultSortedColumn?: keyof T;
  showPagination?: boolean;
  showEditMenuIcon?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onClaimStatus?: (row: T) => void; // Added for claim status
  actions?: {
    edit?: boolean;
    delete?: boolean;
    claimStatus?: boolean; // Added for claim status
  };
}

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: "100%",
  margin: "auto",
  boxShadow: theme.shadows[3],
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  fontWeight: "bold",
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
}));

function ReusableTable<T>({
  columns,
  rows,
  pageSize = 5,
  defaultSortedColumn,
  showPagination,
  showEditMenuIcon,
  actions,
  onEdit,
  onDelete,
  onClaimStatus,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  //@ts-ignore
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  //@ts-ignore
  const [orderBy, setOrderBy] = useState<keyof T | null>(
    defaultSortedColumn || null
  );
  //@ts-ignore
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  // Pagination logic
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const currentRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const sortedRows = [...currentRows].sort((a, b) => {
    if (!orderBy) return 0;
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const handleActionClick = (event: React.MouseEvent<HTMLElement>, row: T) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleActionMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedRow(null);
  };

  const handleAction = (action: string) => {
    if (action === "edit" && selectedRow) {
      onEdit?.(selectedRow);
    } else if (action === "delete" && selectedRow) {
      onDelete?.(selectedRow);
    } else if (action === "claimStatus" && selectedRow) {
      onClaimStatus?.(selectedRow); // Calls parent function
    }
    handleActionMenuClose();
  };
  
  return (
    <Paper>
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderTableCell>Sr. No</HeaderTableCell>
              {columns.map((column) => (
                <HeaderTableCell key={column.key.toString()}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" sx={{ fontSize: "14px" }}>
                      {column.label}
                    </Typography>
                    {column.icon && (
                      <img
                        src={column.icon}
                        alt={`${column.label} icon`}
                        style={{ width: 10, height: 13, marginLeft: 8 }}
                      />
                    )}
                  </Box>
                </HeaderTableCell>
              ))}
              {showEditMenuIcon && (
                <HeaderTableCell
                  sx={{
                    position: "sticky",
                    right: 0,
                    background: "#eeeeee",
                    zIndex: 2,
                  }}
                >
                  Actions
                </HeaderTableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.key.toString()}>
                    {column.renderCell
                      ? column.renderCell(row[column.key], row)
                      : (row[column.key] as React.ReactNode)}
                  </TableCell>
                ))}
                {showEditMenuIcon && (
                  <TableCell align="left">
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(e: any) => handleActionClick(e, row)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <Menu
        id="menu-action"
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleActionMenuClose}
      >
        {actions?.edit && <MenuItem onClick={() => handleAction("edit")}>Edit</MenuItem>}
        {actions?.delete && <MenuItem onClick={() => handleAction("delete")}>Delete</MenuItem>}
        {actions?.claimStatus && <MenuItem onClick={() => handleAction("claimStatus")}>Claim  </MenuItem>}
      </Menu>
      {showPagination && (
        <PaginationContainer>
          <Typography>
            Page {currentPage} of {totalPages}
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  minWidth: "30px",
                  height: "30px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                }}
              />
            )}
          />
        </PaginationContainer>
      )}
    </Paper>
  );
}

export default ReusableTable;
