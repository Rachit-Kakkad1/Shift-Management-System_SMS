import moment from "moment-timezone";

const DAYS = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const HorizontalTable = ({ selectedMonth, handleFilter, filteredEvents }) => {
  return (
    <table className="table-auto border-collapse w-full text-sm">
      <thead>
        <tr>
          <th className="border px-2 py-1 bg-gray-100">Date</th>
          <th className="border px-2 py-1 bg-gray-100">Day</th>
          {handleFilter()?.map((user) => (
            <th
              key={user._id}
              className="border px-2 py-1 bg-gray-100 text-center"
            >
              <span
                className={`${
                  user?.team === "sozialarbeiter"
                    ? "text-blue-500"
                    : user?.team === "sozialbetreuer"
                    ? "text-red-500"
                    : "text-yellow-600"
                }`}
              >
                {user?.name}
              </span>
            </th>
          ))}
          <th className="border px-2 py-1 bg-gray-100">Date</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(
          { length: moment(selectedMonth).daysInMonth() },
          (_, i) => i + 1
        ).map((day, index) => (
          <tr key={index}>
            <td className="border px-2 py-1 font-semibold bg-gray-50 text-center">
              {moment(selectedMonth)
                .startOf("month")
                .add(index, "day")
                .format("MM/DD/YYYY")}
            </td>
            <td
              className={`border px-2 py-1 font-semibold ${
                DAYS[
                  moment(selectedMonth)
                    .startOf("month")
                    .add(index, "day")
                    .isoWeekday()
                ] === "Sat" ||
                DAYS[
                  moment(selectedMonth)
                    .startOf("month")
                    .add(index, "day")
                    .isoWeekday()
                ] === "Sun"
                  ? "bg-gray-400"
                  : "bg-gray-50"
              }  text-center`}
            >
              {
                DAYS[
                  moment(selectedMonth)
                    .startOf("month")
                    .add(index, "day")
                    .isoWeekday()
                ]
              }
            </td>
            {handleFilter()?.map((user) => (
              <td
                key={user._id}
                className={`border px-2 py-1 font-semibold text-center ${(() => {
                  const eventForDay = filteredEvents
                    .filter((event) => event.employee._id === user._id)
                    .find((event) => {
                      const dd = moment(event.start).format("DD");
                      const hour = moment(event.start).format("HH:mm");
                      return dd == day && (hour == "08:00" || hour == "13:30");
                    });

                  if (eventForDay) {
                    const hour = moment(eventForDay.start).format("HH:mm");
                    if (hour === "08:00") return "bg-yellow-100";
                    if (hour === "13:30") return "bg-purple-100";
                  }
                  return "bg-gray-50";
                })()}`}
              >
                {(() => {
                  const eventForDay = filteredEvents
                    .filter((event) => event.employee._id === user._id)
                    .find((event) => {
                      const dd = moment(event.start).format("DD");
                      const hour = moment(event.start).format("HH:mm");
                      return dd == day && (hour == "08:00" || hour == "13:30");
                    });

                  if (eventForDay) {
                    const hour = moment(eventForDay.start).format("HH:mm");
                    if (hour === "08:00") return "Morning";
                    if (hour === "13:30") return "Evening";
                  }
                  return "";
                })()}
              </td>
            ))}
            <td className="border px-2 py-1 font-semibold bg-gray-50 text-center">
              {moment(selectedMonth)
                .startOf("month")
                .add(index, "day")
                .format("MM/DD/YYYY")}
            </td>
          </tr>
        ))}
        <tr>
          <td className="border px-2 py-1 font-semibold text-center bg-gray-100">
            Count
          </td>
          <td className="border px-2 py-1 font-semibold text-center bg-gray-100">
            #
          </td>
          {handleFilter()?.map((user) => (
            <td
              key={user._id}
              className="border px-2 py-1 font-semibold text-center bg-green-100"
            >
              {
                filteredEvents.filter(
                  (event) => event.employee._id === user._id
                ).length
              }
            </td>
          ))}
          <td className="border px-2 py-1 font-semibold text-center bg-gray-100">
            #
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default HorizontalTable;
