import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import bookings from "../../Data/BookingListDetailsCategory.json";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { BookingListAdminData } from "../../Types/types";
import AdminViewBookingModal from "../Utils/AdminViewBookingModal";
import AdminAddBookingModal from "../Utils/AdminAddBookingModal";
import Swal from "sweetalert2";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const BookingListAdmin: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [openView, setOpenView] = useState<boolean>(false);
  const [openAddBooking, setOpenAddBooking] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBookings, setFilteredBookings] =
    useState<BookingListAdminData[]>(bookings);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingListAdminData | null>(null);

  const handleOpenAddBookingDialog = () => {
    setOpenAddBooking(true);
  };

  const handleCloseAddBookingDialog = () => {
    setOpenAddBooking(false);
  };

  const handleOpenViewDialog = (data: BookingListAdminData) => {
    setSelectedBooking(data);
    setOpenView(true);
  };

  const handleCloseViewDialog = () => {
    setOpenView(false);
    setSelectedBooking(null);
  };

  const handleCancelAppointment = () => {
    Swal.fire({
      title: "Are you sure you want to cancel this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Canceled!",
          text: "This appointment has been canceled.",
          icon: "success",
        });
      }
    });
  };

  const handleApproveAppointment = () => {
    Swal.fire({
      title: "Approve this appointment?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Approved!",
          text: "This appointment has been approved.",
          icon: "success",
        });
      }
    });
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookings.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    event?.preventDefault();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = bookings.filter(
      (booking) =>
        booking.id.toString().includes(query.toLowerCase()) ||
        booking.name.toLowerCase().includes(query.toLowerCase()) ||
        booking.plateNumber.toLowerCase().includes(query.toLowerCase()) ||
        booking.serviceRequest.toLowerCase().includes(query.toLowerCase()) ||
        `${booking.bookedDate} ${booking.bookedTime}`
          .toLowerCase()
          .includes(query.toLowerCase())
    );
    setFilteredBookings(filtered);
  };

  return (
    <div>
      <div className="mb-2">
        <h4 className="text-lg font-semibold mb-2">List of Records</h4>
        <h4 className="font-medium text-base mb-2">Upcoming Appointments</h4>
      </div>
      <div className="flex flex-col md:flex-row justify-between mb-5">
        <div>
          <button
            onClick={handleOpenAddBookingDialog}
            className="bg-[#228B22] active:scale-95 transition-all duration-150 mb-2 text-white py-1 px-4 rounded-2xl hover:bg-green-700 hover:transition hover:duration-300 hover:shadow-lg"
          >
            Add Booking
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:gap-3 lg:gap-5 mb-2">
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full border-black border bg-blue-200 mr-2"></span>
            <span>Guest</span>
          </div>

          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full border-black border bg-yellow-200 mr-2"></span>
            <span>Walk-in</span>
          </div>

          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full border-black border bg-green-200 mr-2"></span>
            <span>Registered</span>
          </div>
        </div>
        <div>
          <FormControl
            sx={{ width: { xs: "100%", md: "25ch" }, marginBottom: "10px" }}
            variant="outlined"
          >
            <OutlinedInput
              size="small"
              id="search"
              placeholder="Search…"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ flexGrow: 1 }}
              startAdornment={
                <InputAdornment position="start" sx={{ color: "text.primary" }}>
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              }
              inputProps={{
                "aria-label": "search",
              }}
            />
          </FormControl>
        </div>
      </div>
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#0033A0" }}>
                <TableCell>
                  <Typography fontWeight={700} color="white">
                    Booking ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700} color="white">
                    Client Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700} color="white">
                    Plate No.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700} color="white">
                    Service Request
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700} color="white">
                    Appointment Date and Time
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700} color="white">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No bookings yet
                  </TableCell>
                </TableRow>
              ) : (
                (rowsPerPage > 0
                  ? filteredBookings.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredBookings
                ).map((booking) => (
                  <TableRow
                    key={booking.id}
                    sx={{
                      backgroundColor:
                        booking.category === "Guest"
                          ? "#f0f7ff"
                          : booking.category === "Walk-in"
                          ? "#ffffe0"
                          : booking.category === "Registered"
                          ? "#f0fff4"
                          : "inherit",
                    }}
                  >
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>{booking.plateNumber}</TableCell>
                    <TableCell>{booking.serviceRequest}</TableCell>
                    <TableCell>
                      {booking.bookedDate} {booking.bookedTime}
                    </TableCell>
                    <TableCell>
                      <ul className="flex gap-3">
                        <li
                          onClick={() => handleOpenViewDialog(booking)}
                          className="font-semibold cursor-pointer hover:text-blue-600"
                        >
                          View
                        </li>
                        <li
                          onClick={handleCancelAppointment}
                          className="font-semibold cursor-pointer hover:text-red-600"
                        >
                          Cancel
                        </li>
                        <li
                          onClick={handleApproveAppointment}
                          className="font-semibold cursor-pointer hover:text-green-600"
                        >
                          Approve
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={bookings.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        {openView && (
          <AdminViewBookingModal
            onConfirmCancel={handleCancelAppointment}
            onConfirmApprove={handleApproveAppointment}
            data={selectedBooking}
            onClose={handleCloseViewDialog}
            open={openView}
          />
        )}
        {openAddBooking && (
          <AdminAddBookingModal
            onClose={handleCloseAddBookingDialog}
            open={openAddBooking}
          />
        )}
      </div>
    </div>
  );
};

export default BookingListAdmin;
