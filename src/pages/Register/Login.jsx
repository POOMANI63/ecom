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
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from '../../services/api'

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
            const response = await api.post(
                "/login_user",
                formData
            );

            localStorage.setItem("userId", response.data.data.id);
            localStorage.setItem("username", response.data.data.username);

            localStorage.setItem("access", response.data.data.access);
            localStorage.setItem("refresh", response.data.data.refresh);

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
                background: "#f7f7f7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                px: { xs: 2, sm: 3, md: 4 },
            }}
        >
            {/* Background Circle */}
            <Box
                sx={{
                    position: "absolute",
                    left: "-120px",
                    bottom: "-120px",
                    width: { xs: 220, sm: 300, md: 450 },
                    height: { xs: 220, sm: 300, md: 450 },
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#d500f9,#7c4dff)",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    right: "-120px",
                    top: "-120px",
                    width: { xs: 220, sm: 300, md: 450 },
                    height: { xs: 220, sm: 300, md: 450 },
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#d500f9,#7c4dff)",
                }}
            />

            <Paper
                sx={{
                    width: "100%",
                    maxWidth: "1000px",
                    minHeight: { xs: "auto", md: "650px" },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    overflow: "hidden",
                    borderRadius: "30px",
                    boxShadow: "0px 20px 50px rgba(0,0,0,0.15)",
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
                        p: 3,
                    }}
                >
                    <Box
                        component="img"
                        src={image}
                        alt="login"
                        sx={{
                            width: { xs: "250px", sm: "320px", md: "100%" },
                            maxWidth: "400px",
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
                        p: { xs: 3, sm: 4, md: 6 },
                    }}
                >
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: "32px", sm: "40px", md: "48px" },
                            mb: 1,
                        }}
                    >
                        LOGIN
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{
                            mb: 4,
                            textAlign: "center",
                        }}
                    >
                        Welcome back! Sign in to continue
                    </Typography>

                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "420px",
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
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                mt: 3,
                                height: "48px",
                                borderRadius: "30px",
                                color: "white",
                                fontWeight: "bold",
                                background:
                                    "linear-gradient(90deg,#7b2ff7,#2196f3)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(90deg,#6a1fb7,#1976d2)",
                                },
                            }}
                            onClick={() => { navigate("/login") }}
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