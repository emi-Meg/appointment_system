import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormLabel, TextField } from "@mui/material";
import React from "react";

const ForgotPassword: React.FC = () => {
  return (
    <>
      <div className="flex justify-center pt-20">
        <div className="border-2 py-8 px-20 w-1/4 flex flex-col justify-center items-center">
          <h4 className="text-xl font-semibold mb-4">Forgot Password</h4>
          <div className="flex flex-col w-full">
            <FormLabel htmlFor="email" sx={{ fontWeight: "700" }}>
              Email
            </FormLabel>
            <TextField
              size="small"
              placeholder="Enter your email..."
              id="email"
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
            >
              SEND LINK TO EMAIL
            </Button>
            <div className="mt-5">
                <a href="/signin" className="text-[#c0c0c0] flex items-center gap-1">
                    <FontAwesomeIcon icon={faCaretLeft}/>Go back
                </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
