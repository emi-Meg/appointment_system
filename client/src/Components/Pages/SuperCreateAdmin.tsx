import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Gender } from "../../Enums/Gender";
import branches from "../../Data/InformationSelection.json";
import { Admin, Branch } from "../../Types/types";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const createAdmin = async (newAdmin: Admin) => {
  try {
    const response = await axios.post("/api/add-admin", newAdmin);
    return response.data;
  } catch (error: any) {
    console.error("Error creating admin:", error);
    throw new Error(
      error.response ? error.response.data.message : "Network error"
    );
  }
};

const SuperCreateAdmin: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [branchName, setBranchName] = useState<Branch | null>(null);
  const [branchCode, setBranchCode] = useState<string>("");
  const [position, setPosition] = useState<string[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const queryClient = useQueryClient();
  const mutation = useMutation(createAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin"]);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Admin added successfully!",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) {
          handleReset();
        }
      });
    },
  });

  const handleCreateAdmin = (event: any) => {
    event.preventDefault();

    const newAdmin: Admin = {
      id: "",
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      gender: gender.trim(),
      branchName: branchName?.branchName || "",
      branchCode: branchCode.trim(),
      position: position.join(", "),
      password: password.trim(),
    };

    if (!newAdmin.firstName || !newAdmin.lastName) {
      console.error("Required fields are missing");
      return;
    }

    mutation.mutate(newAdmin);
  };

  const handleBranchChange = (_event: any, newValue: Branch | null) => {
    setBranchName(newValue);
    if (newValue) {
      setBranchCode(newValue.branchCode);
      setPosition(newValue.position);
    } else {
      setBranchCode("");
      setPosition([]);
    }
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setGender("");
    setBranchName(null);
    setBranchCode("");
    setPosition([]);
    setPassword("");
  };

  return (
    <div className="w-full lg:px-96">
      <div className="pb-10 md:pb-20 shadow-lg border-2 border-[#EBEBE4] rounded-xl">
        <div className="flex justify-end px-5 pt-3 md:px-10 md:pt-5">
          <Link to='/dev/admins-list'>
          <button><FontAwesomeIcon icon={faXmark} size="lg" color="#333"/></button>
          </Link>
        </div>
      <div className="my-5 w-full">
        <h3 className="uppercase text-xl lg:text-3xl font-semibold text-center">
          Create New Admin Account
        </h3>
      </div>
      <form onSubmit={handleCreateAdmin}>
        <div className="w-full flex flex-col gap-2 items-center px-5 md:px-0">
          <div className="space-y-2 w-full md:w-[500px]">
            <h4 className="text-base lg:text-xl font-medium">Personal Information</h4>
            <TextField
              size="small"
              name="firstName"
              value={firstName}
              label="First Name"
              onChange={(event) => setFirstName(event.target.value)}
              fullWidth
            />
            <TextField
              size="small"
              name="lastName"
              value={lastName}
              label="Last Name"
              onChange={(event) => setLastName(event.target.value)}
              fullWidth
            />
            <TextField
              size="small"
              name="email"
              value={email}
              label="Email"
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
            />
            <FormControl size="small" variant="outlined" fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={gender}
                onChange={(event: SelectChangeEvent<string>) => {
                  setGender(event.target.value);
                }}
                label="Gender"
              >
                {Object.values(Gender).map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender.charAt(0).toUpperCase() +
                      gender.slice(1).replace(/-/g, " ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="space-y-2 w-full md:w-[500px]">
            <h4 className="text-base lg:text-xl font-medium">Designation</h4>
            <Autocomplete
              options={branches}
              getOptionLabel={(option) => option.branchName}
              onChange={handleBranchChange}
              renderInput={(params) => (
                <TextField {...params} label="Branch Name" variant="outlined" />
              )}
              value={branchName}
              fullWidth
              size="small"
            />
            <TextField
              value={branchCode}
              slotProps={{ input: { readOnly: true } }}
              fullWidth
              size="small"
              label="Branch Code"
            />
            <Autocomplete
              options={position}
              getOptionLabel={(option) => option}
              onChange={(_event, newValue) => {
                setSelectedPosition(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Position" variant="outlined" />
              )}
              value={selectedPosition}
              fullWidth
              size="small"
            />
          </div>
          <div className="w-full md:w-[500px]">
            <h4 className="text-base lg:text-xl font-medium">Create Password</h4>
            <TextField
              type="password"
              value={password}
              size="small"
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
            />
          </div>
          <div className="w-full md:w-[500px] justify-between flex gap-3">
            <button
              onClick={handleReset}
              className="bg-gray-600 text-white py-2 w-full rounded-md font-semibold hover:shadow-xl active:bg-gray-900 transition-all duration-300 active:scale-95"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white py-2 w-full rounded-md font-semibold hover:shadow-xl active:bg-green-900 transition-all duration-300 active:scale-95"
            >
              {mutation.isLoading ? "Adding..." : "Add Admin"}
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default SuperCreateAdmin;
