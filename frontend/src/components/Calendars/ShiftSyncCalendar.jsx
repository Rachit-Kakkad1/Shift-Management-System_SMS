import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { 
  viewMonthGrid, 
  viewWeek, 
  viewDay 
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { useEffect, useState } from "react";
import "@schedule-x/theme-default/dist/index.css";
import { motion } from "framer-motion";

const ShiftSyncCalendar = ({ 
  events, 
  role, 
  onEventUpdate, 
  onEventClick,
  userId 
}) => {
  const isManagement = role === 'admin' || role === 'hr';

  const plugins = [
    createEventModalPlugin(),
  ];

  if (isManagement) {
    plugins.push(createDragAndDropPlugin());
  }

  const calendar = useCalendarApp({
    views: [viewMonthGrid, viewWeek, viewDay],
    events: events,
    plugins: plugins,
    calendars: {
      sozialarbeiter: {
        colorName: "sozialarbeiter",
        lightColors: {
          main: "#0d9488", // Teal 600
          container: "#f0fdfa", // Teal 50
          onContainer: "#134e4a", // Teal 900
        },
      },
      sozialbetreuer: {
        colorName: "sozialbetreuer",
        lightColors: {
          main: "#0891b2", // Cyan 600
          container: "#ecfeff", // Cyan 50
          onContainer: "#164e63", // Cyan 900
        },
      },
      sozialbetreuerhelfer: {
        colorName: "sozialbetreuerhelfer",
        lightColors: {
          main: "#4f46e5", // Indigo 600
          container: "#eef2ff", // Indigo 50
          onContainer: "#312e81", // Indigo 900
        },
      },
      partTime: {
        colorName: "partTime",
        lightColors: {
          main: "#059669", // Emerald 600
          container: "#ecfdf5", // Emerald 50
          onContainer: "#064e3b", // Emerald 900
        },
      },
    },
    dayBoundaries: {
      start: "06:00",
      end: "23:00",
    },
    callbacks: {
      onEventUpdate(updatedEvent) {
        if (isManagement && onEventUpdate) {
          onEventUpdate(updatedEvent);
        }
      },
      onEventClick(calendarEvent) {
        if (onEventClick) {
          onEventClick(calendarEvent);
        }
      }
    }
  });

  // Sync events if they change externally
  useEffect(() => {
    if (calendar && calendar.events) {
      calendar.events.set(events);
    }
  }, [events, calendar]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="shiftsync-calendar-wrapper h-[800px] w-full"
    >
      <ScheduleXCalendar calendarApp={calendar} />
      
      <style>{`
        .sx__calendar-wrapper {
          --sx-color-primary: #0d9488;
          --sx-color-on-primary: #ffffff;
          --sx-border-radius: 24px;
        }
        .sx__event {
          border-radius: 12px !important;
          padding: 4px 8px !important;
          font-weight: 600 !important;
          border: 1px solid rgba(0,0,0,0.05) !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
          transition: transform 0.2s, box-shadow 0.2s !important;
        }
        .sx__event:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
        }
        .sx__month-grid-day--today, .sx__week-grid__day--today {
          background-color: rgba(13, 148, 136, 0.03) !important;
        }
        .sx__time-grid-event {
          border-radius: 12px !important;
        }
        /* Role specific highlighting for employees */
        ${userId ? `
          .sx__event[data-uid="${userId}"] {
            ring: 3px solid #0d9488 !important;
            box-shadow: 0 0 15px rgba(13, 148, 136, 0.3) !important;
          }
        ` : ''}
      `}</style>
    </motion.div>
  );
};

export default ShiftSyncCalendar;
