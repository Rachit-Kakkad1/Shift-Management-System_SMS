import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import "@schedule-x/theme-default/dist/index.css";
import { viewWeek, viewDay, viewMonthGrid } from "@schedule-x/calendar";

const UserCalendar = ({ events }) => {
  const calendar = useCalendarApp({
    calendars: {
      sozialarbeiter: {
        colorName: "sozialarbeiter",
        lightColors: {
          main: "#f97316",
          container: "#fff7ed",
          onContainer: "#7c2d12",
        },
      },
      sozialbetreuer: {
        colorName: "sozialbetreuer",
        lightColors: {
          main: "#1c1917",
          container: "#f5f5f4",
          onContainer: "#1c1917",
        },
      },
      sozialbetreuerhelfer: {
        colorName: "sozialbetreuerhelfer",
        lightColors: {
          main: "#f59e0b",
          container: "#fffbeb",
          onContainer: "#78350f",
        },
      },
      partTime: {
        colorName: "partTime",
        lightColors: {
          main: "#10b981",
          container: "#ecfdf5",
          onContainer: "#064e3b",
        },
      },
    },
    locale: "en-US",
    defaultView: viewMonthGrid.name,
    skipValidation: true,
    monthGridOptions: {
      nEventsPerDay: 16,
    },
    dayBoundaries: {
      start: "07:00",
      end: "23:00",
    },
    showWeekNumbers: true,
    events: events,
    views: [viewWeek, viewDay, viewMonthGrid],
    isDark: false,
  });

  return (
    <div className="h-[700px] w-full">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default UserCalendar;
