import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { MouseEvent, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import services from "../../Data/ServicesData.json";
import sample_pic from "../../Assets/Images/strong_motor.png";
import add from "../../Assets/Images/add.png";

const AdminModifyServices: React.FC = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const [image, setImage] = useState<null | string>(null);
  const [post, setPost] = useState<string>('');

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
        <h4 className="text-lg font-semibold">Add/Modify Services</h4>
        <div className="mt-5 p-10 bg-[#f5f5f5]">
          <div>
            <TextField
              multiline
              minRows={5}
              maxRows={8}
              fullWidth
              placeholder="Add New Service..."
              value={post}
              onChange={(event) => setPost(event.target.value)}
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
        <div className="mt-8 px-10 py-2 md:py-12 bg-[#f5f5f5]">
          <Grid2 display="flex" justifyContent="center" container spacing={2}>
            {services.map((service, serviceIndex) => (
              <Card key={serviceIndex} sx={{ minWidth: 275, mb: 2 }}>
                <CardHeader
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
                  title={service.branch}
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
                <CardContent>
                  <Typography variant="body2">{service.post}</Typography>
                </CardContent>
                <CardMedia>
                  <img
                    src={sample_pic}
                    alt="This is just a sample picture for about page"
                  />
                </CardMedia>
              </Card>
            ))}
          </Grid2>
        </div>
      </div>
    </>
  );
};

export default AdminModifyServices;
