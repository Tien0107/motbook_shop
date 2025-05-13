// src/features/analytics/components/StatCards.jsx
import { Avatar, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
  IconCurrencyDollar,
  IconShoppingCart,
  IconTruck,
  IconUsers
} from '@tabler/icons-react';
import React from 'react';
import BlankCard from '../../../components/shared/BlankCard';
import useAnalyticsStore from '../stores/analyticsStore';

const StatCard = ({ icon, title, value, color }) => (
  <BlankCard>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        sx={{
          bgcolor: `${color}.light`,
          width: 50,
          height: 50,
        }}
      >
        {icon}
      </Avatar>
      <Box sx={{ ml: 2 }}>
        <Typography variant="h3">{value}</Typography>
        <Typography color="textSecondary" variant="h6">
          {title}
        </Typography>
      </Box>
    </Box>
  </BlankCard>
);

const StatCards = () => {
  const { stats } = useAnalyticsStore();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={3}>
        <StatCard
          icon={<IconCurrencyDollar />}
          title="Total Sales"
          value={`$${stats.totalSales}`}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <StatCard
          icon={<IconShoppingCart />}
          title="Total Orders"
          value={stats.totalOrders}
          color="success"
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <StatCard
          icon={<IconUsers />}
          title="Total Customers"
          value={stats.totalCustomers}
          color="warning"
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <StatCard
          icon={<IconTruck />}
          title="Pending Orders"
          value={stats.pendingOrders}
          color="error"
        />
      </Grid>
    </Grid>
  );
};

export default StatCards;