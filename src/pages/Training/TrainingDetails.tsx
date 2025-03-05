import { Typography, Box, Button, Card, CardContent, LinearProgress, Checkbox } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { StyledDsrRoot } from '../reports/DsrStyle';

interface Topics {
    id: string;
    topicName: string;
    progress: number;
    subTopics: SubTopics[];
}

interface SubTopics {
    id: string;
    checked: boolean;
    name: string;
}

const TrainingDetails: React.FC = () => {
    const [topics, setTopics] = useState<Topics[]>([]);

    let topicsData: Topics[] = [
        {
            id: "1",
            topicName: "React Js UI",
            progress: 0,
            subTopics: [
                {
                    id: "1",
                    name: "Sub topic 1",
                    checked: false
                }, {
                    id: "2",
                    name: "Sub topic 2",
                    checked: false
                }, {
                    id: "3",
                    name: "Sub topic 3",
                    checked: false
                }, {
                    id: "4",
                    name: "Sub topic 4",
                    checked: false
                }, {
                    id: "5",
                    name: "Sub topic 5",
                    checked: false
                }]
        },
        {
            id: "2",
            topicName: "Validations and Api integration",
            progress: 0,
            subTopics: [{
                id: "1",
                name: "Sub topic 1",
                checked: false
            }, {
                id: "2",
                name: "Sub topic 2",
                checked: false
            }, {
                id: "3",
                name: "Sub topic 3",
                checked: false
            }, {
                id: "4",
                name: "Sub topic 4",
                checked: false
            }, {
                id: "5",
                name: "Sub topic 5",
                checked: false
            }]
        },
        {
            id: "3",
            topicName: "Other functionality and navigation",
            progress: 0,
            subTopics: [{
                id: "1",
                name: "Sub topic 1",
                checked: false
            }, {
                id: "2",
                name: "Sub topic 2",
                checked: false
            }, {
                id: "3",
                name: "Sub topic 3",
                checked: false
            }, {
                id: "4",
                name: "Sub topic 4",
                checked: false
            }, {
                id: "5",
                name: "Sub topic 5",
                checked: false
            }]
        },
        {
            id: "4",
            topicName: "Unit test cases",
            progress: 0,
            subTopics: [{
                id: "1",
                name: "Sub topic 1",
                checked: false
            }, {
                id: "2",
                name: "Sub topic 2",
                checked: false
            }, {
                id: "3",
                name: "Sub topic 3",
                checked: false
            }, {
                id: "4",
                name: "Sub topic 4",
                checked: false
            }, {
                id: "5",
                name: "Sub topic 5",
                checked: false
            }]
        }
    ]

    topicsData = topicsData.map((value) => {
        const progress = (value.subTopics.filter((val) => val.checked === true).length) * 100 / (value.subTopics.length);
        return { ...value, progress }
    })

    useEffect(() => {
        setTopics(topicsData)
    }, [])

    const handleCheckboxChange = (topicId: string, subTopicId: string) => {
        setTopics((prevTopics: Topics[]) =>
            prevTopics.map((topic) => {
                if (topic.id === topicId) {
                    const updatedSubTopics = topic.subTopics.map(sub =>
                        sub.id === subTopicId ? { ...sub, checked: !sub.checked } : sub
                    );
                    const completedCount = updatedSubTopics.filter(sub => sub.checked).length;
                    const progress = (completedCount / updatedSubTopics.length) * 100;

                    return { ...topic, subTopics: updatedSubTopics, progress };
                }
                return topic;
            })
        );
    };
    
    return (
        <StyledDsrRoot>
            <Box>
                <Box sx={{ marginTop: "20px" }}>
                    <Typography
                        sx={{
                            textAlign: "center",
                            marginBottom: "30px",
                            fontSize: "20px",
                            fontWeight: 700
                        }}>
                        Training Details
                    </Typography>
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                    {topics.map((topics) => {
                        return (
                            <Card sx={{ marginBottom: "20px", padding: "10px" }}>
                                <CardContent style={{ display: "flex", flexDirection: "column" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                        <Typography sx={{ flex: 1.5 }}>{topics.topicName}</Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={topics.progress}
                                            sx={{ flex: 2, height: "10px", margin: "0 10px" }}
                                        />
                                        <Typography sx={{ flex: 1, textAlign: "right" }}>
                                            {Math.round(topics.progress)}% Completed
                                        </Typography>
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        {topics.subTopics.map((subTopic) => {
                                            return (
                                                <div key={subTopic.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
                                                    <Checkbox
                                                        checked={subTopic.checked}
                                                        onChange={() => handleCheckboxChange(topics.id, subTopic.id)}
                                                    />
                                                    <Typography>{subTopic.name}</Typography>
                                                </div>
                                            )
                                        })}
                                    </Box>
                                </CardContent>
                            </Card>
                        )
                    })}
                </Box>
                <Box style={{textAlign: "center"}}>
                    <Button sx={{border: "1px solid grey", padding: "10px 20px", textTransform:"none", color: "black", fontWeight: "700"}}>  
                        Update Here
                    </Button>
                </Box>
            </Box>
        </StyledDsrRoot>
    )
}
export default TrainingDetails;
