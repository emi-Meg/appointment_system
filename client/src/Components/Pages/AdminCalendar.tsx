import React, { ChangeEvent, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { appointment } from "../../Data/Appointments";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  FormControlLabel,
  Checkbox,
  FormControl,
  Autocomplete,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { steps2 } from "../../Constants/StepsBooking";
import { Data } from "../../Types/types";
import services from "../../Data/BookingDetails.json";

const data: Data = services.data;

const MyCalendar: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
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
  const [events, setEvents] = useState(appointment);
  const [eventTitle, setEventTitle] = useState<string>("");

  useEffect(() => {
    setEventTitle(`${name} - ${serviceRequest}`);
  }, [name, serviceRequest]);

  useEffect(() => {
    if (branch && data[branch]) {
      setOptions({
        vehicleType: data[branch].vehicle,
        serviceRequest: data[branch].serviceType,
        mechanic: data[branch].mechanic,
      });
    }
  }, [branch]);

  const handleDateClick = (arg: any) => {
    console.log("Date clicked:", arg.dateStr);
    setSelectedDate(arg.dateStr);
    setIsDialogOpen(true);
  };

  const handleAppointmentSubmit = () => {
    if (eventTitle && selectedDate) {
      const newEvent = {
        title: eventTitle,
        start: selectedDate,
        end: selectedDate,
        name: name,
      };
      
      setEvents([...events, newEvent]);

      setIsDialogOpen(false);
      setName("");
      setEmail("");
      setContact("");
      setAddress("");
      setBranch(null);
      setVehicleType("");
      setServiceRequest("");
      setMechanic("");
      setPlateNumber("");
      setCurrentMileage("");
      setOtherRequest("");
      setSelectedDate(null);
    } else {
      alert("Please enter an event title.");
    }
  };

  const handleModalClose = () => {
    setIsDialogOpen(false);
    setEventTitle("");
    setSelectedDate(null);
    handleReset();
  };

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
    setName("");
    setEmail("");
    setContact("");
    setAddress("");
  };

  const eventContent = (eventInfo:any) => {
    // Custom rendering: Only show the title and the name, but hide times
    return (
      <div>
        <strong>{eventInfo.event.extendedProps.name}</strong>
        {" "}-{" "}
        <span>{eventInfo.event.title}</span>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "Today",
          }}
          events={events}
          eventContent={eventContent}
          dateClick={handleDateClick}
          eventBackgroundColor='#FF6600'
          eventBorderColor="#FF6600"
          editable={true}
        />
      </div>

      <Dialog open={isDialogOpen} onClose={handleModalClose}>
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            bgcolor: "#FFD700",
          }}
          id="dialog-view"
        >
          <p className="text-lg text-[#333] font-bold">
            Add New Booking on {selectedDate}
          </p>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#333",
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconButton>
        <form onSubmit={handleAppointmentSubmit}>
          <DialogContent dividers>
            <Box sx={{ width: "100%", marginTop: "30px" }}>
              <Stepper activeStep={activeStep}>
                {steps2.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps2.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Just a quick check, please review your details to finalize
                    your appointment!
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
                            <Typography fontWeight={700}>Mechanic</Typography>
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
                            <Typography fontWeight={700}>Name</Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              border: "1px solid #333333",
                              paddingY: "2px",
                            }}
                          >
                            {name}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              border: "1px solid #333333",
                              paddingY: "2px",
                            }}
                          >
                            <Typography fontWeight={700}>Email</Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              border: "1px solid #333333",
                              paddingY: "2px",
                            }}
                          >
                            {email}
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
                              Contact Number
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              border: "1px solid #333333",
                              paddingY: "2px",
                            }}
                          >
                            {contact}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              border: "1px solid #333333",
                              paddingY: "2px",
                            }}
                          >
                            <Typography fontWeight={700}>Address</Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              border: "1px solid #333333",
                              paddingY: "2px",
                            }}
                          >
                            {address ? address : "N/A"}
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
                        (activeStep === 1 && (!name || !email || !contact))
                      }
                    >
                      {activeStep === steps2.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </DialogContent>
          {activeStep === steps2.length - 0 && (
            <DialogActions>
              <>
                <Button onClick={handleModalClose} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" onClick={handleAppointmentSubmit}>
                  Add Appointment
                </Button>
              </>
            </DialogActions>
          )}
        </form>
      </Dialog>
    </div>
  );
};

export default MyCalendar;
