import { Grid2, TableHead } from "@mui/material";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import bookings from "../../Data/Bookings.json";
import { Link } from "react-router-dom";
import CancelBookingModal from "../Utils/UserCancelBookingModal";
import TablePaginationActions from "../Common/TablePaginationActions";

const MyBookings: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClickOpen = (id: string) => {
    setOpen(true);
    console.log("Opening dialog for booking ID:", id);
    setSelectedId(id);
  };

  const handleClose = () => {
    setOpen(false);
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
  return (
    <>
      <ThemeProvider theme={muiThemeContext}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ lg: 2, sm: 1, xs: 1 }} />
          <Grid2 size={{ lg: 8, sm: 10, xs: 10 }}>
            <div className="flex flex-col mt-10">
              <div>
                <div className="flex items-center">
                  <BookOnlineIcon />
                  <h2 className="text-2xl font-bold ml-2">
                    MANAGE YOUR BOOKINGS
                  </h2>
                </div>
                <Link to="/user/addbooking">
                  <button className="bg-[#228B22] transition-all duration-100 active:scale-95 active:bg-green-700 text-white h-9 w-36 rounded-3xl font-semibold mt-5">
                    Add Booking
                  </button>
                </Link>
              </div>
              <div className="mt-2">
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 500 }}
                    aria-label="custom pagination table"
                  >
                    <TableHead
                      sx={{
                        backgroundColor: "#F0F8FF",
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <strong>Booking Code</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Branch</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Vehicle Type</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Plate No.</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Service Request</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Appointment Date and Time</strong>
                        </TableCell>
                        <TableCell align="center">
                          <strong>Actions</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            No bookings yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        (rowsPerPage > 0
                          ? bookings.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : bookings
                        ).map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell component="th" scope="row">
                              {booking.id}
                            </TableCell>
                            <TableCell align="left">{booking.branch}</TableCell>
                            <TableCell align="left">
                              {booking.vehicleType}
                            </TableCell>
                            <TableCell align="left">
                              {booking.plateNumber}
                            </TableCell>
                            <TableCell align="left">
                              {booking.serviceRequest}
                            </TableCell>
                            <TableCell align="left">
                              {booking.date} - {booking.time}
                            </TableCell>
                            <TableCell align="center">
                              <Link to={`/user/viewbooking/${booking.id}`}>
                                <button className="bg-[#007BFF] text-white px-2 py-1 rounded-3xl">
                                  View
                                </button>
                              </Link>{" "}
                              <Link to={`/user/editbooking/${booking.id}`}>
                                <button className="bg-[#FFC107] text-white px-2 py-1 rounded-3xl">
                                  Edit
                                </button>
                              </Link>{" "}
                              <button
                                className="bg-[#DC3545] text-white px-2 py-1 rounded-3xl"
                                onClick={() => handleClickOpen(booking.id)}
                              >
                                Cancel
                              </button>
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
                          rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            { label: "All", value: -1 },
                          ]}
                          colSpan={7}
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
                <CancelBookingModal
                  open={open}
                  onClose={handleClose}
                  bookingId={selectedId}
                />
              </div>
            </div>
          </Grid2>
          <Grid2 size={{ lg: 2, sm: 1, xs: 1 }} />
        </Grid2>
      </ThemeProvider>
    </>
  );
};

export default MyBookings;
