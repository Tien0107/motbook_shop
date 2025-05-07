import { ArrowBack as ArrowBackIcon, Edit as EditIcon, NavigateBefore as NavigateBeforeIcon, NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function ProductDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const product = location.state?.product;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const handleEdit = (product) => {
        navigate(`/products/${id}/edit`, { state: { product } });
    };

    const handleBack = () => {
        navigate('/products');
    };

    if (!product) {
        return <Typography variant="h6" color="error">Product not found</Typography>;
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Card>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
                            Back to Products
                        </Button>
                        <Typography variant="h4" component="h1">
                            {product.title}
                        </Typography>
                        <Button variant="contained" startIcon={<EditIcon />} onClick={() => handleEdit(product)}>
                            Edit Product
                        </Button>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} direction={'column'} flexGrow={1}>
                            <Typography variant="h5" color="text.primary">
                                Category
                            </Typography>
                            <Typography variant="body1">{product.category}</Typography>

                            <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
                                Price
                            </Typography>
                            <Typography variant="body1">${product.price}</Typography>

                            <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
                                Stock
                            </Typography>
                            <Typography variant="body1">{product.stock} units</Typography>

                            <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
                                Status
                            </Typography>
                            <Chip
                                label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                color={product.stock > 0 ? 'success' : 'error'}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
                                <img
                                    src={product.images[currentImageIndex].url}
                                    alt={`${product.title} - Image ${currentImageIndex + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '8px'
                                    }}
                                />
                                {product.images.length > 1 && (
                                    <>
                                        <IconButton
                                            onClick={handlePrevImage}
                                            sx={{
                                                position: 'absolute',
                                                left: 8,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                bgcolor: 'rgba(255, 255, 255, 0.8)',
                                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
                                            }}
                                        >
                                            <NavigateBeforeIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={handleNextImage}
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                bgcolor: 'rgba(255, 255, 255, 0.8)',
                                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
                                            }}
                                        >
                                            <NavigateNextIcon />
                                        </IconButton>
                                    </>
                                )}
                            </Box>
                            {product.images.length > 1 && (
                                <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: 'center' }}>
                                    {product.images.map((_, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                bgcolor: currentImageIndex === index ? 'primary.main' : 'grey.300',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setCurrentImageIndex(index)}
                                        />
                                    ))}
                                </Stack>
                            )}
                        </Grid>


                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Product Description
                    </Typography>
                    <Typography variant="body1">{product.description}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
