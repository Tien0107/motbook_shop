// src/features/orders/components/RecentOrders.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton
} from '@mui/material';
import { IconEye } from '@tabler/icons-react';
import useOrderStore from '../stores/orderStore';

const RecentOrders = () => {
  const { orders } = useOrderStore();
  
  // Get only last 5 orders
  const recentOrders = orders.slice(0, 5);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Order ID</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Products</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {recentOrders.map((order) => (
          <TableRow key={order._id}>
            <TableCell>{order._id}</TableCell>
            <TableCell>{order.user.name}</TableCell>
            <TableCell>{order.productCount} items</TableCell>
            <TableCell>${order.totalAmount}</TableCell>
            <TableCell>
              <Chip
                label={order.status}
                color={
                  order.status === 'completed' ? 'success' :
                  order.status === 'pending' ? 'warning' :
                  'error'
                }
                size="small"
              />
            </TableCell>
            <TableCell>
              <IconButton href={`/orders/${order._id}`}>
                <IconEye />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentOrders;