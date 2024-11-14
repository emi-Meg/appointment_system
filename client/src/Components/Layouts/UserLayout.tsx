import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  InputLabel,
  Menu,
  Stack,
  styled,
  TextField,
  Typography,
  Link as MUILink,
} from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import smct from "../../Assets/Images/smct_group.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger, faSquareFacebook, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import shopee from '../../Assets/Svg/icons8-shopee.svg';
import lazada from '../../Assets/Svg/icons8-lazada.svg';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: "#0033A0",
  boxShadow: theme.shadows[1],
  padding: "20px 24px",
}));

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {"Copyright © "}
      <MUILink
        color="text.secondary"
        href="https://strongmotocentrum.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        SMCT Group of Companies
      </MUILink>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

const UserLayout: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSettings = Boolean(anchorEl);
  const navigate = useNavigate();

  const navItems = [
    { path: "home", label: "Home" },
    { path: "aboutservices", label: "Services" },
    { path: "mybookings", label: "My Bookings" },
    { path: "support", label: "Support" },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout");
      console.log(response.data.message);
      localStorage.removeItem("token");
      navigate("/signin");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          width: "100%",
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
        }}
      >
        <Box
          sx={{
            width: "100%",
            margin: "0 auto",
          }}
        >
          <StyledToolbar variant="dense" disableGutters>
            <Box
              sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingLeft: "20px",
                  width: "100%",
                }}
              >
                <div>
                  <Typography>
                    Hello, Noreen <br />
                    <strong>Manage Your Appointments</strong>
                  </Typography>
                </div>
                <div>
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      style={({ isActive }) => ({
                        color: isActive ? "#FFD700" : "white",
                        marginRight: "20px",
                      })}
                    >
                      <Button variant="text" sx={{ color: "inherit" }}>
                        {item.label}
                      </Button>
                    </NavLink>
                  ))}
                  <Button
                    variant="text"
                    sx={{ minWidth: 0, color: "white", marginRight: "20px" }}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    Settings
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openSettings}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <RouterLink to="profile">
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </RouterLink>
                    <MenuItem onClick={handleClose}>Notifications</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              </Box>
            </Box>
            <Box
              sx={{
                display: { sm: "flex", md: "none" },
              }}
            >
              <div>
                <div className="flex flex-row sm:gap-80 gap-10 justify-between">
                  <div>
                    <Typography>
                      Hello, Noreen <br />
                      <strong>Manage Your Appointments</strong>
                    </Typography>
                  </div>
                  <div>
                    <IconButton
                      aria-label="Menu button"
                      onClick={toggleDrawer(true)}
                    >
                      <MenuIcon sx={{ color: "white" }} />
                    </IconButton>
                  </div>
                </div>
                <Drawer
                  anchor="right"
                  open={open}
                  onClose={toggleDrawer(false)}
                >
                  <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <IconButton onClick={toggleDrawer(false)}>
                        <CloseRoundedIcon />
                      </IconButton>
                    </Box>
                    <Divider sx={{ my: 3 }} />
                    <RouterLink to="home">
                      <MenuItem>Home</MenuItem>
                    </RouterLink>
                    <RouterLink to="aboutservices">
                      <MenuItem>Services</MenuItem>
                    </RouterLink>
                    <RouterLink to="mybookings">
                      <MenuItem>My Bookings</MenuItem>
                    </RouterLink>
                    <RouterLink to="support">
                      <MenuItem>Support</MenuItem>
                    </RouterLink>
                    <MenuItem
                      component="button"
                      onClick={(event) =>
                        handleClick(
                          event as React.MouseEvent<HTMLButtonElement>
                        )
                      }
                    >
                      Settings
                    </MenuItem>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openSettings}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <RouterLink to="profile">
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                      </RouterLink>
                      <MenuItem onClick={handleClose}>Notifications</MenuItem>
                      <Divider />
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </Box>
                </Drawer>
              </div>
            </Box>
          </StyledToolbar>
        </Box>
      </AppBar>
      <div>
        <Outlet />
      </div>
      <div className="w-full">
        <Divider
          sx={{
            marginTop: "200px",
          }}
        />
        <Box
          sx={{
            width: "100%",
            bgcolor: "#0033A0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 4, sm: 8 },
            py: { xs: 5, sm: 6 },
            textAlign: { xs: "center", sm: "left" },
            px: { xs: 8, sm: 3, lg: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                minWidth: { xs: "100%", sm: "60%" },
              }}
            >
              <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
                <img src={smct} alt="Logo" style={{ width: "200px" }} />
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontWeight: 600, mt: 2, color: "white" }}
                >
                  Join the newsletter
                </Typography>
                <Typography variant="body2" sx={{ color: "white", mb: 2 }}>
                  Subscribe for weekly updates. No spams ever!
                </Typography>
                <InputLabel htmlFor="email-newsletter" sx={{ color: "white" }}>
                  Email
                </InputLabel>
                <Stack direction="row" spacing={1} useFlexGap>
                  <TextField
                    id="email-newsletter"
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    fullWidth
                    aria-label="Enter your email address"
                    placeholder="Your email address"
                    slotProps={{
                      htmlInput: {
                        autoComplete: "off",
                        "aria-label": "Enter your email address",
                      },
                    }}
                    sx={{
                      width: "250px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                        opacity: 1,
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ flexShrink: 0, backgroundColor: "#FF6600" }}
                  >
                    Subscribe
                  </Button>
                </Stack>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
                gap: 1
              }}>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    color="white"
                  />
                  <p className="text-white text-sm text-left">Alano Corner Jamisola St.,Pagadian City</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} color="white" />
                  <p className="text-white text-sm text-left">info@strongmotocentrum.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPhone} color="white" />
                  <p className="text-white text-sm text-left">(+63) 970 192 9564</p>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faFacebookMessenger}
                    color="white"
                  />
                  <p className="text-white text-sm text-left">Strong Moto Centrum Chat</p>
                </div>
              </div>
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Product
              </Typography>
              <MUILink variant="body2" href="#" sx={{ color: "white" }}>
                Features
              </MUILink>
              <MUILink
                color="text.secondary"
                variant="body2"
                href="#"
                sx={{ color: "white" }}
              >
                Testimonials
              </MUILink>
              <MUILink
                color="text.secondary"
                variant="body2"
                href="#"
                sx={{ color: "white" }}
              >
                Highlights
              </MUILink>
              <MUILink
                color="text.secondary"
                variant="body2"
                href="#"
                sx={{ color: "white" }}
              >
                Pricing
              </MUILink>
              <MUILink
                color="text.secondary"
                variant="body2"
                href="/user/faqs"
                sx={{ color: "white" }}
              >
                FAQs
              </MUILink>
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Company
              </Typography>
              <MUILink
                color="text.secondary"
                variant="body2"
                href="/user/about-us"
                sx={{ color: "white" }}
              >
                About us
              </MUILink>
              <MUILink
                color="text.secondary"
                variant="body2"
                href="https://strongmotocentrum.com/career-2/"
                sx={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Careers
              </MUILink>
              <MUILink
                color="text.secondary"
                variant="body2"
                href="home"
                sx={{ color: "white" }}
              >
                Press
              </MUILink>
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Legal
              </Typography>
              <MUILink
                color="text.secondary"
                variant="body2"
                href="terms-of-service"
                sx={{ color: "white" }}
              >
                Terms
              </MUILink>
              <MUILink
                color="text.secondary"
                variant="body2"
                href="privacy-policy"
                sx={{ color: "white" }}
              >
                Privacy
              </MUILink>
              <MUILink
                color="text.secondary"
                variant="body2"
                href="support"
                sx={{ color: "white" }}
              >
                Contact
              </MUILink>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            width: "100%",
            bgcolor: "#F5F5F5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 4, sm: 8 },
            py: { xs: 5, sm: 10 },
            textAlign: { sm: "center", md: "left" },
            px: {xs: 3},
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <MUILink
                color="text.secondary"
                variant="body2"
                href="privacy-policy"
              >
                Privacy Policy
              </MUILink>
              <Typography sx={{ display: "inline", mx: 0.5, opacity: 0.5 }}>
                &nbsp;•&nbsp;
              </Typography>
              <MUILink
                color="text.secondary"
                variant="body2"
                href="terms-of-service"
              >
                Terms of Service
              </MUILink>
              <Copyright />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start lg:space-x-10">
            <div className="flex flex-col items-center">
              <p className="text-xs font-thin">Social Accounts</p>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ justifyContent: "left", color: "text.secondary" }}
            >
              <IconButton
                color="inherit"
                size="small"
                href="https://www.facebook.com/StrongMotoCentrumInc/"
                aria-label="Facebook"
                sx={{ alignSelf: "center" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faSquareFacebook} size="lg"/>
              </IconButton>
              <IconButton
                color="inherit"
                size="small"
                href="https://www.youtube.com/@strongmotocentrum"
                aria-label="X"
                sx={{ alignSelf: "center" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} size="lg"/>
              </IconButton>
              <IconButton
                color="inherit"
                size="small"
                href="https://www.linkedin.com/company/mui/"
                aria-label="LinkedIn"
                sx={{ alignSelf: "center" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTiktok} size="lg"/>
              </IconButton>
            </Stack>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-thin">Shop Accounts</p>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ justifyContent: "left", color: "text.secondary" }}
            >
              <IconButton
                color="inherit"
                size="small"
                href="https://shopee.ph/shop/1069644030"
                aria-label="Facebook"
                sx={{ alignSelf: "center" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={shopee} alt="Shopee" />
              </IconButton>
              <IconButton
                color="inherit"
                size="small"
                href="https://lazada.com.ph/shop/strong-motorcyle-parts-supply"
                aria-label="X"
                sx={{ alignSelf: "center" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={lazada} alt="Lazada" />
              </IconButton>
            </Stack>
            </div>
            </div>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default UserLayout;
