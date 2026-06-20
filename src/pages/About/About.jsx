import React from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Button,
    Chip,
    Divider,
    Stack,
    useTheme,
    useMediaQuery,
    Paper,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const About = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));

    const features = [
        {
            icon: <ShoppingBagIcon sx={{ fontSize: 32 }} />,
            title: "Premium Products",
            description:
                "We provide high-quality products from trusted brands at affordable prices.",
            color: "#7c4dff",
        },
        {
            icon: <LocalShippingIcon sx={{ fontSize: 32 }} />,
            title: "Fast Delivery",
            description:
                "Quick and reliable shipping to ensure your orders reach on time.",
            color: "#00bcd4",
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 32 }} />,
            title: "Secure Payments",
            description:
                "Safe and encrypted payment methods for worry-free shopping.",
            color: "#4caf50",
        },
        {
            icon: <SupportAgentIcon sx={{ fontSize: 32 }} />,
            title: "24/7 Support",
            description:
                "Our customer support team is always ready to help you.",
            color: "#ff9800",
        },
    ];

    const teamMembers = [
        { name: "Sarah Johnson", role: "CEO & Founder", avatar: "SJ" },
        { name: "Michael Chen", role: "Head of Operations", avatar: "MC" },
        { name: "Emily Rodriguez", role: "Customer Experience", avatar: "ER" },
        { name: "David Kim", role: "Product Manager", avatar: "DK" },
        { name: "Lisa Thompson", role: "Marketing Lead", avatar: "LT" },
        { name: "James Wilson", role: "Tech Lead", avatar: "JW" },
    ];

    const stats = [
        { number: "10K+", label: "Happy Customers" },
        { number: "500+", label: "Products" },
        { number: "4.9★", label: "Average Rating" },
        { number: "99%", label: "Satisfaction Rate" },
    ];

    return (
        <Box sx={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
            {/* Hero Section with Modern Gradient */}
            <Box
                sx={{
                    py: { xs: 6, sm: 8, md: 12 },
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                    color: "white",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"><circle cx=\"30\" cy=\"30\" r=\"20\" fill=\"rgba(255,255,255,0.05)\"/><circle cx=\"170\" cy=\"80\" r=\"30\" fill=\"rgba(255,255,255,0.05)\"/><circle cx=\"100\" cy=\"180\" r=\"25\" fill=\"rgba(255,255,255,0.05)\"/></svg>')",
                        backgroundSize: "200px 200px",
                        opacity: 0.5,
                    },
                }}
            >
                <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
                    <Chip
                        label="✨ Welcome to Our Store"
                        sx={{
                            mb: 3,
                            bgcolor: "rgba(255,255,255,0.2)",
                            color: "white",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            fontWeight: 500,
                            "& .MuiChip-label": { px: 3 },
                        }}
                    />
                    <Typography
                        variant={isMobile ? "h4" : "h2"}
                        fontWeight="800"
                        gutterBottom
                        sx={{
                            textShadow: "0 2px 20px rgba(0,0,0,0.1)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        About Our Store
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            opacity: 0.95,
                            maxWidth: "600px",
                            mx: "auto",
                            fontWeight: 400,
                            lineHeight: 1.8,
                        }}
                    >
                        Your trusted destination for quality products,
                        secure shopping, and exceptional customer service.
                    </Typography>
                </Container>
            </Box>

            {/* Stats Section */}
            <Container maxWidth="lg" sx={{ mt: -4, mb: 6, position: "relative", zIndex: 2 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, sm: 4 },
                        borderRadius: 4,
                        background: "white",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                    }}
                >
                    <Grid container spacing={2}>
                        {stats.map((stat, index) => (
                            <Grid item xs={6} sm={3} key={index}>
                                <Box textAlign="center">
                                    <Typography
                                        variant="h5"
                                        fontWeight="800"
                                        sx={{
                                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {stat.number}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Container>

            {/* Story Section - Modern Layout */}
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Chip
                                label="Our Story"
                                sx={{
                                    mb: 2,
                                    bgcolor: "#667eea",
                                    color: "white",
                                    fontWeight: 600,
                                }}
                            />
                            <Typography
                                variant="h4"
                                fontWeight="800"
                                gutterBottom
                                sx={{ letterSpacing: "-0.02em" }}
                            >
                                Building Trust Since Day One
                            </Typography>
                            <Typography color="text.secondary" paragraph sx={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
                                We started with a simple mission: make online
                                shopping easier, faster, and more enjoyable for everyone.
                            </Typography>
                            <Typography color="text.secondary" paragraph sx={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
                                Our store offers a wide range of products with
                                excellent quality, competitive pricing, and
                                outstanding customer support that goes beyond expectations.
                            </Typography>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        px: 4,
                                        "&:hover": {
                                            transform: "translateX(8px)",
                                            transition: "transform 0.3s ease",
                                        },
                                    }}
                                >
                                    Explore Products
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 600,
                                        borderColor: "#667eea",
                                        color: "#667eea",
                                        "&:hover": {
                                            borderColor: "#764ba2",
                                            color: "#764ba2",
                                        },
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                position: "relative",
                                borderRadius: 4,
                                overflow: "hidden",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                                "&:hover": {
                                    transform: "scale(1.02)",
                                    transition: "transform 0.5s ease",
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
                                alt="about"
                                sx={{
                                    width: "100%",
                                    height: { xs: 250, sm: 350, md: 400 },
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 20,
                                    left: 20,
                                    bgcolor: "rgba(255,255,255,0.95)",
                                    backdropFilter: "blur(10px)",
                                    px: 3,
                                    py: 2,
                                    borderRadius: 3,
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <StarIcon sx={{ color: "#ffb400", fontSize: 20 }} />
                                    <StarIcon sx={{ color: "#ffb400", fontSize: 20 }} />
                                    <StarIcon sx={{ color: "#ffb400", fontSize: 20 }} />
                                    <StarIcon sx={{ color: "#ffb400", fontSize: 20 }} />
                                    <StarIcon sx={{ color: "#ffb400", fontSize: 20 }} />
                                    <Typography fontWeight={600} ml={1}>
                                        4.9/5
                                    </Typography>
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Divider sx={{ my: 6, maxWidth: "lg", mx: "auto" }} />

            {/* Features - FIXED GRID LAYOUT */}
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box textAlign="center" mb={6}>
                    <Chip
                        label="Why Choose Us"
                        sx={{
                            mb: 2,
                            bgcolor: "#667eea",
                            color: "white",
                            fontWeight: 600,
                        }}
                    />
                    <Typography
                        variant="h4"
                        fontWeight="800"
                        gutterBottom
                        sx={{ letterSpacing: "-0.02em" }}
                    >
                        What Makes Us Different
                    </Typography>
                    <Typography color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
                        We combine quality, convenience, and care to deliver the best shopping experience
                    </Typography>
                </Box>

                {/* CRITICAL FIX: Proper grid breakpoints */}
                <Grid container spacing={4}>
                    {features.map((item, index) => (
                        <Grid 
                            item 
                            xs={12}      // 1 column on mobile (full width)
                            sm={6}       // 2 columns on tablet
                            md={3}       // 4 columns on desktop
                            key={index}
                            sx={{
                                display: "flex",  // Ensures cards stretch properly
                            }}
                        >
                            <Card
                                sx={{
                                    width: "100%",  // Takes full width of grid item
                                    minHeight: 280,
                                    borderRadius: 4,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                    p: 4,
                                    background: "rgba(255,255,255,0.9)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255,255,255,0.3)",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                    "&:hover": {
                                        transform: "translateY(-12px) scale(1.02)",
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                                        border: `2px solid ${item.color}`,
                                    },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: item.color,
                                        width: 80,
                                        height: 80,
                                        mb: 3,
                                        boxShadow: `0 8px 25px ${item.color}40`,
                                    }}
                                >
                                    {item.icon}
                                </Avatar>

                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    sx={{ mb: 2 }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        lineHeight: 1.8,
                                        maxWidth: "90%",
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Divider sx={{ my: 6, maxWidth: "lg", mx: "auto" }} />

            {/* Team Section - Modern Grid Layout */}
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box textAlign="center" mb={6}>
                    <Chip
                        label="Our Team"
                        sx={{
                            mb: 2,
                            bgcolor: "#667eea",
                            color: "white",
                            fontWeight: 600,
                        }}
                    />
                    <Typography
                        variant="h4"
                        fontWeight="800"
                        gutterBottom
                        sx={{ letterSpacing: "-0.02em" }}
                    >
                        Meet the People Behind the Scenes
                    </Typography>
                    <Typography color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
                        Passionate individuals dedicated to making your experience exceptional
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {teamMembers.map((member, index) => (
                        <Grid 
                            item 
                            xs={12}      // 1 column on mobile
                            sm={6}       // 2 columns on tablet
                            md={4}       // 3 columns on desktop
                            key={index}
                            sx={{
                                display: "flex",  // Ensures cards stretch properly
                            }}
                        >
                            <Card
                                sx={{
                                    width: "100%",  // Takes full width of grid item
                                    textAlign: "center",
                                    p: 4,
                                    borderRadius: 4,
                                    background: "rgba(255,255,255,0.9)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255,255,255,0.3)",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                                    },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        mx: "auto",
                                        mb: 2,
                                        bgcolor: "#667eea",
                                        fontSize: 32,
                                        fontWeight: 600,
                                        boxShadow: "0 8px 25px rgba(102,126,234,0.3)",
                                    }}
                                >
                                    {member.avatar}
                                </Avatar>
                                <Typography variant="h6" fontWeight={700}>
                                    {member.name}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{ mb: 2, fontWeight: 500 }}
                                >
                                    {member.role}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            bgcolor: "#4caf50",
                                            display: "inline-block",
                                            mr: 1,
                                        }}
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                        Active
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box
                sx={{
                    py: { xs: 6, md: 10 },
                    mt: 6,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Container maxWidth="md">
                    <EmojiEmotionsIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
                    <Typography variant="h4" fontWeight="800" gutterBottom>
                        Ready to Start Shopping?
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, fontWeight: 400 }}>
                        Join thousands of happy customers who trust us for their shopping needs
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            bgcolor: "white",
                            color: "#667eea",
                            textTransform: "none",
                            fontWeight: 700,
                            px: 6,
                            py: 1.5,
                            "&:hover": {
                                bgcolor: "rgba(255,255,255,0.9)",
                                transform: "scale(1.05)",
                                transition: "transform 0.3s ease",
                            },
                        }}
                    >
                        Get Started
                    </Button>
                </Container>
            </Box>
        </Box>
    );
};

export default About;