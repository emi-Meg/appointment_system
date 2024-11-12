import React, { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBarsStaggered,
  faXmark,
  faUsersGear,
  faRightFromBracket,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import smct_group from "../../Assets/Images/smct_group.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const SuperLayout: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

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

  const sidebarItems = [
    { name: "Profile", icon: faUserTie, path: "profile" },
    { name: "List of Admins", icon: faUsersGear, path: "admins-list" },
    { name: "Logout", icon: faRightFromBracket, path: "logout" }
  ];

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
                  Hello, Dev Codaline
                </p>
                <p className="text-base text-white font-semibold">
                  Manage All Admins
                </p>
              </div>
              <div className="flex flex-col items-center mb-7">
                <Avatar sx={{ width: 100, height: 100 }} />
                <p className="text-base uppercase font-semibold text-white mt-1">
                  Codaline Dev
                </p>
                  <p className="text-xs font-medium text-white">Developer</p>
              </div>
              <div className="w-full">
                <ul className="text-white">
                  {sidebarItems
                  .filter(
                      ({ name }) => name !== "Logout"
                    ).map(({ name, path }) => (
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
                      to={name === "Logout" ? "#" : path} // Use "#" for the logout item
                      onClick={name === "Logout" ? handleLogout : undefined} // Handle logout separately
                    >
                      <li
                        className={`px-2 py-4 block transition duration-300 text-center text-white cursor-pointer ${
                          currentPath === path
                            ? "bg-[#001f3f] text-white"
                            : "hover:bg-blue-600"
                        }`}
                      >
                        <FontAwesomeIcon icon={icon} className="text-2xl" />
                      </li>
                    </Link>
                  </Tooltip>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="flex flex-col w-full h-full">
          <div className="bg-[#F5F5F5] w-full flex items-center justify-between pl-3 pr-6 py-3 shadow-lg">
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
            <div>
              <Typography
                color="#333"
                fontWeight={700}
                sx={{ fontSize: { lg: "20px", xs: "16" } }}
              >
                APPOINTMENT SYSTEM DEV PANEL
              </Typography>
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

export default SuperLayout;
