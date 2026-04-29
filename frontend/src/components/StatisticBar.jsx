const StatisticBar = ({ events, user }) => {
  const morningCount = events
    .filter((event) => event.uid === user._id)
    .filter((shift) => String(shift.start).endsWith("08:00")).length;

  const nightCount = events
    .filter((event) => event.uid === user._id)
    .filter((shift) => String(shift.end).endsWith("22:00")).length;

  const totalCount = events.filter((event) => event.uid === user._id).length;

  const morningWidth = totalCount > 0 ? (morningCount / totalCount) * 100 : 0;
  const nightWidth = totalCount > 0 ? (nightCount / totalCount) * 100 : 0;

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-center mb-1">
         <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Efficiency</span>
         <span className="text-[11px] font-bold text-stone-900">{totalCount} Shifts Total</span>
      </div>
      
      <div className="relative w-full h-2.5 bg-stone-100 rounded-full overflow-hidden shadow-inner flex">
        <div
          className="h-full bg-amber-400 transition-all duration-1000 ease-out"
          style={{ width: `${morningWidth}%` }}
        />
        <div
          className="h-full bg-indigo-600 transition-all duration-1000 ease-out"
          style={{ width: `${nightWidth}%` }}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
           <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
           <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter">Morning ({morningCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
           <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
           <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter">Evening ({nightCount})</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticBar;
