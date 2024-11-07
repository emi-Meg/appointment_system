import {
  Autocomplete,
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import admin_female from "../../Assets/Svg/admin-female-profile.svg";
import admin_male from "../../Assets/Svg/admin-male-profile.svg";
import adminInfoData from "../../Data/AdminInformation.json";
import { Gender } from "../../Enums/Gender";
import branches from "../../Data/InformationSelection.json";

const ProfileAdmin: React.FC = () => {
  const [data, setData] = useState(adminInfoData);
  const [fname, setFname] = useState<string>(data[0].firstName);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [cNewPassword, setCNewPassword] = useState<string>("");
  // const [profilePic, setProfilePic] = useState<string | ArrayBuffer | null>();

  const handleUploadProfilePic = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <Typography
          align="center"
          marginBottom={2}
          fontWeight={700}
          fontSize={{md: "28px", xs: "20px"}}
        >
          PROFILE SETTINGS
        </Typography>
        <Box sx={{ display: "inline-block" }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={handleUploadProfilePic}
          />
          <label htmlFor="icon-button-file">
            {adminInfoData.map((admin) => (
              <Avatar
                key={admin.id}
                sx={{
                  bgcolor: admin.gender === "Female" ? "pink" : "#B0E0E6", //#B0E0E6 for male
                  color: "black",
                  width: { md: 200, xs: 130 },
                  height: { md: 200, xs: 130 },
                  marginBottom: 2,
                  cursor: "pointer",
                }}
                alt="User Avatar"
                src={admin.gender === Gender.Female ? admin_female : admin_male}
              />
            ))}
          </label>
        </Box>
        <Typography>Personal Information</Typography>
        {data.map((info, index) => (
          <div className="flex flex-col items-center w-full md:w-3/4 lg:w-1/4 mt-2">
            <div className="flex flex-col md:flex-row md:gap-2 items-center w-full">
              <TextField
                size="small"
                id="fname"
                label="First Name"
                variant="outlined"
                value={fname}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setFname(event.target.value)
                }
                sx={{
                  marginBottom: "10px",
                  width: "100%",
                }}
              />
              <TextField
                key={index}
                size="small"
                id={`lastName-${index}`}
                label="Last Name"
                variant="outlined"
                defaultValue={info.lastName}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  // setLname(event.target.value)
                  {
                    const newData = [...data];
                    newData[index].lastName = event.target.value;
                    setData(newData);
                  }
                }
                sx={{
                  marginBottom: "10px",
                  width: "100%",
                }}
              />
            </div>
            <TextField
              size="small"
              id="username"
              label="Username"
              variant="outlined"
              defaultValue={info.username}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                // setUsername(event.target.value)
                {
                  const newData = [...data];
                  newData[index].username = event.target.value;
                  setData(newData);
                }
              }
              sx={{ marginBottom: "10px", width: "100%"}}
            />
            <TextField
              type="email"
              size="small"
              id="email"
              label="Email"
              variant="outlined"
              defaultValue={info.email}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                // setEmail(event.target.value)
                {
                  const newData = [...data];
                  newData[index].email = event.target.value;
                  setData(newData);
                }
              }
              sx={{ marginBottom: "10px", width: "100%" }}
            />
            <FormControl
              size="small"
              variant="outlined"
              sx={{ marginBottom: "10px", width: "100%" }}
            >
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                defaultValue={info.gender}
                onChange={(event: SelectChangeEvent<string>) => {
                  const newData = [...data];
                  newData[index].gender = event.target.value as string;
                  setData(newData);
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
            <div className="flex flex-col md:flex-row md:gap-2 w-full">
              <Autocomplete
                size="small"
                options={branches.map((branch) => branch.branchName)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Branch Name"
                    variant="outlined"
                  />
                )}
                defaultValue={info.branchName}
                onChange={(_, newValue) => {
                  const newData = [...data];
                  newData[index].branchName = newValue || "";

                  const selectedBranch = branches.find(
                    (branch) => branch.branchName === newValue
                  );
                  newData[index].branchCode = selectedBranch
                    ? selectedBranch.branchCode
                    : "";

                  const currentPosition = newData[index].position;
                  if (
                    selectedBranch &&
                    !selectedBranch.position.includes(currentPosition)
                  ) {
                    newData[index].position = "";
                  }

                  setData(newData);
                }}
                sx={{
                  marginBottom: "10px",
                  width: "100%",
                }}
              />
              <TextField
                size="small"
                label="Branch Code"
                variant="outlined"
                value={data[index]?.branchCode || ""}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={{
                  marginBottom: "10px",
                  width: "100%",
                }}
              />
            </div>
            <Autocomplete
              size="small"
              options={
                branches.find(
                  (branch) => branch.branchName === data[index]?.branchName
                )?.position || []
              }
              renderInput={(params) => (
                <TextField {...params} label="Position" variant="outlined" />
              )}
              value={data[index]?.position || ""}
              onChange={(_, newValue) => {
                const newData = [...data];
                newData[index].position = newValue || "";
                setData(newData);
              }}
              sx={{ marginBottom: "10px", width: "100%" }}
            />
            <Typography noWrap>Change Password</Typography>
            <TextField
              type="password"
              size="small"
              id="oldPassword"
              label="Old Password"
              variant="outlined"
              value={oldPassword}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setOldPassword(event.target.value)
              }
              sx={{
                marginBottom: "10px",
                width: "100%",
                marginTop: "8px",
              }}
            />
            <TextField
              type="password"
              size="small"
              id="npassword"
              label="New Password"
              variant="outlined"
              value={newPassword}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewPassword(event.target.value)
              }
              sx={{ marginBottom: "10px", width: "100%" }}
            />
            <TextField
              type="password"
              size="small"
              id="cnpassword"
              label="Confirm New Password"
              variant="outlined"
              value={cNewPassword}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setCNewPassword(event.target.value)
              }
              sx={{ marginBottom: "10px", width: "100%" }}
            />
            <div className="flex flex-row items-center mt-2 w-full justify-center space-x-2">
              <button className="py-2 bg-slate-700 hover:bg-slate-800 transition duration-300 active:scale-95 active:border-green-950 active:shadow-2xl text-white rounded-lg w-full">
                Cancel
              </button>
              <button className="py-2 bg-green-700 hover:bg-green-800 transition duration-300 active:scale-95 active:border-gray-950 active:shadow-2xl text-white rounded-lg w-full">
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileAdmin;
