import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Rating,
    Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/fetch_all_products");
            setProducts(response.data.data || []);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                maxWidth: "100%",
                overflowX: "hidden",
                boxSizing: "border-box",
                background:
                    "linear-gradient(135deg,#f8f5ff 0%,#eef6ff 100%)",
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 2, sm: 3, md: 4 },
            }}
        >
            {/* HEADER */}
            <Box mb={{ xs: 2, sm: 3, md: 4 }}>
                <Typography
                    sx={{
                        fontWeight: "bold",
                        color: "#7c3aed",
                        fontSize: { xs: "22px", sm: "26px", md: "34px" },
                    }}
                >
                    Explore Products
                </Typography>

                <Typography
                    sx={{
                        color: "text.secondary",
                        mt: 1,
                        fontSize: { xs: "13px", sm: "14px", md: "16px" },
                    }}
                >
                    Discover the latest products at the best prices
                </Typography>
            </Box>

            {/* PRODUCTS GRID — plain CSS grid, no MUI Grid version issues */}
            <Box
                sx={{
                    display: "grid",
                    gap: { xs: 2, sm: 3, md: 3 },
                    gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(2, 1fr)",   
                        md: "repeat(3, 1fr)",  
                        lg: "repeat(4, 1fr)",   
                    },
                    width: "100%",
                }}
            >
                {products.map((product) => (
                    <Card
                        key={product.id}
                        onClick={() => navigate(`/product/${product.id}`)}
                        sx={{
                            height: "100%",
                            width: "100%",
                            cursor: "pointer",
                            borderRadius: 3,
                            overflow: "hidden",
                            boxShadow: "0px 2px 10px rgba(0,0,0,0.08)",
                            transition: "0.3s",
                            display: "flex",
                            flexDirection: "column",
                            "&:hover": {
                                transform: "translateY(-6px)",
                                boxShadow: "0px 15px 35px rgba(124,58,237,0.20)",
                            },
                        }}
                    >
                        {/* IMAGE SECTION */}
                        <Box
                            sx={{
                                height: { xs: 180, sm: 200, md: 240 },
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background:
                                    "linear-gradient(135deg,#faf5ff,#eef6ff)",
                                p: 2,
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.product_name}
                                sx={{
                                    width: { xs: 120, sm: 150, md: 180 },
                                    height: { xs: 120, sm: 150, md: 180 },
                                    objectFit: "contain",
                                }}
                            />
                        </Box>

                        {/* CONTENT */}
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Chip
                                label="Best Seller"
                                size="small"
                                sx={{
                                    mb: 1,
                                    fontWeight: 700,
                                    fontSize: { xs: "10px", sm: "11px" },
                                    background:
                                        "linear-gradient(90deg,#d6249f,#7c3aed)",
                                    color: "#fff",
                                }}
                            />

                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: "13px", sm: "14px", md: "15px" },
                                    minHeight: { xs: 40, md: 48 },
                                    overflow: "hidden",
                                }}
                            >
                                {product.product_name}
                            </Typography>

                            {/* RATING */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mt: 1,
                                    gap: 1,
                                    flexWrap: "wrap",
                                }}
                            >
                                <Rating value={4.5} precision={0.5} size="small" readOnly />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: "11px", sm: "12px" } }}
                                >
                                    (120)
                                </Typography>
                            </Box>

                            {/* PRICE */}
                            <Typography
                                sx={{
                                    mt: 2,
                                    fontWeight: 700,
                                    color: "#374151",
                                    fontSize: { xs: "18px", sm: "20px", md: "24px" },
                                }}
                            >
                                ₹{product.price}
                            </Typography>

                            {/* DELIVERY */}
                            <Typography
                                sx={{
                                    color: "green",
                                    fontWeight: 600,
                                    mt: 0.5,
                                    fontSize: { xs: "11px", sm: "12px" },
                                }}
                            >
                                FREE Delivery
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* EMPTY STATE */}
            {products.length === 0 && (
                <Typography
                    sx={{
                        textAlign: "center",
                        mt: 6,
                        color: "text.secondary",
                        fontSize: { xs: "14px", sm: "16px" },
                    }}
                >
                    No Products Available
                </Typography>
            )}
        </Box>
    );
};

export default Products;