import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import customerService from '../../../features/customers/services/customerService';

export default function CustomerForm({ onSubmit }) {
    const { customerId } = useParams();
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState(null);
    const [formData, setFormData] = useState({
        status: 'active',
        statusReason: ''
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const data = await customerService.getCustomerById(customerId);
                setCustomer(data);
                setFormData(prev => ({
                    ...prev,
                    status: data.status || 'active'
                }));
            } catch (error) {
                console.error('Error loading customer:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [customerId]);

    const handleStatusChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await customerService.updateCustomerStatus(customerId, formData);
            onSubmit && onSubmit();
        } catch (error) {
            console.error('Error updating customer status:', error);
        }
    };

    const CUSTOMER_STATUSES = {
        ACTIVE: 'Active',
        SUSPENDED: 'Suspended',
        BANNED: 'Banned',
        INACTIVE: 'Inactive'
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (!customer) {
        return (
            <Typography color="error">
                Customer not found
            </Typography>
        );
    }

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Customer Status Management
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3} direction="column">
                    {/* Read-only customer information */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    Customer Information (Read-only)
                                </Typography>
                                <Grid container spacing={2} direction="column">
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            value={customer.name}
                                            InputProps={{ readOnly: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            value={customer.email}
                                            InputProps={{ readOnly: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            value={customer.phone}
                                            InputProps={{ readOnly: true }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Status management section */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    Account Status Management
                                </Typography>
                                <Grid container spacing={2} direction="column">
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                name="status"
                                                value={formData.status}
                                                label="Status"
                                                onChange={handleStatusChange}
                                            >
                                                {Object.entries(CUSTOMER_STATUSES).map(([key, value]) => (
                                                    <MenuItem key={key} value={value}>
                                                        {value}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Reason for status change"
                                            multiline
                                            rows={2}
                                            fullWidth
                                            name="statusReason"
                                            value={formData.statusReason}
                                            onChange={handleStatusChange}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Violation history */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    Violation History
                                </Typography>
                                <List>
                                    {customer.violations?.map((violation) => (
                                        <ListItem key={violation.id}>
                                            <ListItemText
                                                primary={violation.type}
                                                secondary={`Date: ${violation.date} - Action: ${violation.action}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Update Status
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
} 