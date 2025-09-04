import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import QuizIcon from "@mui/icons-material/Quiz";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Fab } from "@mui/material";
import { useCart } from "./Context/CreateContext";
import { getUser } from "../API/UserAPI";
import { jwtDecode } from "jwt-decode";
const drawerWidth = 240;
const navItems = [
  { label: "CounterApp", path: "/counter", icon: <AddCircleIcon /> },
  { label: "Bikes", path: "/greet", icon: <TwoWheelerIcon /> },
  { label: "useEffect", path: "/effect", icon: <BlurOnIcon /> },
  { label: "useRef", path: "/ref", icon: <RefreshIcon /> },
  { label: "To-Do-App", path: "/to-do", icon: <PlaylistAddIcon /> },
  { label: "FAQ", path: "/faq", icon: <QuizIcon /> },
];

const Appbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showScroll, setShowScroll] = useState(false);
  const [userName, setUserName] = useState(null);
  const topRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const UserId = decoded.id;
      getUser(UserId)
        .then((res) => {
          const { FirstName, LastName} = res.data;
          setUserName(`${FirstName} ${LastName}`);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behaviour: "smooth" });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    if (cartItems.length > 0) {
      navigate("/cartpage");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAnchorEl(null);
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile")
  }
  // List of drawer items
  const drawer = (
    <Box sx={{ textAlign: "center" }} onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                textAlign: "center",
                backgroundColor:
                  location.pathname === item.path
                    ? "rgba(0,0,0,0.1)"
                    : "transparent",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: "#000",
                  color: "#fff",
                  transform: "translateX(5px)",
                },
              }}
            >
              {item.icon && (
                <Box sx={{ maxWidth: 36, color: "inherit" }}>{item.icon}</Box>
              )}
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box ref={topRef} sx={{ flexGrow: 1, marginTop: "80px" }}>
      <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Menu Icon */}
          <IconButton
            edge="start"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            Dashboard Menu
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: "#fff",
                  borderBottom:
                    location.pathname === item.path
                      ? "2px solid white"
                      : "none",
                  borderRadius: 0,
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Cart Section */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleNavigate}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
            <Typography>Cart</Typography>
          </Box>

          {/* ProfileSection */}
          <IconButton
            size="large"
            onClick={handleMenu}
            sx={{ color: "white", gap: 1 }}
          >
            <AccountCircleIcon />
            <Typography>{userName}</Typography>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      {/* <ResponsiveGrid/>  */}

      {showScroll && (
        <Fab
          color="primary"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "black",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </Box>
  );
};

export default Appbar;
