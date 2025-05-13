// src/pages/customers/CustomerList.jsx
import { DateRangePicker } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from '@mui/material';
import React, { useEffect } from 'react';
import useCustomerStore from '../../features/customers/stores/customerStore';
import { useNavigate } from 'react-router';

const CustomerList = () => {
  const navigate = useNavigate();
  const {
    loading,
    pagination,
    filters,
    setPagination,
    setFilters,
    fetchCustomers,
    filteredAndSortedCustomers
  } = useCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, [pagination.currentPage, pagination.itemsPerPage]);

  const handlePageChange = (event, newPage) => {
    setPagination({ currentPage: newPage + 1 });
  };

  const handleRowsPerPageChange = (event) => {
    setPagination({
      itemsPerPage: parseInt(event.target.value, 10),
      currentPage: 1
    });
  };

  const handleSearchChange = (event) => {
    setFilters({ ...filters, search: event.target.value });
  };

  const handleStatusChange = (event) => {
    setFilters({ ...filters, status: event.target.value });
  };

  const handleSortChange = (event) => {
    setFilters({ ...filters, sortBy: event.target.value });
  };

  const handleDateRangeChange = (newRange) => {
    setFilters({ ...filters, dateRange: newRange });
  };

  return (
    <Box>
      <Card>
        {/* Filters Section */}
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
              <TextField
                fullWidth
                label="Search"
                value={filters.search}
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="blocked">Blocked</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={filters.sortBy}
                  onChange={handleSortChange}
                >
                  <MenuItem value="name-asc">Name (A-Z)</MenuItem>
                  <MenuItem value="name-desc">Name (Z-A)</MenuItem>
                  <MenuItem value="createdAt-desc">Newest First</MenuItem>
                  <MenuItem value="createdAt-asc">Oldest First</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <DateRangePicker
                startText="From Date"
                endText="To Date"
                value={filters.dateRange}
                onChange={handleDateRangeChange}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </>
                )}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Table Section */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedCustomers().map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.status}</TableCell>
                    <TableCell>
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button sx={{ marginRight: '10px', backgroundColor: '#0d6efd', color: 'white' }} onClick={() => navigate(`/customers/${customer._id}`)}>View</Button>
                      <Button sx={{ marginRight: '10px', backgroundColor: 'red', color: 'white' }}>Block</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section */}
        <TablePagination
          component="div"
          count={pagination.totalItems}
          page={pagination.currentPage - 1}
          onPageChange={handlePageChange}
          rowsPerPage={pagination.itemsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Card>
    </Box>
  );
};

export default CustomerList;