import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import image from "../../assets/Signuimage/image1.png";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await api.post("/login_user", formData);

      sessionStorage.setItem("userId", response.data.data.userid);
      sessionStorage.setItem("username", response.data.data.username);

      sessionStorage.setItem("access", response.data.data.access);
      sessionStorage.setItem("refresh", response.data.data.refresh);

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Login Failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100vw",
        boxSizing: "border-box",
        background: "#f7f7f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflowX: "hidden",
        overflowY: "auto",
        px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
        py: { xs: 4, sm: 5, md: 0 },
      }}
    >
      {/* Background Circle */}
      <Box
        sx={{
          position: "absolute",
          left: {
            xs: "-90px",
            sm: "-110px",
            md: "-120px",
            lg: "-140px",
            xl: "-160px",
          },
          bottom: {
            xs: "-90px",
            sm: "-110px",
            md: "-120px",
            lg: "-140px",
            xl: "-160px",
          },
          width: { xs: 160, sm: 240, md: 350, lg: 420, xl: 480 },
          height: { xs: 160, sm: 240, md: 350, lg: 420, xl: 480 },
          borderRadius: "50%",
          background: "linear-gradient(135deg,#d500f9,#7c4dff)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          right: {
            xs: "-90px",
            sm: "-110px",
            md: "-120px",
            lg: "-140px",
            xl: "-160px",
          },
          top: {
            xs: "-90px",
            sm: "-110px",
            md: "-120px",
            lg: "-140px",
            xl: "-160px",
          },
          width: { xs: 160, sm: 240, md: 350, lg: 420, xl: 480 },
          height: { xs: 160, sm: 240, md: 350, lg: 420, xl: 480 },
          borderRadius: "50%",
          background: "linear-gradient(135deg,#d500f9,#7c4dff)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <Paper
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: "520px",
            md: "850px",
            lg: "1000px",
            xl: "1100px",
          },
          minHeight: { xs: "auto", md: "600px", lg: "650px", xl: "700px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
          borderRadius: { xs: "20px", sm: "24px", md: "30px" },
          boxShadow: "0px 20px 50px rgba(0,0,0,0.15)",
          position: "relative",
          zIndex: 0,
          boxSizing: "border-box",
        }}
      >
        {/* LEFT IMAGE */}
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(180deg,#f8f0ff,#fff)",
            p: { xs: 2, sm: 3, md: 3, lg: 4 },
            boxSizing: "border-box",
          }}
        >
          <Box
            component="img"
            src={image}
            alt="login"
            sx={{
              width: { xs: "180px", sm: "260px", md: "100%" },
              maxWidth: {
                xs: "220px",
                sm: "320px",
                md: "360px",
                lg: "400px",
                xl: "440px",
              },
              transition: "0.4s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>

        {/* RIGHT FORM */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: { xs: "100%", md: "55%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 3, sm: 4, md: 5, lg: 6, xl: 7 },
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "28px",
                sm: "34px",
                md: "40px",
                lg: "44px",
                xl: "48px",
              },
              mb: 1,
            }}
          >
            LOGIN
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: { xs: 3, sm: 4 },
              textAlign: "center",
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
            }}
          >
            Welcome back! Sign in to continue
          </Typography>

          {/*
                        IMPORTANT: width is a PERCENTAGE and should be the ONLY
                        sizing rule here. Do NOT add px/pr/padding on top of a
                        percentage width — with default box-sizing:content-box,
                        padding ADDS to the width instead of being absorbed
                        inside it, which pushes this box past its parent and
                        causes the right-edge overflow seen on mobile.
                        boxSizing: "border-box" below is a safety net so this
                        never happens again even if padding is added later.
                    */}
          <Box
            sx={{
              width: { xs: "100%", sm: "85%", md: "100%" },
              maxWidth: "420px",
              boxSizing: "border-box",
            }}
          >
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/*
                            Button: use ONLY `fullWidth` for sizing.
                            Don't also set a conflicting `width` in sx, and
                            don't add an onClick navigate here — type="submit"
                            already triggers handleSubmit, which navigates on
                            success. An extra onClick would fire navigate("/login")
                            immediately and skip the actual login request.
                        */}
            <Button
              fullWidth
              type="submit"
              sx={{
                mt: 3,
                height: { xs: "44px", sm: "46px", md: "48px" },
                borderRadius: "30px",
                color: "white",
                fontWeight: "bold",
                fontSize: { xs: "14px", md: "15px" },
                background: "linear-gradient(90deg,#7b2ff7,#2196f3)",
                "&:hover": {
                  background: "linear-gradient(90deg,#6a1fb7,#1976d2)",
                },
              }}
            >
              LOGIN
            </Button>

            <Typography
              sx={{
                mt: 3,
                textAlign: "center",
                cursor: "pointer",
                color: "#2196f3",
                fontWeight: 600,
                fontSize: { xs: "13px", sm: "14px" },
              }}
              onClick={() => navigate("/")}
            >
              Create New Account →
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
