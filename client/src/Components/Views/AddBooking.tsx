import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import { Data, SlotAvailability } from "../../Types/types";
import slots from "../../Data/AvailableSlots.json";
import services from "../../Data/BookingDetails.json";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DateTime } from "luxon";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const availableSlots: SlotAvailability = slots;
const data: Data = services.data;

const AddBooking: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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

  const handleSubmitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const booking = {
      branch: branch,
      vehicleType: vehicleType,
      serviceRequest: serviceRequest,
      mechanic: mechanic,
      plateNumber: plateNumber,
      currentMileage: currentMileage,
      otherRequest: otherRequest,
      selectedDate: selectedDate,
      selectedTime: selectedTime,
    };

    try {
      const response = await axios.post(
        "https://66e2403b494df9a478e13b22.mockapi.io/api/appointment/guestbooking",
        booking,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Appointment booking has been submitted",
          showConfirmButton: false,
          timer: 2000,
        });
        handleReset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error response: ", error.response.data);
        }
      } else {
        console.error("Error: ", error);
      }
    } finally {
      setIsSubmitting(false);
    }
    console.log("Submitted Booking: ", booking);
  };

  const steps = [
    {
      label: "Choose your service category",
      form: (
        <div>
          <FormControl sx={{ marginBottom: "10px", width: "100%" }}>
            <Autocomplete
              options={Object.keys(data)}
              size="small"
              disablePortal
              value={branch}
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
        </div>
      ),
    },
    {
      label: "Pick your date and time",
      form: (
        <div>
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
                    marginLeft: "20px",
                    marginBottom: "20px",
                  }}
                />
              )}
            </Box>
          </LocalizationProvider>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (branch && data[branch]) {
      setOptions({
        vehicleType: data[branch].vehicle,
        serviceRequest: data[branch].serviceType,
        mechanic: data[branch].mechanic,
      });
    }
  }, [branch]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setBranch(null);
    setVehicleType("");
    setServiceRequest("");
    setMechanic("");
    setPlateNumber("");
    setCurrentMileage("");
    setOtherRequest("");
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <form onSubmit={handleSubmitBooking}>
      <div>
        <ThemeProvider theme={muiThemeContext}>
          <div className="mt-10 flex items-center justify-center">
            <Card
              variant="outlined"
              sx={{ width: { xs: 450, sm: 550, lg: 650 } }}
            >
              <CardHeader
                title={
                  <Box display="flex" alignItems="center" color="white">
                    <IconButton color="inherit">
                      <Link to="/user/mybookings">
                        <ArrowBackIcon />
                      </Link>
                    </IconButton>
                    Add New Booking
                  </Box>
                }
                sx={{ backgroundColor: "#0033A0", color: "white" }}
              />
              <Divider />
              <CardContent>
                <Box>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel
                          optional={
                            index === steps.length - 1 ? (
                              <Typography variant="caption">
                                Last step
                              </Typography>
                            ) : null
                          }
                        >
                          {step.label}
                        </StepLabel>
                        <StepContent>
                          <Typography>{step.form}</Typography>
                          <Box sx={{ mb: 2 }}>
                            <Button
                              onClick={handleNext}
                              sx={{
                                mt: 1,
                                mr: 1,
                                backgroundColor: "#FF6600",
                                color: "white",
                              }}
                              disabled={
                                (activeStep === 0 &&
                                  (!branch ||
                                    !vehicleType ||
                                    !serviceRequest ||
                                    !mechanic ||
                                    !plateNumber)) ||
                                (activeStep === 1 &&
                                  (!selectedDate || !selectedTime))
                              }
                            >
                              {index === steps.length - 1
                                ? "Finish"
                                : "Continue"}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                      <Typography>
                        Just a quick check, please review your details to
                        finalize your appointment!
                      </Typography>
                      <Box marginTop={2} marginBottom={2}>
                        <TableContainer sx={{ width: "100%" }}>
                          <Table>
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
                                {branch}
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
                                  Vehicle Type
                                </Typography>
                              </TableCell>
                              <TableCell
                                sx={{
                                  border: "1px solid #333333",
                                  paddingY: "2px",
                                }}
                              >
                                {vehicleType}
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
                                {serviceRequest}
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
                                  Mechanic
                                </Typography>
                              </TableCell>
                              <TableCell
                                sx={{
                                  border: "1px solid #333333",
                                  paddingY: "2px",
                                }}
                              >
                                {mechanic}
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
                                {plateNumber}
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
                                {currentMileage ? currentMileage : "N/A"}
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
                                  Other Request
                                </Typography>
                              </TableCell>
                              <TableCell
                                sx={{
                                  border: "1px solid #333333",
                                  paddingY: "2px",
                                }}
                              >
                                {otherRequest ? otherRequest : "N/A"}
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
                                {selectedDate
                                  ? selectedDate.toLocaleDateString()
                                  : ""}
                                -
                                {selectedTime
                                  ? selectedTime.toLocaleTimeString()
                                  : ""}
                              </TableCell>
                            </TableRow>
                          </Table>
                        </TableContainer>
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          label="I confirm that the details I provided are accurate."
                          sx={{
                            marginTop: "10px",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          pt: 1,
                          pb: 2,
                        }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                      </Box>
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="bg-[#FF6600] text-white py-2 px-5 rounded-3xl cursor-pointer transition-all duration-150 active:scale-95"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <FontAwesomeIcon icon={faSpinner} spin />{" "}
                              Submitting...
                            </>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </Paper>
                  )}
                </Box>
              </CardContent>
            </Card>
          </div>
        </ThemeProvider>
      </div>
    </form>
  );
};

export default AddBooking;
