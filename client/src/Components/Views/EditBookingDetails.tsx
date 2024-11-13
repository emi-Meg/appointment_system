import React, { ChangeEvent, useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import bookings from "../../Data/Bookings.json";
import { DateTime } from "luxon";
import { Data, SlotAvailability } from "../../Types/types";
import slots from "../../Data/AvailableSlots.json";
import services from "../../Data/BookingDetails.json";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const data: Data = services.data;
const availableSlots: SlotAvailability = slots;

const EditBookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [branch, setBranch] = useState<string | null>(null);
  const [vehicleType, setVehicleType] = useState<string>("");
  const [serviceRequest, setServiceRequest] = useState<string>("");
  const [mechanic, setMechanic] = useState<string>("");
  const [plateNumber, setPlateNumber] = useState<string>("");
  const [currentMileage, setCurrentMileage] = useState<string>("");
  const [otherRequest, setOtherRequest] = useState<string>("");
  const [options, setOptions] = useState<{
    vehicleType: string[];
    serviceRequest: string[];
    mechanic: string[];
  }>({
    vehicleType: [],
    serviceRequest: [],
    mechanic: [],
  });
  //   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  // Disable dates with no available slots
  const isDateDisabled = (date: Date | null): boolean => {
    if (!date) return false;
    const dateString = DateTime.fromJSDate(date).toISODate();

    if (dateString) {
      return (
        !availableSlots[dateString] || availableSlots[dateString].length === 0
      );
    }

    return true;
  };

  // Disable times that are not available on the selected date
  const isTimeDisabled = (time: Date | null): boolean => {
    if (!selectedDate || !time) return false;
    const dateString = DateTime.fromJSDate(selectedDate).toISODate();
    const timeString = DateTime.fromJSDate(time).toFormat("HH:mm");

    if (dateString) {
      return !availableSlots[dateString]?.includes(timeString);
    }
    return true;
  };

  // Handle date changes
  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
    setSelectedTime(null); // Reset time when date changes
  };

  // Handle time changes
  const handleTimeChange = (newTime: Date | null) => {
    setSelectedTime(newTime);
  };

  useEffect(() => {
    if (branch && data[branch]) {
      setOptions({
        vehicleType: data[branch].vehicle,
        serviceRequest: data[branch].serviceType,
        mechanic: data[branch].mechanic,
      });
    }
  }, [branch]);

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
                  Modify Your Appointment
                </Box>
              }
              sx={{ backgroundColor: "#0033A0", color: "white" }}
            />
            <Divider />
            <CardContent>
              <Box>
                <FormControl sx={{ marginBottom: "10px", width: "100%" }}>
                  <Autocomplete
                    options={Object.keys(data)}
                    size="small"
                    disablePortal
                    value={booking.branch}
                    onChange={(_event, newValue) => {
                      setBranch(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Branch" required />
                    )}
                  />
                </FormControl>
                <FormControl
                  sx={{ marginBottom: "10px", width: "100%" }}
                  required
                  size="small"
                >
                  <InputLabel id="vehicleType">Vehicle Type</InputLabel>
                  <Select
                    labelId="vehicleType"
                    id="vehicleType"
                    value={vehicleType}
                    label="Vehicle Type"
                    onChange={(event: SelectChangeEvent<string>) =>
                      setVehicleType(event.target.value)
                    }
                  >
                    {options.vehicleType.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ marginBottom: "10px", width: "100%" }}
                  required
                  size="small"
                >
                  <InputLabel id="serviceRequest">Service Request</InputLabel>
                  <Select
                    labelId="serviceRequest"
                    id="serviceRequest"
                    value={serviceRequest}
                    label="Service Request"
                    onChange={(event: SelectChangeEvent<string>) =>
                      setServiceRequest(event.target.value)
                    }
                  >
                    {options.serviceRequest.map((request) => (
                      <MenuItem key={request} value={request}>
                        {request}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ marginBottom: "10px", width: "100%" }}
                  required
                  size="small"
                >
                  <InputLabel id="mechanic">Choose Your Mechanic</InputLabel>
                  <Select
                    labelId="mechanic"
                    id="mechanic"
                    value={mechanic}
                    label="Choose Your Mechanic"
                    onChange={(event: SelectChangeEvent<string>) =>
                      setMechanic(event.target.value)
                    }
                  >
                    {options.mechanic.map((mech) => (
                      <MenuItem key={mech} value={mech}>
                        {mech}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  size="small"
                  id="plateNumber"
                  label="Registered Conduction/Plate No."
                  variant="outlined"
                  value={plateNumber}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setPlateNumber(event.target.value)
                  }
                  sx={{ marginBottom: "10px", width: "100%" }}
                />
                <TextField
                  size="small"
                  id="currentMileage"
                  label="Current Mileage"
                  variant="outlined"
                  value={currentMileage}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setCurrentMileage(event.target.value)
                  }
                  sx={{ marginBottom: "10px", width: "100%" }}
                />
                <TextField
                  minRows={3}
                  multiline
                  id="otherRequest"
                  label="Other Request"
                  value={otherRequest}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setOtherRequest(event.target.value)
                  }
                  sx={{ marginBottom: "10px", width: "100%" }}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box>
                    <StaticDatePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      shouldDisableDate={isDateDisabled}
                    />
                    {selectedDate && (
                      <TimePicker
                        label="Select Time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        shouldDisableTime={isTimeDisabled}
                        sx={{
                          width: "200px",
                          marginTop: "50px",
                        }}
                      />
                    )}
                  </Box>
                </LocalizationProvider>
              </Box>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default EditBookingDetails;
