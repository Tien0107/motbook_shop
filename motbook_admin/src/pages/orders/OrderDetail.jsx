// src/pages/orders/OrderDetail.jsx
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useOrderStore from '../../features/orders/stores/orderStore';

const statusColors = {
  completed: 'success',
  processing: 'warning',
  pending: 'error'
};

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getOrderById, selectedOrder } = useOrderStore();

  React.useEffect(() => {
    getOrderById(id);
  }, [id]);

  const handleBack = () => {
    navigate('/orders');
  };

  if (!selectedOrder) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Back to Orders
      </Button>

      <Grid container spacing={3} direction={'column'}>
        {/* Order Summary */}
        <Grid item xs={12} md={8} direction={'column'} >
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" component="h2">
                  Order #{selectedOrder._id}
                </Typography>
                <Chip
                  label={selectedOrder.status}
                  color={statusColors[selectedOrder.status]}
                />
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.books.map((book) => (
                      <TableRow key={book.book._id}>
                        <TableCell>{book.book.title}</TableCell>
                        <TableCell align="right">${(book.book.price ?? 0).toFixed(2)}</TableCell>
                        <TableCell align="right">{book.quantity}</TableCell>
                        <TableCell align="right">
                          ${(book.price).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 3 }}>
                <List>
                  <ListItem>
                    <ListItemText primary="Subtotal" />
                    <Typography>${(selectedOrder.subtotal ?? 0).toFixed(2)}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Shipping" />
                    <Typography>${(selectedOrder.shipping ?? 0).toFixed(2)}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Tax" />
                    <Typography>${(selectedOrder.tax ?? 0).toFixed(2)}</Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Grand Total" />
                    <Typography variant="h6">
                      ${(selectedOrder.grandTotal ?? 0).toFixed(2)}
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Information */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customer Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Name" secondary={selectedOrder.user.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email" secondary={selectedOrder.user.email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Phone" secondary={selectedOrder.user.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Address" secondary={`${selectedOrder.user.address.street}, ${selectedOrder.user.address.city}, ${selectedOrder.user.address.country}`} />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Order Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Order Date" secondary={new Date(selectedOrder.createdAt).toLocaleDateString()} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Payment Method" secondary={selectedOrder.paymentMethod} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Tracking Number" secondary={selectedOrder._id} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetail;