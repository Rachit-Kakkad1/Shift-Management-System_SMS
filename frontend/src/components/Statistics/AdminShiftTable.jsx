import { useEffect, useState } from "react";
import { RiResetLeftFill } from "react-icons/ri";
import VertikalTable from "./VertikalTable";
import HorizontalTable from "./HorizontalTable";
import { TbFileOrientation } from "react-icons/tb";

const AdminShiftTable = ({ selectedMonth, users, filteredEvents }) => {
  const [teamFilter, setTeamFilter] = useState("all");
  const [workFilter, setWorkFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [orientation, setOrientation] = useState(true);

  const handleFilter = () => {
    let filtered = users;
    if (teamFilter !== "all") {
      filtered = filtered.filter((user) => user.team === teamFilter);
    } else {
      filtered = filtered.filter((user) => user.team);
    }
    if (workFilter !== "all") {
      filtered = filtered.filter((user) => user.workType === workFilter);
    } else {
      filtered = filtered.filter((user) => user.workType);
    }
    if (activeFilter === "active") {
      filtered = filtered.filter((user) => user.isActive);
    } else if (activeFilter === "deactive") {
      filtered = filtered.filter((user) => !user.isActive);
    } else {
      filtered = filtered.filter((user) => user.isActive !== "");
    }
    return filtered;
  };

  const handleReset = () => {
    setTeamFilter("all");
    setWorkFilter("all");
    setActiveFilter("all");
  };

  useEffect(() => {
    handleFilter();
  }, [teamFilter, workFilter, activeFilter]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <button
          className="flex md:flex download-btn shadow-sm focus:ring-2 focus:ring-primary"
          onClick={() => setOrientation(!orientation)}
          aria-label="Toggle table orientation"
        >
          <TbFileOrientation className="text-lg" />
        </button>
        <span className="select-boxx" aria-live="polite">{`Count: ${
          handleFilter()?.length
        }`}</span>
        <select
          className="select-boxx focus:ring-2 focus:ring-primary"
          onChange={(e) => setTeamFilter(e.target.value)}
          value={teamFilter}
          aria-label="Filter by team"
        >
          <option value="all">All Teams</option>
          <option value="sozialarbeiter">Social Workers</option>
          <option value="sozialbetreuer">Social Caregivers</option>
          <option value="sozialbetreuerhelfer">Social Caregiver Assistants</option>
        </select>
        <select
          className="select-boxx focus:ring-2 focus:ring-primary"
          onChange={(e) => setWorkFilter(e.target.value)}
          value={workFilter}
          aria-label="Filter by work type"
        >
          <option value="all">All Work Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
        </select>
        <select
          className="select-boxx focus:ring-2 focus:ring-primary"
          onChange={(e) => setActiveFilter(e.target.value)}
          value={activeFilter}
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="deactive">Inactive</option>
        </select>
        {(teamFilter !== "all" || workFilter !== "all") && (
          <button
            className="flex md:flex download-btn shadow-sm focus:ring-2 focus:ring-primary"
            onClick={handleReset}
            aria-label="Reset filters"
          >
            <RiResetLeftFill className="text-lg" />
            Reset
          </button>
        )}
      </div>

      {orientation ? (
        <VertikalTable
          selectedMonth={selectedMonth}
          handleFilter={handleFilter}
          filteredEvents={filteredEvents}
        />
      ) : (
        <HorizontalTable
          selectedMonth={selectedMonth}
          handleFilter={handleFilter}
          filteredEvents={filteredEvents}
        />
      )}
    </>
  );
};

export default AdminShiftTable;
