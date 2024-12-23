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
  subMonths,
} from "date-fns";

/**
 * Generates a grid of days for the current calendar view.
 * Includes leading and trailing days from adjacent months.
 * @param {Date} date - Any date in the desired month.
 * @returns {Array} - An array of Date objects for the grid.
 */
export const generateCalendarGrid = (date) => {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));
  return eachDayOfInterval({ start, end });
};

/**
 * Formats a date as "Month YYYY".
 * @param {Date} date - The date to format.
 * @returns {string} - Formatted month and year string.
 */
export const formatMonthYear = (date) => format(date, "MMMM yyyy");

/**
 * Checks if two dates are the same calendar day.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {boolean} - True if the dates are the same day.
 */
export const isSameCalendarDay = (date1, date2) => isSameDay(date1, date2);

/**
 * Checks if a date belongs to the current month.
 * @param {Date} date - The date to check.
 * @param {Date} currentMonth - A date in the current month.
 * @returns {boolean} - True if the date is in the current month.
 */
export const isInCurrentMonth = (date, currentMonth) =>
  isSameMonth(date, currentMonth);

/**
 * Moves the calendar to the next month.
 * @param {Date} date - Current date.
 * @returns {Date} - Date object for the first day of the next month.
 */
export const getNextMonth = (date) => addMonths(date, 1);

/**
 * Moves the calendar to the previous month.
 * @param {Date} date - Current date.
 * @returns {Date} - Date object for the first day of the previous month.
 */
export const getPreviousMonth = (date) => subMonths(date, 1);
