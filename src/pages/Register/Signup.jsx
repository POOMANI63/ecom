import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/Signuimage/image1.png"
import { toast } from "react-toastify";
import api from "../../services/api"

export default function Signup() {
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const navigate=useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        roles: "user",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.username ||
            !formData.email ||
            !formData.firstname ||
            !formData.lastname ||
            !formData.password
        ) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            await api.post(
                "/create_user",
                formData
            );

            toast.success("Signup Successful!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            toast.error("Something went wrong");
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
                // py: { xs: 2, sm: 3, md: 4 },
            }}
        >
            {/* Purple Circles - Responsive */}
            <Box
                sx={{
                    position: "absolute",
                    left: "-10px",
                    bottom: { xs: "-100px", sm: "-120px", md: "-150px" },
                    width: { xs: "200px", sm: "300px", md: "450px" },
                    height: { xs: "200px", sm: "300px", md: "450px" },
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#d500f9,#7c4dff)",
                    opacity: { xs: 0.7, sm: 0.9, md: 1 },
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    right: "-10px",
                    top: { xs: "-100px", sm: "-120px", md: "-150px" },
                    width: { xs: "200px", sm: "300px", md: "450px" },
                    height: { xs: "200px", sm: "300px", md: "450px" },
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#d500f9,#7c4dff)",
                    opacity: { xs: 0.7, sm: 0.9, md: 1 },
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    right: { xs: "20px", sm: "50px", md: "100px" },
                    top: { xs: "200px", sm: "250px", md: "350px" },
                    width: { xs: "30px", sm: "40px", md: "50px" },
                    height: { xs: "30px", sm: "40px", md: "50px" },
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#d500f9,#7c4dff)",
                    display: { xs: "none", sm: "block" },
                }}
            />

            {/* Main Card */}
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: { xs: "100%", sm: "90%", md: "1000px" },
                    minHeight: { xs: "auto", sm: "600px", md: "650px" },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    borderRadius: { xs: "20px", sm: "25px", md: "30px" },
                    position: "relative",
                    overflow: "hidden",
                    alignItems: { xs: "center", md: "stretch" },
                    boxShadow: "10px 15px 30px rgba(0,0,0,1)",
                    mx: { xs: 0, sm: 2 },
                    my:{xs:2,sm:6}
                }}
            >
                {/* Left Image Area - Hidden on mobile */}
                <Box
                    sx={{
                        width: { xs: "100%", md: "45%" },
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        minHeight: { md: "650px" },
                        background: "linear-gradient(180deg, #f8f0ff, #fff)",
                    }}
                >
                    <Box
                        component="img"
                        src={image}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            zIndex: 2,
                        }}
                    />
                </Box>

                {/* Mobile Image - Shown only on mobile */}
                <Box
                    sx={{
                        display: { xs: "block", md: "none" },
                        width: "100%",
                        height: "200px",
                        overflow: "hidden",
                        background: "linear-gradient(180deg, #f8f0ff, #fff)",
                    }}
                >
                    <Box
                        component="img"
                        src={image}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>

                {/* Right Signup Form */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    sx={{
                        width: { xs: "100%", md: "55%" },
                        padding: { xs: "24px", sm: "20px", md: "50px" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems:"center"
                    }}
                >
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: "28px", sm: "36px", md: "45px" },
                            mb: { xs: 1, sm: 2, md: 3 },
                            textAlign: { xs: "center", md: "left" },
                           
                        }}
                    >
                        SIGNUP
                    </Typography>

                    <Typography
                        color="gray"
                        sx={{
                            mb: { xs: "15px", sm: "20px", md: "20px" },
                            textAlign: { xs: "center", md: "left" },
                            fontSize: { xs: "14px", sm: "16px" },
                        }}
                    >
                        Create your account
                    </Typography>

                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        size="small"
                         sx={{ mb: 2,
                            width:{xs:"80%"  ,sm:"80%"},
                            
                         }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        size="small"
                          sx={{ mb: 2,
                            width:{xs:"80%"  ,sm:"80%"},
                            
                         }}
                    />
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        size="small"
                          sx={{ mb: 2,
                            width:{xs:"80%"  ,sm:"80%"},
                            
                         }}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        size="small"
                         sx={{ mb: 2,
                            width:{xs:"80%"  ,sm:"80%"},
                            
                         }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        size="small"
                          sx={{ mb: 2,
                            width:{xs:"80%"  ,sm:"80%"},
                            
                         }}
                    />

                    <TextField
                        select
                        fullWidth
                        label="Role"
                        name="roles"
                        value={formData.roles}
                        onChange={handleChange}
                        size="small"
                         sx={{ mb: 2,
                            width:{xs:"80%"  ,sm:"80%"},
                            
                         }}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>

                    <Button
                        fullWidth
                        type="submit"
                        sx={{
                            mt: { xs: 2, sm: 2.5, md: 3 },
                            // ml:{xs:"-250px",},
                            height: { xs: "40px", sm: "42px", md: "45px" },
                            borderRadius: "25px",
                            color: "white",
                            fontWeight: "bold",
                            background: "linear-gradient(90deg,#7b2ff7,#2196f3)",
                            fontSize: { xs: "14px", sm: "16px" },
                            "&:hover": {
                                background: "linear-gradient(90deg,#6a1fb7,#1976d2)",
                            },
                             width:{xs:"20%",sm:"80%",md:"80%",lg:"80%"}
                        }}
                    >
                        SIGNUP →
                    </Button>
                </Box>
            </Paper>

            {/* Login Link */}
            <Typography
                onClick={() => { navigate('/login') }}
                sx={{
                    position: "absolute",
                    top: { xs: "670px", sm: "40px", md: "120px" },
                    right: { xs: "160px", sm: "50px", md: "340px" },
                    color: "#2196f3",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: { xs: "14px", sm: "16px" },
                    zIndex: 10,
                    background: { xs: "linear-gradient(90deg,#7b2ff7,#2196f3)", md: "transparent" },
                    padding: { xs: "8px 16px", md: "0"},
                    borderRadius: { xs: "20px", md: "0"},
                    boxShadow: { xs: "0 2px 8px rgba(0,0,0,0.1)", md: "none"},
                    "&:hover": {
                        textDecoration: "underline",
                    },
                    // color:{xs:"white",},
                    // height:{xs:"25px"},
                    // width:{xs:"12%"},
                    // pr:{xs:"13px"},
                    display :{xs:"none",sm:"block",md:"block"}
                }}
            >
                Login →
            </Typography>
        </Box>
    );
}
