import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Paper,
    Typography
} from '@mui/material';
import React from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const data = [
    { name: 'Jan', sales: 4000, orders: 2400 },
    { name: 'Feb', sales: 3000, orders: 1398 },
    { name: 'Mar', sales: 2000, orders: 9800 },
    { name: 'Apr', sales: 2780, orders: 3908 },
    { name: 'May', sales: 1890, orders: 4800 },
    { name: 'Jun', sales: 2390, orders: 3800 },
];

export default function Analytics() {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3} direction="column">
                {/* Row 1: Summary Cards - All in one horizontal row */}
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Total Sales
                                    </Typography>
                                    <Typography variant="h4">$24,000</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Total Orders
                                    </Typography>
                                    <Typography variant="h4">1,200</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Average Order Value
                                    </Typography>
                                    <Typography variant="h4">$20</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Conversion Rate
                                    </Typography>
                                    <Typography variant="h4">2.4%</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Row 2: Sales Chart */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <CardHeader title="Sales Overview" />
                        <Divider />
                        <Box sx={{ height: 400, mt: 2 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={data}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #ccc',
                                            borderRadius: 8,
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        }}
                                        labelStyle={{ color: '#8884d8' }}
                                        itemStyle={{ color: '#333' }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#3f51b5" // Indigo (modern blue)
                                        strokeWidth={2.5}
                                        activeDot={{ r: 8, fill: '#3f51b5' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#00acc1" // Cyan-ish tone
                                        strokeWidth={2.5}
                                        activeDot={{ r: 8, fill: '#00acc1' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
