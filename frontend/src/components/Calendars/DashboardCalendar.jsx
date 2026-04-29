import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import "@schedule-x/theme-default/dist/index.css";

const DashboardCalendar = ({
  events,
  views,
  day = null,
  handleShiftUpdate,
  editMode,
  handleClick,
}) => {
  const calendar = useCalendarApp({
    calendars: {
      sozialarbeiter: {
        colorName: "sozialarbeiter",
        lightColors: {
          main: "#f97316", // Orange 500
          container: "#fff7ed", // Orange 50
          onContainer: "#7c2d12", // Orange 900
        },
      },
      sozialbetreuer: {
        colorName: "sozialbetreuer",
        lightColors: {
          main: "#1c1917", // Stone 900
          container: "#f5f5f4", // Stone 100
          onContainer: "#1c1917", // Stone 900
        },
      },
      sozialbetreuerhelfer: {
        colorName: "sozialbetreuerhelfer",
        lightColors: {
          main: "#f59e0b", // Amber 500
          container: "#fffbeb", // Amber 50
          onContainer: "#78350f", // Amber 900
        },
      },
      partTime: {
        colorName: "partTime",
        lightColors: {
          main: "#10b981", // Emerald 500
          container: "#ecfdf5", // Emerald 50
          onContainer: "#064e3b", // Emerald 900
        },
      },
    },
    locale: "en-US",
    selectedDate: day,
    views: views,
    skipValidation: true,
    monthGridOptions: {
      nEventsPerDay: 18,
    },
    dayBoundaries: {
      start: "07:00",
      end: "23:00",
    },
    showWeekNumbers: true,
    plugins: [createEventModalPlugin()],
    events: events,
    isDark: false,
    callbacks: {
      onEventUpdate(updatedEvent) {
        if (editMode) handleShiftUpdate(updatedEvent);
      },
      onEventClick(calendarEvent) {
        if (editMode) handleClick(calendarEvent);
      },
    },
  });

  return (
    <div className="h-[750px] w-full transition-all duration-1000 ease-in-out">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default DashboardCalendar;
