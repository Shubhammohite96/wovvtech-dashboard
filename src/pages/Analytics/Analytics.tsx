import { Box } from '@mui/material';
import React from 'react';
import {
    BarChart,
    Bar, XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    Label
} from "recharts";


const data = [
    {
        srNo: 1,
        expertName: "John Doe",
        approvalPercentage: 1,
        trackedHour: 8,
        unqualifiedHours: 8,
        approval: "yes"
    },
    {
        srNo: 2,
        expertName: "Sara Joh",
        approvalPercentage: 2,
        trackedHour: 7,
        unqualifiedHours: 6,
        approval: "yes"
    },
    {
        srNo: 3,
        expertName: "Michael Smith",
        approvalPercentage: 3,
        trackedHour: 9,
        unqualifiedHours: 7,
        approval: "yes"
    },
    {
        srNo: 4,
        expertName: "Olivia Taylor",
        approvalPercentage: 4,
        trackedHour: 6,
        unqualifiedHours: 5,
        approval: "No"
    },
    {
        srNo: 5,
        expertName: "Liam Martinez",
        approvalPercentage: 5,
        trackedHour: 10,
        unqualifiedHours: 9,
        approval: "yes"
    },
    {
        srNo: 6,
        expertName: "Emma Garcia",
        approvalPercentage: 6,
        trackedHour: 8,
        unqualifiedHours: 7,
        approval: "yes"
    },
    {
        srNo: 7,
        expertName: "Benjamin Young",
        approvalPercentage: 7,
        trackedHour: 7,
        unqualifiedHours: 6,
        approval: "No"
    },
    {
        srNo: 8,
        expertName: "Ethan Adams",
        approvalPercentage: 8,
        trackedHour: 9,
        unqualifiedHours: 8,
        approval: "No"
    },
    {
        srNo: 9,
        expertName: "Isabella White",
        approvalPercentage: 9,
        trackedHour: 6,
        unqualifiedHours: 5,
        approval: "No"
    },
    {
        srNo: 10,
        expertName: "Henry Hall",
        approvalPercentage: 10,
        trackedHour: 8,
        unqualifiedHours: 7,
        approval: "yes"
    },
    {
        srNo: 1,
        expertName: "John Doe",
        approvalPercentage: 1,
        trackedHour: 8,
        unqualifiedHours: 8,
        approval: "yes"
    },
    {
        srNo: 2,
        expertName: "Sara Joh",
        approvalPercentage: 2,
        trackedHour: 7,
        unqualifiedHours: 6,
        approval: "yes"
    },
    {
        srNo: 3,
        expertName: "Michael Smith",
        approvalPercentage: 3,
        trackedHour: 9,
        unqualifiedHours: 7,
        approval: "yes"
    },
    {
        srNo: 4,
        expertName: "Olivia Taylor",
        approvalPercentage: 4,
        trackedHour: 6,
        unqualifiedHours: 5,
        approval: "No"
    },
    {
        srNo: 5,
        expertName: "Liam Martinez",
        approvalPercentage: 5,
        trackedHour: 10,
        unqualifiedHours: 9,
        approval: "yes"
    },
    {
        srNo: 6,
        expertName: "Emma Garcia",
        approvalPercentage: 6,
        trackedHour: 8,
        unqualifiedHours: 7,
        approval: "yes"
    },
    {
        srNo: 7,
        expertName: "Benjamin Young",
        approvalPercentage: 7,
        trackedHour: 7,
        unqualifiedHours: 6,
        approval: "No"
    },
    {
        srNo: 8,
        expertName: "Ethan Adams",
        approvalPercentage: 8,
        trackedHour: 9,
        unqualifiedHours: 8,
        approval: "No"
    },
    {
        srNo: 9,
        expertName: "Isabella White",
        approvalPercentage: 9,
        trackedHour: 6,
        unqualifiedHours: 5,
        approval: "No"
    },
    {
        srNo: 10,
        expertName: "Henry Hall",
        approvalPercentage: 10,
        trackedHour: 8,
        unqualifiedHours: 7,
        approval: "yes"
    }
];

const formattedData = data.map(item => ({
    ...item,
    approval: item.approval === "yes" ? 1 : 0,
}));

const Analytics: React.FC = () => {
    return (
        <>
            <ResponsiveContainer width="100%" height={700}>
                <BarChart data={formattedData} margin={{ top: 60, right: 30, left: 20 }}>
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="expertName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="approvalPercentage" fill="#8884d8" name="Approval %" />
                    <Bar dataKey="trackedHour" fill="#82ca9d" name="Tracked Hours" />
                    <Bar dataKey="unqualifiedHours" fill="#FF8042" name="Unqualified Hours" />
                    <Bar dataKey="approval" fill="#FFD700" name="Approval" />
                </BarChart>
            </ResponsiveContainer>           

            <Box sx={{ margin: "40px 0px" }}>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={formattedData}>
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="expertName">
                            <Label value="Expert Name" offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="approvalPercentage" stroke="#8884d8" name="Approval %" />
                        <Line type="monotone" dataKey="trackedHour" stroke="#82ca9d" name="Tracked Hours" />
                        <Line type="monotone" dataKey="unqualifiedHours" stroke="#FF8042" name="Unqualified Hours" />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </>
    )
}
export default Analytics;