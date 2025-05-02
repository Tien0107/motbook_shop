import {
    Alert,
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCustomerStore from '../../features/customers/stores/customerStore';
import customerService from '../../features/customers/services/customerService';


const CustomerDetail = () => {
    const { id } = useParams();
    const {
        selectedCustomer,
        loading,
        error,
        getCustomerById,
        updateCustomerStatus
    } = useCustomerStore();

    const [activeTab, setActiveTab] = useState(0);
    const [statusDialog, setStatusDialog] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [violations, setViolations] = useState([]);

    useEffect(() => {
        getCustomerById(id);
        fetchViolationHistory();
    }, [id]);

    const fetchViolationHistory = async () => {
        try {
            const history = await customerService.getViolationHistory(id);
            setViolations(history);
        } catch (error) {
            console.error('Error fetching violation history:', error);
        }
    };

    const handleStatusChange = async () => {
        try {
            await updateCustomerStatus(id, { status: newStatus });
            setStatusDialog(false);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) return <Box>Loading...</Box>;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!selectedCustomer) return <Box>Customer not found</Box>;

    return (
        <Box>
            <Card sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>
                            Customer Information
                        </Typography>
                        <Typography>Name: {selectedCustomer.name}</Typography>
                        <Typography>Email: {selectedCustomer.email}</Typography>
                        <Typography>
                            Status: {selectedCustomer.status}
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{ ml: 2 }}
                                onClick={() => setStatusDialog(true)}
                            >
                                Change Status
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Card>

            <Card>
                <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)}>
                    <Tab label="Details" />
                    <Tab label="Violation History" />
                </Tabs>

                <Box p={3}>
                    {activeTab === 0 && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    Address
                                </Typography>
                                <Typography>
                                    {`${selectedCustomer.address.street}, ${selectedCustomer.address.city}, ${selectedCustomer.address.state}, ${selectedCustomer.address.zipcode}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    Phone Number
                                </Typography>
                                <Typography>
                                    {selectedCustomer.phone}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}

                    {activeTab === 1 && (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Violation Type</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Action Taken</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {violations.map((violation) => (
                                        <TableRow key={violation.id}>
                                            <TableCell>
                                                {new Date(violation.date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>{violation.type}</TableCell>
                                            <TableCell>{violation.reason}</TableCell>
                                            <TableCell>{violation.action}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Card>

            {/* Status Change Dialog */}
            <Dialog open={statusDialog} onClose={() => setStatusDialog(false)}>
                <DialogTitle>Change Customer Status</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>New Status</InputLabel>
                        <Select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                            <MenuItem value="blocked">Blocked</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setStatusDialog(false)}>Cancel</Button>
                    <Button
                        onClick={handleStatusChange}
                        variant="contained"
                        disabled={!newStatus}
                    >
                        Update Status
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CustomerDetail;
