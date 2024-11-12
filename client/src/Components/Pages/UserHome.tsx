import { ThemeProvider } from "@emotion/react";
import React from "react";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Grid2,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import HomeIcon from "@mui/icons-material/Home";
import homeData from "../../Data/HomeData.json";
import media from "../../Assets/Images/honda_img_sample.png";

const HomeUser: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={muiThemeContext}>
        <Grid2 container spacing={2}>
          <Grid2 size={2} />
          <Grid2 size={8}>
            <div className="flex flex-col mt-10">
              <div>
                <div className="flex items-center">
                  <HomeIcon />
                  <h2 className="text-2xl font-bold ml-2">HOME</h2>
                </div>
                <div className="mt-5">
                  <Grid2 display="flex" container spacing={2}>
                    {homeData.map((data) => (
                      <Card key={data.id} sx={{ maxWidth: 500 }}>
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{ bgcolor: "red" }}
                              alt={data.branch}
                              src="/nameOfTheBranch"
                            />
                          }
                          title={data.branch}
                          subheader={data.date}
                        />
                        <CardMedia
                          component="img"
                          height="194"
                          image={media}
                          alt="Media"
                        />
                        <CardContent>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {data.content}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton aria-label="like">
                            <Tooltip title="Like" placement="bottom">
                              <Checkbox
                                icon={<FavoriteBorder />}
                                checkedIcon={
                                  <FavoriteIcon sx={{ color: "red" }} />
                                }
                              />
                            </Tooltip>
                          </IconButton>
                          <IconButton aria-label="share">
                          <Tooltip title="Share" placement="bottom">
                            <ShareIcon />
                            </Tooltip>
                          </IconButton>
                        </CardActions>
                      </Card>
                    ))}
                  </Grid2>
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

export default HomeUser;
