import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import axios from "axios";
import api from "../../services/api"

const ProductAdd = () => {
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        category: "",
        product_name: "",
        description: "",
        price: "",
        stock: "",
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get(
                "/fetch_all_categories",
            );

            setCategories(response.data.data);
        } catch (error) {
            console.log("Category Fetch Error:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("category", formData.category);
        data.append("product_name", formData.product_name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("stock", formData.stock);

        if (image) {
            data.append("image", image);
        }

        try {
            const response = await api.post(
                "/create_product",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);
            alert("Product Added Successfully");

            setFormData({
                category: "",
                product_name: "",
                description: "",
                price: "",
                stock: "",
            });

            setImage(null);
        } catch (error) {
            console.log("Product Add Error:", error.response?.data);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                maxWidth: 600,
                mx: "auto",
                mt: 5,
                p: 4,
                borderRadius: 3,
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    textAlign: "center",
                }}
            >
                Add Product
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>

                    <Select
                        name="category"
                        value={formData.category}
                        label="Category"
                        onChange={handleChange}
                    >
                        {categories.map((cat) => (
                            <MenuItem
                                key={cat.id}
                                value={cat.id}
                            >
                                {cat.category_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Product Name"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                />

                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    fullWidth
                />

                <Box
                    component="label"
                    sx={{
                        border: "2px dashed #ccc",
                        borderRadius: "10px",
                        p: 3,
                        textAlign: "center",
                        cursor: "pointer",
                    }}
                >
                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <Typography variant="h6">
                        Click to Upload Product Image
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        JPG, PNG files only
                    </Typography>
                </Box>

                {image && (
                    <Box sx={{ mt: 2 }}>
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            width="200"
                            style={{
                                borderRadius: "10px",
                            }}
                        />
                    </Box>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                >
                    Add Product
                </Button>
            </Box>
        </Paper>
    );
};

export default ProductAdd;