import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Grid,
  Divider,
  Chip,
  Rating,
  Stack,
  CircularProgress,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedIcon from "@mui/icons-material/Verified";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LockIcon from "@mui/icons-material/Lock";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartCount } from "../../redux/slices/cartSlice";
import api from "../../services/api";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true); 
      const userId = localStorage.getItem("userId");

      const res = await api.get("/fetch_cart_details", {
        params: { user_id: Number(userId) },
      });

      const data = res.data.data || [];
      setCart(data);

      dispatch(setCartCount(data.length));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);  
    }
  };

  const removeFromCart = async (id) => {
    try {
      await api.post("/remove_cart_item", { cart_item_id: id });

      setCart((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        dispatch(setCartCount(updated.length));
        return updated;
      });

      toast.success("Item removed from cart");
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove item");
    }
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };



  const moveBackToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setSavedItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const buyNow = async () => {
    try {
      // First update all cart quantities
      await Promise.all(
        cart.map((item) =>
          api.post("/update_cart_quantity", {
            cart_item_id: item.id,
            quantity: item.quantity,
          })
        )
      );

      // Then place order
      const userId = localStorage.getItem("userId");

      const response = await api.post("/buy_now", {
        user_id: Number(userId),
      });

      navigate("/order-success", {
        state: response.data.data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order");
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalMRP = cart.reduce(
    (acc, item) => acc + Math.round(item.price / 0.8) * item.quantity,
    0
  );

  const totalDiscount = totalMRP - totalPrice;

  // 👇 NEW — show spinner while the very first fetch is in progress
  if (loading) {
    return (
      <Box
        sx={{
          background: "#f1f3f6",
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
    <Box sx={{ background: "#f1f3f6", minHeight: "100vh", pb: { xs: 9, md: 4 } }}>
      <Box
        sx={{
          maxWidth: "1300px",
          mx: "auto",
          px: { xs: 1.5, sm: 2, md: 3, lg: 4 },
          py: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: "20px", sm: "22px", md: "26px" },
            mb: { xs: 2, md: 3 },
          }}
        >
          My Cart {cart.length > 0 && `(${totalItems} ${totalItems === 1 ? "item" : "items"})`}
        </Typography>

        {cart.length === 0 ? (
          <Card
            sx={{
              textAlign: "center",
              py: { xs: 6, md: 10 },
              px: 3,
              borderRadius: 2,
            }}
          >
            <ShoppingCartOutlinedIcon
              sx={{ fontSize: { xs: 70, md: 90 }, color: "#bdbdbd", mb: 2 }}
            />
            <Typography sx={{ fontWeight: 600, fontSize: { xs: "17px", md: "20px" }, mb: 1 }}>
              Your cart is empty!
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "14px", mb: 3 }}>
              Looks like you haven't added anything yet — let's fix that.
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
          <Grid container spacing={{ xs: 2, md: 3 }} alignItems="flex-start">
            {/* ===================== LEFT — CART ITEMS ===================== */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                {cart.map((item, index) => {
                  const mrp = Math.round(item.price / 0.8);
                  const discountPct = Math.round(((mrp - item.price) / mrp) * 100);

                  return (
                    <Box key={item.id}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          gap: 2,
                          p: { xs: 2, sm: 3 },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={`https://autopilot-elude-ungloved.ngrok-free.dev${item.image}`}
                          alt={item.product_name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-image.png";
                          }}
                          sx={{
                            width: { xs: "100%", sm: 130 },
                            height: { xs: 180, sm: 130 },
                            objectFit: "contain",
                            backgroundColor: "#fafafa",
                            border: "1px solid #f0f0f0",
                            borderRadius: 1,
                            flexShrink: 0,
                          }}
                        />

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
                            <Chip label="HOT DEAL" color="error" size="small" />
                            <Chip
                              icon={<VerifiedIcon sx={{ fontSize: 14 }} />}
                              label="Assured"
                              color="primary"
                              size="small"
                            />
                          </Stack>

                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: { xs: "14px", sm: "15px" },
                              mb: 0.5,
                            }}
                          >
                            {item.product_name}
                          </Typography>

                          <Rating value={4} size="small" readOnly sx={{ mb: 0.5 }} />

                          <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 0.5 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: { xs: "16px", sm: "18px" } }}>
                              ₹{item.price}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "12.5px",
                                color: "text.secondary",
                                textDecoration: "line-through",
                              }}
                            >
                              ₹{mrp}
                            </Typography>
                            <Typography sx={{ fontSize: "12.5px", color: "#388e3c", fontWeight: 600 }}>
                              {discountPct}% off
                            </Typography>
                          </Stack>

                          <Typography sx={{ fontSize: "12.5px", color: "text.secondary", mb: 0.5 }}>
                            Delivery by Tomorrow
                          </Typography>

                          <Stack direction="row" alignItems="center" spacing={0.6}>
                            <LocalOfferIcon sx={{ fontSize: 14, color: "#388e3c" }} />
                            <Typography sx={{ fontSize: "12.5px" }}>
                              Special price available
                            </Typography>
                          </Stack>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { xs: "stretch", sm: "flex-end" },
                            justifyContent: "space-between",
                            gap: 1.5,
                            minWidth: { sm: 150 },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 1,
                              border: "1px solid #ddd",
                              borderRadius: 2,
                              p: 0.5,
                              width: "fit-content",
                              alignSelf: { xs: "center", sm: "flex-end" },
                            }}
                          >
                            <IconButton size="small" onClick={() => updateQty(item.id, -1)}>
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ minWidth: 26, textAlign: "center", fontWeight: 600 }}>
                              {item.quantity}
                            </Typography>
                            <IconButton size="small" onClick={() => updateQty(item.id, 1)}>
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>

                          <Stack
                            direction={{ xs: "row", sm: "column" }}
                            spacing={1}
                            sx={{ width: "100%" }}
                          >
                            <Button
                              fullWidth
                              size="small"
                              variant="outlined"
                              color="error"
                              startIcon={<DeleteIcon fontSize="small" />}
                              onClick={() => removeFromCart(item.id)}
                              sx={{ fontSize: "12px" }}
                            >
                              Remove
                            </Button>
                            <Button
                              fullWidth
                              size="small"
                              variant="text"
                              startIcon={<BookmarkBorderIcon fontSize="small" />}
                              sx={{ fontSize: "12px", color: "#2874f0" }}
                            >
                              Save for later
                            </Button>
                          </Stack>
                        </Box>
                      </Box>

                      {index < cart.length - 1 && <Divider />}
                    </Box>
                  );
                })}
              </Card>

              {savedItems.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "15px", mb: 1.5 }}>
                    Saved For Later ({savedItems.length})
                  </Typography>
                  <Card sx={{ borderRadius: 2 }}>
                    {savedItems.map((item, i) => (
                      <Box key={item.id}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 2 }}>
                          <CardMedia
                            component="img"
                            image={`https://autopilot-elude-ungloved.ngrok-free.dev${item.image}`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder-image.png";
                            }}
                            sx={{
                              width: 60,
                              height: 60,
                              objectFit: "contain",
                              backgroundColor: "#fafafa",
                              borderRadius: 1,
                            }}
                          />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography sx={{ fontSize: "13.5px", fontWeight: 600 }}>
                              {item.product_name}
                            </Typography>
                            <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
                              ₹{item.price}
                            </Typography>
                          </Box>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => moveBackToCart(item)}
                            sx={{ fontSize: "11.5px", whiteSpace: "nowrap" }}
                          >
                            Move to Cart
                          </Button>
                        </Stack>
                        {i < savedItems.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </Card>
                </Box>
              )}
            </Grid>

            {/* ===================== RIGHT — PRICE DETAILS ===================== */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 2,
                  position: { md: "sticky" },
                  top: { md: 16 },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "text.secondary",
                    letterSpacing: 0.5,
                    mb: 2,
                  }}
                >
                  PRICE DETAILS
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Stack spacing={1.5}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "14px" }}>
                      Price ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>₹{totalMRP}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "14px" }}>Discount</Typography>
                    <Typography sx={{ fontSize: "14px", color: "#388e3c" }}>
                      − ₹{totalDiscount}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "14px" }}>Delivery Charges</Typography>
                    <Typography sx={{ fontSize: "14px", color: "#388e3c", fontWeight: 600 }}>
                      FREE
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                    Total Amount
                  </Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                    ₹{totalPrice}
                  </Typography>
                </Box>

                {totalDiscount > 0 && (
                  <Box
                    sx={{
                      backgroundColor: "#e8f5e9",
                      color: "#388e3c",
                      fontWeight: 600,
                      fontSize: "13px",
                      borderRadius: 1,
                      p: 1.2,
                      mb: 2,
                      textAlign: "center",
                    }}
                  >
                    You will save ₹{totalDiscount} on this order
                  </Box>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  onClick={buyNow}
                  sx={{
                    py: 1.5,
                    backgroundColor: "#fb641b",
                    fontWeight: 700,
                    fontSize: "15px",
                    boxShadow: "none",
                    "&:hover": { backgroundColor: "#e2570f" },
                  }}
                >
                  PLACE ORDER
                </Button>

                <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.6} sx={{ mt: 2 }}>
                  <LockIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                  <Typography sx={{ fontSize: "11.5px", color: "text.secondary" }}>
                    Safe and Secure Payments
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Cart;