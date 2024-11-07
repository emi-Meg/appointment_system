import { ThemeProvider } from "@emotion/react";
import React, { useState } from "react";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import {
  Breadcrumbs,
  Card,
  CardContent,
  Grid2,
  Pagination,
  Rating,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ratings from "../../Data/FeedbacksData.json";

const FeedbacksUser: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cardsPerPage = 5;
  const totalPages = Math.ceil(ratings.length / cardsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setCurrentPage(value);
  };

  const displayedRatings = ratings.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const breadcrumbs = [
    <Link key="1" color="inherit" to="/user/support">
      Support
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      Feedbacks
    </Typography>,
  ];

  return (
    <>
      <ThemeProvider theme={muiThemeContext}>
        <Grid2 container spacing={2}>
          <Grid2 size={2} />
          <Grid2 size={8}>
            <div className="flex flex-col mt-40">
              <div className="flex items-center">
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  {breadcrumbs}
                </Breadcrumbs>
              </div>
              <div className="mt-5">
                {displayedRatings.map((feedback) => (
                  <Card
                    key={feedback.id}
                    sx={{ minWidth: 275, marginBottom: "20px" }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        sx={{ color: "text.secondary", fontSize: 14 }}
                      >
                        {feedback.customerName}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {feedback.branch}
                      </Typography>
                      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        {feedback.date}
                      </Typography>
                      <Typography variant="body2">
                        {feedback.ratingComment}
                      </Typography>
                      <Rating
                        name="read-only"
                        value={feedback.ratingScore}
                        readOnly
                      />
                    </CardContent>
                  </Card>
                ))}
                <div className="flex justify-end">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChange}
                    variant="outlined"
                    color="primary"
                  />
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

export default FeedbacksUser;
