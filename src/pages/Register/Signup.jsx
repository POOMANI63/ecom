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
    const navigate = useNavigate();

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
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 4, sm: 4, md: 0 },
            }}
        >
            {/* Purple Circles - Responsive (decorative, page-level) */}
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
                    pointerEvents: "none",
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
                    pointerEvents: "none",
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
                    pointerEvents: "none",
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
                    boxShadow: "0px 15px 30px rgba(0,0,0,0.15)",
                    mx: { xs: 0, sm: 2 },
                    my: { xs: 2, sm: 6 },
                    zIndex: 1,
                }}
            >
                {/*
                    Login link — anchored to THIS Paper (which is
                    position:"relative"), not the page. top/right are now
                    small fixed offsets from the card's own corner, so this
                    never drifts or overlaps content no matter the viewport
                    height or breakpoint. zIndex higher than the image (2)
                    and form content so it always stays clickable on top.
                */}
                <Typography
                    onClick={() => navigate('/login')}
                    sx={{
                        position: "absolute",
                        top: { xs: 12, sm: 16, md: 20, lg: 24 },
                        right: { xs: 12, sm: 16, md: 24, lg: 28 },
                        color: { xs: "#fff", md: "#2196f3" },
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: { xs: "13px", sm: "14px", md: "15px", lg: "16px" },
                        zIndex: 10,
                        background: { xs: "linear-gradient(90deg,#7b2ff7,#2196f3)", md: "transparent" },
                        padding: { xs: "6px 14px", md: "0" },
                        borderRadius: { xs: "20px", md: "0" },
                        boxShadow: { xs: "0 2px 8px rgba(0,0,0,0.25)", md: "none" },
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                >
                    Login →
                </Typography>

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
                        alignItems: "center",
                        boxSizing: "border-box",
                    }}
                >
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: "28px", sm: "36px", md: "45px" },
                            mb: { xs: 1, sm: 2, md: 3 },
                            textAlign: { xs: "center", md: "left" },
                            width: { xs: "80%", sm: "80%", md: "100%" },
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
                            width: { xs: "80%", sm: "80%", md: "100%" },
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
                        sx={{ mb: 2, width: { xs: "80%", sm: "80%", md: "100%" } }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2, width: { xs: "80%", sm: "80%", md: "100%" } }}
                    />
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2, width: { xs: "80%", sm: "80%", md: "100%" } }}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2, width: { xs: "80%", sm: "80%", md: "100%" } }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2, width: { xs: "80%", sm: "80%", md: "100%" } }}
                    />

                    <TextField
                        select
                        fullWidth
                        label="Role"
                        name="roles"
                        value={formData.roles}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2, width: { xs: "80%", sm: "80%", md: "100%" } }}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>

                    {/*
                        SIGNUP button — use ONLY `fullWidth` (which already
                        respects the parent's width) instead of also setting
                        a conflicting sx width. The old width:{xs:"20%"} made
                        the button tiny on mobile and fought with fullWidth.
                        Wrapping it in a Box with the same 80%/100% width as
                        the inputs above keeps it visually aligned with them.
                    */}
                    <Box sx={{ width: { xs: "80%", sm: "80%", md: "100%" }, mt: { xs: 2, sm: 2.5, md: 3 } }}>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                height: { xs: "40px", sm: "42px", md: "45px" },
                                borderRadius: "25px",
                                color: "white",
                                fontWeight: "bold",
                                background: "linear-gradient(90deg,#7b2ff7,#2196f3)",
                                fontSize: { xs: "14px", sm: "16px" },
                                "&:hover": {
                                    background: "linear-gradient(90deg,#6a1fb7,#1976d2)",
                                },
                            }}
                        >
                            SIGNUP →
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
