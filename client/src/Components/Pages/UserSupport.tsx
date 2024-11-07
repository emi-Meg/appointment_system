import { ThemeProvider } from "@emotion/react";
import React from "react";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import { Card, CardContent, Grid2, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { Link } from "react-router-dom";

const SupportUser: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={muiThemeContext}>
        <Grid2 container spacing={2}>
          <Grid2 size={2}/>
          <Grid2 size={8}>
            <div className="flex flex-col mt-28">
              <div className="flex items-center">
                <HelpIcon />
                <h2 className="text-2xl font-bold ml-2">SUPPORT</h2>
              </div>
              <div className="mt-5">
                <div className="flex flex-col justify-center gap-2 w-full">
                    <Link to="/user/feedbacks">
                      <Card
                        sx={{
                          // backgroundColor: "#FFD700",
                          width: "100%",
                          height: "150px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <CardContent>
                          <Typography
                            fontWeight={700}
                            component="div"
                            sx={{
                              color: "#333333",
                              fontSize: { lg: "24px", xs: "14px" },
                            }}
                          >
                            Feedbacks
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link to="/user/faqs">
                      <Card
                        sx={{
                          // backgroundColor: "#FFD700",
                          width: "100%",
                          height: "150px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <CardContent>
                          <Typography
                            fontWeight={700}
                            component="div"
                            sx={{
                              color: "#333333",
                              fontSize: { lg: "24px", xs: "14px" },
                            }}
                          >
                            Frequently Asked Questions (FAQs)
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                    <Card
                      sx={{
                        position: "relative",
                        // backgroundColor: "#FFD700",
                        width: "100%",
                        height: "150px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // cursor: "pointer",
                      }}
                    >
                      <CardContent>
                        <Typography
                          fontWeight={700}
                          component="div"
                          sx={{
                            color: "#333333",
                            fontSize: { lg: "24px", xs: "14px" },
                          }}
                        >
                          Chat
                        </Typography>
                      </CardContent>
                      {/* <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "rgba(0, 0, 0, 0.6)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          opacity: 1,
                        }}
                      >
                        <Typography>Coming Soon...</Typography>
                      </Box> */}
                    </Card>
                    <Card
                      sx={{
                        // backgroundColor: "#FFD700",
                        width: "100%",
                        height: "150px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent>
                        <Typography
                          fontWeight={700}
                          component="div"
                          sx={{
                            color: "#333333",
                            fontSize: { lg: "24px", xs: "14px" },
                          }}
                        >
                          Customer Support
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
          </Grid2>
          <Grid2 size={2} />
        </Grid2>
      </ThemeProvider>
    </>
  );
};

export default SupportUser;
