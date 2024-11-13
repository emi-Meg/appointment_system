import React, { ChangeEvent, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import { Avatar, Box, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileUser: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [cNewPassword, setCNewPassword] = useState<string>("");
  return (
    <div>
      <ThemeProvider theme={muiThemeContext}>
        <div className="mt-10 flex items-center justify-center">
          <Box
            sx={{
              width: { lg: 600, sm: 500, xs: 400 },
              borderRadius: 2,
              backgroundColor: "#E0F7FA",
              padding: "30px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              boxShadow: "2px 2px 10px rgba(240, 240, 240, 0.5)"
            }}
          >
            <Typography variant="h5" align="center" marginBottom={5} fontWeight={700}>
              PROFILE SETTINGS
            </Typography>
            <Avatar
              sx={{
                bgcolor: "black",
                width: {lg:200, xs:130},
                height: {lg:200, xs:130},
                marginBottom: 2,
                fontSize: '50px',
                fontWeight: '700'
              }}
              alt="Remy Sharp"
              src="/broken-image.jpg"

            />
            <Typography>Personal Information</Typography>
            <TextField
              size="small"
              id="firstName"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFirstName(event.target.value)
              }
              sx={{ marginBottom: "10px", width: "80%" }}
            />
            <TextField
              size="small"
              id="lastName"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setLastName(event.target.value)
              }
              sx={{ marginBottom: "10px", width: "80%" }}
            />
            <TextField
              type="email"
              size="small"
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              sx={{ marginBottom: "10px", width: "80%" }}
            />
            <TextField
              size="small"
              id="contact"
              label="Mobile Number"
              variant="outlined"
              value={contact}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setContact(event.target.value)
              }
              sx={{ marginBottom: "10px", width: "80%" }}
            />
            <TextField
              size="small"
              id="address"
              label="Address"
              variant="outlined"
              value={address}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setAddress(event.target.value)
              }
              sx={{ marginBottom: "10px", width: "80%" }}
            />
            <Typography>Change Password</Typography>
            <TextField
            type="password"
              size="small"
              id="oldPassword"
              label="Old Password"
              variant="outlined"
              value={oldPassword}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setOldPassword(event.target.value)
              }
              sx={{ marginBottom: "10px", width: "80%" }}
            />
            <TextField
            type="password"
              size="small"
              id="npassword"
              label="New Password"
              variant="outlined"
              value={newPassword}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewPassword(event.target.value)
              }
              sx={{ marginBottom: "10px", width: "80%" }}
            />
            <TextField
            type="password"
              size="small"
              id="cnpassword"
              label="Confirm New Password"
              variant="outlined"
              value={cNewPassword}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setCNewPassword(event.target.value)
              }
              sx={{ marginBottom: "10px", width: "80%" }}
            />
            <div className="flex flex-row mt-5">
                <Link to="/user/home">
                <button className="p-1 bg-slate-700 text-white rounded-lg w-28 mr-10">Cancel</button>
                </Link>
                <button className="p-1 bg-green-700 text-white rounded-lg w-28">Save</button>
            </div>
          </Box>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ProfileUser;
