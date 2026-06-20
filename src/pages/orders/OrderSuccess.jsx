import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f3f6",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 5,
          textAlign: "center",
          width: 500,
          borderRadius: 3,
        }}
      >
        <CheckCircleIcon
          color="success"
          sx={{
            fontSize: 90,
            mb: 2,
          }}
        />

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Order Placed Successfully
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Your order has been confirmed and will be
          delivered soon.
        </Typography>

        <Typography
          variant="h5"
          color="success.main"
          fontWeight="bold"
          sx={{ mb: 3 }}
        >
          Total Amount ₹{order?.total_amount}
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/orders")}
        >
          View Orders
        </Button>
      </Paper>
    </Box>
  );
};

export default OrderSuccess;