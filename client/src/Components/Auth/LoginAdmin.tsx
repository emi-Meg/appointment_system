import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const LoginAdmin: React.FC = () => {
  return (
    <div className="flex items-start md:items-center justify-center h-screen overflow-y-auto px-5 md:px-0 py-10 md:py-0">
      <Card
        sx={{
          padding: { xs: "30px 70px 30px 70px", md: "40px 80px 40px 80px" },
          borderRadius: "10px",
          border: "2px solid #0033A0",
          backgroundColor: "#FFFFF0",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          fontWeight={700}
          marginBottom={2}
          sx={{
            fontSize: { xs: "16px", md: "24px" },
            textAlign: "center",
          }}
        >
          Administrator Access
        </Typography>
        <FormControl fullWidth>
          <label
            htmlFor="username-email"
            className="font-semibold text-sm md:text-base"
          >
            Username or Email
          </label>
          <TextField
            type="text"
            id="username-email"
            placeholder="Enter your username or email..."
            size="small"
            fullWidth
            sx={{
              marginBottom: "10px",
              "& .MuiInputBase-input": {
                fontSize: { xs: "14px", md: "16px" },
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: { xs: "10px", md: "14px" },
              },
            }}
          />
          <label
            htmlFor="password"
            className="font-semibold text-sm md:text-base"
          >
            Password
          </label>
          <TextField
            type="password"
            id="password"
            placeholder="Enter your password..."
            size="small"
            fullWidth
            sx={{
              "& .MuiInputBase-input": {
                fontSize: { xs: "14px", md: "16px" },
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: { xs: "10px", md: "14px" },
              },
            }}
          />
          <div className="flex justify-start mb-3">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={<Typography variant="body2">Show password</Typography>}
            />
          </div>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF6600",
            fontSize: { xs: "14px", md: "16px" },
          }}
        >
          LOGIN
        </Button>
      </Card>
    </div>
  );
};

export default LoginAdmin;
