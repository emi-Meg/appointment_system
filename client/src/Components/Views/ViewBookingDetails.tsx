import React from "react";
import { ThemeProvider } from "@emotion/react";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import bookings from "../../Data/Bookings.json";

const ViewBookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Booking not found</div>;
  }

  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return <div>Booking not found</div>;
  }

  return (
    <div>
      <ThemeProvider theme={muiThemeContext}>
        <div className="mt-10 flex items-center justify-center">
          <Card
            variant="outlined"
            sx={{ width: { xs: 450, sm: 550, lg: 650 } }}
          >
            <CardHeader
              title={
                <Box display="flex" alignItems="center">
                  <IconButton color="inherit">
                    <Link to="/user/mybookings">
                      <ArrowBackIcon />
                    </Link>
                  </IconButton>
                  View Appointment Details
                </Box>
              }
              sx={{ backgroundColor: "#0033A0", color: "white" }}
            />
            <Divider />
            <CardContent>
              <Box>
                <TableContainer sx={{ width: "100%" }}>
                  <Table>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        <Typography fontWeight={700}>
                          Booking Code
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        {booking.id}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        <Typography fontWeight={700}>Branch</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        {booking.branch}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        <Typography fontWeight={700}>Vehicle Type</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        {booking.vehicleType}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        <Typography fontWeight={700}>
                          Service Request
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        {booking.serviceRequest}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        <Typography fontWeight={700}>Mechanic</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        {booking.mechanic}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        <Typography fontWeight={700}>
                          Registered Conduction/Plate No.
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        {booking.plateNumber}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        <Typography fontWeight={700}>
                          Current Mileage
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        {booking.currentMileage
                          ? booking.currentMileage
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        <Typography fontWeight={700}>Other Request</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        {booking.otherRequest ? booking.otherRequest : "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        <Typography fontWeight={700}>
                          Appointment Date and Time
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        {booking.date ? booking.date : ""}-
                        {booking.time ? booking.time : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        <Typography fontWeight={700}>
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        {booking.status}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        <Typography fontWeight={700}>
                          Booked Date and Time
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "1px solid #333333",
                          paddingY: "2px",
                        }}
                      >
                        {booking.bookedDate ? booking.bookedDate : ""}-
                        {booking.bookedTime ? booking.bookedTime : ""}
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ViewBookingDetails;
