import  { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, CardMedia, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    try {
      const response = await api.post("/fetch_one_product_details", {
        id: Number(id),
      });

      console.log("API Response:", response.data);

      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        setProduct(response.data.data[0]);
      }
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const userId = sessionStorage.getItem("userId");

      const payload = {
        user_id: Number(userId),
        product_id: Number(product.id),
        quantity: quantity,
        price: Number(product.price),
      };

      const response = await api.post("/add_to_cart", payload);

      console.log(response.data);

      toast.success("Product Added To Cart");
      navigate("/cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Add Cart");
    }
  };

  if (!product) {
    return (
      <Typography
        sx={{
          textAlign: "center",
          mt: 10,
          fontSize: "24px",
        }}
      >
        Loading...
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f1f3f6",
        minHeight: "100vh",
        p: { xs: 1.5, sm: 2, md: 3, lg: 4, xl: 4 },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3, md: 4, lg: 4, xl: 4 },
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        <Grid container spacing={{ xs: 3, sm: 4, md: 5, lg: 5, xl: 6 }}>
          {/* IMAGE SECTION — smaller, balanced */}
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#fff",
                p: { xs: 2, sm: 2.5, md: 2.5, lg: 3, xl: 3 },
                maxWidth: { xs: "100%", sm: 380, md: "100%" },
                mx: { xs: "auto", md: 0 },
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.product_name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-image.png";
                }}
                sx={{
                  width: "100%",
                  height: {
                    xs: 260,
                    sm: 300,
                    md: 320,
                    lg: 340,
                    xl: 360,
                  },
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* QUANTITY SELECTOR */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 2,
                mt: 3,
                mb: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                sx={{ minWidth: 44 }}
              >
                -
              </Button>

              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {quantity}
              </Typography>

              <Button
                variant="outlined"
                onClick={() => setQuantity((prev) => prev + 1)}
                sx={{ minWidth: 44 }}
              >
                +
              </Button>
            </Box>

            {/* ACTION BUTTONS */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mt: 2,
                maxWidth: { xs: "100%", sm: 380, md: "100%" },
                mx: { xs: "auto", md: 0 },
              }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddToCart}
                sx={{
                  backgroundColor: "#ff9f00",
                  py: { xs: 1.4, sm: 1.6, md: 1.8 },
                  fontWeight: "bold",
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                }}
              >
                ADD TO CART
              </Button>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#fb641b",
                  py: { xs: 1.4, sm: 1.6, md: 1.8 },
                  fontWeight: "bold",
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                }}
              >
                BUY NOW
              </Button>
            </Box>
          </Grid>

          {/* DETAILS SECTION — gets more room now */}
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "22px", sm: "26px", md: "30px", lg: "34px" },
                mb: 2,
              }}
            >
              {product.product_name}
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "#388e3c",
                color: "#fff",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                mb: 2,
                fontSize: { xs: "13px", sm: "14px" },
              }}
            >
              ★ 4.5
            </Box>

            <Typography
              sx={{
                fontSize: { xs: "26px", sm: "30px", md: "34px", lg: "36px" },
                fontWeight: "bold",
                color: "#212121",
                mb: 1,
              }}
            >
              ₹ {product.price}
            </Typography>

            <Typography
              sx={{
                color: "#388e3c",
                fontWeight: 600,
                mb: 3,
                fontSize: { xs: "13px", sm: "14px", md: "15px" },
              }}
            >
              20% Off | Special Price
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "16px", sm: "17px", md: "18px" },
              }}
            >
              Description
            </Typography>

            <Typography
              sx={{
                color: "#555",
                lineHeight: 1.8,
                mb: 4,
                fontSize: { xs: "13px", sm: "14px", md: "15px" },
              }}
            >
              {product.description}
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "16px", sm: "17px", md: "18px" },
              }}
            >
              Available Offers
            </Typography>

            <Typography sx={{ mb: 1, fontSize: { xs: "13px", sm: "14px" } }}>
              ✔ Bank Offer - 10% Instant Discount
            </Typography>

            <Typography sx={{ mb: 1, fontSize: { xs: "13px", sm: "14px" } }}>
              ✔ Free Delivery Available
            </Typography>

            <Typography sx={{ mb: 1, fontSize: { xs: "13px", sm: "14px" } }}>
              ✔ Cash On Delivery Available
            </Typography>

            <Typography sx={{ mb: 3, fontSize: { xs: "13px", sm: "14px" } }}>
              ✔ 7 Days Replacement Policy
            </Typography>

            <Typography
              sx={{
                color: "#388e3c",
                fontWeight: "bold",
                fontSize: { xs: "15px", sm: "16px", md: "18px" },
              }}
            >
              In Stock
            </Typography>

            <Typography
              sx={{
                color: "#666",
                mt: 1,
                fontSize: { xs: "13px", sm: "14px" },
              }}
            >
              Delivery within 3 - 5 business days
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetails;
