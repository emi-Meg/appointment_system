import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { muiThemeContext } from '../../Contexts/Themes/MUIThemeContext';
import { Box, Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import bookings from '../../Data/Bookings.json';

const ViewBookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Booking not found</div>;
  }

  const booking = bookings.find((b) => b.id === parseInt(id));

  if (!booking) {
    return <div>Booking not found</div>;
  }

  return (
    <div>
      <ThemeProvider theme={muiThemeContext}>
        <div className="mt-40 flex items-center justify-center">
          <Card variant="outlined" sx={{ width: { xs: 450, sm: 550, lg: 650 } }}>
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
                <p className='mb-2'><strong>Branch: </strong>{booking.branch}</p>
                <p className='mb-2'><strong>Vehicle Type: </strong>{booking.vehicleType}</p>
                <p className='mb-2'><strong>Service Request: </strong>{booking.serviceRequest}</p>
                <p className='mb-2'><strong>Registered Conduction/Plate No.: </strong>{booking.plateNumber}</p>
                <p className='mb-2'><strong>Other Request: </strong>{booking.otherRequest}</p>
                <p className='mb-2'><strong>Appointment Date and Time: </strong>{booking.date} - {booking.time}</p>
                <p className='mb-2'><strong>Name: </strong>{booking.name}</p>
                <p className='mb-2'><strong>Contact Number: </strong>{booking.number}</p>
                <p className='mb-2'><strong>Booked Date and Time: </strong>{booking.bookedDate} - {booking.bookedTime}</p>
                <p className='mb-2'><strong>Status: </strong>{booking.status}</p>
              </Box>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default ViewBookingDetails;