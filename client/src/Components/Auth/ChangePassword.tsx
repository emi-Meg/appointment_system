import { Button, FormLabel, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePassword: React.FC = () => {
    const navigate = useNavigate();

    const handleChangePassword = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Password changed successfully"
          }).then(() => {
            navigate("/signin");
          });
    }

  return (
    <>
      <div className="flex justify-center pt-20">
        <div className="border-2 py-8 px-20 w-1/4 flex flex-col justify-center items-center">
          <h4 className="text-xl font-semibold mb-4">Change Password</h4>
          <div className="flex flex-col w-full">
            <FormLabel htmlFor="password" sx={{ fontWeight: "700" }}>
              New Password
            </FormLabel>
            <TextField
              type="password"
              size="small"
              placeholder="Enter new password..."
              id="password"
              fullWidth
              sx={{
                marginBottom: "10px",
              }}
            />
            <FormLabel htmlFor="cpassword" sx={{ fontWeight: "700" }}>
              Confirm New Password
            </FormLabel>
            <TextField
              type="password"
              size="small"
              placeholder="Confirm new password..."
              id="cpassword"
              fullWidth
              sx={{
                marginBottom: "10px",
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#0033A0",
              }}
              onClick={handleChangePassword}
            >
              CHANGE PASSWORD
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
