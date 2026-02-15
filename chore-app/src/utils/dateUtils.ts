import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths
} from 'date-fns';

/**
 * Formats a date for display
 */
export function formatDate(date: Date, formatStr: string = 'PPP'): string {
  return format(date, formatStr);
}

/**
 * Gets all days to display in a month view calendar
 * Includes days from previous/next month to fill the grid
 */
export function getMonthViewDays(date: Date): Date[] {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));
  return eachDayOfInterval({ start, end });
}

/**
 * Gets the next month
 */
export function getNextMonth(date: Date): Date {
  return addMonths(date, 1);
}

/**
 * Gets the previous month
 */
export function getPreviousMonth(date: Date): Date {
  return subMonths(date, 1);
}

/**
 * Gets the month name and year for display
 */
export function getMonthYearDisplay(date: Date): string {
  return format(date, 'MMMM yyyy');
}
