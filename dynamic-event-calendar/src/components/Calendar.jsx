import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EventForm from "@/components/EventForm";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const today = new Date();

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  });

  const goToPreviousMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const getDayClass = (day) => {
    if (isSameDay(day, today)) return "bg-blue-500 text-white font-bold";
    if (day.getDay() === 6) return "bg-yellow-300 text-gray-800"; // Saturday
    if (day.getDay() === 0) return "bg-red-300 text-gray-800"; // Sunday
    if (isSameMonth(day, currentMonth)) return "bg-white text-gray-800";
    return "bg-gray-200 text-gray-400";
  };

  const handleEventSubmit = (eventData) => {
    console.log("Event Added:", eventData);
    setSelectedDay(null); // Close the dialog after submitting
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={goToPreviousMonth}>
          Previous
        </Button>
        <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
        <Button variant="outline" onClick={goToNextMonth}>
          Next
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-semibold text-gray-700">
            {day}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`relative p-4 rounded cursor-pointer ${getDayClass(day)} hover:bg-gray-300`}
          >
            <div>{day.getDate()}</div>
            {isSameMonth(day, currentMonth) && (
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="absolute bottom-1 right-1 text-lg font-bold text-blue-600"
                    onClick={() => setSelectedDay(day)}
                  >
                    +
                  </button>
                </DialogTrigger>
                <DialogContent>
                  {selectedDay && selectedDay === day && (
                    <EventForm date={selectedDay} onSubmit={handleEventSubmit} />
                  )}
                </DialogContent>
              </Dialog>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
