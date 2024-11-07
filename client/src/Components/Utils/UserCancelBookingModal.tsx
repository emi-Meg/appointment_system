import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import bookings from '../../Data/Bookings.json';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface CustomizedDialogsProps {
  open: boolean;
  onClose: () => void;
  bookingId: number | null;
}

const CancelBookingModal: React.FC<CustomizedDialogsProps> = ({
  open,
  onClose,
  bookingId,
}) => {
  const booking = bookings.find((b)=> b.id === bookingId);

  if (!booking) {
    return null;
  }

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, backgroundColor: "#5E1916", color: "white" }}
        id="customized-dialog-title"
      >
        Cancel Scheduled Appointment
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cancel Booking ID No. {booking.id}?
        </Typography>
        <TextField
          size="small"
          id="reason"
          label="State the reason for cancellation..."
          multiline
          rows={4}
          sx={{
            width: "500px",
          }}
        />
      </DialogContent>
      <DialogActions>
        <button
          autoFocus
          onClick={onClose}
          className="bg-[#6C757D] text-white rounded-3xl px-4 py-1"
        >
          Cancel
        </button>
        <button
          autoFocus
          onClick={onClose}
          className="bg-[#C8102E] text-white rounded-3xl px-4 py-1"
        >
          Submit
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default CancelBookingModal;
