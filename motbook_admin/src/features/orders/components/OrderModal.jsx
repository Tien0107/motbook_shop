import { Button, Modal, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './OrderModal.css';

const OrderModal = ({ visible, order, onClose, onUpdateStatus }) => {
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleUpdateStatus = async () => {
    try {
      setLoading(true);
      await onUpdateStatus(order._id, status);
      message.success('Order status updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating order status:', error);
      message.error('Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Order Details"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancel</Button>,
        <Button
          key="update"
          type="primary"
          loading={loading}
          onClick={handleUpdateStatus}
        >
          Update Status
        </Button>
      ]}
    >
      {order && (
        <div className="order-details">
          <h3>Order #{order._id}</h3>
          <div className="order-info">
            <p><strong>Customer:</strong> {order.user?.name}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
          </div>

          <div className="status-update">
            <label>Order Status:</label>
            <Select
              value={status}
              onChange={setStatus}
              style={{ width: 200, marginLeft: 10 }}
              options={statusOptions}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default OrderModal;