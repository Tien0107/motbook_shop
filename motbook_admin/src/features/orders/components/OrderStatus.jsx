// src/features/analytics/components/StatCards.jsx
import { Box, Chip, Grid, Typography } from '@mui/material';
import {
  IconCurrencyDollar,
  IconShoppingCart,
  IconTruck,
  IconUsers
} from '@tabler/icons-react';
import React from 'react';
import BlankCard from '../../../components/shared/BlankCard';
import useAnalyticsStore from '../../../features/analytics/stores/analyticsStore';

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

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'warning',
    description: 'Order is waiting to be processed'
  },
  confirmed: {
    label: 'Confirmed',
    color: 'success',
    description: 'Order has been confirmed'
  },
  processing: {
    label: 'Processing',
    color: 'info',
    description: 'Order is being prepared for shipping'
  },
  shipped: {
    label: 'Shipped',
    color: 'primary',
    description: 'Order has been shipped'
  },
  delivered: {
    label: 'Delivered',
    color: 'success',
    description: 'Order has been delivered'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'error',
    description: 'Order has been cancelled'
  }
};

export default function OrderStatus({ status }) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Chip
        label={config.label}
        color={config.color}
        size="medium"
      />
    </Box>
  );
}