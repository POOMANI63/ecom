import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Divider,
    Button,
    CircularProgress,
    Stack,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null); 
    const navigate = useNavigate();

    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/get_my_orders?user_id=${userId}`);
            setOrders(res.data.data || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
        
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await api.post("/remove_order", { order_id: orderId });

            setOrders((prev) => prev.filter((o) => o.order_id !== orderId));
            setCancellingId(null);

            toast.success("Order cancelled");
        } catch (err) {
            console.log(err);
            toast.error("Failed to cancel order");
        }
      
    };

    if (loading) {
        return (
            <Box
                sx={{
                    background: "#f5f5f5",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress sx={{ color: "#2874f0" }} />
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, sm: 3 }, background: "#f5f5f5", minHeight: "100vh" }}>
            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: { xs: "22px", sm: "26px", md: "30px" },
                    mb: { xs: 2, sm: 3 },
                }}
            >
                My Orders
            </Typography>

            {orders.length === 0 ? (
                <Card
                    sx={{
                        textAlign: "center",
                        py: { xs: 6, md: 10 },
                        px: 3,
                        borderRadius: 3,
                    }}
                >
                    <ShoppingBagOutlinedIcon
                        sx={{ fontSize: { xs: 70, md: 90 }, color: "#bdbdbd", mb: 2 }}
                    />
                    <Typography sx={{ fontWeight: 600, fontSize: { xs: "17px", md: "20px" }, mb: 1 }}>
                        No orders yet
                    </Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: "14px", mb: 3 }}>
                        When you place an order, it'll show up here.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/products")}
                        sx={{
                            backgroundColor: "#2874f0",
                            px: 4,
                            py: 1.2,
                            fontWeight: 600,
                            "&:hover": { backgroundColor: "#1d5fc9" },
                        }}
                    >
                        Shop Now
                    </Button>
                </Card>
            ) : (
                <Grid container spacing={{ xs: 2, sm: 3 }} alignItems="stretch">
                    {orders.map((order) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={order.order_id}
                            sx={{ display: "flex" }}
                        >
                            
                            <Card
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    boxShadow: 2,
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {/* ORDER HEADER */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 2,
                                    }}
                                >
                                    <Typography fontWeight="bold">
                                        Order #{order.order_id}
                                    </Typography>

                                    <Chip
                                        label={order.status}
                                        size="small"
                                        color={
                                            order.status === "Delivered"
                                                ? "success"
                                                : order.status === "Cancelled"
                                                ? "default"
                                                : "warning"
                                        }
                                    />
                                </Box>

                                <Divider sx={{ mb: 2 }} />

                                {/* PRODUCTS LIST — flexGrow pushes everything below
                                    (divider, total, buttons) to the bottom edge */}
                                <Box sx={{ flexGrow: 1 }}>
                                    {order.products.map((item) => (
                                        <Box
                                            key={item.product_id}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mb: 2,
                                                gap: 1.5,
                                            }}
                                        >
                                            {/* IMAGE */}
                                            <CardMedia
                                                component="img"
                                                image={item.image}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/placeholder-image.png";
                                                }}
                                                sx={{
                                                    width: 60,
                                                    height: 60,
                                                    objectFit: "contain",
                                                    borderRadius: 2,
                                                    background: "#fff",
                                                    border: "1px solid #f0f0f0",
                                                    p: 0.5,
                                                    flexShrink: 0,
                                                }}
                                            />

                                            {/* DETAILS */}
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: "13.5px",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {item.product_name}
                                                </Typography>

                                                <Typography sx={{ fontSize: "12.5px", color: "text.secondary" }}>
                                                    Qty: {item.quantity}
                                                </Typography>
                                            </Box>

                                            {/* PRICE */}
                                            <Typography sx={{ fontWeight: 700, fontSize: "13.5px", whiteSpace: "nowrap" }}>
                                                ₹{item.total_price}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                {/* ORDER TOTAL */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mt: 1,
                                        mb: 2,
                                    }}
                                >
                                    <Typography fontWeight="bold" sx={{ fontSize: "14px" }}>
                                        Total Amount
                                    </Typography>

                                    <Typography fontWeight="bold" sx={{ fontSize: "14px" }}>
                                        ₹{order.total_amount}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => navigate(`/order-details/${order.order_id}`)}
                                    sx={{ mb: order.status === "Cancelled" ? 0 : 1 }}
                                >
                                    View Order Details
                                </Button>

                                {(
                                    cancellingId === order.order_id ? (
                                        <Stack direction="row" spacing={1}>
                                            <Button
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                onClick={() => setCancellingId(null)}
                                            >
                                                Keep order
                                            </Button>
                                            <Button
                                                fullWidth
                                                size="small"
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleCancelOrder(order.order_id)}
                                            >
                                                Confirm cancel
                                            </Button>
                                        </Stack>
                                    ) : (
                                        <Button
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => setCancellingId(order.order_id)}
                                        >
                                            Cancel Order
                                        </Button>
                                    )
                                )}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default Orders;