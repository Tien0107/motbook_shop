// src/features/products/components/ProductCard.jsx
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography
} from '@mui/material';
import React from 'react';

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.images[0] || 'https://via.placeholder.com/300x200'}
        alt={product.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <Chip
            label={`$${product.price}`}
            color="primary"
            size="small"
          />
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            label={product.category}
            variant="outlined"
            size="small"
          />
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton
          size="small"
          color="primary"
          onClick={() => onEdit(product)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete(product._id)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}