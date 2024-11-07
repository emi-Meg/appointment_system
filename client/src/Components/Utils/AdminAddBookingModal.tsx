import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Data,
  MyAdminAddBookingDialogProps,
  SlotAvailability,
} from "../../Types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import slots from "../../Data/AvailableSlots.json";
import services from "../../Data/BookingDetails.json";
import axios from "axios";
import Swal from "sweetalert2";
import { steps } from "../../Constants/StepsBooking";
import { DateTime } from "luxon";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const availableSlots: SlotAvailability = slots;
const data: Data = services.data;

const AdminAddBookingModal: React.FC<MyAdminAddBookingDialogProps> = ({
  onClose,
  open,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

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

  // Handle date changes
  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
    setSelectedTime(null); // Reset time when date changes
  };

  // Handle time changes
  const handleTimeChange = (newTime: Date | null) => {
    setSelectedTime(newTime);
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

  useEffect(() => {
    if (branch && data[branch]) {
      setOptions({
        vehicleType: data[branch].vehicle,
        serviceRequest: data[branch].serviceType,
        mechanic: data[branch].mechanic,
      });
    }
  }, [branch]);

  const handleNext = async () => {
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
    setName("");
    setEmail("");
    setContact("");
    setAddress("");
    setIsSubmitting(false);
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
      name: name,
      email: email,
      contact: contact,
      address: address,
    };

    try {
      const response = await axios.post(
        "https://66e2403b494df9a478e13b22.mockapi.io/api/appointment/guestbooking",
        booking,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Booking submitted successfully!");
      console.log(`Booking submitted successfully: ${response.data.message}`);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Appointment booking has been submitted",
        showConfirmButton: false,
        timer: 2000,
      });
      handleReset();
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

  return (
    <div>
      <Dialog aria-labelledby="dialog-view" open={open} fullWidth>
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            bgcolor: "#FFD700"
          }}
          id="dialog-view"
        >
          <p className="text-lg text-[#333] font-bold">
            Add New Booking (Walk-in Customer)
          </p>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#333",
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleSubmitBooking}>
            <Box sx={{ width: "100%", marginTop: "30px" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Just a quick check, please review your details to finalize
                    your appointment!
                  </Typography>
                  <Box>
                    <p>
                      <strong>Branch: </strong>
                      {branch}
                    </p>
                    <p>
                      <strong>Vehicle Type: </strong>
                      {vehicleType}
                    </p>
                    <p>
                      <strong>Service Request: </strong>
                      {serviceRequest}
                    </p>
                    <p>
                      <strong>Choose Your Mechanic: </strong>
                      {mechanic}
                    </p>
                    <p>
                      <strong>Registered Conduction/Plate No.: </strong>
                      {plateNumber}
                    </p>
                    <p>
                      <strong>Current Mileage: </strong>
                      {currentMileage ? currentMileage : "N/A"}
                    </p>
                    <p>
                      <strong>Other Request: </strong>
                      {otherRequest ? otherRequest : "N/A"}
                    </p>
                    <p>
                      <strong>Appointment Date and Time: </strong>
                      {selectedDate ? selectedDate.toLocaleDateString() : ""}-
                      {selectedTime ? selectedTime.toLocaleTimeString() : ""}
                    </p>
                    <p>
                      <strong>Name: </strong>
                      {name}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {email}
                    </p>
                    <p>
                      <strong>Contact Number: </strong>
                      {contact}
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {address ? address : "N/A"}
                    </p>
                    <FormControlLabel
                      required
                      control={<Checkbox />}
                      label="I confirm that the details I provided are accurate."
                    />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 0 && (
                    <div
                      className="guest-book-form"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
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
                        <InputLabel id="serviceRequest">
                          Service Request
                        </InputLabel>
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
                        <InputLabel id="mechanic">
                          Choose Your Mechanic
                        </InputLabel>
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
                  )}
                  {activeStep === 1 && (
                    <div className="date-time-picker">
                      <Typography sx={{ fontWeight: 700, textAlign: "center" }}>
                        Schedule Your Vehicle's Next Check Up!
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box className="date-time-picker-form">
                          <StaticDatePicker
                            className="date-picker"
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
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div
                      className="guest-book-form"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "50px",
                      }}
                    >
                      <TextField
                        size="small"
                        id="name"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setName(event.target.value)
                        }
                        sx={{ marginBottom: "10px", width: "100%" }}
                        required
                      />
                      <TextField
                        size="small"
                        id="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setEmail(event.target.value)
                        }
                        sx={{ marginBottom: "10px", width: "100%" }}
                        required
                      />
                      <TextField
                        size="small"
                        id="contact"
                        label="Contact Number"
                        variant="outlined"
                        value={contact}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setContact(event.target.value)
                        }
                        sx={{ marginBottom: "10px", width: "100%" }}
                        required
                      />
                      <TextField
                        size="small"
                        id="address"
                        label="Address"
                        variant="outlined"
                        value={address}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setAddress(event.target.value)
                        }
                        sx={{ marginBottom: "10px", width: "100%" }}
                      />
                    </div>
                  )}
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      onClick={handleNext}
                      disabled={
                        (activeStep === 0 &&
                          (!branch ||
                            !vehicleType ||
                            !serviceRequest ||
                            !mechanic ||
                            !plateNumber)) ||
                        (activeStep === 1 &&
                          (!selectedDate || !selectedTime)) ||
                        (activeStep === 2 && (!name || !email || !contact))
                      }
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
            {activeStep === steps.length - 0 && (
              <div className="guest-book-FooterUser">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin /> Submitting...
                    </>
                  ) : (
                    "SUBMIT"
                  )}
                </button>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAddBookingModal;
