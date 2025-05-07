// src/pages/orders/OrderList.jsx
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { IconEdit, IconEye } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import DashboardCard from '../../components/shared/DashboardCard';
import OrderModal from '../../features/orders/components/OrderModal';
import OrderStatus from '../../features/orders/components/OrderStatus';
import useOrderStore from '../../features/orders/stores/orderStore';

const OrderList = () => {
  const { orders, loading, error, fetchOrders, updateOrderStatus } = useOrderStore();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    try {
      fetchOrders();
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    await fetchOrders(); // Refresh the orders list
  };

  if (loading) {
    return <div><Loading /></div>;
  }
  if (error) {
    return <div><Error message={error.message} /></div>;
  }
  if (!orders || orders.length === 0) {
    return <div>No orders found</div>;
  }
  return (
    <DashboardCard title="Orders">
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="orders table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : orders
            ).map((order) => (
              <TableRow key={order._id}>
                <TableCell>#{order._id}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>${order.totalAmount}</TableCell>
                <TableCell>
                  <OrderStatus status={order.status} />
                </TableCell>
                <TableCell>
                  <IconButton href={`/orders/${order._id}`}>
                    <IconEye />
                  </IconButton>
                  <IconButton onClick={() => handleEditClick(order)}>
                    <IconEdit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <OrderModal
        visible={modalVisible}
        order={selectedOrder}
        onClose={handleModalClose}
        onUpdateStatus={handleUpdateStatus}
      />
    </DashboardCard>
  );
};

export default OrderList;