import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { appointment } from "../../Data/Appointments";

const MyCalendar: React.FC = () => {
  const handleDateClick = (arg: any) => {
    alert("Date: " + arg.dateStr);
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
          events={appointment}
          dateClick={handleDateClick}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
