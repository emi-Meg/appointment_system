import { faCalendarCheck as farCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  pieData,
  recordsTable,
  totalAppointments,
  totalCancel,
  totalFeedbacks,
  totalTypes,
} from "../../Data/GraphsData";
import { faBan, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import {
  Paper,
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
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
  Gauge,
  gaugeClasses,
} from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts";
import TablePaginationActions from "../Common/TablePaginationActions";

const AdminReports: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const chartSetting = {
    yAxis: [
      {
        label: "Appointments",
      },
    ],
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-10px, 0)",
      },
    },
  };

  const dataset = [
    {
      kia: 59,
      suzuki: 57,
      smct: 86,
      desStrong: 21,
      month: "Jan",
    },
    {
      kia: 50,
      suzuki: 52,
      smct: 78,
      desStrong: 28,
      month: "Feb",
    },
    {
      kia: 47,
      suzuki: 53,
      smct: 106,
      desStrong: 41,
      month: "Mar",
    },
    {
      kia: 54,
      suzuki: 56,
      smct: 92,
      desStrong: 73,
      month: "Apr",
    },
    {
      kia: 57,
      suzuki: 69,
      smct: 92,
      desStrong: 99,
      month: "May",
    },
    {
      kia: 60,
      suzuki: 63,
      smct: 103,
      desStrong: 144,
      month: "June",
    },
    {
      kia: 59,
      suzuki: 60,
      smct: 105,
      desStrong: 319,
      month: "July",
    },
    {
      kia: 65,
      suzuki: 60,
      smct: 106,
      desStrong: 249,
      month: "Aug",
    },
    {
      kia: 51,
      suzuki: 51,
      smct: 95,
      desStrong: 131,
      month: "Sept",
    },
    {
      kia: 60,
      suzuki: 65,
      smct: 97,
      desStrong: 55,
      month: "Oct",
    },
    {
      kia: 67,
      suzuki: 64,
      smct: 76,
      desStrong: 48,
      month: "Nov",
    },
    {
      kia: 61,
      suzuki: 70,
      smct: 103,
      desStrong: 25,
      month: "Dec",
    },
  ];

  function GaugePointer() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();

    if (valueAngle === null) {
      // No value to display
      return null;
    }

    const target = {
      x: cx + outerRadius * Math.sin(valueAngle),
      y: cy - outerRadius * Math.cos(valueAngle),
    };
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill="red" />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="red"
          strokeWidth={3}
        />
      </g>
    );
  }

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - recordsTable.length) : 0;

  return (
    <>
      <div className="flex lg:flex-row flex-col gap-2 justify-evenly lg:gap-2 w-full mb-3">
        <div className="shadow-lg hover:shadow-2xl hover:-translate-x-2 hover:-translate-y-2 hover:scale-105 duration-75 transition-all cursor-pointer px-7 py-10 flex justify-between rounded-md w-full bg-blue-600">
          <div>
            <FontAwesomeIcon icon={farCalendarCheck} size="2x" color="white" />
            <p className="font-semibold text-4xl text-white">
              {totalAppointments[0].value}
            </p>
            <p className="text-white font-medium">
              {totalAppointments[0].name}
            </p>
          </div>
          <div>
            <Gauge
              width={100}
              value={60}
              cornerRadius="50%"
              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 16,
                  color: "white !important",
                  fontWeight: 700,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: "#FF6B6B",
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.text.disabled,
                },
              })}
            />
          </div>
        </div>
        <div className="shadow-lg hover:shadow-2xl hover:-translate-x-2 hover:-translate-y-2 hover:scale-105 duration-75 transition-all cursor-pointer px-7 py-10 flex justify-between rounded-md w-full bg-pink-600">
          <div>
            <FontAwesomeIcon icon={faBan} size="2x" color="white" />
            <p className="font-semibold text-4xl text-white">
              {totalCancel[0].value}
            </p>
            <p className="text-white font-medium">{totalCancel[0].name}</p>
          </div>
          <div>
            <Gauge
              width={100}
              value={45}
              cornerRadius="50%"
              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 16,
                  color: "white",
                  fontWeight: 700,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: "#5EEAD4",
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.text.disabled,
                },
              })}
            />
          </div>
        </div>
        <div className="shadow-lg hover:shadow-2xl hover:-translate-x-2 hover:-translate-y-2 hover:scale-105 duration-75 transition-all cursor-pointer px-7 py-10 flex justify-between rounded-md w-full bg-green-600">
          <div>
            <FontAwesomeIcon icon={faLayerGroup} size="2x" color="white" />
            <p className="font-semibold text-4xl text-white">
              {totalTypes[0].value}
            </p>
            <p className="text-white font-medium">{totalTypes[0].name}</p>
          </div>
          <div>
            <Gauge
              width={100}
              value={105}
              cornerRadius="50%"
              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 16,
                  color: "white",
                  fontWeight: 700,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: "#FFF4C0",
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.text.disabled,
                },
              })}
            />
          </div>
        </div>
        <div className="shadow-lg hover:shadow-2xl hover:-translate-x-2 hover:-translate-y-2 hover:scale-105 duration-75 transition-all cursor-pointer px-7 py-10 flex justify-between rounded-md w-full bg-orange-600">
          <div>
            <FontAwesomeIcon icon={farCalendarCheck} size="2x" color="white" />
            <p className="font-semibold text-4xl text-white">
              {totalFeedbacks[0].value}
            </p>
            <p className="text-white font-medium">{totalFeedbacks[0].name}</p>
          </div>
          <div>
            <Gauge
              width={100}
              value={24}
              cornerRadius="50%"
              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 16,
                  color: "white",
                  fontWeight: 700,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: "#E6B2FF",
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.text.disabled,
                },
              })}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row col-span-2 lg:gap-2 w-full mb-3">
        <div className="row-span-2 w-full shadow-lg px-1 py-2 lg:px-7 lg:py-10">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
            series={[
              {
                data: [2, 6.0, 5, 2, 5, 7, 8, 4, 8, 5, 6.2, 10],
                color: "rgba(110, 231, 183, 1)",
                label: "No-Show",
              },
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5, 2, 4, 8, 5, 6.2, 9],
                color: "rgba(255, 100, 100, 1)",
                label: "Canceled",
              },
              {
                data: [1, 7, 8, 8.1, 2, 5, 2, 4, 8, 5, 6.2, 4],
                color: "rgba(96, 165, 250, 1)",
                label: "Completed",
              },
            ]}
            height={300}
          />
        </div>
        <div className="row-span-2 w-full shadow-lg px-1 py-2 lg:px-7 lg:py-10">
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[
              { dataKey: "kia", label: "Kia", color: "#b0b3b8" },
              { dataKey: "suzuki", label: "Suzuki", color: "#FFD700" },
              { dataKey: "smct", label: "SMCT", color: "#0033A0" },
              {
                dataKey: "desStrong",
                label: "DES Strong Motors",
                color: "#FF6600",
              },
            ]}
            {...chartSetting}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-3 gap-2 w-full">
        <div className="col-span-1 lg:col-span-3 row-span-1 lg:row-span-2 shadow-lg px-7 py-10">
          <h4 className="mb-3 font-semibold text-xl">2024 Records</h4>
          <TableContainer
            component={Paper}
            sx={{ borderRadius: "5px", overflow: "hidden" }}
          >
            <Table
              sx={{
                borderCollapse: "collapse",
                border: "1px solid #E0E0E0",
              }}
            >
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell align="center">
                    <Typography fontWeight={700}>Service Type</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={700}>Available Slots</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={700}>Clients</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={700}>Overall Bookings</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={700}>Booked Daily</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recordsTable
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((record) => (
                    <TableRow key={record.serviceType}>
                      <TableCell align="center">{record.serviceType}</TableCell>
                      <TableCell align="center">
                        {record.availableSlots}
                      </TableCell>
                      <TableCell align="center">
                        {record.clients.join(", ")}
                      </TableCell>
                      <TableCell align="center">{record.overall}</TableCell>
                      <TableCell align="center">
                        {record.dailyBooking}
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
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
                    colSpan={5}
                    count={recordsTable.length}
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
        </div>
        <div className="col-span-1 flex flex-col row-span-2">
          <div className="shadow-lg px-7 pb-10 pt-5 w-full">
            <p className="text-center font-semibold text-lg mb-3">
              Client Loyalty Status
            </p>
            <PieChart
              series={[
                {
                  data: pieData,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={200}
            />
          </div>
          <div className="shadow-lg px-7 pb-10 pt-5 w-full">
            <p className="text-center font-semibold text-lg mb-3">
              Monthly Revenue Target Achievement
            </p>
            <GaugeContainer
              height={200}
              startAngle={-110}
              endAngle={110}
              value={30}
              innerRadius={30}
            >
              <GaugeReferenceArc />
              <GaugeValueArc />
              <GaugePointer />
            </GaugeContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReports;
