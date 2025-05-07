// src/features/products/components/TopProducts.jsx
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import React from 'react';
import useProductStore from '../stores/productStore';

const TopProducts = () => {
  const { products } = useProductStore();

  // Sort products by sales and get top 5
  const topProducts = [...products]
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 5);

  return (
    <List>
      {topProducts.map((product) => (
        <ListItem
          key={product._id}
          alignItems="flex-start"
          sx={{ px: 0 }}
        >
          <ListItemAvatar>
            <Avatar
              variant="square"
              src={product.image}
              alt={product.title}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.title}
            secondary={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 1
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="success.main">
                  {product.totalSales} sales
                </Typography>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TopProducts;