import { viewDay, viewMonthGrid } from "@schedule-x/calendar";
import DashboardCalendar from "./DashboardCalendar";

const CalendarSelector = ({
  events,
  setEvents,
  handleShiftUpdate,
  handleClick,
  editMode,
  teamFilter,
}) => {
  const activeEvents = teamFilter === "all" 
    ? events 
    : events.filter((event) => event.calendarId === teamFilter);

  return (
    <div className="relative group">
        <DashboardCalendar
          events={activeEvents}
          setEvents={setEvents}
          views={[viewMonthGrid, viewDay]}
          editMode={editMode}
          handleClick={handleClick}
          handleShiftUpdate={handleShiftUpdate}
        />
    </div>
  );
};

export default CalendarSelector;
