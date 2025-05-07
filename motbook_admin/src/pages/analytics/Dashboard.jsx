// src/pages/analytics/Dashboard.jsx
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  { name: 'Mon', sales: 4000, visitors: 2400 },
  { name: 'Tue', sales: 3000, visitors: 1398 },
  { name: 'Wed', sales: 2000, visitors: 9800 },
  { name: 'Thu', sales: 2780, visitors: 3908 },
  { name: 'Fri', sales: 1890, visitors: 4800 },
  { name: 'Sat', sales: 2390, visitors: 3800 },
  { name: 'Sun', sales: 3490, visitors: 4300 },
];

const recentOrders = [
  { id: 1, customer: 'John Doe', amount: '$120', status: 'Completed' },
  { id: 2, customer: 'Jane Smith', amount: '$85', status: 'Processing' },
  { id: 3, customer: 'Bob Johnson', amount: '$230', status: 'Completed' },
  { id: 4, customer: 'Alice Brown', amount: '$65', status: 'Pending' },
];

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3} direction="column">
        {/* Row 1: Summary Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Revenue
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
                    Total Customers
                  </Typography>
                  <Typography variant="h4">800</Typography>
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
            <CardHeader title="Weekly Sales" />
            <Divider />
            <Box sx={{ height: 400, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#f4f6f8',
                      border: '1px solid #ddd',
                      borderRadius: 10,
                    }}
                    cursor={{ fill: '#f0f0f0' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                  <Bar
                    dataKey="sales"
                    fill="#4e73df"
                    radius={[10, 10, 0, 0]}
                    barSize={30}
                  />
                  <Bar
                    dataKey="visitors"
                    fill="#1cc88a"
                    radius={[10, 10, 0, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>

            </Box>
          </Paper>
        </Grid>

        {/* Row 3: Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <CardHeader title="Recent Orders" />
            <Divider />
            <List>
              {recentOrders.map((order) => (
                <ListItem key={order.id}>
                  <ListItemAvatar>
                    <Avatar>{order.customer.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={order.customer}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {order.amount}
                        </Typography>
                        {` — ${order.status}`}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
