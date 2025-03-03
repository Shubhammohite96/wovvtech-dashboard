import { Card, Box, Typography, CardContent, Pagination } from '@mui/material'
import { StyledDsrRoot } from '../reports/DsrStyle'
import { useEffect, useState } from 'react'

interface Notification {
    id: string;
    title: string;
    description: string;
    meta: Meta;
}
interface Meta {
    total_count: number;
    current_page: number;
    next_page: number;
    per_page: number;
}

const NotificationList: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [page, setPage] = useState<number>(1);
    const perPage = 10;

    const fetchNotificationData = async () => {

        try {
            const response = await fetch(
                `https://api-production-partner.builder.ai/releases?per_page=${perPage}&page=${page}`
            );
            const data = await response.json();

            if (Array.isArray(data.data)) {
                setNotifications(data.data);
                setMeta(data.meta);
            }
        } catch (error) {
            console.error("Error fetching releases:", error);
        }
    }

    useEffect(() => {
        fetchNotificationData();
    }, [page])

    return (
        <StyledDsrRoot>
            <Box sx={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center" }}>
                <Card sx={{ border: "1px solid lightgrey", padding: "20px 10px", display: "flex", justifyContent: "center", alignItems: "center", width: "75%" }}>
                    <Typography style={{ fontWeight: 700, fontSize: "20px" }}>Release Notes & Announcements</Typography>
                </Card>
                {notifications.map((item) => {
                    return (
                        <Card key={item.id} sx={{ border: "1px solid lightgrey", padding: "20px 10px", display: "flex", justifyContent: "center", alignItems: "center", width: "75%" }}>
                            <CardContent>
                                <Typography>
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ "& a": { color: "blue", textDecoration: "underline" } }}
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                />
                            </CardContent>
                        </Card>

                    )
                })}

                {meta && (
                    <Pagination
                        count={Math.ceil(meta.total_count / perPage)}
                        page={meta.current_page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
                    />
                )}

            </Box>
        </StyledDsrRoot>
    )
}
export default NotificationList;