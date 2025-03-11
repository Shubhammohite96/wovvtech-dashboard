import React, { useState } from 'react';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,

    TableHead,
    TableRow,
    Typography,
    Paper,
    styled
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    fontWeight: "bold",
}));

export interface ColumnConfig<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    icon?: string;
    renderCell?: (value: any, row: T) => React.ReactNode; // Updated to React.ReactNode
    width?: string | number;
}

export interface TableProps<T> {
    columns: ColumnConfig<T>[];
    rows: T[];
    pageSize?: number;
    rowsPerPageOptions?: number[];
    defaultSortedColumn?: keyof T;
    showPagination?: boolean;
}

export default function CollapsibleTable<T>({
    columns,
    rows,
    pageSize = 5,
    defaultSortedColumn,
    showPagination,
}: TableProps<T>) {
    const [currentPage, setCurrentPage] = React.useState(1);
    //@ts-ignore
    const [rowsPerPage, setRowsPerPage] = useState(pageSize);
    //@ts-ignore
    const [orderBy, setOrderBy] = useState<keyof T | null>(
        defaultSortedColumn || null
    );
    //@ts-ignore
    const [order, setOrder] = useState<"asc" | "desc">("asc");

    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const currentRows = rows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const sortedRows = [...currentRows].sort((a, b) => {
        if (!orderBy) return 0;
        return 0;
    });

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <HeaderTableCell></HeaderTableCell>
                        <HeaderTableCell>Sr. No</HeaderTableCell>
                        {columns.map((column) => (
                            <HeaderTableCell key={column.key.toString()}>
                                <Box display="flex" alignItems="center" sx={{ width: column.width || "auto" }} >
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows.map((row, index) => {
                        if (index == 0)
                            console.log(row)
                        return (
                            <Row key={index} columns={columns} row={row} index={index} currentPage={currentPage} rowsPerPage={rowsPerPage} />
                        )
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Row({ row, columns, currentPage, index, rowsPerPage }: { row: any, columns: any, currentPage: number, index: number, rowsPerPage: number }) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {(currentPage - 1) * rowsPerPage + index + 1}
                </TableCell>
                {columns.map((column: any) => (
                    <TableCell key={column.key.toString()} sx={{ width: column.width || "auto" }}>
                        {column.renderCell
                            ? column.renderCell(row[column.key], row)
                            : (row[column.key] as React.ReactNode)}
                    </TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {Object.keys(row?.child).length > 0 ? (<Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        {Object.keys(row?.child)[0] &&
                                            Object.keys(row?.child[Object.keys(row?.child)[0]])?.map((value) => (
                                                <TableCell>{value}</TableCell>
                                            ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(row?.child)?.map((childRow: any, i : number) => {
                                        return (
                                        <TableRow key={childRow.date}>
                                            <TableCell component="th" scope="row" sx={{width: "200px"}}>
                                                {Object.keys(row?.child)[i]}
                                            </TableCell>
                                            {Object.values(row?.child[Object.keys(row?.child)[i]])?.map((value: any) => (
                                                <TableCell>{value}</TableCell>
                                            ))}
                                        </TableRow>
                                    )})}
                                </TableBody>
                            </Table>) :
                                <Typography>No Data Available</Typography>}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}