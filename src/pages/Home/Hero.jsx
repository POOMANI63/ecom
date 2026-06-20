import React from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import hero from "../../assets/Signuimage/image2.png";

export default function Hero() {
    const navigate = useNavigate();
  return (
    <Box
      sx={{
        
        minHeight: "89vh",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: "center",
        justifyContent: "space-between",
        px: {
          xs: 4,
          md: 10,
        },
        background: "linear-gradient(135deg, #f3f0ff 0%, #e8f5f0 60%, #eef6ff 100%)",
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>
        <Typography
          sx={{
            color: "#7c4dff",
            fontSize: "22px",
            mb: 2,
          }}
        >
          New Collection 2026
        </Typography>

        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            fontSize:{xs:"50px"}
          }}
        >
          SHOP
          <br />
          SMARTER
        </Typography>

        <Typography
          sx={{
            my: 3,
            color: "gray",
          }}
        >
          Discover trending products and
          premium shopping experience.
        </Typography>

        <Button
          variant="contained"
          sx={{
            borderRadius: "30px",
            px: 5,
            background:
              "linear-gradient(90deg,#d500f9,#2196f3)",
          }}
          onClick={()=>{
            navigate("/products")
          }}
        >
          SHOP NOW
        </Button>
      </Box>

      <Box
        component="img"
        src={hero}
        alt="hero"
        sx={{
          width: {
            xs: "90%",
            md: "40%",
          },
          maxWidth: "500px",
        }}
      />
    </Box>
  );
}