import React, { MouseEvent, useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Divider,
  Menu,
  MenuItem,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMessage,
  faPager,
  faToolbox,
  faUsers,
  faFileInvoice,
  faRightFromBracket,
  faBars,
  faBarsStaggered,
  faCalendarCheck,
  faCalendarDays,
  faBell,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import smct_group from "../../Assets/Images/smct_group.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import notifs from "../../Data/NotificationsData.json";
import Swal from "sweetalert2";
import { Gender } from "../../Enums/Gender";
import admin_female from "../../Assets/Svg/admin-female-profile.svg";
import admin_male from "../../Assets/Svg/admin-male-profile.svg";
import adminInfoData from "../../Data/AdminInformation.json";

const LayoutAdmin: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 481);
    setIsSmallScreen(window.innerWidth < 601);
    setIsSmallScreen(window.innerWidth < 769);
  };

  useEffect(() => {
    handleScreenSize();
    window.addEventListener("resize", handleScreenSize);
    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);

  const toggleSidebar = () => {
    setOpenSidebar((prevState) => !prevState);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    });
    // .then(
    // );
  };

  const headerMenu = [
    { name: "Profile", icon: faUser, path: "profile" },
    { name: "Notifications", icon: faBell, path: "notifications" },
  ];

  const sidebarItems = [
    { name: "Reports", icon: faFileInvoice, path: "reports" },
    { name: "Booking List", icon: faCalendarCheck, path: "booking-list" },
    { name: "Calendar", icon: faCalendarDays, path: "calendar" },
    { name: "Message", icon: faMessage, path: "message" },
    { name: "Add/Modify Pages", icon: faPager, path: "modify-pages" },
    { name: "Add/Modify Services", icon: faToolbox, path: "modify-services" },
    { name: "Users List", icon: faUsers, path: "users-list" },
    { name: "Logout", icon: faRightFromBracket, path: "logout" },
  ];

  const notifCount = notifs.filter((notif) => notif.status === "Unread").length;
  const currentPath = location.pathname.split("/").pop();

  return (
    <ThemeProvider theme={muiThemeContext}>
      <div className="flex w-full h-screen">
        {openSidebar ? (
          <div className="w-[300px] z-50 min-h-full absolute md:relative bg-[#0033A0] pt-5">
            {/* Expanded Sidebar */}
            <div className="mb-7 flex justify-end pr-8">
              {isSmallScreen && (
                <button onClick={toggleSidebar}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    color="white"
                    className="cursor-pointer text-2xl"
                  />
                </button>
              )}
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col items-center mb-8">
                <p className="text-base text-wrap text-white font-medium">
                  Hello, Admin Angeleen
                </p>
                <p className="text-base text-white font-semibold">
                  Manage All Appointments
                </p>
              </div>
              <div className="flex flex-col items-center mb-7">
                {adminInfoData.map((admin) => (
                  <Avatar
                    key={admin.id}
                    alt="User Avatar"
                    src={
                      admin.gender === Gender.Female ? admin_female : admin_male
                    }
                    sx={{
                      cursor: "pointer",
                      bgcolor: admin.gender === "Female" ? "pink" : "#B0E0E6", //#B0E0E6 for male
                      color: "black",
                      width: 100,
                      height: 100,
                    }}
                  />
                ))}
                <p className="text-base uppercase font-semibold text-white mt-1">
                  Angeleen Suarez
                </p>
                <Link to="profile">
                  <p className="text-base font-medium text-white">Profile</p>
                </Link>
              </div>
              <div className="w-full">
                <ul className="text-white">
                  {sidebarItems
                    .filter(
                      ({ name }) => name !== "Profile" && name !== "Logout"
                    )
                    .map(({ name, path }) => (
                      <Link to={path}>
                        <li
                          key={name}
                          className={`cursor-pointer block py-3 px-8 transition duration-300 ${
                            currentPath === path
                              ? "bg-[#001f3f] hover:bg-[#001f3f]"
                              : "hover:bg-blue-600"
                          }`}
                        >
                          {name}
                          {name === "Notifications" && (
                            <Badge
                              badgeContent={notifCount}
                              color="error"
                              sx={{
                                marginLeft: "15px",
                                transform: "translateY(-5px)",
                                transition: "transform 0.3s",
                              }}
                            />
                          )}
                        </li>
                      </Link>
                    ))}
                </ul>
                <Divider
                  sx={{
                    backgroundColor: "white",
                    width: "100%",
                    height: "1px",
                  }}
                />
                <div>
                  <ul className="text-white">
                    <li
                      onClick={handleLogout}
                      className="cursor-pointer hover:bg-blue-600 block px-8 py-3"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Collapsed Sidebar
          <div className="w-[80px] md:min-h-full bg-[#0033A0] pt-5 flex-col items-center hidden md:block">
            <div className="flex justify-center">
              <img
                src={smct_group}
                alt="SMCT Group of Companies Logo"
                className="w-16 mb-16 lg:mb-8"
              />
            </div>
            <div className="w-full">
              <ul>
                {sidebarItems.map(({ name, icon, path }) => (
                  <Tooltip
                    title={
                      <span className="text-xl text-white font-semibold">
                        {name}
                      </span>
                    }
                    placement="right"
                    arrow
                    key={name}
                    PopperProps={{
                      modifiers: [
                        { name: "offset", options: { offset: [0, 5] } },
                      ],
                      sx: {
                        "& .MuiTooltip-tooltip": { bgcolor: "#333333" },
                        "& .MuiTooltip-arrow": { color: "#333333" },
                      },
                    }}
                  >
                    <Link
                      key={name}
                      to={name === "Logout" ? "#" : path}
                      onClick={name === "Logout" ? handleLogout : undefined}
                    >
                      <li
                        className={`px-2 py-4 block transition duration-300 text-center text-white cursor-pointer ${
                          currentPath === path
                            ? "bg-[#001f3f] text-white"
                            : "hover:bg-blue-600"
                        }`}
                      >
                        {name === "Notifications" ? (
                          <Badge badgeContent={notifCount} color="error">
                            <FontAwesomeIcon icon={icon} className="text-2xl" />
                          </Badge>
                        ) : (
                          <FontAwesomeIcon icon={icon} className="text-2xl" />
                        )}
                      </li>
                    </Link>
                  </Tooltip>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="flex flex-col w-full h-full">
          <div className="bg-[#F5F5F5] w-full flex items-center justify-between gap-2 md:gap-0 pl-3 pr-6 py-3 shadow-lg">
            <div>
              <button onClick={toggleSidebar}>
                {openSidebar ? (
                  <FontAwesomeIcon
                    icon={faBarsStaggered}
                    color="#333"
                    className="cursor-pointer text-2xl"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faBars}
                    color="#333"
                    className="cursor-pointer text-2xl"
                  />
                )}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Typography
                color="#333"
                fontWeight={700}
                sx={{ fontSize: { lg: "20px", xs: "16" } }}
              >
                APPOINTMENT SYSTEM ADMIN PANEL
              </Typography>
              {adminInfoData.map((admin) => (
                <Avatar
                  key={admin.id}
                  alt="User Avatar"
                  src={
                    admin.gender === Gender.Female ? admin_female : admin_male
                  }
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{
                    cursor: "pointer",
                    bgcolor: admin.gender === "Female" ? "pink" : "#B0E0E6", //#B0E0E6 for male
                    color: "black",
                  }}
                />
              ))}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {headerMenu.map(({ name, path }) => (
                  <Link to={path}>
                    <MenuItem onClick={handleClose}>
                      {name}
                      {name === "Notifications" && (
                        <Badge
                          badgeContent={notifCount}
                          color="error"
                          sx={{
                            marginLeft: "15px",
                            transform: "translateY(-5px)",
                            transition: "transform 0.3s",
                          }}
                        />
                      )}
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </div>
          </div>
          <div className="w-full h-full overflow-y-auto overflow-x-hidden">
            <div className="mx-3 my-1 px-5 py-8 rounded-lg shadow-sm">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LayoutAdmin;
