import { ThemeProvider } from "@emotion/react";
import React from "react";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import {
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from "@mui/material";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import sample_pic from '../../Assets/Images/strong_motor.png'
import services from '../../Data/ServicesData.json'

const AboutServices: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={muiThemeContext}>
        <Grid2 container spacing={2}>
          <Grid2 size={2} />
          <Grid2 size={8}>
            <div className="flex flex-col mt-10">
              <div className="flex items-center">
                <CarRepairIcon />
                <h2 className="text-2xl font-bold ml-2">ABOUT/SERVICES</h2>
              </div>
              <div className="mt-5">
              {services.map((service, serviceIndex)=> (
                <Card key={serviceIndex} sx={{ minWidth: 275, mb: 2 }}>
                  <CardContent>
                    <Typography variant="h5" component="div" mb={1.5}>
                      {service.branch}
                    </Typography>
                    <Typography variant="body2">
                      {service.post}
                    </Typography>
                  </CardContent>
                  <CardMedia>
                    <img src={sample_pic} alt="This is just a sample picture for about page" />
                  </CardMedia>
                </Card>
              ))}
              </div>
            </div>
          </Grid2>
          <Grid2 size={2} />
        </Grid2>
      </ThemeProvider>
    </>
  );
};

export default AboutServices;
