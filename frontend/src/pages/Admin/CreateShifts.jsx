import { useEffect, useState } from "react";
import StatisticBar from "../../components/StatisticBar";
import createMockData from "../../helpers/createMockData";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { viewDay, viewMonthGrid } from "@schedule-x/calendar";
import ShiftCalendar from "../../components/Calendars/ShiftCalendar";
import moment from "moment";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Save, Eye, EyeOff, Users, Clock, ArrowRight, Zap, Target, Filter } from "lucide-react";

const CreateShifts = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);

  const selectedDay = moment()
    .add(1, "months")
    .startOf("month")
    .format("YYYY-MM-DD");

  const year = selectedDay.slice(0, 4);
  const month = selectedDay.slice(5, 7);

  const handleShiftUpdate = (updated) => {
    const filtered = events.filter((event) => event.id !== updated.id);
    setEvents([...filtered, updated]);
  };

  const shiftSave = async () => {
    const isConfirmed = window.confirm(
      "This will delete existing shifts and rewrite them according to your selection!",
    );
    if (isConfirmed) {
      try {
        const deleteResponse = await axiosInstance.delete(
          API_PATH.SHIFTS.DELETE_SHIFTS_BY_MONTH(month, year),
        );
        if (deleteResponse.status === 200) {
          const response = await axiosInstance.post(
            API_PATH.SHIFTS.CREATE_SHIFTS,
            [
              ...events.map((event) => ({
                employee: event.uid,
                start: moment.tz(event.start, "Europe/Berlin").utc().format(),
                end: moment.tz(event.end, "Europe/Berlin").utc().format(),
              })),
            ],
          );
          if (response.status === 201) {
            toast.success("Shifts successfully created");
          }
        }
      } catch (error) {
        toast.error("Failed to save shifts");
      }
    }
  };

  const getAllUsers = async () => {
    try {
      const result = await axiosInstance.get(API_PATH.USERS.GET_ALL_USERS);
      if (result.data?.users?.length > 0) {
        setAllUsers(result.data.users);
      }
    } catch (error) {
      toast.error("Failed to fetch team members");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDisable = (input, shift) => {
    const team = allUsers.filter((user) => user.team === input.team);
    const morningTeam = team.filter(
      (user) => user.shiftChoice === "morning",
    ).length;
    const nightTeam = team.filter(
      (user) => user.shiftChoice === "night",
    ).length;
    if (shift === "morning") return morningTeam === Math.ceil(team.length / 2);
    if (shift === "night") return nightTeam === Math.ceil(team.length / 2);
  };

  useEffect(() => {
    const newEvents = createMockData(allUsers, selectedDay).map((event) => ({
      ...event,
      start: moment
        .utc(event.start)
        .tz("Europe/Berlin")
        .format("YYYY-MM-DD HH:mm"),
      end: moment.utc(event.end).tz("Europe/Berlin").format("YYYY-MM-DD HH:mm"),
    }));
    setEvents(newEvents);
  }, [allUsers]);

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                <Target size={20} />
             </div>
             <h1 className="text-4xl font-black text-stone-900 tracking-tighter">Shift Generation</h1>
          </div>
          <p className="text-stone-500 font-medium">Strategize and publish future operational rotations with AI assistance</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="add-btn !bg-orange-500 !shadow-orange-500/20 px-10 py-5 flex items-center gap-3 group !rounded-3xl"
            onClick={shiftSave}
          >
            <Save size={20} className="group-hover:rotate-12 transition-transform" />
            Commit & Publish
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="card !p-0 overflow-hidden shadow-2xl shadow-orange-500/5 border-stone-100/60"
      >
        <div className="p-10 border-b border-stone-100 bg-stone-50/30 flex flex-col sm:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-stone-900 flex items-center justify-center text-white shadow-2xl shadow-stone-900/20">
                 <Calendar size={32} />
              </div>
              <div>
                 <h3 className="text-2xl font-black text-stone-900 tracking-tight leading-none">
                    {moment(selectedDay).format("MMMM YYYY")}
                 </h3>
                 <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mt-2">Active Planning Period</p>
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="px-5 py-3 bg-white border border-stone-100 rounded-2xl flex items-center gap-3 shadow-sm">
                 <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Draft Status: Valid</span>
              </div>
              <button 
                className={`px-6 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-500 flex items-center gap-2 group ${
                  show 
                    ? "bg-stone-900 text-white shadow-2xl shadow-stone-900/10" 
                    : "bg-white text-stone-500 border border-stone-100 hover:bg-stone-50 hover:text-stone-900"
                }`}
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
                {show ? "Identity View" : "Visual Timeline"}
              </button>
           </div>
        </div>

        <div className="p-10">
          <AnimatePresence mode="wait">
            {!show ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 xl:grid-cols-2 gap-8"
              >
                {allUsers.map((user, index) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group p-8 bg-white border border-stone-100/60 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">
                      <div className="flex items-center gap-5">
                        <div className="relative">
                          <div className={`w-4 h-4 rounded-full absolute -top-1 -right-1 border-4 border-white z-10 ${
                            user.team === "sozialbetreuerhelfer" ? "bg-amber-400" : 
                            user.team === "sozialarbeiter" ? "bg-orange-500" : "bg-stone-900"
                          }`} />
                          <img 
                            src={`https://avatar.iran.liara.run/public/${index + 1}`} 
                            className="w-16 h-16 rounded-[1.5rem] bg-stone-50 border-2 border-white shadow-sm object-cover group-hover:scale-105 transition-transform duration-500" 
                            alt={user.name}
                          />
                        </div>
                        <div>
                          <p className="font-black text-stone-900 text-xl tracking-tight capitalize leading-none mb-1.5">{user.name}</p>
                          <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-stone-200"></div>
                             <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{user.team}</p>
                          </div>
                        </div>
                      </div>

                      {/* Shift Choice Toggle */}
                      <div className="flex bg-stone-50/50 p-2 rounded-[1.5rem] border border-stone-100/50 shadow-inner group/toggle">
                         {[
                           { id: 'morning', label: 'Morning', color: 'bg-amber-400' },
                           { id: false, label: 'Flex', color: 'bg-orange-500' },
                           { id: 'night', label: 'Evening', color: 'bg-stone-900' }
                         ].map((s) => (
                           <button
                             key={s.id.toString()}
                             disabled={s.id && handleDisable(user, s.id)}
                             onClick={() => {
                               const updated = [...allUsers];
                               updated[index].shiftChoice = s.id;
                               setAllUsers(updated);
                             }}
                             className={`px-5 py-2.5 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                               (user.shiftChoice === s.id || (!user.shiftChoice && s.id === false))
                                 ? `${s.color} text-white shadow-xl`
                                 : "text-stone-400 hover:text-stone-900 hover:bg-white"
                             } disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed`}
                           >
                             {s.label}
                           </button>
                         ))}
                      </div>
                    </div>

                    <div className="bg-stone-50/30 rounded-[2.5rem] p-8 border border-stone-100/50 relative overflow-hidden group/stats">
                      <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 opacity-0 group-hover/stats:opacity-100 transition-opacity"></div>
                      <StatisticBar events={events} user={user} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
            <motion.div 
              key="calendar"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-orange-500/5 rounded-[4rem] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative rounded-[3rem] overflow-hidden border border-stone-100 shadow-2xl bg-white p-3">
                <ShiftCalendar
                  events={events}
                  setEvents={setEvents}
                  views={[viewMonthGrid, viewDay]}
                  selectedDay={selectedDay}
                  handleShiftUpdate={handleShiftUpdate}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  </div>
  );
};

export default CreateShifts;
