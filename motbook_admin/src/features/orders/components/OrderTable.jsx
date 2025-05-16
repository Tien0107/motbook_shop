import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useOrderStore } from '../stores/orderStore'

const OrderTable = () => {
    const { orders, loading } = useOrderStore()

    const columns = [
        { field: 'id', headerName: 'Order ID', width: 130 },
        { field: 'customer', headerName: 'Customer', width: 200 },
        { field: 'total', headerName: 'Total', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 }
    ]

    return (
        <DataGrid
            rows={orders}
            columns={columns}
            loading={loading}
            autoHeight
        />
    )
}

export default OrderTable;