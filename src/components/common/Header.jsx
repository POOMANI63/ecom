import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const username = localStorage.getItem("username") || "Guest";

  const cartCount = useSelector((state) => state.cart.count);

  const menuItems = [
    { label: "Home", path: "/home" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    // { label: "Contact", path: "/contact" },
  
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      {/* TOP APP BAR */}
      <AppBar position="static" sx={{ bgcolor: "white", color: "black" }}>
        <Toolbar>

          {/* MOBILE MENU ICON */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", md: "none" }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          {/* LOGO */}
          <Typography
            onClick={() => navigate("/home")}
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
              background: "linear-gradient(90deg,#d500f9,#2196f3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ECOM STORE
          </Typography>

          {/* DESKTOP MENU */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{ color: "black" }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* CART */}
          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* USERNAME (hide on small screens) */}
          <Typography
            sx={{
              ml: 2,
              mr: 1,
              fontWeight: 600,
              display: { xs: "none", sm: "block" },
            }}
          >
            {username}
          </Typography>

          {/* AVATAR */}
          <Avatar
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              bgcolor: "#7c4dff",
              cursor: "pointer",
              width: 35,
              height: 35,
            }}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>

          {/* PROFILE MENU */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => navigate("/profile")}>
              My Profile
            </MenuItem>

            <MenuItem onClick={() => navigate("/orders")}>
              Orders
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>
          <Typography sx={{ p: 2, fontWeight: "bold" }}>
            Menu
          </Typography>

          <Divider />

          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.label}
                onClick={() => handleNavigate(item.path)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}