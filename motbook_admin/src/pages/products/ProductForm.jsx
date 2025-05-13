import {
    Cancel as CancelIcon,
    CloudUpload as CloudUploadIcon,
    Save as SaveIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import useProductStore from '../../features/products/stores/productStore';

const categories = [
    { value: 'Văn học Việt Nam', label: 'Văn học Việt Nam' },
    { value: 'Tiểu thuyết', label: 'Tiểu thuyết' },
    { value: 'Công nghệ', label: 'Công nghệ' },
    { value: 'Trinh thám', label: 'Trinh thám' },
    { value: 'Khoa học', label: 'Khoa học' },
    { value: 'Khác', label: 'Khác' }
];

// Yup schema for validation
const schema = yup.object().shape({
    title: yup.string().required('Book title is required').min(3),
    author: yup.string().required('Author is required').min(3),
    description: yup.string().required('Description is required').min(10),
    publishYear: yup.string().required('Publish year is required'),
    category: yup.string().required('Category is required'),
    price: yup.number().required().positive().typeError('Price must be a number'),
    stock: yup.number().required().integer().min(0).typeError('Stock must be a number'),
});

export default function ProductForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const product = location.state?.product;

    const { loading, error, addProduct, updateProduct } = useProductStore();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        stock: '',
        description: '',
        publishYear: '',
        category: '',
    });

    const [files, setFiles] = useState([]); // Actual image files
    const [previews, setPreviews] = useState([]); // Previews for display
    const [errors, setErrors] = useState({});

    const [customCategory, setCustomCategory] = useState('');


    useEffect(() => {
        if (isEditMode) {

            setFormData({
                title: product.title,
                author: product.author,
                price: product.price,
                stock: product.stock,
                description: product.description,
                publishYear: product.publishYear,
                category: product.category,
            });

            // You may choose to not allow editing images in edit mode
            setPreviews(product.images);
        }
    }, [isEditMode]);

    // Update form values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'category' && value !== 'Khác') {
            setCustomCategory(''); // Reset nếu không chọn "Khác"
        }
    };

    // Handle file selection & preview
    const handleImageUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const newPreviews = selectedFiles.map((file) => {
            return {
                name: file.name,
                url: URL.createObjectURL(file),
            }
        });

        setPreviews(prev => [...prev, ...newPreviews]);
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    // Remove image
    const handleRemoveImage = (index) => {
        setPreviews(prev => prev.filter((_, i) => i !== index));
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Validate before submitting
    const validateForm = async () => {
        try {
            if (formData.category === 'Khác' && !customCategory.trim()) {
                setErrors(prev => ({ ...prev, category: 'Vui lòng nhập thể loại' }));
                return false;
            }
            await schema.validate(formData, { abortEarly: false });
            setErrors({});
            return true;
        } catch (validationErrors) {
            const formErrors = {};
            validationErrors.inner.forEach(err => {
                formErrors[err.path] = err.message;
            });
            setErrors(formErrors);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) return;

        try {
            if (isEditMode) {
                // You may need to add logic for updating images separately
                const updatedProduct = {
                    ...formData,
                    category: formData.category === 'Khác' ? customCategory : formData.category,
                    images: files.map(file => URL.createObjectURL(file)), // Mocking image URLs
                };
                await updateProduct(id, updatedProduct);
            } else {
                const form = new FormData();
                const bookDataForm = {
                    ...formData,
                    category: formData.category === 'Khác' ? customCategory : formData.category
                };
                Object.entries(bookDataForm).forEach(([key, value]) => form.append(key, value));
                files.forEach(file => form.append('images', file));

                await addProduct(form);
            }
            navigate('/products');
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    if (loading) return <Loading />;
    if (error) return <Error message={error} />;
    return (
        <Box sx={{ flexGrow: 1, p: 3 }} >
            <Grid container spacing={3} direction={'column'}>
                <Grid item xs={12} md={6} lg={4} direction={'column'}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {isEditMode ? 'Edit Book' : 'Add New Book'}
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2} direction={'column'}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            error={!!errors.title}
                                            helperText={errors.title}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Author"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleChange}
                                            error={!!errors.author}
                                            helperText={errors.author}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            error={!!errors.category}
                                            helperText={errors.category}
                                        >
                                            {categories.map(opt => (
                                                <MenuItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    {formData.category === 'Khác' && (
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Thể loại khác"
                                                value={customCategory}
                                                onChange={(e) => setCustomCategory(e.target.value)}
                                                error={!customCategory && errors.category}
                                                helperText={!customCategory && errors.category ? 'Vui lòng nhập thể loại' : ''}
                                            />
                                        </Grid>
                                    )}
                                    <Grid item xs={6} sm={3}>
                                        <TextField
                                            fullWidth
                                            label="Publish Year"
                                            name="publishYear"
                                            type="number"
                                            inputProps={{ min: 0 }}
                                            value={formData.publishYear}
                                            onChange={handleChange}
                                            error={!!errors.publishYear}
                                            helperText={errors.publishYear}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField
                                            fullWidth
                                            label="Price"
                                            name="price"
                                            type="number"
                                            inputProps={{ min: 0, step: 0.01 }}
                                            value={formData.price}
                                            onChange={handleChange}
                                            error={!!errors.price}
                                            helperText={errors.price}
                                        />
                                    </Grid>

                                    <Grid item xs={6} sm={3}>
                                        <TextField
                                            fullWidth
                                            label="Stock"
                                            name="stock"
                                            type="number"
                                            inputProps={{ min: 0 }}
                                            value={formData.stock}
                                            onChange={handleChange}
                                            error={!!errors.stock}
                                            helperText={errors.stock}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            error={!!errors.description}
                                            helperText={errors.description}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1">Preview Images</Typography>
                                        <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: 'wrap' }}>
                                            {previews.map((img, index) => (
                                                <Box key={index} sx={{ position: 'relative' }}>
                                                    <img
                                                        src={img.url}
                                                        alt={`preview-${img.name}`}
                                                        style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
                                                    />
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            position: 'absolute',
                                                            top: -8,
                                                            right: -8,
                                                            bgcolor: 'white'
                                                        }}
                                                        onClick={() => handleRemoveImage(index)}
                                                    >
                                                        <CancelIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                        </Stack>
                                        <Button
                                            component="label"
                                            variant="outlined"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload Images
                                            <input
                                                type="file"
                                                hidden
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                            <Button
                                                variant="outlined"
                                                startIcon={<CancelIcon />}
                                                onClick={() => navigate('/products')}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
                                                {isEditMode ? 'Update' : 'Save'}
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
