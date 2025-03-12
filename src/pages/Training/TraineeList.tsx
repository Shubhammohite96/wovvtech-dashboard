import { Typography, Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReusableTable from "../../components/cutomComponents/ReusableTable";
import { StyledDsrRoot } from '../reports/DsrStyle';
import { useNavigate } from "react-router-dom";

interface Trainee {
    id: string;
    userName: string;
    trainingStartDate: string;
    progress:string;
    trainingEndDate: string;
    status: string;
    action?: JSX.Element;
}

const TraineeList: React.FC = () => {
    const navigate = useNavigate();
    const [traineeData, setTraineeData] = useState<Trainee[]>([]) 
    const [tab, setTab] = useState("ReactJs");

    const handleTabSelection = (selectedTab: string) => {
        setTab(selectedTab)
    }

    useEffect(()=>{
        if(tab === "ROR"){
            let data = dataRor.map((value) => ({ ...value, action: button(value.id) }));
            setTraineeData(data)
        }
        if(tab === "ReactJs"){
            let data = dataJs.map((value) => ({ ...value, action: button(value.id) }));
            setTraineeData(data)
        }
        if(tab === "ReactNative"){
            let data = dataNative.map((value) => ({ ...value, action: button(value.id) }));
            setTraineeData(data)
        }
    },[tab])

    const button = (id: string) => <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleViewClick(id)}
        >
            <Typography>View</Typography>
        </Button>
    
    let dataNative = [
        {
            id: "1",
            userName: "Native User1",
            trainingStartDate: "22/02/2025",
            progress:'10%',
            trainingEndDate: "22/03/2025",
            status: "Started",
        },
        {
            id: "2",
            userName: "Native User2",
            trainingStartDate: "16/02/2025",
            progress:'10%',
            trainingEndDate: "16/03/2025",
            status: "Pending",
        },
        {
            id: "3",
            userName: "Native User3",
            trainingStartDate: "19/02/2025",
            progress:'10%',
            trainingEndDate: "16/03/2025",
            status: "Completed"
        }
    ]
    let dataRor = [
        {
            id: "1",
            userName: "ROR User1",
            trainingStartDate: "22/02/2025",
             progress:'10%',
            trainingEndDate: "16/03/2025",
            status: "Started",
        },
        {
            id: "2",
            userName: "ROR User2",
            trainingStartDate: "16/02/2025",
             progress:'10%',
            trainingEndDate: "16/03/2025",
            status: "Pending",
        },
        {
            id: "3",
            userName: "ROR User3",
            trainingStartDate: "19/02/2025",
             progress:'10%',
            trainingEndDate: "16/03/2025",
            status: "Completed"
        }
    ]

    let dataJs = [
        {
            id: "1",
            userName: "User1",
            trainingStartDate: "22/02/2025",
             progress:'10%',
            trainingEndDate: "16/03/2025",
            status: "Started",
        },
        {
            id: "2",
            userName: "User2",
            trainingStartDate: "16/02/2025",
             progress:'10%',
            trainingEndDate: "16/03/2025",
            status: "Pending",
        },
        {
            id: "3",
            userName: "User3",
            trainingStartDate: "19/02/2025",
             progress:'10%',
            trainingEndDate: "16/03/2025",
            status: "Completed"
        }
    ]


    const columns: { key: keyof Trainee; label: string; render?: (row: Trainee) => JSX.Element }[] = [
        {
            key: "userName",
            label: "TraineeName"
        },
        {
            key: "trainingStartDate",
            label: "Training Start Date"
        },
        {
            key: "trainingEndDate",
            label: "Training End Date"
        },
        {
            key: "progress",
            label: "Progress"
        },
        {
            key: "status",
            label: "Status"
        },
        {
            key: "action",
            label: "Action",            
        }
    ]
    //@ts-ignore
    const handleViewClick = (rowData: string) => {
        navigate('/TrainingDetails')
    }    

    return (
        <StyledDsrRoot>
            <Box sx={{ marginTop: "20px" }}>
                <Typography
                    sx={{
                        textAlign: "center",
                        marginBottom: "30px",
                        fontSize: "20px",
                        fontWeight: 700
                    }}>
                    Trainee List
                </Typography>
                <Box sx={{textAlign: "center", margin: "20px"}}>
                    <Button 
                    onClick={()=>handleTabSelection("ReactJs")}
                    sx={{border: "1px solid grey", margin: "10px", width:"20%"}}>
                        <Typography>React Js</Typography>
                    </Button>
                    <Button 
                    onClick={()=>handleTabSelection("ReactNative")}
                    sx={{border: "1px solid grey", margin: "10px", width:"20%"}}>
                        <Typography>React Native</Typography>
                    </Button>
                    <Button 
                    onClick={()=>handleTabSelection("ROR")}
                    sx={{border: "1px solid grey", margin: "10px", width:"20%"}}>
                        <Typography>ROR</Typography>
                    </Button>
                </Box>
                <ReusableTable
                    columns={columns}
                    rows={traineeData}
                />
            </Box>
        </StyledDsrRoot>
    )
}
export default TraineeList;