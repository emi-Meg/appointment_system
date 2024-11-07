import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";
import { MyAdminViewDialogProps } from "../../Types/types";

const AdminViewBookingModal: React.FC<MyAdminViewDialogProps> = ({
  data,
  onClose,
  open,
  onConfirmCancel,
  onConfirmApprove
}) => {
  if (!data) return null;

  return (
    <div>
      <Dialog aria-labelledby="dialog-view" open={open} fullWidth>
        <DialogTitle sx={{ m: 0, p: 2, bgcolor: '#FFD700'}} id="dialog-view">
          <p className="text-lg text-[#333] font-bold">View Appointment</p>
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
          <div className="space-y-4">
            <p><strong>Booking ID: </strong>{data.id}</p>
            <p><strong>Branch: </strong>{data.branch}</p>
            <p><strong>Name: </strong>{data.name}</p>
            <p><strong>Contact Number: </strong>{data.number}</p>
            <p><strong>Vehicle Type: </strong>{data.vehicleType}</p>
            <p><strong>Service Request: </strong>{data.serviceRequest}</p>
            <p><strong>Plate Number: </strong>{data.plateNumber}</p>
            <p><strong>Other Request: </strong>{data.otherRequest}</p>
            <p><strong>Appointment Data and Time: </strong>{data.date}{" "}{data.time}</p>
            <p><strong>Booked on: </strong>{data.bookedDate}{" "}{data.bookedTime}</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={onConfirmCancel}>
            Cancel
          </Button>
          <Button color="success" variant="contained" onClick={onConfirmApprove}>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminViewBookingModal;
