import React, { ChangeEvent, FormEvent, useState } from "react";
import "../../Styles/Auth/SignIn.css";
import Lottie from "lottie-react";
import signup from "../../Assets/Lottie/register_lottie.json";
import { ThemeProvider } from "@emotion/react";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import { Box, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post("/api/signin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data.message);
      if (response.status === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-start",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        }).then(() => {
          localStorage.setItem("token", response.data.token);
          navigate("/user/home");
        });
      }
    } catch (error) {
      console.error("Error: ", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-start",
              showConfirmButton: false,
              timer: 1500,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "warning",
              title: "Invalid credentials",
            });
          }
          // If the server responded with a status code outside of the range of 2xx
          console.log(error.response.data.message);
          setIsSubmitting(false)
        } else {
          // If there was an error setting up the request
          console.log("An error occurred");
        }
      }
    }
  };

  return (
    <div className="body-container-signin">
      <div className="signinfront">
        <div className="signinfront-title">
          <h1 className="text-4xl font-bold">Sign In To Your Account</h1>
        </div>
        <div className="signinfront-lottie" style={{ width: "800px" }}>
          <Lottie
            animationData={signup}
            autoPlay={true}
            loop={true}
            style={{ width: "100%" }}
          />
        </div>
        <div className="signinfront-FooterUser">
          <p>
            Prefer to book quickly without an account?{" "}
            <Link to="/guestbooking">
              <strong>Click here</strong>
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="sign-in">
        <div className="sign-in-title">
          <h1 className="text-4xl font-bold">SIGN IN</h1>
        </div>
        <form onSubmit={handleSignIn}>
          <div className="sign-in-form">
            <ThemeProvider theme={muiThemeContext}>
              <Box className="box-form">
                <TextField
                  size="small"
                  id="usernameEmail"
                  label="Username or Email"
                  variant="outlined"
                  value={username}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setUsername(event.target.value)
                  }
                  sx={{ marginBottom: "10px", width: "100%" }}
                  required
                />
                <TextField
                  type="password"
                  size="small"
                  id="password"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                  sx={{ marginBottom: "10px", width: "100%" }}
                  required
                />
              </Box>
            </ThemeProvider>
            <Link to="#">
              <p>Forgot Password?</p>
            </Link>
          </div>
          <div className="sign-in-btn">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Signing in...
                </>
              ) : (
                "LOGIN"
              )}
            </button>
          </div>
        </form>
        <div className="sign-in-FooterUser">
          <p>
            Don't have an account yet?{" "}
            <Link to="/signup">
              <strong>Sign Up</strong>
            </Link>
            .
          </p>
        </div>
        <div className="finalsignin-btn">
          <Link to="/guestbooking">
            <strong>Book as Guest?</strong>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
