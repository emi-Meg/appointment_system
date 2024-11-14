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
import React, { ChangeEvent, MouseEvent, useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Admin, FetchError } from "../../Types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSort,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TablePaginationActions from "../Common/TablePaginationActions";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Link } from "react-router-dom";

const fetchAdmins = async (): Promise<Admin[]> => {
  try {
    const response = await axios.get("/api/admin-list");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response ? error.response.data : "Network error");
  }
};

const SuperAdminsList: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    data: admins = [],
    error,
    isLoading,
  } = useQuery<Admin[], FetchError>("admins", fetchAdmins, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Admin;
    direction: "ascending" | "descending";
  } | null>(null);

  const sortedAdmins = useMemo(() => {
    let sortableAdmins = [...admins];
    if (sortConfig) {
      sortableAdmins.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableAdmins;
  }, [admins, sortConfig]);

  const filteredAdmins = useMemo(() => {
    if (!searchQuery) return sortedAdmins;
    return sortedAdmins.filter((admin) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        admin.lastName.toLowerCase().includes(searchLower) ||
        admin.firstName.toLowerCase().includes(searchLower) ||
        admin.email.toLowerCase().includes(searchLower) ||
        admin.gender.toLowerCase().includes(searchLower) ||
        admin.branchName.toLowerCase().includes(searchLower) ||
        admin.branchCode.toLowerCase().includes(searchLower) ||
        admin.position.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery, sortedAdmins]);

  const requestSort = (key: keyof Admin) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    event?.preventDefault();
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredAdmins.length)
      : 0;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <div className="mb-5 flex items-center gap-2 md:gap-0 justify-between">
      {/* Search Input */}
      <FormControl
        sx={{ width: { xs: "100%", md: "25ch" }}}
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
      <Link to='/dev/create-admin'>
      <button className="bg-[#FF6600] text-white active:scale-95 whitespace-nowrap py-1 px-2 md:px-3 md:py-2 rounded-3xl font-semibold">Add Admin</button>
      </Link>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#0033A0" }}>
              {[
                "lastName",
                "firstName",
                "email",
                "gender",
                "branchName",
                "branchCode",
                "position",
              ].map((key) => (
                <TableCell key={key}>
                  <Typography fontWeight={700} color="white">
                    {key
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .replace(/^./, (str) => str.toUpperCase())}{" "}
                    <FontAwesomeIcon
                      icon={faSort}
                      className="cursor-pointer text-white"
                      size="xs"
                      onClick={() => requestSort(key as keyof Admin)}
                    />
                  </Typography>
                </TableCell>
              ))}
              <TableCell>
                <Typography fontWeight={700} color="white">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredAdmins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No administrators yet
                </TableCell>
              </TableRow>
            ) : (
              filteredAdmins
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((admin: any) => (
                  <TableRow key={admin.id}>
                    <TableCell>{admin.lastName}</TableCell>
                    <TableCell>{admin.firstName}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.gender}</TableCell>
                    <TableCell>{admin.branchName}</TableCell>
                    <TableCell>{admin.branchCode}</TableCell>
                    <TableCell>{admin.position}</TableCell>
                    <TableCell>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="xl"
                        className="cursor-pointer active:scale-90 active:text-black mr-3"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="xl"
                        className="cursor-pointer active:scale-90 active:text-black"
                      />
                    </TableCell>
                  </TableRow>
                ))
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={9} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={9}
                count={filteredAdmins.length}
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
  );
};

export default SuperAdminsList;
