import {
  Avatar,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import notifs from "../../Data/NotificationsData.json";
import { Gender } from "../../Enums/Gender";
import admin_female from "../../Assets/Svg/admin-female-profile.svg";
import admin_male from "../../Assets/Svg/admin-male-profile.svg";

const AdminNotifications: React.FC = () => {
  const [entries, setEntries] = useState<number>(20);
  const [unread, setUnread] = useState<boolean>(false);

  const handleEntriesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEntries(Number(e.target.value));
  };

  const handleSwitch = () => {
    setUnread((prev) => !prev);
  };

  const filteredUnreadNotifs = unread
    ? notifs.filter((notif) => notif.status === "Unread")
    : notifs;

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between w-full">
        <h3 className="text-lg lg:text-xl font-bold mb-2">Notifications</h3>
        <FormControlLabel
          control={
            <Switch checked={unread} size="small" onChange={handleSwitch} />
          }
          label="Only Show Unread"
          sx={{ whiteSpace: "nowrap" }}
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between mt-2 mb-5">
        <div className="flex items-center space-x-2 text-gray-700">
          <span>Show</span>
          <select
            value={entries}
            onChange={handleEntriesChange}
            className="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>notifications</span>
        </div>
        <a href="" className="font-semibold mt-2 text-blue-500">
          Mark All as Read
        </a>
      </div>
      <Divider />
      <div className="mb-5">
        {filteredUnreadNotifs.map((notif) => (
          <List
            sx={{ width: "100%", bgcolor: "background.paper"}}
            key={notif.id}
          >
            <ListItem alignItems="flex-start">
              <div className="flex flex-col lg:flex-row justify-between w-full items-center">
                <div className="flex">
                  <ListItemAvatar
                    sx={{
                      display: { md: "block", xs: "none" },
                    }}
                  >
                    <Avatar
                      alt={notif.firstName}
                      src={
                        notif.gender === Gender.Female
                          ? admin_female
                          : admin_male
                      }
                      sx={{
                        bgcolor: notif.gender === "Female" ? "pink" : "#B0E0E6",
                        color: "#333",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={notif.header}
                    primaryTypographyProps={{
                      fontWeight: notif.status === "Unread" ? 700 : 300,
                    }}
                    secondary={
                      <div
                        className={
                          notif.status === "Unread" ? "font-semibold" : ""
                        }
                      >
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            color: "text.primary",
                            display: "inline",
                            fontWeight: notif.status === "Unread" ? 700 : 300,
                          }}
                        >
                          {notif.firstName} {notif.lastName}
                        </Typography>
                        {"- "}
                        {notif.body}
                      </div>
                    }
                  />
                </div>
                <div>
                  <a
                    href=""
                    className={
                      notif.status === "Unread"
                        ? "font-medium text-blue-500"
                        : "font-medium text-[#A9A9A9]"
                    }
                  >
                    Mark as Read
                  </a>
                </div>
              </div>
            </ListItem>
            <Divider component="li" />
          </List>
        ))}
      </div>
    </>
  );
};

export default AdminNotifications;
