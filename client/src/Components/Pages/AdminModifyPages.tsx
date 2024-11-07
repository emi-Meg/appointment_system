import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { MouseEvent, useState } from "react";
import homeData from "../../Data/HomeData.json";
import media from "../../Assets/Images/strong_motor.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import add from "../../Assets/Images/add.png";

const AdminModifyPages: React.FC = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const [image, setImage] = useState<null | string>(null);

  const handleUploadFile = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  const handleClickVert = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseVert = () => {
    setAnchor(null);
  };

  return (
    <>
      <div>
        <h4 className="text-lg font-semibold">Add Post in Homepage</h4>
        <div className="mt-5 p-10 bg-[#f5f5f5]">
          <div>
            <TextField
              multiline
              minRows={5}
              maxRows={8}
              fullWidth
              placeholder="New update..."
            />
          </div>
          <div className="mt-4 flex flex-col md:flex-row items-start justify-between">
            <div className="flex flex-col items-center justify-center py-2 px-10 cursor-pointer border-2 transition-all duration-150 active:scale-95 active:border-slate-700">
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadFile}
                className="hidden"
                id="fileInput"
              />
              <div
                onClick={() => document.getElementById("fileInput")?.click()}
                className="flex flex-col items-center justify-center py-2 px-10 cursor-pointer border-2 transition-all duration-150 active:scale-95 active:border-slate-700"
              >
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-auto max-w-[200px] rounded-md"
                  />
                ) : (
                  <>
                    <img src={add} alt="Add featured photo" className="w-10" />
                    <p>Upload featured image...</p>
                  </>
                )}
              </div>
            </div>
            <Button
              variant="contained"
              sx={{ bgcolor: "#FF6600", width: { xs: "100%", md: "20%" } }}
            >
              Publish
            </Button>
          </div>
        </div>
        <div className="mt-8 py-12 bg-[#f5f5f5]">
          <Grid2 display="flex" justifyContent="center" container spacing={2}>
            {homeData.map((data) => (
              <Grid2 size={12} display="flex" justifyContent="center">
                <Card key={data.id} sx={{ width: "80%" }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: "red" }}
                        alt={data.branch}
                        src="/nameOfTheBranch"
                      />
                    }
                    action={
                      <IconButton
                        aria-label="edit-delete"
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        id="edit-del"
                        onClick={handleClickVert}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={data.branch}
                    subheader={data.date}
                  />
                  <Menu
                    id="menu-edit-del"
                    anchorEl={anchor}
                    open={open}
                    onClose={handleCloseVert}
                    MenuListProps={{
                      "aria-labelledby": "edit-delete",
                    }}
                  >
                    <MenuItem onClick={handleCloseVert}>Edit</MenuItem>
                    <MenuItem onClick={handleCloseVert}>Delete</MenuItem>
                  </Menu>
                  <CardMedia
                    component="img"
                    height="194"
                    image={media}
                    alt="Media"
                    sx={
                      {
                        // display: {lg: "block", xs: "none"}
                      }
                    }
                  />
                  <CardContent>
                    <Typography
                      sx={{
                        color: "text.primary",
                        fontSize: { lg: "16px", xs: "12px" },
                      }}
                    >
                      {data.content}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="like">
                      <Tooltip title="Like" placement="bottom">
                        <Checkbox
                          icon={<FavoriteBorder />}
                          checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
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
              </Grid2>
            ))}
          </Grid2>
        </div>
      </div>
    </>
  );
};

export default AdminModifyPages;
