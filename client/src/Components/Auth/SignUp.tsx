import React, { ChangeEvent, FormEvent, useState } from "react";
import "../../Styles/Auth/SignUp.css";
import Lottie from "lottie-react";
import signup from "../../Assets/Lottie/register_lottie.json";
import { ThemeProvider } from "@emotion/react";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import { Box, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// import { ErrorTypeSignUp } from "../../types";
import validator from 'validator';

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCpassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const [error, setError] = useState<ErrorTypeSignUp>({});
  // const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmitRegistration = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsSubmitting(true);

    const users = {
      firstName,
      lastName,
      email,
      contact,
      address,
      password,
      cpassword,
    };

    try {
      const response = await axios.post("/api/signup", users, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        // Clear the form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setContact("");
        setAddress("");
        setPassword("");
        setCpassword("");

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
          title: "Created an account successfully",
        }).then(() => {
          window.location.href = "/signin";
        });
      }
    } catch (error) {
      console.error("Error: ", error);
      if (axios.isAxiosError(error)) {
        console.log("Axios error response: ", error.response);

        if (error.response) {
          if (error.response.status === 409) {
            // setError({});
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "An unexpected error occurred. Please try again later.",
              confirmButtonColor: "#0033A0",
            });
          }
        } else {
          console.log("An unexpected error occurred!");
        }
      }
    } finally {
      setIsSubmitting(false);
    }

    console.log("Successfully signed up: ", users);
  };

  return (
    <div className="body-container-signup">
      <div className="front">
        <div className="front-title">
          <h1 className="text-4xl font-bold">Create Your Account</h1>
        </div>
        <div className="front-lottie" style={{ width: "800px" }}>
          <Lottie
            animationData={signup}
            autoPlay={true}
            loop={true}
            style={{ width: "100%" }}
          />
        </div>
        <div className="front-FooterUser">
          <p>
            Prefer to book quickly without an account?{" "}
            <Link to="/guestbooking">
              <strong>Click here</strong>
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="sign-up">
        <div className="sign-up-title">
          <h1 className="text-4xl font-bold">
            Just a Few Details Away from Creating Your Account
          </h1>
        </div>
        <form onSubmit={handleSubmitRegistration}>
          <div className="sign-up-form">
            <ThemeProvider theme={muiThemeContext}>
              <Box className="box-form">
                <TextField
                  size="small"
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setFirstName(event.target.value)
                  }
                  sx={{ marginBottom: "10px", width: "100%" }}
                  required
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
                  sx={{ marginBottom: "10px", width: "100%" }}
                  required
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
                  error={!validator.isEmail(email) && email.length > 0}
                  helperText={
                    !validator.isEmail(email) && email.length > 0
                      ? "Invalid email!"
                      : ""
                  }
                  sx={{ marginBottom: "10px", width: "100%" }}
                  required
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
                  sx={{ marginBottom: "10px", width: "100%" }}
                  required
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
                  sx={{ marginBottom: "10px", width: "100%" }}
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
                <TextField
                  type="password"
                  size="small"
                  id="cpassword"
                  label="Confirm Password"
                  variant="outlined"
                  value={cpassword}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setCpassword(event.target.value)
                  }
                  sx={{ marginBottom: "10px", width: "100%" }}
                  required
                />
              </Box>
            </ThemeProvider>
          </div>
          <div className="sign-up-btn">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Signing up...
                </>
              ) : (
                "REGISTER"
              )}
            </button>
          </div>
        </form>
        <div className="sign-up-FooterUser">
          <p>
            Already have an account?{" "}
            <Link to="/signin">
              <strong>Sign In</strong>
            </Link>
            .
          </p>
        </div>
        <div className="final-btn">
          <Link to="/guestbooking">
            <strong>Book as Guest?</strong>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
